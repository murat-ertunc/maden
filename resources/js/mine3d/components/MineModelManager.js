import * as THREE from 'three';

export default class MineModelManager {
    constructor(scene, api, mineId) {
        this.scene = scene;
        this.api = api;
        this.mineId = mineId;
        this.models = new Map();
        
        // Model türleri için geometri şablonları
        this.geometryTemplates = {
            excavation: this.createExcavationGeometry.bind(this),
            tunnel: this.createTunnelGeometry.bind(this),
            shaft: this.createShaftGeometry.bind(this),
            building: this.createBuildingGeometry.bind(this),
            equipment: this.createEquipmentGeometry.bind(this)
        };
        
        // Materyal şablonları
        this.materialTemplates = {
            excavation: { color: 0x8B4513, roughness: 0.8, metalness: 0.1 },
            tunnel: { color: 0x696969, roughness: 0.9, metalness: 0.0 },
            shaft: { color: 0x2F4F4F, roughness: 0.7, metalness: 0.2 },
            building: { color: 0xCD853F, roughness: 0.6, metalness: 0.0 },
            equipment: { color: 0xFFD700, roughness: 0.3, metalness: 0.8 }
        };
    }

    async loadModels(modelData) {
        for (const model of modelData) {
            this.createModelFromData(model);
        }
    }

    createModelFromData(data) {
        try {
            const geometry = this.createGeometry(data.type, data.geometry);
            const material = this.createMaterial(data.material, data.type);
            const mesh = new THREE.Mesh(geometry, material);
            
            // Pozisyon, rotasyon ve ölçek ayarla
            mesh.position.set(...data.position);
            mesh.rotation.set(...data.rotation);
            mesh.scale.set(...data.scale);
            
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            // Sahneye ekle
            this.scene.addModel(data.id, mesh, data);
            this.models.set(data.id, {
                mesh: mesh,
                data: data
            });
            
            return mesh;
        } catch (error) {
            console.error('Model oluşturulurken hata:', error);
            return null;
        }
    }

    createGeometry(type, geometryData) {
        if (this.geometryTemplates[type]) {
            return this.geometryTemplates[type](geometryData);
        } else {
            return this.createDefaultGeometry(geometryData);
        }
    }

    createMaterial(materialData, type) {
        const template = this.materialTemplates[type] || {};
        
        const material = new THREE.MeshStandardMaterial({
            color: materialData.color || template.color || 0x888888,
            roughness: materialData.roughness ?? template.roughness ?? 0.5,
            metalness: materialData.metalness ?? template.metalness ?? 0.0,
            transparent: materialData.opacity < 1,
            opacity: materialData.opacity ?? 1
        });
        
        // Texture varsa uygula
        if (materialData.texture) {
            const textureLoader = new THREE.TextureLoader();
            material.map = textureLoader.load(materialData.texture);
        }
        
        return material;
    }

    // Geometri oluşturma fonksiyonları
    createExcavationGeometry(params) {
        const { width = 10, height = 5, depth = 10, steps = 3 } = params;
        
        // Stepped excavation geometry
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const indices = [];
        
        const stepHeight = height / steps;
        const stepDepth = depth / steps;
        
        // Create stepped sides
        for (let step = 0; step <= steps; step++) {
            const currentWidth = width * (1 - step * 0.1);
            const currentHeight = -step * stepHeight;
            const currentDepth = depth - step * stepDepth;
            
            // Add vertices for this step
            const stepVertices = [
                [-currentWidth/2, currentHeight, currentDepth/2],
                [currentWidth/2, currentHeight, currentDepth/2],
                [currentWidth/2, currentHeight, -currentDepth/2],
                [-currentWidth/2, currentHeight, -currentDepth/2]
            ];
            
            stepVertices.forEach(v => vertices.push(...v));
        }
        
        // Create faces
        this.createSteppedFaces(indices, steps);
        
        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        
        return geometry;
    }

    createTunnelGeometry(params) {
        const { length = 20, radius = 2, segments = 16 } = params;
        
        // Create tunnel using CylinderGeometry lying horizontally
        const geometry = new THREE.CylinderGeometry(radius, radius, length, segments);
        geometry.rotateZ(Math.PI / 2);
        
        return geometry;
    }

    createShaftGeometry(params) {
        const { depth = 30, radius = 3, segments = 12 } = params;
        
        // Vertical shaft
        const geometry = new THREE.CylinderGeometry(radius, radius, depth, segments);
        geometry.translate(0, -depth / 2, 0);
        
        return geometry;
    }

    createBuildingGeometry(params) {
        const { width = 8, height = 6, depth = 8, roofHeight = 2 } = params;
        
        // Building with roof
        const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
        const roofGeometry = new THREE.ConeGeometry(width * 0.7, roofHeight, 4);
        
        // Merge geometries
        buildingGeometry.translate(0, height / 2, 0);
        roofGeometry.translate(0, height + roofHeight / 2, 0);
        roofGeometry.rotateY(Math.PI / 4);
        
        const geometry = new THREE.BufferGeometry();
        // Note: In a real implementation, you'd properly merge the geometries
        // For now, just return the building part
        return buildingGeometry;
    }

    createEquipmentGeometry(params) {
        const { type = 'excavator', scale = 1 } = params;
        
        switch (type) {
            case 'excavator':
                return this.createExcavatorGeometry(scale);
            case 'truck':
                return this.createTruckGeometry(scale);
            default:
                return new THREE.BoxGeometry(2 * scale, 1 * scale, 4 * scale);
        }
    }

