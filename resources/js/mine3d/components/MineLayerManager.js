import * as THREE from 'three';

export default class MineLayerManager {
    constructor(scene, api, mineId) {
        this.scene = scene;
        this.api = api;
        this.mineId = mineId;
        this.layers = new Map();
        
        // Layer görselleştirme ayarları
        this.layerSettings = {
            defaultRadius: 25,
            subdivisions: 32,
            wireframe: false,
            opacity: 0.7
        };
    }

    async loadLayers(layerData) {
        // Derinliğe göre sırala
        const sortedLayers = layerData.sort((a, b) => a.depth_from - b.depth_from);
        
        for (const layer of sortedLayers) {
            this.createLayerFromData(layer);
        }
    }

    createLayerFromData(data) {
        try {
            const geometry = this.createLayerGeometry(data);
            const material = this.createLayerMaterial(data);
            const mesh = new THREE.Mesh(geometry, material);
            
            // Katman pozisyonunu ayarla (derinlik ortalaması)
            const avgDepth = (data.depth_from + data.depth_to) / 2;
            mesh.position.y = -avgDepth;
            
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.visible = data.visible;
            
            // Sahneye ekle
            this.scene.addLayer(data.id, mesh, data);
            this.layers.set(data.id, {
                mesh: mesh,
                data: data
            });
            
            return mesh;
        } catch (error) {
            console.error('Katman oluşturulurken hata:', error);
            return null;
        }
    }

    createLayerGeometry(data) {
        const thickness = data.depth_to - data.depth_from;
        const radius = this.layerSettings.defaultRadius;
        
        // Katman tipine göre farklı geometriler
        switch (data.mineral_type?.toLowerCase()) {
            case 'coal':
            case 'kömür':
                return this.createCoalLayerGeometry(radius, thickness);
            case 'iron':
            case 'demir':
                return this.createIronLayerGeometry(radius, thickness);
            case 'copper':
            case 'bakır':
                return this.createCopperLayerGeometry(radius, thickness);
            case 'gold':
            case 'altın':
                return this.createGoldLayerGeometry(radius, thickness);
            default:
                return this.createDefaultLayerGeometry(radius, thickness);
        }
    }

    createDefaultLayerGeometry(radius, thickness) {
        // Silindirik katman
        const geometry = new THREE.CylinderGeometry(
            radius, 
            radius, 
            thickness, 
            this.layerSettings.subdivisions
        );
        
        return geometry;
    }

    createCoalLayerGeometry(radius, thickness) {
        // Kömür katmanı - düzensiz yüzey
        const geometry = new THREE.CylinderGeometry(
            radius, 
            radius * 0.95, // Alt kısım biraz daha dar
            thickness, 
            this.layerSettings.subdivisions
        );
        
        // Yüzeyi biraz düzensizleştir
        this.addNoise(geometry, 0.5);
        
        return geometry;
    }

    createIronLayerGeometry(radius, thickness) {
        // Demir katmanı - katmanlı yapı
        const geometry = new THREE.CylinderGeometry(
            radius, 
            radius, 
            thickness, 
            this.layerSettings.subdivisions,
            4 // Y segmentleri
        );
        
        return geometry;
    }

    createCopperLayerGeometry(radius, thickness) {
        // Bakır katmanı - damarlar içeren yapı
        const geometry = new THREE.CylinderGeometry(
            radius, 
            radius, 
            thickness, 
            this.layerSettings.subdivisions
        );
        
        // Damar benzeri çizgiler ekle (UV mapping ile)
        this.addVeinPattern(geometry);
        
        return geometry;
    }

    createGoldLayerGeometry(radius, thickness) {
        // Altın katmanı - nugget benzeri yapı
        const geometry = new THREE.CylinderGeometry(
            radius * 0.8, 
            radius * 0.9, 
            thickness, 
            this.layerSettings.subdivisions
        );
        
        // Altın nugget'ları için küçük çıkıntılar
        this.addNoise(geometry, 0.3);
        
        return geometry;
    }

    addNoise(geometry, intensity) {
        const positions = geometry.attributes.position;
        const vertex = new THREE.Vector3();
        
        for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i);
            
            // Random noise ekle
            vertex.x += (Math.random() - 0.5) * intensity;
            vertex.z += (Math.random() - 0.5) * intensity;
            
            positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
    }

    addVeinPattern(geometry) {
        // Bu fonksiyon UV coordinates kullanarak damar deseni ekleyebilir
        // Gelişmiş bir implementasyon için texture kullanılabilir
        geometry.computeVertexNormals();
    }

    createLayerMaterial(data) {
        const color = new THREE.Color(data.color);
        
        // Mineral türüne göre materyal özelliklerini ayarla
        const materialProps = this.getMaterialProperties(data.mineral_type);
        
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: materialProps.roughness,
            metalness: materialProps.metalness,
            transparent: true,
            opacity: this.layerSettings.opacity,
            side: THREE.DoubleSide,
            wireframe: this.layerSettings.wireframe
        });
        
        // Density'ye göre renk yoğunluğunu ayarla
        if (data.density) {
            const densityFactor = Math.min(data.density / 5, 1); // Normalize
            material.opacity = this.layerSettings.opacity * (0.5 + densityFactor * 0.5);
        }
        
        // Grade'e göre metalness ayarla (cevher tenörü)
        if (data.grade) {
            const gradeFactor = Math.min(data.grade / 100, 1); // Normalize
            material.metalness = materialProps.metalness * gradeFactor;
        }
        
        return material;
    }

    getMaterialProperties(mineralType) {
        const properties = {
            'coal': { roughness: 0.9, metalness: 0.0 },
            'kömür': { roughness: 0.9, metalness: 0.0 },
            'iron': { roughness: 0.6, metalness: 0.8 },
            'demir': { roughness: 0.6, metalness: 0.8 },
            'copper': { roughness: 0.4, metalness: 0.9 },
            'bakır': { roughness: 0.4, metalness: 0.9 },
            'gold': { roughness: 0.1, metalness: 1.0 },
            'altın': { roughness: 0.1, metalness: 1.0 },
            'silver': { roughness: 0.2, metalness: 1.0 },
            'gümüş': { roughness: 0.2, metalness: 1.0 },
            'limestone': { roughness: 0.8, metalness: 0.0 },
            'kireçtaşı': { roughness: 0.8, metalness: 0.0 },
            'sandstone': { roughness: 0.7, metalness: 0.0 },
            'kumtaşı': { roughness: 0.7, metalness: 0.0 }
        };
        
        return properties[mineralType?.toLowerCase()] || { roughness: 0.5, metalness: 0.2 };
    }

    // Public methods
    async addLayer(layerData) {
        try {
            // Sunucuya kaydet
            const savedLayer = await this.api.addLayer(this.mineId, layerData);
            
            // Sahneye ekle
            this.createLayerFromData(savedLayer);
            
            return savedLayer;
        } catch (error) {
            console.error('Katman eklenirken hata:', error);
            throw error;
        }
    }

    async updateLayer(layerId, updateData) {
        try {
            // Sunucuyu güncelle
            const updatedLayer = await this.api.updateLayer(this.mineId, layerId, updateData);
            
            // Sahneyi güncelle
            const layer = this.layers.get(layerId);
            if (layer) {
                // Derinlik değişirse pozisyonu güncelle
                if (updateData.depth_from !== undefined || updateData.depth_to !== undefined) {
                    const avgDepth = (updatedLayer.depth_from + updatedLayer.depth_to) / 2;
                    layer.mesh.position.y = -avgDepth;
                    
                    // Geometriyi yeniden oluştur
                    layer.mesh.geometry.dispose();
                    layer.mesh.geometry = this.createLayerGeometry(updatedLayer);
                }
                
                // Renk değişirse materyali güncelle
                if (updateData.color) {
                    layer.mesh.material.dispose();
                    layer.mesh.material = this.createLayerMaterial(updatedLayer);
                }
                
                // Görünürlük
                if (updateData.visible !== undefined) {
                    layer.mesh.visible = updateData.visible;
                }
                
                layer.data = updatedLayer;
            }
            
            return updatedLayer;
        } catch (error) {
            console.error('Katman güncellenirken hata:', error);
            throw error;
        }
    }

    async removeLayer(layerId) {
        try {
            // Sunucudan sil
            await this.api.deleteLayer(this.mineId, layerId);
            
            // Sahneden kaldır
            const layer = this.layers.get(layerId);
            if (layer) {
                layer.mesh.geometry.dispose();
                layer.mesh.material.dispose();
            }
            
            this.scene.removeLayer(layerId);
            this.layers.delete(layerId);
            
        } catch (error) {
            console.error('Katman silinirken hata:', error);
            throw error;
        }
    }

    getLayer(layerId) {
        return this.layers.get(layerId);
    }

    getAllLayers() {
        return Array.from(this.layers.values());
    }

    // Katman görselleştirme ayarları
    setWireframe(enabled) {
        this.layerSettings.wireframe = enabled;
        this.layers.forEach(layer => {
            layer.mesh.material.wireframe = enabled;
        });
    }

    setOpacity(opacity) {
        this.layerSettings.opacity = opacity;
        this.layers.forEach(layer => {
            layer.mesh.material.opacity = opacity;
        });
    }

    toggleLayerVisibility(layerId) {
        const layer = this.layers.get(layerId);
        if (layer) {
            layer.mesh.visible = !layer.mesh.visible;
            return layer.mesh.visible;
        }
        return false;
    }

    // Cross-section view
    createCrossSection(plane) {
        // Kesit görünümü için katmanları bölme
        this.layers.forEach((layer, id) => {
            const clippingPlane = new THREE.Plane(plane.normal, plane.constant);
            layer.mesh.material.clippingPlanes = [clippingPlane];
        });
    }

    removeCrossSection() {
        this.layers.forEach((layer, id) => {
            layer.mesh.material.clippingPlanes = [];
        });
    }

    // Predefined layer templates
    getLayerTemplates() {
        return {
            coal: {
                name: 'Kömür Katmanı',
                mineral_type: 'coal',
                color: '#2F2F2F',
                density: 1.3,
                grade: 70
            },
            iron: {
                name: 'Demir Cevheri',
                mineral_type: 'iron',
                color: '#8B4513',
                density: 5.2,
                grade: 60
            },
            copper: {
                name: 'Bakır Cevheri',
                mineral_type: 'copper',
                color: '#B87333',
                density: 4.5,
                grade: 25
            },
            gold: {
                name: 'Altın Cevheri',
                mineral_type: 'gold',
                color: '#FFD700',
                density: 19.3,
                grade: 15
            },
            limestone: {
                name: 'Kireçtaşı',
                mineral_type: 'limestone',
                color: '#F5F5DC',
                density: 2.7,
                grade: 0
            },
            sandstone: {
                name: 'Kumtaşı',
                mineral_type: 'sandstone',
                color: '#F4A460',
                density: 2.3,
                grade: 0
            }
        };
    }
}