    createExcavatorGeometry(scale) {
        // Simplified excavator
        const group = new THREE.Group();
        
        // Base
        const baseGeometry = new THREE.BoxGeometry(2 * scale, 1 * scale, 3 * scale);
        const base = new THREE.Mesh(baseGeometry);
        base.position.y = 0.5 * scale;
        group.add(base);
        
        // Boom
        const boomGeometry = new THREE.BoxGeometry(0.3 * scale, 0.3 * scale, 4 * scale);
        const boom = new THREE.Mesh(boomGeometry);
        boom.position.set(0, 1.5 * scale, 1 * scale);
        boom.rotation.x = -Math.PI / 6;
        group.add(boom);
        
        return group;
    }

    createTruckGeometry(scale) {
        // Simplified truck
        const group = new THREE.Group();
        
        // Cab
        const cabGeometry = new THREE.BoxGeometry(2 * scale, 2 * scale, 1.5 * scale);
        const cab = new THREE.Mesh(cabGeometry);
        cab.position.set(0, 1 * scale, 1.25 * scale);
        group.add(cab);
        
        // Bed
        const bedGeometry = new THREE.BoxGeometry(2 * scale, 1 * scale, 3 * scale);
        const bed = new THREE.Mesh(bedGeometry);
        bed.position.set(0, 0.5 * scale, -1.5 * scale);
        group.add(bed);
        
        return group;
    }

    createDefaultGeometry(params) {
        const { width = 1, height = 1, depth = 1 } = params;
        return new THREE.BoxGeometry(width, height, depth);
    }

    createSteppedFaces(indices, steps) {
        // Helper function to create indices for stepped geometry
        for (let step = 0; step < steps; step++) {
            const baseIndex = step * 4;
            
            // Top face
            indices.push(
                baseIndex, baseIndex + 1, baseIndex + 2,
                baseIndex, baseIndex + 2, baseIndex + 3
            );
            
            // Side faces to next step
            if (step < steps - 1) {
                const nextIndex = (step + 1) * 4;
                
                // Front face
                indices.push(
                    baseIndex, nextIndex, nextIndex + 1,
                    baseIndex, nextIndex + 1, baseIndex + 1
                );
                
                // Similar for other sides...
            }
        }
    }

    // Public methods
    async addModel(modelData) {
        try {
            // Sunucuya kaydet
            const savedModel = await this.api.addModel(this.mineId, modelData);
            
            // Sahneye ekle
            this.createModelFromData(savedModel);
            
            return savedModel;
        } catch (error) {
            console.error('Model eklenirken hata:', error);
            throw error;
        }
    }

    async updateModel(modelId, updateData) {
        try {
            // Sunucuyu güncelle
            const updatedModel = await this.api.updateModel(this.mineId, modelId, updateData);
            
            // Sahneyi güncelle
            const model = this.models.get(modelId);
            if (model) {
                if (updateData.position) {
                    model.mesh.position.set(...updateData.position);
                }
                if (updateData.rotation) {
                    model.mesh.rotation.set(...updateData.rotation);
                }
                if (updateData.scale) {
                    model.mesh.scale.set(...updateData.scale);
                }
                if (updateData.material) {
                    model.mesh.material = this.createMaterial(updateData.material, model.data.type);
                }
                if (updateData.visible !== undefined) {
                    model.mesh.visible = updateData.visible;
                }
                
                model.data = updatedModel;
            }
            
            return updatedModel;
        } catch (error) {
            console.error('Model güncellenirken hata:', error);
            throw error;
        }
    }

    async removeModel(modelId) {
        try {
            // Sunucudan sil
            await this.api.deleteModel(this.mineId, modelId);
            
            // Sahneden kaldır
            this.scene.removeModel(modelId);
            this.models.delete(modelId);
            
        } catch (error) {
            console.error('Model silinirken hata:', error);
            throw error;
        }
    }

    getModel(modelId) {
        return this.models.get(modelId);
    }

    getAllModels() {
        return Array.from(this.models.values());
    }

    // Predefined model templates
    getModelTemplates() {
        return {
            excavation: {
                name: 'Açık Ocak',
                type: 'excavation',
                geometry: { width: 20, height: 10, depth: 15, steps: 4 },
                material: { color: 0x8B4513 }
            },
            tunnel: {
                name: 'Tünel',
                type: 'tunnel',
                geometry: { length: 30, radius: 3, segments: 16 },
                material: { color: 0x696969 }
            },
            shaft: {
                name: 'Kuyu',
                type: 'shaft',
                geometry: { depth: 40, radius: 2.5, segments: 12 },
                material: { color: 0x2F4F4F }
            },
            building: {
                name: 'Bina',
                type: 'building',
                geometry: { width: 10, height: 8, depth: 12, roofHeight: 3 },
                material: { color: 0xCD853F }
            },
            excavator: {
                name: 'Ekskavatör',
                type: 'equipment',
                geometry: { type: 'excavator', scale: 1 },
                material: { color: 0xFFD700, metalness: 0.8 }
            },
            truck: {
                name: 'Kamyon',
                type: 'equipment',
                geometry: { type: 'truck', scale: 1 },
                material: { color: 0xFF6347, metalness: 0.6 }
            }
        };
    }
}
