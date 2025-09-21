// Basit 3D Maden Görüntüleyici (ESM sürümü) - Enhanced with WebGL2 & Collision Detection
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { WebGL2EnhancedRenderer } from './webgl2-enhanced.js';
import { CollisionDetectionSystem } from './collision-detection.js';
import { AdvancedShaderManager } from './advanced-shaders.js';
import { PerformanceMonitor } from './performance-monitor.js';

// Kontrolllü tünel oluşturucu sınıf
class MineObjectCreator {
    constructor(scene, camera, renderer, viewer = null) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.viewer = viewer; // SimpleMine3DViewer referansı
        this.isCreating = false;
        this.previewObject = null;
        this.currentType = 'tunnel';
        this.currentPosition = new THREE.Vector3(0, -2, 0);
        
        // Default parametreler
        this.parameters = {
            tunnel: { width: 3, height: 3, length: 10, orientation: 'horizontal', angle: 0 },
            road: { width: 4, height: 0.5, length: 15, orientation: 'horizontal', angle: 0 },
            rail: { width: 1.5, height: 0.3, length: 20, orientation: 'horizontal', angle: 0 },
            conveyor: { width: 1, height: 0.8, length: 12, orientation: 'horizontal', angle: 0 }
        };
        
        this.createdObjects = new Map();
        this.nextId = 1;
        // Çoklu ardışık yerleştirme istenirse true yapılabilir
        this.autoMultiPlace = false;
    }

    startCreating(type) {
        this.isCreating = true;
        this.currentType = type;
        this.showCreationUI();
        this.createPreview();
        console.log(`[MineObjectCreator] Started creating: ${type}`);
    }

    stopCreating() {
        this.isCreating = false;
        this.hideCreationUI();
        this.removePreview();
        console.log('[MineObjectCreator] Stopped creating');
    }

    updateParameter(paramName, value) {
        if (this.parameters[this.currentType]) {
            // Orientation parametresi string olarak saklanmalı
            if (paramName === 'orientation') {
                this.parameters[this.currentType][paramName] = value;
            } else {
                // Diğer tüm parametreler sayısal
                this.parameters[this.currentType][paramName] = parseFloat(value);
            }
            this.updatePreview();
            console.log(`[MineObjectCreator] Updated ${paramName}: ${value}`);
        }
    }

    createPreview() {
        this.removePreview();
        const params = this.parameters[this.currentType];
        const geometry = this.createGeometry(this.currentType, params);
        const material = this.createPreviewMaterial(this.currentType);
        
        this.previewObject = new THREE.Mesh(geometry, material);
        this.previewObject.position.copy(this.currentPosition);
        this.previewObject.name = 'preview_object';
        this.scene.add(this.previewObject);
    }

    updatePreview() {
        if (this.previewObject) {
            const params = this.parameters[this.currentType];
            const newGeometry = this.createGeometry(this.currentType, params);
            
            this.previewObject.geometry.dispose();
            this.previewObject.geometry = newGeometry;
        }
    }

    removePreview() {
        if (this.previewObject) {
            this.scene.remove(this.previewObject);
            this.previewObject.geometry.dispose();
            this.previewObject.material.dispose();
            this.previewObject = null;
        }
    }

    createGeometry(type, params) {
        let geometry;
        // Orientation normalize: 'yatay' -> 'horizontal', 'dikey' -> 'vertical'
        if (params && params.orientation) {
            if (params.orientation === 'yatay') params.orientation = 'horizontal';
            else if (params.orientation === 'dikey') params.orientation = 'vertical';
        }
        
        switch (type) {
            case 'tunnel':
                if (params.orientation === 'vertical') {
                    // Dikey tünel (CylinderGeometry Y ekseni boyunca)
                    geometry = new THREE.CylinderGeometry(
                        params.width / 2,  // top radius (genişlik)
                        params.width / 2,  // bottom radius (genişlik)
                        params.length,     // height (uzunluk Y ekseni boyunca)
                        16,                // radial segments
                        1,                 // height segments
                        false              // open ended
                    );
                    
                    // Dikey modda açı uygulaması
                    if (params.angle && params.angle !== 0) {
                        geometry.rotateY(params.angle * Math.PI / 180);
                    }
                } else {
                    // Yatay tünel (CylinderGeometry'yi Z ekseni boyunca döndür)
                    geometry = new THREE.CylinderGeometry(
                        params.height / 2, // top radius (yükseklik)
                        params.height / 2, // bottom radius (yükseklik) 
                        params.length,     // height (uzunluk)
                        16,                // radial segments
                        1,                 // height segments
                        false              // open ended
                    );
                    
                    // Yatay modda önce açı döndür (Y ekseni etrafında)
                    if (params.angle && params.angle !== 0) {
                        geometry.rotateY(params.angle * Math.PI / 180);
                    }
                    
                    // Sonra 90 derece X ekseni etrafında döndür (yatay hale getir)
                    geometry.rotateX(Math.PI / 2);
                    
                    // Width'i scale ile ayarla
                    geometry.scale(params.width / params.height, 1, 1);
                }
                break;
                
            case 'road':
                geometry = new THREE.BoxGeometry(params.width, params.height, params.length);
                break;
                
            case 'rail':
                geometry = new THREE.BoxGeometry(params.width, params.height, params.length);
                break;
                
            case 'conveyor':
                geometry = new THREE.BoxGeometry(params.width, params.height, params.length);
                break;
                
            default:
                geometry = new THREE.BoxGeometry(2, 2, 2);
        }

        // Açı uygulaması (tunnel hariç diğer türler için)
        if (type !== 'tunnel' && params.angle && params.angle !== 0) {
            if (params.orientation === 'vertical') {
                // Dikey modda Y ekseni etrafında döndür
                geometry.rotateY(params.angle * Math.PI / 180);
            } else {
                // Yatay modda Z ekseni etrafında döndür
                geometry.rotateZ(params.angle * Math.PI / 180);
            }
        }
        
        return geometry;
    }

    createPreviewMaterial(type) {
        const colors = {
            tunnel: 0x808080,
            road: 0x404040,
            rail: 0x666666,
            conveyor: 0xFFD700
        };
        
        return new THREE.MeshPhongMaterial({
            color: colors[type] || 0x808080,
            transparent: true,
            opacity: 0.6,
            wireframe: false
        });
    }

    finalizeCreation() {
        if (!this.previewObject) return null;

        const params = this.parameters[this.currentType];
        const finalGeometry = this.createGeometry(this.currentType, params);
        const finalMaterial = this.createFinalMaterial(this.currentType);
        
        const finalObject = new THREE.Mesh(finalGeometry, finalMaterial);
        finalObject.position.copy(this.previewObject.position);
        finalObject.userData = {
            id: this.nextId++,
            type: this.currentType,
            parameters: { ...params },
            selectable: true
        };
        
        // 🔍 Collision Detection: Validate placement before adding to scene
        if (this.viewer && this.viewer.collisionSystem) {
            const existingObjects = Array.from(this.createdObjects.values());
            const validation = this.viewer.collisionSystem.validateTunnelPlacement(finalObject, existingObjects);
            
            if (!validation.isValid) {
                // Show collision warning
                const conflictCount = validation.conflicts.length;
                const message = `⚠️ Placement conflict detected!\n${conflictCount} collision(s) found.`;
                
                if (!confirm(`${message}\n\nDo you want to place anyway?`)) {
                    // Cancel placement
                    finalObject.geometry.dispose();
                    finalObject.material.dispose();
                    return null;
                }
            }
        }
        
        this.scene.add(finalObject);
        this.createdObjects.set(finalObject.userData.id, finalObject);

        // 🔍 Register with collision system
        if (this.viewer && this.viewer.collisionSystem) {
            this.viewer.collisionSystem.registerObject(finalObject, 'static', {
                type: this.currentType,
                creator: 'MineObjectCreator',
                parameters: params
            });
        }

        // Viewer varsa seçim sistemine ekle
        if (this.viewer && this.viewer.objectSelector) {
            try {
                this.viewer.objectSelector.addSelectableObject(finalObject, {
                    id: finalObject.userData.id,
                    type: finalObject.userData.type,
                    name: `${finalObject.userData.type.charAt(0).toUpperCase() + finalObject.userData.type.slice(1)} ${finalObject.userData.id}`,
                    parameters: finalObject.userData.parameters,
                    color: '#' + finalObject.material.color.getHexString()
                });
            } catch (e) {
                console.warn('[MineObjectCreator] Selectable eklenemedi:', e);
            }
        }
        
        this.removePreview();
        console.log(`[MineObjectCreator] Created ${this.currentType} with ID: ${finalObject.userData.id}`);
        if (!this.autoMultiPlace) {
            // Tek yerleştirme modunda otomatik çık (escape'e gerek kalmasın)
            this.isCreating = false;
            this.hideCreationUI?.();
            // Viewer üzerindeki creation mode varsa kapat
            if (this.viewer) {
                this.viewer.isCreatingMode = false;
                // Olası preview/artık referansları temizle
                if (typeof this.viewer.removePreview === 'function') {
                    try { this.viewer.removePreview(); } catch(e) {}
                }
            }
        } else {
            // Çoklu mod: yeni önizleme üret (konum sabit kalır)
            this.createPreview();
        }
        return finalObject;
    }

    createFinalMaterial(type) {
        const colors = {
            tunnel: 0x808080,
            road: 0x404040,
            rail: 0x666666,
            conveyor: 0xFFD700
        };
        
        return new THREE.MeshPhongMaterial({
            color: colors[type] || 0x808080,
            transparent: false,
            opacity: 1.0
        });
    }

    showCreationUI() {
        let panel = document.getElementById('creation-panel');
        if (!panel) {
            panel = this.createCreationPanel();
        }
        panel.style.display = 'block';
        this.updateUIForType(this.currentType);
    }

    hideCreationUI() {
        const panel = document.getElementById('creation-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    createCreationPanel() {
        const panel = document.createElement('div');
        panel.id = 'creation-panel';
        panel.className = 'creation-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            min-width: 280px;
            z-index: 1000;
            display: none;
            font-family: Arial, sans-serif;
        `;
        
        panel.innerHTML = `
            <h4 id="creation-title" style="margin-top: 0; color: #fff;">Tünel Oluştur</h4>
            
            <div class="parameter-group" style="margin-bottom: 15px;">
                <label for="param1" style="display: block; margin-bottom: 5px;">
                    Genişlik: <span id="param1-value" style="color: #4CAF50; font-weight: bold;">3</span>m
                </label>
                <input type="range" id="param1" min="1" max="10" step="0.5" value="3" 
                       style="width: 100%; margin-bottom: 5px;">
                <input type="number" id="param1-number" min="1" max="10" step="0.5" value="3"
                       style="width: 100%; padding: 4px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
                
                <label for="param2" style="display: block; margin-bottom: 5px;">
                    Yükseklik: <span id="param2-value" style="color: #4CAF50; font-weight: bold;">3</span>m
                </label>
                <input type="range" id="param2" min="1" max="8" step="0.5" value="3"
                       style="width: 100%; margin-bottom: 5px;">
                <input type="number" id="param2-number" min="1" max="8" step="0.5" value="3"
                       style="width: 100%; padding: 4px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
                
                <label for="param3" style="display: block; margin-bottom: 5px;">
                    Uzunluk: <span id="param3-value" style="color: #4CAF50; font-weight: bold;">10</span>m
                </label>
                <input type="range" id="param3" min="5" max="5000" step="1" value="10"
                       style="width: 100%; margin-bottom: 5px;">
                <input type="number" id="param3-number" min="5" max="5000" step="1" value="10"
                       style="width: 100%; padding: 4px; margin-bottom: 15px; background: #333; color: white; border: 1px solid #555; border-radius: 3px;">
            </div>
            
            <div id="tunnel-controls" class="tunnel-specific" style="margin-bottom: 15px; border-top: 1px solid #444; padding-top: 15px;">
                <label for="orientation" style="display: block; margin-bottom: 5px;">
                    Yönelim:
                </label>
                <select id="orientation" style="width: 100%; padding: 5px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555;">
                    <option value="horizontal">Yatay</option>
                    <option value="vertical">Dikey</option>
                </select>
                
                <label for="angle" style="display: block; margin-bottom: 5px;">
                    Açı: <span id="angle-value" style="color: #4CAF50; font-weight: bold;">0</span>°
                </label>
                <input type="range" id="angle" min="0" max="360" step="5" value="0"
                       style="width: 100%; margin-bottom: 10px;">
            </div>
            
            <div class="button-group" style="margin-top: 15px;">
                <button id="create-confirm" class="btn btn-success" 
                        style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-right: 10px; cursor: pointer;">
                    Oluştur
                </button>
                <button id="create-cancel" class="btn btn-secondary"
                        style="background: #666; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                    İptal
                </button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Event listeners
        this.setupCreationPanelEvents();
        
        return panel;
    }

    setupCreationPanelEvents() {
        const param1 = document.getElementById('param1');
        const param2 = document.getElementById('param2');
        const param3 = document.getElementById('param3');
        const param1Number = document.getElementById('param1-number');
        const param2Number = document.getElementById('param2-number');
        const param3Number = document.getElementById('param3-number');
        const orientation = document.getElementById('orientation');
        const angle = document.getElementById('angle');
        const confirmBtn = document.getElementById('create-confirm');
        const cancelBtn = document.getElementById('create-cancel');

        // Range input events
        param1.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('param1-value').textContent = value;
            param1Number.value = value;
            this.updateParameter('width', value);
        });

        param2.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('param2-value').textContent = value;
            param2Number.value = value;
            this.updateParameter('height', value);
        });

        param3.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('param3-value').textContent = value;
            param3Number.value = value;
            this.updateParameter('length', value);
        });

        // Number input events
        param1Number.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('param1-value').textContent = value;
            param1.value = value;
            this.updateParameter('width', value);
        });

        param2Number.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('param2-value').textContent = value;
            param2.value = value;
            this.updateParameter('height', value);
        });

        param3Number.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('param3-value').textContent = value;
            param3.value = value;
            this.updateParameter('length', value);
        });

        // Yönelim değişikliğini dinle
        orientation.addEventListener('change', (e) => {
            this.updateParameter('orientation', e.target.value);
        });

        // Açı değişikliğini dinle
        angle.addEventListener('input', (e) => {
            document.getElementById('angle-value').textContent = e.target.value;
            this.updateParameter('angle', e.target.value);
        });

        confirmBtn.addEventListener('click', () => {
            const created = this.finalizeCreation();
            if (created) {
                this.stopCreating();
                // API'ye kaydet
                if (this.viewer) {
                    this.viewer.saveObjectToServer(created);
                }
            }
        });

        cancelBtn.addEventListener('click', () => {
            this.stopCreating();
        });
    }

    updateUIForType(type) {
        const titles = {
            tunnel: 'Tünel Oluştur',
            road: 'Yol Oluştur',
            rail: 'Ray Oluştur',
            conveyor: 'Konveyör Oluştur'
        };
        
        document.getElementById('creation-title').textContent = titles[type] || 'Obje Oluştur';
        
        const params = this.parameters[type];
        
        // Temel parametreler
        document.getElementById('param1').value = params.width;
        document.getElementById('param1-value').textContent = params.width;
        document.getElementById('param1-number').value = params.width;
        
        document.getElementById('param2').value = params.height;
        document.getElementById('param2-value').textContent = params.height;
        document.getElementById('param2-number').value = params.height;
        
        document.getElementById('param3').value = params.length;
        document.getElementById('param3-value').textContent = params.length;
        document.getElementById('param3-number').value = params.length;
        
        // Tunnel-specific kontrolleri göster/gizle
        const tunnelControls = document.getElementById('tunnel-controls');
        if (type === 'tunnel') {
            tunnelControls.style.display = 'block';
            // Orientation ve angle parametreleri
            document.getElementById('orientation').value = params.orientation || 'horizontal';
            document.getElementById('angle').value = params.angle || 0;
            document.getElementById('angle-value').textContent = params.angle || 0;
        } else {
            tunnelControls.style.display = 'none';
        }
    }

    async saveToServer(object) {
        try {
            const objectData = {
                mine_id: this.mineId || 1, // viewer'dan mineId al
                name: `${object.userData.type.charAt(0).toUpperCase() + object.userData.type.slice(1)} ${object.userData.id}`,
                type: 'model', // MineModel için
                geometry: {
                    type: object.userData.type,
                    ...object.userData.parameters
                },
                material: {
                    color: object.material.color.getHex(),
                    opacity: object.material.opacity || 1
                },
                position: [object.position.x, object.position.y, object.position.z],
                rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
                scale: [object.scale.x, object.scale.y, object.scale.z],
                properties: {
                    createdAt: new Date().toISOString(),
                    tool: object.userData.type
                },
                visible: true,
                order: object.userData.id
            };

            const response = await fetch(`/api/mines/${this.mineId || 1}/models`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(objectData)
            });

            if (response.ok) {
                const savedData = await response.json();
                object.userData.serverId = savedData.data?.id; // Server'dan gelen ID'yi sakla
                console.log('[MineObjectCreator] Successfully saved to server:', savedData);
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('[MineObjectCreator] Error saving to server:', error);
            // Kullanıcıya hata mesajı göster
            this.showError?.('Obje kaydedilemedi: ' + error.message);
        }
    }

    showError(message) {
        // Basit error toast
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 3000);
    }
}

// Yol çizimi için yardımcı sınıf
class MinePathDrawer {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.isDrawing = false;
        this.currentPath = [];
        this.tempPath = null;
        this.paths = new Map(); // ID -> Path objesi
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2); // Y=-2 seviyesinde (zemin altında)
        
        // Tunnel constraint modu
        this.tunnelConstraintMode = false;
        this.constraintTunnel = null;
        
        // Real-time preview sistemi
        this.currentDrawingType = 'tunnel';
        this.previewMesh = null;
        this.distanceLabel = null;
        
        this.drawingCallbacks = {
            onPathStart: null,
            onPathUpdate: null,
            onPathComplete: null
        };

        // Performans / LOD
        this._lodFrame = 0;
        this.debug = false; // Gürültülü logları kapatmak için
    }

    startDrawing(callbacks = {}) {
        // Önceki drawing state'ini temizle
        this.stopDrawing();
        
        this.isDrawing = true;
        this.currentPath = [];
        this.drawingCallbacks = { ...this.drawingCallbacks, ...callbacks };
        console.log('[MinePathDrawer] Yol çizimi başladı - state temizlendi, type:', this.currentDrawingType);
    }

    setDrawingType(type) {
        this.currentDrawingType = type;
        console.log('[MinePathDrawer] Drawing type set to:', type);
    }

    setAxisConstraint(axis) {
        this.axisConstraint = axis;
        console.log('[MinePathDrawer] Axis constraint set to:', axis);
    }

    stopDrawing() {
        // SADECE state'i temizle, completePath çağırma (duplicate önlemek için)
        this.isDrawing = false;
        this.currentPath = [];
        this.removeTempPath();
        this.removePreviewMesh();
        this.removeDistanceLabel();
        console.log('[MinePathDrawer] Yol çizimi durdu - temizlik yapıldı');
    }

    handleClick(event) {
        if (!this.isDrawing) return;

        this.updateMousePosition(event);
        const point = this.getGroundIntersection();
        
        if (point) {
            this.currentPath.push(point);
            this.updateTempPath();
            
            if (this.drawingCallbacks.onPathUpdate) {
                this.drawingCallbacks.onPathUpdate(this.currentPath);
            }
        }
    }

    handleMouseMove(event) {
        if (!this.isDrawing || this.currentPath.length === 0) return;

        this.updateMousePosition(event);
        let point = this.getGroundIntersection();
        
        if (point) {
            // Axis constraint uygula
            if (this.axisConstraint && this.currentPath.length > 0) {
                const lastPoint = this.currentPath[this.currentPath.length - 1];
                
                switch(this.axisConstraint) {
                    case 'x':
                        // Sadece X ekseninde hareket - Y ve Z sabit
                        point.y = lastPoint.y;
                        point.z = lastPoint.z;
                        break;
                    case 'y':
                        // Sadece Y ekseninde hareket - X ve Z sabit
                        point.x = lastPoint.x;
                        point.z = lastPoint.z;
                        break;
                    case 'z':
                        // Sadece Z ekseninde hareket - X ve Y sabit
                        point.x = lastPoint.x;
                        point.y = lastPoint.y;
                        break;
                    case 'free':
                    default:
                        // Serbest hareket - değişiklik yok
                        break;
                }
            }
            
            // 3D eksen kısıtlamalarını uygula (eski sistem ile uyumluluk)
            if (this.viewer.constrainToAxis) {
                point = this.viewer.constrainToAxis(point);
            }
            
            // Real-time preview update
            this.updatePreview(point);
            
            // Legacy temp path for fallback
            const previewPath = [...this.currentPath, point];
            this.updateTempPath(previewPath);
        }
    }

    updateMousePosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    getGroundIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersection = new THREE.Vector3();
        
        // Tunnel constraint modunda ise, sadece tunnel içindeki noktaları kabul et
        if (this.tunnelConstraintMode && this.constraintTunnel) {
            // Tunnel geometry ile intersection yap
            const tunnelIntersects = this.raycaster.intersectObject(this.constraintTunnel, true);
            if (tunnelIntersects.length > 0) {
                const point = tunnelIntersects[0].point;
                // Tunnel içindeki yol için Y offseti ekle (zemin seviyesi)
                point.y = -2.5; // Tunnel zemini
                if (this.debug) console.log('[MinePathDrawer] Tunnel constraint intersection found:', { x: point.x.toFixed(2), y: point.y.toFixed(2), z: point.z.toFixed(2) });
                return point;
            } else {
                if (this.debug) console.log('[MinePathDrawer] No tunnel constraint intersection found');
                return null;
            }
        } else {
            // Normal ground plane intersection
            const intersected = this.raycaster.ray.intersectPlane(this.groundPlane, intersection);
            
            if (intersected) {
                if (this.debug) console.log('[MinePathDrawer] Ground intersection found:', { x: intersection.x.toFixed(2), y: intersection.y.toFixed(2), z: intersection.z.toFixed(2) });
                return intersection;
            } else {
                if (this.debug) console.log('[MinePathDrawer] No ground intersection found');
                return null;
            }
        }
    }

    updateTempPath(pathPoints = null) {
        this.removeTempPath();
        
        const points = pathPoints || this.currentPath;
        if (points.length < 2) return;

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: 0xff0000, 
            linewidth: 3,
            opacity: 0.8,
            transparent: true 
        });
        
        this.tempPath = new THREE.Line(geometry, material);
        this.scene.add(this.tempPath);
    }

    removeTempPath() {
        if (this.tempPath) {
            console.log('[MinePathDrawer] Removing temp path');
            this.scene.remove(this.tempPath);
            this.tempPath.geometry.dispose();
            this.tempPath.material.dispose();
            this.tempPath = null;
        }
    }

    completePath() {
        if (this.currentPath.length < 2) {
            console.log('[MinePathDrawer] Complete path failed: not enough points');
            return null;
        }

        console.log('[MinePathDrawer] Completing path with', this.currentPath.length, 'points');
        this.removeTempPath();
        
        if (this.drawingCallbacks.onPathComplete) {
            this.drawingCallbacks.onPathComplete(this.currentPath);
        }
        
        const pathPoints = [...this.currentPath]; // Copy yapalım
        this.currentPath = []; // State'i temizle
        
        return pathPoints;
    }

    createPath(pathData) {
        const { 
            id, 
            points, 
            width = 2.5,   // Daha küçük varsayılan boyut
            height = 2.5,  // Daha küçük varsayılan boyut
            color = '#808080', 
            type = 'tunnel' 
        } = pathData;
        
        if (!points || points.length < 2) return null;

        const path = this.createPathMesh(points, width, height, color, type);
        path.userData = { id, type, pathData };
        
        // 🔍 Collision Detection: Check for path intersections
        if (this.viewer && this.viewer.collisionSystem) {
            const existingPaths = Array.from(this.paths.values());
            let hasIntersections = false;
            
            existingPaths.forEach(existingPath => {
                const intersections = this.viewer.collisionSystem.detectPathIntersections(path, existingPath);
                if (intersections.length > 0) {
                    hasIntersections = true;
                    console.warn(`⚠️ Path intersection detected with path ${existingPath.userData.id}:`, intersections);
                    
                    // Visualize intersection points (optional)
                    if (this.viewer.options?.debugCollisions) {
                        intersections.forEach(intersection => {
                            const marker = new THREE.Mesh(
                                new THREE.SphereGeometry(0.2),
                                new THREE.MeshBasicMaterial({ color: 0xff0000 })
                            );
                            marker.position.copy(intersection.point);
                            this.scene.add(marker);
                            
                            // Remove marker after 5 seconds
                            setTimeout(() => this.scene.remove(marker), 5000);
                        });
                    }
                }
            });
            
            if (hasIntersections) {
                console.log(`⚠️ Path ${id} has intersections with existing paths`);
            }
            
            // Register path with collision system
            this.viewer.collisionSystem.registerObject(path, 'static', {
                type: 'path',
                pathType: type,
                points: points,
                width: width,
                height: height
            });
        }
        
        this.paths.set(id, path);
        this.scene.add(path);
        
        console.log(`[MinePathDrawer] Yol oluşturuldu: ${id}, boyutlar: ${width}x${height}`);
        return path;
    }

    createPathMesh(points, width, height, color, type) {
        const group = new THREE.Group();
        
        // Ana yol geometrisi - geliştirilmiş tüp
    const pathGeometry = this.createTubeGeometry(points, width, height);
        const material = this.createPathMaterial(color, type);
        
        const pathMesh = new THREE.Mesh(pathGeometry, material);
        pathMesh.castShadow = true;
        pathMesh.receiveShadow = true;
    // LOD için düşük poligon varyantı
    const lowPolyGeometry = this.createTubeGeometry(points, width, height, { quality: 'low' });
    pathMesh.userData.highGeometry = pathGeometry;
    pathMesh.userData.lowGeometry = lowPolyGeometry;
    pathMesh.userData.lodState = 'high';
        group.add(pathMesh);

        // İç mesh kaldırıldı: LOD karmaşıklığı ve gereksiz draw call azaltımı.

        // Kenar çizgileri - daha ince ve yumuşak
        const edgesGeometry = new THREE.EdgesGeometry(pathGeometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ 
            color: new THREE.Color(color).multiplyScalar(0.5),
            opacity: 0.6,
            transparent: true,
            linewidth: 1
        });
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        group.add(edges);

        // Tip-spesifik eklemeler
        if (type === 'conveyor') {
            this.addConveyorBelt(group, points, width);
        } else if (type === 'rail') {
            this.addRailTracks(group, points, width);
        }

        return group;
    }

    createPathMaterial(color, type) {
        const baseColor = new THREE.Color(color);
        
        switch (type) {
            case 'tunnel':
                return new THREE.MeshPhongMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.9,
                    shininess: 30,
                    specular: 0x444444
                });
            
            case 'road':
                return new THREE.MeshLambertMaterial({
                    color: baseColor.multiplyScalar(0.7),
                    transparent: true,
                    opacity: 0.95
                });
            
            case 'rail':
                return new THREE.MeshPhongMaterial({
                    color: baseColor,
                    metalness: 0.7,
                    roughness: 0.3,
                    transparent: true,
                    opacity: 0.9
                });
            
            case 'conveyor':
                return new THREE.MeshPhongMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.8,
                    shininess: 50,
                    specular: 0x888888
                });
            
            default:
                return new THREE.MeshLambertMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.9
                });
        }
    }

    createTubeGeometry(points, width, height, options = {}) {
        if (points.length < 2) return new THREE.BoxGeometry(1, 1, 1);

        // İyileştirilmiş curve sistemi
        const curve = new THREE.CatmullRomCurve3(points);
        curve.tension = 0.2; // Daha düzgün geçişler
        
        // Adaptif segment hesaplama
        const base = Math.max(points.length * 6, 24);
        let tubularSegments = base;
        if (options.quality === 'low') {
            tubularSegments = Math.max(Math.floor(base * 0.35), 8);
        }
        // Üst limit clamp (performans koruması)
        tubularSegments = Math.min(tubularSegments, 360);
        const radialSegments = options.quality === 'low' ? 8 : 16;
        
        // Temel tüp geometrisi
        const tubeGeometry = new THREE.TubeGeometry(
            curve, 
            tubularSegments, 
            Math.max(width, height) / 2, 
            radialSegments, 
            false
        );
        
        // Gerçekçi tünel kesiti için eliptik şekillendirme
        const positions = tubeGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // Center'dan uzaklık
            const distance = Math.sqrt(x * x + z * z);
            if (distance > 0) {
                const angle = Math.atan2(z, x);
                
                // Eliptik tünel kesiti (genişlik > yükseklik)
                const ellipseRadius = (width * height) / Math.sqrt(
                    (height * Math.cos(angle)) ** 2 + (width * Math.sin(angle)) ** 2
                );
                const scale = ellipseRadius / (Math.max(width, height) / 2);
                
                positions[i] = x * scale;
                positions[i + 2] = z * scale;
                
                // Y ekseni için hafif düzleştirme (tünel tabanı)
                if (y < 0) {
                    positions[i + 1] = y * 0.8; // Tabanı hafif düzleştir
                }
            }
        }
        
        tubeGeometry.attributes.position.needsUpdate = true;
        tubeGeometry.computeVertexNormals();
        
        return tubeGeometry;
    }

    updateLOD() {
        // Her frame değil, her 10 frame'de bir kontrol
        this._lodFrame++;
        if (this._lodFrame % 10 !== 0) return;
        for (const [, group] of this.paths) {
            if (!group) continue;
            // İlk child ana mesh varsayılır
            const mesh = group.children.find(c => c.isMesh);
            if (!mesh || !mesh.userData.highGeometry) continue;
            // Dünya merkezini hesapla (bounding sphere yoksa oluştur)
            if (!mesh.userData._bs) {
                mesh.userData.highGeometry.computeBoundingSphere();
                mesh.userData._bs = mesh.userData.highGeometry.boundingSphere.clone();
            }
            const center = mesh.userData._bs.center.clone();
            group.localToWorld(center);
            const dist = center.distanceTo(this.camera.position);
            const desired = dist > 180 ? 'low' : 'high';
            if (desired !== mesh.userData.lodState) {
                if (desired === 'low') {
                    mesh.geometry = mesh.userData.lowGeometry;
                    mesh.userData.lodState = 'low';
                } else {
                    mesh.geometry = mesh.userData.highGeometry;
                    mesh.userData.lodState = 'high';
                }
            }
        }
    }

    addConveyorBelt(group, points, width) {
        // Konveyör bandı efekti
        const curve = new THREE.CatmullRomCurve3(points);
        const beltGeometry = new THREE.TubeGeometry(curve, points.length * 2, width / 3, 8, false);
        const beltMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        
        const belt = new THREE.Mesh(beltGeometry, beltMaterial);
        belt.position.y += 0.1; // Tünelin üstünde
        group.add(belt);
    }

    addRailTracks(group, points, width) {
        // Ray izi efekti
        const curve = new THREE.CatmullRomCurve3(points);
        
        // Sol ray
        const leftRailGeometry = new THREE.TubeGeometry(curve, points.length * 4, 0.05, 6, false);
        const railMaterial = new THREE.MeshPhongMaterial({
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const leftRail = new THREE.Mesh(leftRailGeometry, railMaterial.clone());
        leftRail.position.x -= width / 3;
        leftRail.position.y += 0.05;
        group.add(leftRail);
        
        // Sağ ray
        const rightRail = new THREE.Mesh(leftRailGeometry.clone(), railMaterial.clone());
        rightRail.position.x += width / 3;
        rightRail.position.y += 0.05;
        group.add(rightRail);
    }

    removePath(id) {
        const path = this.paths.get(id);
        if (path) {
            this.scene.remove(path);
            path.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
            this.paths.delete(id);
            console.log(`[MinePathDrawer] Yol silindi: ${id}`);
        }
    }

    clearAllPaths() {
        for (const [id, path] of this.paths) {
            this.removePath(id);
        }
        console.log('[MinePathDrawer] Tüm yollar silindi');
    }

    getPath(id) {
        return this.paths.get(id);
    }

    getAllPaths() {
        return Array.from(this.paths.values());
    }

    calculatePathLength(points) {
        if (!points || points.length < 2) return 0;

        let totalLength = 0;
        for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dz = p2.z - p1.z;
            
            totalLength += Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        return totalLength;
    }
    
    // Tunnel constraint metodları
    enableTunnelConstraint(tunnelObject) {
        this.tunnelConstraintMode = true;
        this.constraintTunnel = tunnelObject;
        console.log('[MinePathDrawer] Tunnel constraint mode enabled');
    }
    
    disableTunnelConstraint() {
        this.tunnelConstraintMode = false;
        this.constraintTunnel = null;
        console.log('[MinePathDrawer] Tunnel constraint mode disabled');
    }

    // Real-time Preview Metodları
    updatePreview(point) {
        if (!this.isDrawing || this.currentPath.length === 0) return;
        
        const previewPoints = [...this.currentPath, point];
        this.createPreviewMesh(previewPoints);
        this.updateDistanceLabel(point);
    }

    createPreviewMesh(points) {
        this.removePreviewMesh();
        
        if (points.length < 2) return;

        // Tip-based preview geometry
        let previewGeometry;
        let previewMaterial;
        
        switch (this.currentDrawingType) {
            case 'tunnel':
                previewGeometry = this.createTubeGeometry(points, 2.5, 2.5);
                previewMaterial = new THREE.MeshBasicMaterial({
                    color: 0x666666,
                    transparent: true,
                    opacity: 0.3,
                    wireframe: true
                });
                break;
            case 'road':
                previewGeometry = this.createRoadGeometry(points, 3.0);
                previewMaterial = new THREE.MeshBasicMaterial({
                    color: 0x333333,
                    transparent: true,
                    opacity: 0.4
                });
                break;
            case 'rail':
                previewGeometry = this.createRailGeometry(points, 1.5);
                previewMaterial = new THREE.MeshBasicMaterial({
                    color: 0x666666,
                    transparent: true,
                    opacity: 0.5
                });
                break;
            case 'conveyor':
                previewGeometry = this.createConveyorGeometry(points, 1.0);
                previewMaterial = new THREE.MeshBasicMaterial({
                    color: 0x444444,
                    transparent: true,
                    opacity: 0.4
                });
                break;
            default:
                previewGeometry = new THREE.BufferGeometry().setFromPoints(points);
                previewMaterial = new THREE.LineBasicMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 0.7
                });
        }

        if (this.currentDrawingType === 'tunnel' || this.currentDrawingType === 'road' || 
            this.currentDrawingType === 'rail' || this.currentDrawingType === 'conveyor') {
            this.previewMesh = new THREE.Mesh(previewGeometry, previewMaterial);
        } else {
            this.previewMesh = new THREE.Line(previewGeometry, previewMaterial);
        }

        this.scene.add(this.previewMesh);
    }

    removePreviewMesh() {
        if (this.previewMesh) {
            this.scene.remove(this.previewMesh);
            if (this.previewMesh.geometry) this.previewMesh.geometry.dispose();
            if (this.previewMesh.material) this.previewMesh.material.dispose();
            this.previewMesh = null;
        }
    }

    updateDistanceLabel(currentPoint) {
        if (this.currentPath.length === 0) return;
        
        const lastPoint = this.currentPath[this.currentPath.length - 1];
        const distance = lastPoint.distanceTo(currentPoint);
        
        // UI'da distance'ı göster
        this.updateDistanceDisplay(distance);
    }

    updateDistanceDisplay(distance) {
        const distanceDisplay = document.getElementById('distance-display');
        const distanceValue = document.getElementById('distance-value');
        
        if (distanceDisplay && distanceValue) {
            distanceDisplay.style.display = 'block';
            distanceValue.textContent = `${distance.toFixed(1)}m`;
        }
    }

    removeDistanceLabel() {
        const distanceDisplay = document.getElementById('distance-display');
        if (distanceDisplay) {
            distanceDisplay.style.display = 'none';
        }
    }

    // Geometry creation helpers
    createRoadGeometry(points, width) {
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, points.length * 2, width / 2, 8, false);
    }

    createRailGeometry(points, width) {
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, points.length * 2, 0.1, 6, false);
    }

    createConveyorGeometry(points, width) {
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, points.length * 2, width / 2, 6, false);
    }
}

// Path düzenleme (nokta handle sürükleme) için yardımcı sınıf
class MinePathEditor {
    constructor(scene, camera, renderer, pathDrawer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.pathDrawer = pathDrawer; // Mevcut MinePathDrawer referansı
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.isEditing = false;
        this.activePath = null; // THREE.Group (createPath sonucu)
        this.handles = []; // {mesh, index}
        this.draggingHandle = null;
        this.dragPlane = new THREE.Plane(new THREE.Vector3(0,1,0), 0); // Varsayılan yatay düzlem
        this.offset = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        this.callbacks = { onPointChange: null, onEditStart: null, onEditEnd: null };
        // Undo/Redo yığınları
        this.undoStack = [];
        this.redoStack = [];
        this.maxHistory = 50;
    }

    setCallbacks(callbacks) { this.callbacks = { ...this.callbacks, ...callbacks }; }

    startEditing(pathGroup) {
        if (!pathGroup || !pathGroup.userData || !pathGroup.userData.pathData) return;
        this.stopEditing();
        this.isEditing = true;
        this.activePath = pathGroup;
        // İlk snapshot kaydet
        const data = pathGroup.userData.pathData;
        const pts = (data.points || data.path_points || []).map(p=>({...p}));
        this.undoStack = [pts];
        this.redoStack = [];
        this.buildHandles();
        if (this.callbacks.onEditStart) this.callbacks.onEditStart(pathGroup);
        const btn = document.getElementById('save-path-btn');
        if (btn) btn.disabled = false;
    }

    stopEditing() {
        this.clearHandles();
        this.isEditing = false;
        this.activePath = null;
        this.draggingHandle = null;
        if (this.callbacks.onEditEnd) this.callbacks.onEditEnd();
        const btn = document.getElementById('save-path-btn');
        if (btn) btn.disabled = true;
    }

    buildHandles() {
        this.clearHandles();
        const data = this.activePath.userData.pathData;
        const points = data.points || data.path_points || [];
        const handleGeom = new THREE.SphereGeometry(0.6, 12, 12);
        const handleMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        points.forEach((p, idx) => {
            const m = new THREE.Mesh(handleGeom.clone(), handleMat.clone());
            m.position.set(p.x, p.y, p.z);
            m.userData.isPathHandle = true;
            m.userData.pointIndex = idx;
            this.scene.add(m);
            this.handles.push({ mesh: m, index: idx });
        });
    }

    clearHandles() {
        this.handles.forEach(h => { this.scene.remove(h.mesh); h.mesh.geometry.dispose(); h.mesh.material.dispose(); });
        this.handles = [];
    }

    updateMouse(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    pointerDown(event) {
        if (!this.isEditing) return;
        this.updateMouse(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.handles.map(h => h.mesh), true);
        if (intersects.length > 0) {
            const handleMesh = intersects[0].object;
            this.draggingHandle = this.handles.find(h => h.mesh === handleMesh);
            // Drag planını handle pozisyonuna hizala (yatay)
            this.dragPlane.set(new THREE.Vector3(0,1,0), -handleMesh.position.y);
        }
    }

    pointerMove(event) {
        if (!this.isEditing || !this.draggingHandle) return;
        this.updateMouse(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const planeIntersect = new THREE.Vector3();
        if (this.raycaster.ray.intersectPlane(this.dragPlane, planeIntersect)) {
            const handle = this.draggingHandle;
            planeIntersect.y = -2.5;
            handle.mesh.position.copy(planeIntersect);
            // Sadece görsel güncelleme & geçici rebuild (history push yok)
            this.applyHandlePosition(handle.index, planeIntersect, { skipHistory: true, skipDirty: true });
        }
    }

    pointerUp() {
        if (!this.isEditing) return;
        if (this.draggingHandle) {
            // Drag tamamlandı -> final snapshot & dirty işaretleme + tek seferlik save
            const data = this.activePath?.userData.pathData;
            if (data && data.points) {
                this.pushHistory(data.points);
                if (this.viewer) {
                    this.viewer.markPathDirty(data.id || data.path_id || this.activePath.userData.id);
                }
            }
        }
        this.draggingHandle = null;
    }

    applyHandlePosition(index, newPos, opts = {}) {
        if (!this.activePath) return;
        const data = this.activePath.userData.pathData;
        const points = data.points || data.path_points || [];
        if (!points[index]) return;
        points[index] = { x: newPos.x, y: newPos.y, z: newPos.z };
        // Geometry rebuild (simplification ile)
    const mult = (this.viewer && this.viewer.pathSimplifyMultiplier) ? this.viewer.pathSimplifyMultiplier : 1.0;
    const adaptiveTol = computeAdaptiveTolerance(points, mult);
    const simplified = simplifyPath(points, adaptiveTol);
        this.rebuildPath(simplified, data);
        // Callback'e sadeleştirilmiş nokta listesini gönder (tutarlılık)
        if (this.callbacks.onPointChange) this.callbacks.onPointChange(simplified, data);
        if (!opts.skipHistory) this.pushHistory(simplified);
        if (!opts.skipDirty && this.viewer) this.viewer.markPathDirty(data.id || data.path_id || this.activePath.userData.id);
    }

    pushHistory(points) {
        const clone = points.map(p=>({...p}));
        const last = this.undoStack[this.undoStack.length-1];
        if (last && last.length === clone.length && last.every((p,i)=>p.x===clone[i].x && p.y===clone[i].y && p.z===clone[i].z)) return; // no change
        this.undoStack.push(clone);
        if (this.undoStack.length > this.maxHistory) this.undoStack.shift();
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length <= 1) return;
        const current = this.undoStack.pop();
        this.redoStack.push(current);
        const prev = this.undoStack[this.undoStack.length-1];
        this.applyHistoryState(prev);
    }

    redo() {
        if (this.redoStack.length === 0) return;
        const next = this.redoStack.pop();
        this.undoStack.push(next);
        this.applyHistoryState(next);
    }

    applyHistoryState(points) {
        if (!this.activePath) return;
        const data = this.activePath.userData.pathData;
        this.rebuildPath(points, data);
        if (this.callbacks.onPointChange) this.callbacks.onPointChange(points, data);
        this.clearHandles();
        this.buildHandles();
    }

    rebuildPath(points, data) {
        // Eski meshleri kaldır
        const group = this.activePath;
        const oldChildren = [...group.children];
        oldChildren.forEach(ch => {
            group.remove(ch);
            if (ch.geometry) ch.geometry.dispose();
            // LOD geometrileri userData'da tutuluyorsa temizle
            if (ch.userData) {
                if (ch.userData.lowGeometry && ch.userData.lowGeometry !== ch.geometry) {
                    ch.userData.lowGeometry.dispose();
                    ch.userData.lowGeometry = null;
                }
                if (ch.userData.highGeometry && ch.userData.highGeometry !== ch.geometry) {
                    // highGeometry zaten ch.geometry ise yukarıda dispose edildi
                    if (ch.userData.highGeometry !== ch.geometry) ch.userData.highGeometry.dispose();
                    ch.userData.highGeometry = null;
                }
            }
            if (ch.material) {
                if (Array.isArray(ch.material)) ch.material.forEach(m => m.dispose()); else ch.material.dispose();
            }
        });
        // Güncel data ile yeni geometri
        const width = data.width || 2.5;
        const height = data.height || 2.5;
        const color = data.color || '#808080';
        const type = data.type || 'tunnel';
        const newGroup = this.pathDrawer.createPathMesh(points.map(p=> new THREE.Vector3(p.x,p.y,p.z)), width, height, color, type);
        // newGroup children'larını aktif gruba taşı
        newGroup.children.forEach(nc => group.add(nc));
        // userData güncel kalsın
        data.points = points;
        data.path_points = points; // backend alanı
        // Handle sayısı simplification sonrası değişmiş olabilir, yeniden oluştur
        this.clearHandles();
        this.buildHandles();
        // LOD bounding sphere reset (yeni geometri ile)
        group.traverse(ch => { if (ch.userData && ch.userData._bs) ch.userData._bs = null; });
    }
}

// Douglas-Peucker basit implementasyon (3D)
function simplifyPath(points, tolerance) {
    if (!points || points.length < 3) return points;
    const sqTol = tolerance * tolerance;
    function getSqDist(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        return dx*dx + dy*dy + dz*dz;
    }
    function getSqSegDist(p, p1, p2) {
        let x = p1.x, y = p1.y, z = p1.z;
        let dx = p2.x - x, dy = p2.y - y, dz = p2.z - z;
        if (dx !== 0 || dy !== 0 || dz !== 0) {
            let t = ((p.x - x) * dx + (p.y - y) * dy + (p.z - z) * dz) / (dx*dx + dy*dy + dz*dz);
            if (t > 1) { x = p2.x; y = p2.y; z = p2.z; }
            else if (t > 0) { x += dx * t; y += dy * t; z += dz * t; }
        }
        dx = p.x - x; dy = p.y - y; dz = p.z - z;
        return dx*dx + dy*dy + dz*dz;
    }
    function simplifyDP(points, first, last, sqTol, simplified) {
        let maxSqDist = sqTol;
        let index = -1;
        for (let i = first + 1; i < last; i++) {
            const sqDist = getSqSegDist(points[i], points[first], points[last]);
            if (sqDist > maxSqDist) { index = i; maxSqDist = sqDist; }
        }
        if (maxSqDist > sqTol && index !== -1) {
            if (index - first > 1) simplifyDP(points, first, index, sqTol, simplified);
            simplified.push(points[index]);
            if (last - index > 1) simplifyDP(points, index, last, sqTol, simplified);
        }
    }
    const simplified = [points[0]];
    simplifyDP(points, 0, points.length - 1, sqTol, simplified);
    simplified.push(points[points.length - 1]);
    return simplified;
}

// Adaptif tolerans hesaplama: uzunluk + eğrilik
function computeAdaptiveTolerance(points, multiplier = 1.0) {
    if (!points || points.length < 3) {
        return 0.05 * multiplier; // küçük pathler için düşük tolerans
    }
    // Toplam uzunluk
    let length = 0;
    for (let i=1;i<points.length;i++) {
        const dx = points[i].x - points[i-1].x;
        const dy = points[i].y - points[i-1].y;
        const dz = points[i].z - points[i-1].z;
        length += Math.sqrt(dx*dx+dy*dy+dz*dz);
    }
    // Ortalama eğrilik (üçlü segment açıları)
    let curvatureSum = 0; let curvatureCount = 0;
    for (let i=1;i<points.length-1;i++) {
        const p0 = points[i-1], p1 = points[i], p2 = points[i+1];
        const v1x = p1.x - p0.x, v1y = p1.y - p0.y, v1z = p1.z - p0.z;
        const v2x = p2.x - p1.x, v2y = p2.y - p1.y, v2z = p2.z - p1.z;
        const d1 = Math.sqrt(v1x*v1x+v1y*v1y+v1z*v1z) + 1e-6;
        const d2 = Math.sqrt(v2x*v2x+v2y*v2y+v2z*v2z) + 1e-6;
        const dot = (v1x*v2x+v1y*v2y+v1z*v2z)/(d1*d2);
        const angle = Math.acos(Math.min(1, Math.max(-1, dot))); // 0..PI
        curvatureSum += angle;
        curvatureCount++;
    }
    const avgCurv = curvatureCount ? curvatureSum / curvatureCount : 0;
    // Temel tolerans formülü:
    // Daha uzun ve düşük eğrilik => daha yüksek tolerans
    // Kısa ve kıvrımlı => düşük tolerans
    const lengthFactor = Math.min(1, length / 500); // 0..1
    const curvatureFactor = 1 - Math.min(1, avgCurv / 0.8); // yüksek eğrilik -> küçük katsayı
    const base = 0.05 + (0.4 * lengthFactor * curvatureFactor); // 0.05 .. ~0.45
    const adjusted = base * multiplier;
    return Math.min(1.0, Math.max(0.02, adjusted));
}

// Obje seçimi ve düzenleme için yardımcı sınıf
class ObjectSelector {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    this.selectedObject = null;
    this.multiSelect = true;
    this.selectedObjects = new Set();
        this.selectableObjects = new Set();
        this.highlightMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff4444, 
            transparent: true, 
            opacity: 0.3,
            depthTest: false
        });
        this.outlineColor = 0xff0000;
        
        // X-Ray mode için
        this.xrayModeObject = null;
        this.originalMaterials = new Map();
        
        this.callbacks = {
            onObjectSelect: null,
            onObjectDeselect: null,
            onObjectDelete: null
        };
    }

    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    addSelectableObject(object, data = {}) {
        object.userData.selectable = true;
        object.userData.objectData = data;
        this.selectableObjects.add(object);
    }

    removeSelectableObject(object) {
        this.selectableObjects.delete(object);
        if (this.selectedObject === object) {
            this.deselectObject();
        }
    }

    handleClick(event) {
        this.updateMousePosition(event);
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const selectableArray = Array.from(this.selectableObjects);
        const intersects = this.raycaster.intersectObjects(selectableArray, true);

        if (intersects.length > 0) {
            // En yakın selectable objeyi bul
            let targetObject = null;
            for (const intersect of intersects) {
                let obj = intersect.object;
                while (obj && !obj.userData.selectable) {
                    obj = obj.parent;
                }
                if (obj && this.selectableObjects.has(obj)) {
                    targetObject = obj;
                    break;
                }
            }

            if (targetObject) {
                const isShift = event.shiftKey;
                if (this.multiSelect && isShift) {
                    if (this.selectedObjects.has(targetObject)) {
                        this.deselectObject(targetObject);
                    } else {
                        this.addToSelection(targetObject);
                    }
                } else {
                    this.clearMultiSelection();
                    this.selectObject(targetObject);
                }
            }
        } else {
            this.clearMultiSelection();
            this.deselectObject();
        }
    }

    updateMousePosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    selectObject(object) {
        if (this.selectedObject === object) {
            // Aynı objeye tekrar tıklandı - X-Ray mode toggle
            if (object.userData.objectData && object.userData.objectData.pathType === 'tunnel') {
                this.toggleXRayMode(object);
            }
            return;
        }

        this.deselectObject();
        this.selectedObject = object;
        this.selectedObjects.add(object);
        
        // Highlight efekti ekle
        this.addHighlight(object);
        
        // Tunnel ise X-Ray mode aktifleştir
        if (object.userData.objectData && object.userData.objectData.pathType === 'tunnel') {
            this.enableXRayMode(object);
        }
        
        if (this.callbacks.onObjectSelect) {
            this.callbacks.onObjectSelect(object, object.userData.objectData);
        }
    }

    deselectObject() {
        if (this.selectedObject) {
            this.removeHighlight(this.selectedObject);
            
            // X-Ray mode'u kapat
            this.disableXRayMode();
            
            if (this.callbacks.onObjectDeselect) {
                this.callbacks.onObjectDeselect(this.selectedObject);
            }
            
            this.selectedObject = null;
        }
    }

    deleteSelectedObject() {
        if (this.selectedObject) {
            const objectToDelete = this.selectedObject;
            this.deselectObject();
            
            if (this.callbacks.onObjectDelete) {
                this.callbacks.onObjectDelete(objectToDelete);
            }
        }
    }

    addHighlight(object) {
        // Outline efekti için edge geometry oluştur
        object.traverse((child) => {
            if (child.isMesh && child.geometry) {
                const edges = new THREE.EdgesGeometry(child.geometry);
                const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
                    color: this.outlineColor,
                    linewidth: 3
                }));
                outline.name = 'highlight_outline';
                child.add(outline);
            }
        });
    }

    removeHighlight(object) {
        object.traverse((child) => {
            const outline = child.getObjectByName('highlight_outline');
            if (outline) {
                child.remove(outline);
                outline.geometry.dispose();
                outline.material.dispose();
            }
        });
    }

    deselectObject(obj=null) {
        if (obj) {
            this.removeHighlight(obj);
            if (this.xrayModeObject === obj) this.disableXRayMode();
            this.selectedObjects.delete(obj);
            if (this.selectedObject === obj) this.selectedObject = null;
            if (this.callbacks.onObjectDeselect) this.callbacks.onObjectDeselect(obj);
            return;
        }
        if (this.selectedObject) {
            this.removeHighlight(this.selectedObject);
            if (this.xrayModeObject === this.selectedObject) this.disableXRayMode();
            if (this.callbacks.onObjectDeselect) this.callbacks.onObjectDeselect(this.selectedObject);
        }
        this.selectedObject = null;
        this.selectedObjects.clear();
    }

    addToSelection(object) {
        if (!this.selectedObjects.has(object)) {
            this.selectedObjects.add(object);
            this.addHighlight(object);
            if (this.callbacks.onObjectSelect) this.callbacks.onObjectSelect(object, object.userData.objectData);
        }
    }

    clearMultiSelection() {
        if (this.selectedObjects.size > 1) {
            for (const obj of this.selectedObjects) {
                if (obj !== this.selectedObject) this.removeHighlight(obj);
            }
            this.selectedObjects = this.selectedObject ? new Set([this.selectedObject]) : new Set();
        }
    }
    enableXRayMode(object) {
        if (this.xrayModeObject === object) return; // zaten aktif
        this.disableXRayMode();
        this.xrayModeObject = object;
        object.traverse(child => {
            if (child.isMesh) {
                this.originalMaterials.set(child, child.material.clone());
                const xrayMaterial = child.material.clone();
                xrayMaterial.transparent = true;
                xrayMaterial.opacity = 0.3;
                xrayMaterial.side = THREE.DoubleSide;
                child.material = xrayMaterial;
            }
        });
        console.log('[ObjectSelector] X-Ray mode enabled for tunnel');
    }

    disableXRayMode() {
        if (!this.xrayModeObject) return;
        
        // Orijinal materyalleri geri yükle
        this.xrayModeObject.traverse((child) => {
            if (child.isMesh && this.originalMaterials.has(child)) {
                child.material.dispose();
                child.material = this.originalMaterials.get(child);
                this.originalMaterials.delete(child);
            }
        });
        
        this.xrayModeObject = null;
        console.log('[ObjectSelector] X-Ray mode disabled');
    }

    toggleXRayMode(object) {
        if (this.xrayModeObject === object) {
            this.disableXRayMode();
        } else {
            this.enableXRayMode(object);
        }
    }
}

class SimpleMine3DViewer {
    constructor(containerId, mineId, options = {}) {
        console.log(`%c[SimpleMine3DViewer] Constructor called`, 'color: blue; font-weight: bold;');
        console.log('[SimpleMine3DViewer] Parameters:', { containerId, mineId, options });
        
        this.containerId = containerId;
        this.mineId = mineId;
        this.container = document.getElementById(containerId);
        this.options = {
            enableWebGL2: true,
            enableCollisionDetection: true,
            enableAdvancedShaders: true,
            debugCollisions: false,
            debugPerformance: false,
            ...options
        };
        
        console.log('[SimpleMine3DViewer] Container element:', this.container);
        
        if (!this.container) {
            const error = `Container with id "${containerId}" not found`;
            console.error('[SimpleMine3DViewer]', error);
            throw new Error(error);
        }

        console.log('[SimpleMine3DViewer] THREE.js (ESM) version:', THREE.REVISION);

        // Core 3D components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // Enhanced components
        this.webgl2Renderer = null;
        this.collisionSystem = null;
        this.shaderManager = null;
        this.performanceMonitor = null;
        
        // Tool components
        this.pathDrawer = null;
        this.pathEditor = null; // Path düzenleme
        this.objectCreator = null; // Yeni oluşturucu
        this.transformControls = null; // Drag & Drop için
        
        // State management
        this.isPathDrawingMode = false;
        this.isCreatingMode = false; // Yeni mod
        this.selectedObject = null;
        this.objectSelector = null;
        
        console.log('[SimpleMine3DViewer] Starting initialization...');
        // Dirty tracking
        this._dirtyPaths = new Set();
        this._dirtyIndicatorEl = null;
        // Ölçüm çizgileri durumu
        this.measurementsEnabled = true;
        this.measurementStep = 5; // metre aralığı (dinamik)
        this._lastMeasuredTunnel = null;
        // Auto-save ayarları
        this.autoSaveSelection = true;
        this.autoSaveDelay = 800; // ms
        this._autoSaveTimer = null;
        this._autoSaveInFlight = false;
        this.init();
    }

    // --- Selection Detail Card Helpers ---
    _getSelEls() {
        if (!this._selCache) {
            this._selCache = {
                card: document.getElementById('selection-detail-card'),
                title: document.getElementById('sel-title'),
                meta: document.getElementById('sel-meta'),
                dyn: document.getElementById('sel-dynamic-fields'),
                gen: document.getElementById('sel-generic-fields'),
                status: document.getElementById('sel-status'),
                saveBtn: document.getElementById('sel-save-btn'),
                deleteBtn: document.getElementById('sel-delete-btn'),
                closeBtn: document.getElementById('sel-close-btn')
            };
            if (this._selCache.closeBtn) {
                this._selCache.closeBtn.addEventListener('click', ()=> this.hideSelectionCard());
            }
            if (this._selCache.deleteBtn) {
                this._selCache.deleteBtn.addEventListener('click', ()=> {
                    if (this.selectedObject) {
                        if (confirm('Seçili nesneyi silmek istiyor musunuz?')) {
                            // Path veya model ayrımı
                            const data = this.selectedObject.userData.objectData || this.selectedObject.userData;
                            if (data && data.type === 'path') {
                                this.objectSelector?.deleteSelectedObject();
                            } else {
                                this.deleteSelectedObject();
                            }
                        }
                    }
                });
            }
            if (this._selCache.saveBtn) {
                this._selCache.saveBtn.addEventListener('click', ()=> this.saveSelectionEdits());
            }
        }
        return this._selCache;
    }

    showSelectionCard(object, meta) {
        const els = this._getSelEls();
        if (!els.card) return;
        els.card.style.display = 'block';
        this.populateSelectionCard(object, meta);
    }

    hideSelectionCard() {
        const els = this._getSelEls();
        if (els.card) els.card.style.display = 'none';
    }

    markSelectionDirty(dirty=true) {
        const els = this._getSelEls();
        if (!els.saveBtn) return;
        if (dirty) {
            els.saveBtn.disabled = false;
            els.saveBtn.classList.add('btn-warning');
            // Otomatik kaydet aktifse debounce et
            if (this.autoSaveSelection) {
                clearTimeout(this._autoSaveTimer);
                this._autoSaveTimer = setTimeout(async () => {
                    if (this._autoSaveInFlight) return; // re-entrancy guard
                    this._autoSaveInFlight = true;
                    try {
                        await this.saveSelectionEdits();
                    } catch (e) {
                        console.warn('[AutoSave] Selection auto-save failed:', e.message);
                    } finally {
                        this._autoSaveInFlight = false;
                    }
                }, this.autoSaveDelay);
            }
        } else {
            els.saveBtn.disabled = true;
            els.saveBtn.classList.remove('btn-warning');
        }
    }

    populateSelectionCard(object, meta) {
        const els = this._getSelEls();
        if (!els.card) return;
        meta = meta || (object?.userData?.objectData) || object?.userData || {};
        const isPath = meta.type === 'path';
        const isTunnelModel = meta.type === 'tunnel' || meta.pathType === 'tunnel';
        // Başlık
        if (els.title) {
            els.title.innerHTML = `<i class="fas fa-cube me-1"></i>${meta.name || 'Obje'}${isPath ? ' <span class=\"badge bg-info ms-1\">Path</span>' : ''}`;
        }
        // Meta
        if (els.meta) {
            els.meta.innerHTML = `ID: <span class="text-light">${meta.id ?? '-'}</span> · Tip: <span class="text-light">${meta.pathType || meta.type || '-'}</span>`;
        }
        // Dinamik alanlar
        if (els.dyn) {
            let html = '';
            if (isPath) {
                html += this._buildNumberField('Genişlik (m)', 'sel-width', meta.width, 0.1, 100, 0.1);
                html += this._buildNumberField('Yükseklik (m)', 'sel-height', meta.height, 0.1, 100, 0.1);
                html += `<div class="mb-2"><label class="form-label mb-1">Segment Sayısı</label><div class="form-control form-control-sm bg-dark text-light">${(meta.points||[]).length}</div></div>`;
                html += `<div class="mb-2"><label class="form-label mb-1">Uzunluk</label><div class="form-control form-control-sm bg-dark text-light">${(meta.length||0).toFixed(2)} m</div></div>`;
                html += this._buildColorField('Renk', 'sel-color', meta.color || '#808080');
            } else if (isTunnelModel && object?.userData?.parameters) {
                const p = object.userData.parameters;
                html += this._buildNumberField('Genişlik (m)', 'sel-width', p.width, 0.5, 50, 0.1);
                html += this._buildNumberField('Yükseklik (m)', 'sel-height', p.height, 0.5, 50, 0.1);
                html += this._buildNumberField('Uzunluk (m)', 'sel-length', p.length, 1, 10000, 0.5);
                html += this._buildSelectField('Yön', 'sel-orientation', ['yatay','dikey'], p.orientation);
                html += this._buildNumberField('Açı (°)', 'sel-angle', p.angle||0, 0, 360, 1);
                html += this._buildColorField('Renk', 'sel-color', meta.color || '#808080');
                html += this._buildNumberField('Ölçüm Adımı (m)', 'sel-meas-step', this.measurementStep, 1, 100, 1);
            } else {
                html += `<div class="text-muted small">Bu obje için düzenlenebilir alan yok.</div>`;
            }
            els.dyn.innerHTML = html;
        }
        // Genel alanlar
        if (els.gen) {
            els.gen.innerHTML = `<div class="mb-2"><label class="form-label mb-1">Pozisyon</label><div class="form-control form-control-sm bg-dark text-light">${object.position.x.toFixed(2)}, ${object.position.y.toFixed(2)}, ${object.position.z.toFixed(2)}</div></div>`;
        }
        // Event binding (change -> dirty)
        ['sel-width','sel-height','sel-length','sel-angle','sel-orientation','sel-color'].forEach(id=>{
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', ()=> {
                this.markSelectionDirty(true);
                this._liveSelectionChange(id);
            });
        });
        const stepEl = document.getElementById('sel-meas-step');
        if (stepEl) {
            stepEl.addEventListener('input', ()=> {
                const v = parseInt(stepEl.value,10);
                if (!isNaN(v) && v>0) {
                    this.measurementStep = v;
                    if (isTunnelModel) this.buildTunnelMeasurements(object, meta);
                }
            });
        }
        this.markSelectionDirty(false);
        if (els.status) els.status.textContent='';
    }

    _liveSelectionChange(changedId) {
        if (!this.selectedObject) return;
        const meta = (this.selectedObject.userData && (this.selectedObject.userData.objectData || this.selectedObject.userData)) || {};
        const isPath = meta.type === 'path';
        const isTunnelModel = meta.type === 'tunnel' || meta.pathType === 'tunnel';

        // Canlı görsel güncelleme (persist ETME) – sadece lokal state.
        if (isPath) {
            const pathGroup = this.selectedObject; // group veya mesh olabilir
            const widthEl = document.getElementById('sel-width');
            const heightEl = document.getElementById('sel-height');
            const colorEl = document.getElementById('sel-color');
            const width = parseFloat(widthEl?.value);
            const height = parseFloat(heightEl?.value);
            const color = colorEl?.value;
            const data = pathGroup.userData.objectData || meta;
            let dirty = false;
            if (!isNaN(width) && width > 0 && width !== data.width) { data.width = width; dirty = true; }
            if (!isNaN(height) && height > 0 && height !== data.height) { data.height = height; dirty = true; }
            if (color && color !== data.color) { data.color = color; dirty = true; }
            if (dirty) {
                // Rebuild geometry (pathDrawer.createPathMesh kullanımı için orijinal noktalar gerekli)
                const points = (data.points || data.path_points || []).map(p=> new THREE.Vector3(p.x,p.y,p.z));
                if (points.length >= 2 && this.pathDrawer) {
                    // Eski çocukları sil ve yeni meshleri ekle (edit sırasında PathEditor zaten rebuild yapıyor olabilir)
                    const widthVal = data.width || 2.5;
                    const heightVal = data.height || 2.5;
                    const colorVal = data.color || '#808080';
                    const typeVal = data.pathType || data.type || 'tunnel';
                    // Aktif path editor devredeyse onun rebuild mekanizmasıyla çakışmayı önlemek için guard
                    if (!(this.pathEditor && this.pathEditor.isEditing && this.pathEditor.activePath === pathGroup)) {
                        // Manuel rebuild
                        while (pathGroup.children.length) {
                            const ch = pathGroup.children.pop();
                            if (ch.geometry) ch.geometry.dispose();
                            if (ch.material) { if (Array.isArray(ch.material)) ch.material.forEach(m=>m.dispose()); else ch.material.dispose(); }
                            pathGroup.remove(ch);
                        }
                        const newGroup = this.pathDrawer.createPathMesh(points, widthVal, heightVal, colorVal, typeVal);
                        newGroup.children.forEach(c=> pathGroup.add(c));
                        data.length = this.pathDrawer.calculatePathLength(points.map(p=>({x:p.x,y:p.y,z:p.z})));
                        // Selection kartındaki uzunluk alanını güncelle
                        const dyn = document.getElementById('sel-dynamic-fields');
                        if (dyn && dyn.innerHTML.includes('Uzunluk')) {
                            const lenMatch = dyn.querySelectorAll('div'); // hızlı basit yaklaşım
                        }
                    }
                }
            }
        } else if (isTunnelModel) {
            const p = { ...(this.selectedObject.userData.parameters || {}) };
            const wEl = document.getElementById('sel-width');
            const hEl = document.getElementById('sel-height');
            const lEl = document.getElementById('sel-length');
            const aEl = document.getElementById('sel-angle');
            const oEl = document.getElementById('sel-orientation');
            const cEl = document.getElementById('sel-color');
            let changed = false;
            let orientationChanged = false;
            if (wEl && !isNaN(parseFloat(wEl.value)) && parseFloat(wEl.value) !== p.width) { p.width = parseFloat(wEl.value); changed = true; }
            if (hEl && !isNaN(parseFloat(hEl.value)) && parseFloat(hEl.value) !== p.height) { p.height = parseFloat(hEl.value); changed = true; }
            if (lEl && !isNaN(parseFloat(lEl.value)) && parseFloat(lEl.value) !== p.length) { p.length = parseFloat(lEl.value); changed = true; }
            if (aEl && !isNaN(parseFloat(aEl.value)) && parseFloat(aEl.value) !== p.angle) { p.angle = parseFloat(aEl.value); changed = true; }
            if (oEl && oEl.value && oEl.value !== p.orientation) { orientationChanged = true; p.orientation = oEl.value; changed = true; }
            if (cEl && cEl.value && this.selectedObject.material && '#' + this.selectedObject.material.color.getHexString() !== cEl.value) {
                this.selectedObject.material.color.set(cEl.value);
            }
            if (changed) {
                this.replaceTunnelGeometry(this.selectedObject, p);
                if (orientationChanged && this.camera && this.controls) {
                    // Basit easing ile yeni eksene göre kamerayı yeniden konumlandır
                    const target = this.selectedObject.position.clone();
                    const radius = this.camera.position.distanceTo(target);
                    // Yeni hedef offset: dikey ise kamerayı hafif eğimli yukardan bakacak konuma al
                    let desired;
                    if (p.orientation === 'dikey' || p.orientation === 'vertical') {
                        desired = new THREE.Vector3(target.x + radius * 0.6, target.y + radius * 0.8, target.z + radius * 0.3);
                    } else {
                        desired = new THREE.Vector3(target.x + radius * 0.6, target.y + radius * 0.3, target.z + radius * 0.8);
                    }
                    const startPos = this.camera.position.clone();
                    const startTime = performance.now();
                    const duration = 650;
                    const animate = (now)=>{
                        const t = Math.min(1, (now - startTime)/duration);
                        const ease = t<0.5 ? 2*t*t : -1+(4-2*t)*t; // easeInOutQuad
                        this.camera.position.lerpVectors(startPos, desired, ease);
                        this.controls.target.lerpVectors(this.controls.target.clone(), target, ease);
                        if (t < 1) requestAnimationFrame(animate);
                        else { this.controls.update(); }
                    };
                    requestAnimationFrame(animate);
                }
            }
        }
    }

    _buildNumberField(label, id, value, min, max, step) {
        if (value == null) value = '';
        return `<div class=\"mb-2\"><label class=\"form-label mb-1\" for=\"${id}\">${label}</label><input type=\"number\" class=\"form-control form-control-sm bg-dark text-light\" id=\"${id}\" value=\"${value}\" min=\"${min}\" max=\"${max}\" step=\"${step}\"></div>`;
    }
    _buildColorField(label, id, value) {
        return `<div class=\"mb-2\"><label class=\"form-label mb-1\" for=\"${id}\">${label}</label><input type=\"color\" class=\"form-control form-control-color form-control-sm p-0 bg-dark border-0\" id=\"${id}\" value=\"${value}\" title=\"Renk seç\"></div>`;
    }
    _buildSelectField(label, id, options, current) {
        // Özel durum: orientation alanını Türkçeleştir
        let translate = (val)=>val;
        if (id === 'sel-orientation') {
            const map = { 'horizontal':'Yatay', 'vertical':'Dikey', 'yatay':'Yatay', 'dikey':'Dikey' };
            translate = (val)=> map[val] || val;
            // Eski kayıtlar horizontal/vertical olabilir; current eşlemesini normalize et
            if (current === 'horizontal') current = 'yatay';
            if (current === 'vertical') current = 'dikey';
            // Options da Türkçeleşsin (value da Türkçe olacak istek gereği)
            options = options.map(o=>{
                if (o === 'horizontal') return 'yatay';
                if (o === 'vertical') return 'dikey';
                return o;
            });
        }
        const opts = options.map(o=>`<option value=\"${o}\" ${o===current?'selected':''}>${translate(o)}</option>`).join('');
        return `<div class=\"mb-2\"><label class=\"form-label mb-1\" for=\"${id}\">${label}</label><select class=\"form-select form-select-sm bg-dark text-light\" id=\"${id}\">${opts}</select></div>`;
    }

    async saveSelectionEdits() {
        const els = this._getSelEls();
        if (!this.selectedObject || !els.saveBtn) return;
        const meta = this.selectedObject.userData.objectData || this.selectedObject.userData || {};
        const isPath = meta.type === 'path';
        try {
            if (isPath) {
                const payload = {};
                const w = parseFloat(document.getElementById('sel-width')?.value);
                const h = parseFloat(document.getElementById('sel-height')?.value);
                const c = document.getElementById('sel-color')?.value;
                if (!isNaN(w)) payload.width = w;
                if (!isNaN(h)) payload.height = h;
                if (c) payload.color = c;
                await this.updatePathToServer(meta.id, payload);
            } else if (meta.type === 'tunnel' || meta.pathType === 'tunnel') {
                // Parametrik tünel model güncelleme (varsayılan server id userData.serverId)
                if (this.selectedObject.userData.serverId) {
                    const p = { ...this.selectedObject.userData.parameters };
                    const w = parseFloat(document.getElementById('sel-width')?.value);
                    const h = parseFloat(document.getElementById('sel-height')?.value);
                    const l = parseFloat(document.getElementById('sel-length')?.value);
                    const a = parseFloat(document.getElementById('sel-angle')?.value);
                    const o = document.getElementById('sel-orientation')?.value;
                    const c = document.getElementById('sel-color')?.value;
                    if (!isNaN(w)) p.width = w;
                    if (!isNaN(h)) p.height = h;
                    if (!isNaN(l)) p.length = l;
                    if (!isNaN(a)) p.angle = a;
                    if (o) p.orientation = o;
                    // Renk local materyale uygula
                    if (c && this.selectedObject.material) this.selectedObject.material.color.set(c);
                    // Geometriyi yenile
                    this.replaceTunnelGeometry(this.selectedObject, p);
                    // Sunucuya gönder (varsayımsal endpoint update geometry.params)
                    await fetch(`/api/mines/${this.mineId}/models/${this.selectedObject.userData.serverId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type':'application/json','Accept':'application/json','X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                        body: JSON.stringify({ geometry: { type: 'tunnel', params: p } })
                    });
                }
            }
            if (els.status) els.status.textContent = 'Kaydedildi';
            this.markSelectionDirty(false);
            
            // Kaydetme başarılı olduğunda düzenleme modundan çık
            setTimeout(() => {
                this.deselectObject(); // Transform controls'ı detach et ve seçimi kaldır
                console.log('[SimpleMine3DViewer] Selection edits saved and object deselected');
            }, 500); // Kullanıcının "Kaydedildi" mesajını görmesi için kısa bir delay
            
        } catch (e) {
            console.error('Selection save error', e);
            if (els.status) { els.status.style.color='#ff6b6b'; els.status.textContent='Kaydetme hatası'; }
        }
    }

    async init() {
        try {
            console.log('%c[SimpleMine3DViewer] Initializing 3D system...', 'color: green; font-weight: bold;');
            
            // Hide loading screen and show 3D container
            const loadingContainer = document.getElementById('loading-container');
            if (loadingContainer) {
                loadingContainer.style.opacity = '0';
                loadingContainer.style.pointerEvents = 'none';
                loadingContainer.style.transition = 'opacity .3s';
                setTimeout(()=>{ if(loadingContainer) loadingContainer.style.display='none'; },350);
            }
            this.container.style.display = 'block';

            // Container size check
            console.log('[SimpleMine3DViewer] Container dimensions:', {
                clientWidth: this.container.clientWidth,
                clientHeight: this.container.clientHeight,
                offsetWidth: this.container.offsetWidth,
                offsetHeight: this.container.offsetHeight
            });
            
            if (this.container.clientWidth === 0 || this.container.clientHeight === 0) {
                console.warn('[SimpleMine3DViewer] Container has zero dimensions, using default sizes');
            }
            
            // Create scene
            console.log('[SimpleMine3DViewer] Creating scene...');
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB);
            console.log('[SimpleMine3DViewer] Scene created:', this.scene);
            
            // Create camera
            console.log('[SimpleMine3DViewer] Creating camera...');
            const aspect = this.container.clientWidth / this.container.clientHeight || 16/9;
            this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 500);
            this.camera.position.set(15, 5, 25);
            this.camera.lookAt(0, -2, 0); // Zemin altına odaklan
            console.log('[SimpleMine3DViewer] Camera created:', {
                fov: this.camera.fov,
                aspect: this.camera.aspect,
                position: this.camera.position,
                near: this.camera.near,
                far: this.camera.far
            });
            
            // Create renderer
            console.log('[SimpleMine3DViewer] Creating renderer...');
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            const width = this.container.clientWidth || 800;
            const height = this.container.clientHeight || 600;
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Gölge sistemini kaldırdık - daha performanslı
            this.renderer.shadowMap.enabled = false;
            
            // Ton mapping ve renk uzayı
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.2;
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
            
            // Performans ayarları
            this.renderer.domElement.style.width = '100%';
            this.renderer.domElement.style.height = '100%';
            this.renderer.domElement.style.display = 'block';
            this.renderer.domElement.style.position = 'relative';
            
            console.log('[SimpleMine3DViewer] Renderer created:', {
                width,
                height,
                shadowMap: this.renderer.shadowMap.enabled,
                toneMapping: this.renderer.toneMapping,
                domElement: this.renderer.domElement
            });
            
            // Append to container
            console.log('[SimpleMine3DViewer] Appending renderer to container...');
            this.container.appendChild(this.renderer.domElement);
            console.log('[SimpleMine3DViewer] Renderer appended successfully');
            
            // Add lights
            console.log('[SimpleMine3DViewer] Adding lights...');
            this.addLights();
            
            // 🚀 Initialize Enhanced WebGL2 Renderer (if enabled)
            if (this.options.enableWebGL2) {
                try {
                    console.log('🚀 Initializing WebGL2 Enhanced Renderer...');
                    this.webgl2Renderer = new WebGL2EnhancedRenderer(this.container, {
                        debug: this.options.debugPerformance,
                        ...this.options
                    });
                    
                    if (this.webgl2Renderer.isWebGL2Supported) {
                        // Replace standard renderer with WebGL2 enhanced version
                        this.container.removeChild(this.renderer.domElement);
                        this.renderer.dispose();
                        this.renderer = this.webgl2Renderer.renderer;
                        
                        console.log('✅ WebGL2 Enhanced Renderer activated');
                    } else {
                        console.log('⚠️ WebGL2 not supported, using standard renderer');
                    }
                } catch (error) {
                    console.warn('⚠️ WebGL2 Enhanced Renderer failed to initialize:', error);
                }
            }
            
            // 🔍 Initialize Collision Detection System (if enabled)
            if (this.options.enableCollisionDetection) {
                try {
                    console.log('🔍 Initializing Collision Detection System...');
                    this.collisionSystem = new CollisionDetectionSystem(this.scene, {
                        debug: this.options.debugCollisions,
                        enableSpatialPartitioning: true,
                        gridSize: 10,
                        debugVisualization: this.options.debugCollisions
                    });
                    
                    console.log('✅ Collision Detection System activated');
                } catch (error) {
                    console.warn('⚠️ Collision Detection System failed to initialize:', error);
                }
            }
            
            // 🎨 Initialize Advanced Shader Manager (if enabled)
            if (this.options.enableAdvancedShaders && this.renderer) {
                try {
                    console.log('🎨 Initializing Advanced Shader Manager...');
                    this.shaderManager = new AdvancedShaderManager(this.renderer);
                    
                    // Setup enhanced lighting with WebGL2 features
                    if (this.webgl2Renderer?.isWebGL2Supported) {
                        const enhancedLighting = this.webgl2Renderer.createAdvancedLighting(this.scene);
                        console.log('✨ Enhanced WebGL2 lighting activated');
                    }
                    
                    console.log('✅ Advanced Shader Manager activated');
                } catch (error) {
                    console.warn('⚠️ Advanced Shader Manager failed to initialize:', error);
                }
            }
            
            // 📊 Initialize Performance Monitor (if enabled)
            if (this.options.debugPerformance || this.options.enablePerformanceMonitoring) {
                try {
                    console.log('📊 Initializing Performance Monitor...');
                    this.performanceMonitor = new PerformanceMonitor({
                        enableGPUTiming: this.webgl2Renderer?.isWebGL2Supported || false,
                        enableMemoryMonitoring: true,
                        alertThresholds: {
                            fps: 20,
                            memoryMB: 300,
                            drawCalls: 800
                        }
                    });
                    
                    // Setup performance alerts
                    this.performanceMonitor.onAlert((type, alerts) => {
                        alerts.forEach(alert => {
                            console.warn(`📊 Performance Alert [${alert.type}]:`, alert.message);
                            
                            // Show user notification for critical alerts
                            if (alert.severity === 'critical') {
                                this.showError(`Performance issue: ${alert.message}`);
                            }
                        });
                    });
                    
                    // Start monitoring once renderer is ready
                    this.performanceMonitor.startMonitoring(this.renderer);
                    
                    console.log('✅ Performance Monitor activated');
                } catch (error) {
                    console.warn('⚠️ Performance Monitor failed to initialize:', error);
                }
            }
            
            // Add basic geometry for testing
            console.log('[SimpleMine3DViewer] Adding test geometry...');
            this.addTestGeometry();
            
            // Add controls if available
            console.log('[SimpleMine3DViewer] Setting up controls...');
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            
            // ✨ İYİLEŞTİRİLMİŞ KAMERA KONTROL AYARLARI ✨
            
            // Damping - daha responsif
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05; // Hızlar yükseldiği için daha düşük damping
            
            // Temel kontroller
            this.controls.enableZoom = true;
            this.controls.enablePan = true;
            this.controls.enableRotate = true;
            
            // Hareket hızları - kullanıcı dostu
            // Kontrolleri 10x kolaylaştırma kapsamında hızları artır
            this.controls.rotateSpeed = 4.0; // 1.2 -> 4.0
            this.controls.zoomSpeed = 5.0;   // 1.5 -> 5.0
            this.controls.panSpeed = 4.5;    // 1.3 -> 4.5
            
            // Zoom ayarları - daha ince kontrol
            this.controls.minDistance = 1;     // Yakın limit aynı
            this.controls.maxDistance = 1000;  // 150 -> 1000 (daha geniş gezinme)
            
            // Mouse wheel zoom hassasiyeti
            this.controls.zoomToCursor = true; // Cursor'a doğru zoom
            
            // Kamera limitleri - daha özgür hareket
            this.controls.maxPolarAngle = Math.PI * 0.9; // Tam alttan değil, biraz sınırlı
            this.controls.minPolarAngle = Math.PI * 0.1; // Üstten biraz sınırlı
            
            // Pan limitleri - daha büyük alan
            this.controls.maxAzimuthAngle = Infinity; // Yatayda sınırsız
            this.controls.minAzimuthAngle = -Infinity;
            
            // Otomatik rotate
            this.controls.autoRotate = false;
            this.controls.autoRotateSpeed = 1.0; // 0.5'ten 1.0'a
            
            // Keyboard kontrolleri
            this.controls.enableKeys = true;
            this.controls.keys = {
                LEFT: 'ArrowLeft',   // Sol ok: pan left
                UP: 'ArrowUp',       // Yukarı ok: pan up  
                RIGHT: 'ArrowRight', // Sağ ok: pan right
                BOTTOM: 'ArrowDown'  // Aşağı ok: pan down
            };
            
            // Mouse buton ayarları
            this.controls.mouseButtons = {
                LEFT: THREE.MOUSE.ROTATE,   // Sol: döndür
                MIDDLE: THREE.MOUSE.DOLLY,  // Orta: zoom
                RIGHT: THREE.MOUSE.PAN      // Sağ: kaydır
            };
            
            // Touch kontrolleri (mobil için)
            this.controls.touches = {
                ONE: THREE.TOUCH.ROTATE,    // Tek parmak: döndür
                TWO: THREE.TOUCH.DOLLY_PAN  // İki parmak: zoom + pan
            };
            
            // Target - zemin altındaki yollara odaklan
            this.controls.target.set(0, -3, 0);
            this.controls.update();
            
            console.log('[SimpleMine3DViewer] OrbitControls initialized with enhanced settings:', this.controls);
            
            // Initialize path drawer
            console.log('[SimpleMine3DViewer] Initializing path drawer...');
            this.pathDrawer = new MinePathDrawer(this.scene, this.camera, this.renderer);
            this.setupPathDrawingEvents();
            // Path editor
            this.pathEditor = new MinePathEditor(this.scene, this.camera, this.renderer, this.pathDrawer);
            this.pathEditor.setCallbacks({
                onPointChange: (points, data) => {
                    this.markPathDirty(data.id || data.pathId);
                    // Eğer seçili obje bu path ise selection kartını güncelle (nokta sayısı / uzunluk)
                    if (this.selectedObject && (this.selectedObject.userData.objectData?.id === data.id || this.selectedObject.userData.objectData?.pathId === data.id)) {
                        const meta = this.selectedObject.userData.objectData;
                        if (meta) {
                            meta.points = points;
                            meta.path_points = points;
                            meta.length = this.pathDrawer.calculatePathLength(points);
                            this.populateSelectionCard(this.selectedObject, meta);
                        }
                    }
                }
            });
            
            // Initialize object creator
            console.log('[SimpleMine3DViewer] Initializing object creator...');
            this.objectCreator = new MineObjectCreator(this.scene, this.camera, this.renderer, this);
            
            // Initialize transform controls
            console.log('[SimpleMine3DViewer] Initializing transform controls...');
            this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
            this.transformControls.addEventListener('change', () => this.renderer.render(this.scene, this.camera));
            this.transformControls.addEventListener('dragging-changed', (event) => {
                this.controls.enabled = !event.value;
            });
            this.scene.add(this.transformControls);
            
            // Mining controls kurulumu
            // DOM'un tamamen hazır olmasını bekle
            setTimeout(() => {
                this.setupMiningControls(); // Yeni mining control sistemi
            }, 100);
            
            // Initialize object selector
            console.log('[SimpleMine3DViewer] Initializing object selector...');
            this.objectSelector = new ObjectSelector(this.scene, this.camera, this.renderer);
            this.setupObjectSelection();
            // Edit drag eventleri
            this.renderer.domElement.addEventListener('pointerdown', (e)=>{ if(this.pathEditor && this.pathEditor.isEditing) this.pathEditor.pointerDown(e); });
            this.renderer.domElement.addEventListener('pointermove', (e)=>{ if(this.pathEditor && this.pathEditor.isEditing) this.pathEditor.pointerMove(e); });
            this.renderer.domElement.addEventListener('pointerup',   (e)=>{ if(this.pathEditor && this.pathEditor.isEditing) this.pathEditor.pointerUp(e); });
            
            // Load mine data
            console.log('[SimpleMine3DViewer] Loading mine data...');
            await this.loadMineData();
            
            // Start render loop
            console.log('[SimpleMine3DViewer] Starting render loop...');
            this.animate();
            
            console.log('%c[SimpleMine3DViewer] Initialization completed successfully!', 'color: green; font-weight: bold; font-size: 14px;');
            // Final safety hide (in case earlier hide didn't work)
            const lc2 = document.getElementById('loading-container');
            if (lc2 && lc2.style.display !== 'none') {
                console.log('[SimpleMine3DViewer] Forcing loading container hide at end');
                lc2.remove();
            }
            
        } catch (error) {
            console.error('%c[SimpleMine3DViewer] Initialization failed:', 'color: red; font-weight: bold;', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            throw error;
        }
    }
    
    addLights() {
        console.log('[SimpleMine3DViewer] Adding shadowless lights to scene...');
        
        // Ambient light - maden içi genel aydınlatma
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        console.log('[SimpleMine3DViewer] Ambient light added:', ambientLight);
        
        // Directional light - ana ışık (gölgesiz)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = false; // Gölge kapalı
        this.scene.add(directionalLight);
        console.log('[SimpleMine3DViewer] Directional light added (shadowless):', directionalLight);
        
        // Hemisphere light - doğal ışıklandırma
        const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 0.5);
        hemisphereLight.position.set(0, 20, 0);
        this.scene.add(hemisphereLight);
        console.log('[SimpleMine3DViewer] Hemisphere light added:', hemisphereLight);
        
        // Maden lambaları - multiple point lights
        const mineLights = [
            { pos: [10, 2, 10], color: 0xffdd44, intensity: 0.4 },
            { pos: [-10, 2, 10], color: 0xffdd44, intensity: 0.4 },
            { pos: [10, 2, -10], color: 0xffdd44, intensity: 0.4 },
            { pos: [-10, 2, -10], color: 0xffdd44, intensity: 0.4 }
        ];
        
        mineLights.forEach((light, index) => {
            const pointLight = new THREE.PointLight(light.color, light.intensity, 25);
            pointLight.position.set(...light.pos);
            pointLight.castShadow = false; // Gölge kapalı
            this.scene.add(pointLight);
        });
        
        console.log('[SimpleMine3DViewer] Mining lights added successfully');
    }

    setupMiningControls() {
        console.log('[SimpleMine3DViewer] Setting up mining controls...');
        
        // Mining tool buttons - debug ekleyelim
        const toolButtons = document.querySelectorAll('.mining-tool-btn');
        console.log('[SimpleMine3DViewer] Found tool buttons:', toolButtons.length, toolButtons);
        
        toolButtons.forEach(button => {
            const tool = button.getAttribute('data-tool');
            console.log('[SimpleMine3DViewer] Setting up button for tool:', tool);
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`🛠️ Mining tool butonuna tıklandı: ${tool}`);
                this.startMiningTool(tool);
            });
        });

        // 3D Axis controls
        const axisXBtn = document.getElementById('axis-x-btn');
        const axisYBtn = document.getElementById('axis-y-btn');
        const axisZBtn = document.getElementById('axis-z-btn');
        const freeDrawBtn = document.getElementById('free-draw-btn');

        if (axisXBtn) axisXBtn.addEventListener('click', () => this.setDrawingConstraint('x'));
        if (axisYBtn) axisYBtn.addEventListener('click', () => this.setDrawingConstraint('y'));
        if (axisZBtn) axisZBtn.addEventListener('click', () => this.setDrawingConstraint('z'));
        if (freeDrawBtn) freeDrawBtn.addEventListener('click', () => this.setDrawingConstraint('free'));

        // View controls
        const resetCameraBtn = document.getElementById('reset-camera-btn');
        const toggleGridBtn = document.getElementById('toggle-grid-btn');

        if (resetCameraBtn) {
            resetCameraBtn.addEventListener('click', () => {
                this.camera.position.set(15, 5, 25);
                this.camera.lookAt(0, -2, 0);
                this.controls.target.set(0, -3, 0);
                this.controls.update();
            });
        }

        if (toggleGridBtn) {
            toggleGridBtn.addEventListener('click', () => {
                const grid = this.scene.getObjectByName('grid_helper');
                if (grid) {
                    grid.visible = !grid.visible;
                }
            });
        }

        console.log('[SimpleMine3DViewer] Mining controls setup completed');
    }
    
    startMiningTool(toolType) {
        console.log('🚀 [SimpleMine3DViewer] Starting mining tool:', toolType);
        
        // Stop any current drawing or creating
        if (this.isPathDrawingMode) {
            console.log('🛑 Mevcut çizim modu durduruluyor...');
            this.stopPathDrawing();
        }
        
        if (this.isCreatingMode) {
            console.log('� Mevcut oluşturma modu durduruluyor...');
            this.stopCreating();
        }

        // Start object creation mode instead of drawing
        console.log('🔧 Object creation mode başlatılıyor:', toolType);
        this.isCreatingMode = true;
        this.controls.enabled = false; // Orbit controls'u kapat
        
        this.objectCreator.startCreating(toolType);
        
        // Update button states
        console.log('� Button states güncelleniyor...');
        this.updateToolButtonStates(toolType);
        
        console.log('🎉 Mining tool başlatma işlemi tamamlandı:', toolType);
    }

    stopCreating() {
        if (this.isCreatingMode) {
            this.isCreatingMode = false;
            this.controls.enabled = true; // Orbit controls'u tekrar aç
            this.objectCreator.stopCreating();
            
            // Seçili nesneyi de bırak (transform controls'ı deaktif et)
            this.deselectObject();
            
            // Tüm butonları pasif duruma getir
            this.updateToolButtonStates(null);
            
            console.log('[SimpleMine3DViewer] Creating mode stopped');
        }
    }

    updateToolIndicator(toolType) {
        const toolIndicator = document.getElementById('tool-indicator');
        const toolName = document.getElementById('tool-name');
        
        if (toolIndicator && toolName) {
            const toolInfo = {
                tunnel: { icon: 'fas fa-mountain', name: 'Tünel Kazma' },
                road: { icon: 'fas fa-road', name: 'Yol İnşaası' },
                rail: { icon: 'fas fa-train', name: 'Ray Döşeme' },
                conveyor: { icon: 'fas fa-conveyor-belt', name: 'Konveyör Kurma' }
            };
            
            const info = toolInfo[toolType] || { icon: 'fas fa-tools', name: 'Bilinmeyen Araç' };
            toolIndicator.querySelector('i').className = info.icon + ' me-2';
            toolName.textContent = info.name;
            toolIndicator.style.display = 'block';
        }
    }

    updateToolButtonStates(activeToolType) {
        const toolButtons = document.querySelectorAll('.mining-tool-btn');
        toolButtons.forEach(button => {
            const tool = button.getAttribute('data-tool');
            
            // Önce tüm sınıfları temizle
            button.classList.remove(
                'btn-warning', 'btn-info', 'btn-success', 'btn-danger',
                'btn-outline-warning', 'btn-outline-info', 'btn-outline-success', 'btn-outline-danger'
            );
            
            if (tool === activeToolType) {
                // Aktif araç - solid renk
                button.classList.add(`btn-${this.getToolColor(tool)}`);
            } else {
                // Pasif araç - outline renk
                button.classList.add(`btn-outline-${this.getToolColor(tool)}`);
            }
        });
        
        console.log('[SimpleMine3DViewer] Tool button states updated, active tool:', activeToolType);
    }

    getToolColor(toolType) {
        const colors = {
            tunnel: 'warning',
            road: 'info', 
            rail: 'success',
            conveyor: 'danger'
        };
        return colors[toolType] || 'secondary';
    }

    setDrawingConstraint(axis) {
        console.log('[SimpleMine3DViewer] Setting drawing constraint to:', axis);
        
        // Önceki aktif constraint'i temizle
        this.activeConstraint = axis;
        
        // Buton state'lerini güncelle
        const constraintButtons = document.querySelectorAll('#axis-x-btn, #axis-y-btn, #axis-z-btn, #free-draw-btn');
        constraintButtons.forEach(btn => {
            btn.classList.remove('btn-light', 'btn-outline-light');
            btn.classList.add('btn-outline-light');
        });
        
        // Aktif butonu vurgula
        let activeBtn = null;
        switch(axis) {
            case 'x':
                activeBtn = document.getElementById('axis-x-btn');
                break;
            case 'y':
                activeBtn = document.getElementById('axis-y-btn');
                break;
            case 'z':
                activeBtn = document.getElementById('axis-z-btn');
                break;
            case 'free':
                activeBtn = document.getElementById('free-draw-btn');
                break;
        }
        
        if (activeBtn) {
            activeBtn.classList.remove('btn-outline-light');
            activeBtn.classList.add('btn-light');
        }
        
        // PathDrawer'a constraint bilgisini ilet
        if (this.pathDrawer) {
            this.pathDrawer.setAxisConstraint(axis);
        }
        
        console.log('[SimpleMine3DViewer] Constraint set to:', axis);
    }
    
    addTestGeometry() {
        console.log('[SimpleMine3DViewer] Adding test geometry...');
        
        try {
            // Ground plane - sonsuz genişlikte (çok büyük) grid
            console.log('[SimpleMine3DViewer] Creating infinite ground plane...');
            const planeSize = 20000; // Sonsuza yakın büyük alan
            const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, 50, 50);
            
            // Daha gerçekçi malzeme - grid pattern
            const planeMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x567d46,
                transparent: false
            });
            
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = -5;
            plane.receiveShadow = true;
            plane.name = 'ground_plane';
            this.scene.add(plane);
            console.log('[SimpleMine3DViewer] Infinite ground plane added:', plane);
            
            // Grid helper - görsel referans için
            const gridHelper = new THREE.GridHelper(planeSize, 100, 0x888888, 0x444444);
            gridHelper.position.y = -4.9; // Zemin üzerinde
            gridHelper.material.opacity = 0.3;
            gridHelper.material.transparent = true;
            this.scene.add(gridHelper);
            
            // Underground layer - toprak tabakası (daha büyük)
            const undergroundGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
            const undergroundMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8B4513,
                transparent: true,
                opacity: 0.8
            });
            const underground = new THREE.Mesh(undergroundGeometry, undergroundMaterial);
            underground.rotation.x = -Math.PI / 2;
            underground.position.y = -10;
            underground.receiveShadow = true;
            underground.name = 'underground_layer';
            this.scene.add(underground);
            
            console.log('[SimpleMine3DViewer] Test geometry added successfully');
            console.log('[SimpleMine3DViewer] Scene children count:', this.scene.children.length);
            
        } catch (error) {
            console.error('[SimpleMine3DViewer] Error adding test geometry:', error);
            throw error;
        }
    }
    
    async loadMineData() {
        console.log('[SimpleMine3DViewer] Loading mine data for mine ID:', this.mineId);
        
        try {
            const url = `/api/mines/${this.mineId}/scene-data`;
            console.log('[SimpleMine3DViewer] Fetching from URL:', url);
            
            const response = await fetch(url);
            console.log('[SimpleMine3DViewer] Fetch response:', {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('[SimpleMine3DViewer] Mine data loaded successfully:', data);
            
            // Process mine data here
            if (data && data.models) {
                console.log('[SimpleMine3DViewer] Processing', data.models.length, 'models');
            }
            if (data && data.layers) {
                console.log('[SimpleMine3DViewer] Processing', data.layers.length, 'layers');
            }
            if (data && data.paths) {
                console.log('[SimpleMine3DViewer] Processing', data.paths.length, 'paths');
                this.loadPaths(data.paths);
            }
            
        } catch (error) {
            console.warn('[SimpleMine3DViewer] Could not load mine data:', {
                message: error.message,
                stack: error.stack
            });
            console.log('[SimpleMine3DViewer] Continuing with test geometry only');
        }
    }

    loadPaths(paths) {
        console.log('[SimpleMine3DViewer] Loading paths:', paths);
        
        paths.forEach(pathData => {
            if (pathData.path_points && pathData.path_points.length > 1) {
                const points = pathData.path_points.map(p => new THREE.Vector3(p.x, p.y, p.z));
                
                const path = this.pathDrawer.createPath({
                    id: pathData.id,
                    points: points,
                    width: pathData.width || 3,
                    height: pathData.height || 3,
                    color: pathData.color || '#808080',
                    type: pathData.type || 'tunnel'
                });

                // Objeyi seçilebilir yap
                if (path && this.objectSelector) {
                    this.objectSelector.addSelectableObject(path, {
                        id: pathData.id,
                        type: 'path', // selection kartı için ana tip
                        name: pathData.name,
                        pathType: pathData.type,
                        width: pathData.width,
                        height: pathData.height,
                        color: pathData.color,
                        material: pathData.material,
                        points: pathData.path_points,
                        length: this.pathDrawer.calculatePathLength(pathData.path_points)
                    });
                }
            }
        });
    }
    
    animate() {
        const frameStart = performance.now();
        const time = frameStart * 0.001; // Convert to seconds
        
        requestAnimationFrame(() => this.animate());
        
        try {
            if (this.controls) {
                this.controls.update();
            }
            
            // 🔍 Update Collision Detection System
            if (this.collisionSystem) {
                this.collisionSystem.update();
            }
            
            // 🎨 Update Shader Uniforms (time, camera position, etc.)
            if (this.shaderManager) {
                this.shaderManager.updateShaderUniforms(time, this.camera);
            }
            
            // 📊 Update Performance Monitor
            if (this.performanceMonitor) {
                this.performanceMonitor.update();
            }
            
            // LOD güncellemesi
            if (this.pathDrawer) {
                this.pathDrawer.updateLOD();
            }
            
            // Billboard sprite etiketlerini kameraya çevir
            if (this._measurementGroup && this.camera) {
                const camQuat = this.camera.quaternion;
                this._measurementGroup.traverse(ch => {
                    if (ch.isSprite) {
                        ch.quaternion.copy(camQuat);
                    }
                });
            }
            
            // Enhanced rendering with WebGL2 if available
            if (this.webgl2Renderer) {
                this.webgl2Renderer.render(this.scene, this.camera);
            } else if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            } else {
                console.error('[SimpleMine3DViewer] Missing components for rendering:', {
                    renderer: !!this.renderer,
                    scene: !!this.scene,
                    camera: !!this.camera
                });
            }
            
        } catch (error) {
            console.error('[SimpleMine3DViewer] Render error:', error);
        }
        
        const frameEnd = performance.now();
        const frameTime = frameEnd - frameStart;
        
        // Log performance every 60 frames (roughly 1 second at 60fps)
        if (!this.frameCount) this.frameCount = 0;
        this.frameCount++;
        
        if (this.frameCount % 60 === 0) {
            console.log(`[SimpleMine3DViewer] Performance - Frame ${this.frameCount}, Frame time: ${frameTime.toFixed(2)}ms`);
        }
    }
    
    destroy() {
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
    }

    // Yol çizimi event handler'ları
    setupPathDrawingEvents() {
        const canvas = this.renderer.domElement;
        
        this.boundHandlers = {
            click: (event) => this.handleCanvasClick(event),
            mousemove: (event) => this.handleCanvasMouseMove(event),
            keydown: (event) => this.handleKeyDown(event)
        };

        canvas.addEventListener('click', this.boundHandlers.click);
        canvas.addEventListener('mousemove', this.boundHandlers.mousemove);
        document.addEventListener('keydown', this.boundHandlers.keydown);
    }

    handleCanvasClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (this.isPathDrawingMode) {
            this.pathDrawer.handleClick(event);
        } else if (this.isCreatingMode) {
            // Creating mode'da tıklama ile pozisyon güncelleme
            this.updateCreationPosition(event);
        } else {
            // Normal mod - unified selection: objectSelector kullan
            if (this.objectSelector) {
                this.objectSelector.handleClick(event);
            } else {
                this.handleObjectSelection(event); // fallback
            }
            if (!this.selectedObject && this.objectCreator && this.objectCreator.previewObject) {
                this.objectCreator.removePreview();
            }
        }
    }

    updateCreationPosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2);
        const intersection = new THREE.Vector3();
        
        if (raycaster.ray.intersectPlane(groundPlane, intersection)) {
            this.objectCreator.currentPosition.copy(intersection);
            this.objectCreator.createPreview();
            console.log('[SimpleMine3DViewer] Updated creation position:', intersection);
        }
    }

    handleObjectSelection(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        
        // Sadece selectable objeleri kontrol et
        const selectableObjects = [];
        this.scene.traverse((child) => {
            if (child.userData && child.userData.selectable && child.isMesh) {
                selectableObjects.push(child);
            }
        });

        const intersects = raycaster.intersectObjects(selectableObjects);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            this.selectObject(selectedObject);
        } else {
            this.deselectObject();
        }
    }

    selectObject(object) {
        if (this.selectedObject) {
            this.deselectObject();
        }

        this.selectedObject = object;
        this.transformControls.attach(object);
        
        // Visual highlight ekle
        this.addHighlight(object);
        
    // (Legacy selection log removed)
    }

    deselectObject() {
        if (this.selectedObject) {
            this.transformControls.detach();
            this.removeHighlight(this.selectedObject);
            this.selectedObject = null;
            console.log('[SimpleMine3DViewer] Object deselected');
        }
        
        // Preview objesini de temizle (boş tıklama bug'ı için)
        if (this.objectCreator) {
            this.objectCreator.removePreview();
        }
    }
    addHighlight(object) {
        if (object.userData.originalMaterial) return; // Zaten highlight'lı
        
        object.userData.originalMaterial = object.material;
        object.material = object.material.clone();
        object.material.emissive.setHex(0x444444);
    }

    removeHighlight(object) {
        if (object.userData.originalMaterial) {
            object.material.dispose();
            object.material = object.userData.originalMaterial;
            delete object.userData.originalMaterial;
        }
    }

    markPathDirty(pathId) {
        if (!pathId) return;
        // Debounce auto-save
        clearTimeout(this._pathSaveTimer);
        this.setPathDirtyVisual(true);
        this._dirtyPaths.add(pathId);
        this._pathSaveTimer = setTimeout(async () => {
            const pathObj = this.pathDrawer.getPath(pathId);
            if (!pathObj) return;
            const data = pathObj.userData.pathData || {};
            try {
                await this.updatePathToServer(pathId, { points: data.points || data.path_points });
                this._dirtyPaths.delete(pathId);
                if (this._dirtyPaths.size === 0) this.setPathDirtyVisual(false);
            } catch (e) {
                // Sessiz geç; UI zaten error gösterir
            }
        }, 600);
    }

    setPathDirtyVisual(isDirty) {
        if (!this._dirtyIndicatorEl) {
            this._dirtyIndicatorEl = document.getElementById('save-path-btn');
        }
        if (this._dirtyIndicatorEl) {
            if (isDirty) this._dirtyIndicatorEl.classList.add('dirty');
            else this._dirtyIndicatorEl.classList.remove('dirty');
        }
    }

    handleCanvasMouseMove(event) {
        if (this.isPathDrawingMode) {
            this.pathDrawer.handleMouseMove(event);
        }
    }

    handleKeyDown(event) {
        console.log('[SimpleMine3DViewer] Key pressed:', event.key);
        
        if (event.key === 'Escape') {
            event.preventDefault();
            if (this.isPathDrawingMode) {
                // Escape: sadece iptal et, yol oluşturma
                this.pathDrawer.stopDrawing(); // Sadece temizlik
                this.stopPathDrawing(); // UI'ı kapat
            } else if (this.isCreatingMode) {
                // Escape: oluşturma modundan çık
                this.stopCreating();
            } else if (this.selectedObject) {
                // Escape: seçimi kaldır
                this.deselectObject();
            }
        } else if (event.key === 'Enter' && this.isPathDrawingMode) {
            event.preventDefault();
            // Enter: yolu tamamla
            this.completeCurrentPath();
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
            if (this.selectedObject) {
                this.deleteSelectedObject();
            } else {
                console.log('[SimpleMine3DViewer] No object selected for deletion');
            }
        } else if (event.key === 'g' || event.key === 'G') {
            event.preventDefault();
            // G tuşu: Transform mode değiştir
            if (this.selectedObject && this.transformControls.object) {
                this.cycleTransformMode();
            }
        } else if ((event.metaKey || event.ctrlKey) && (event.key === 'z' || event.key === 'Z')) {
            event.preventDefault();
            if (this.pathEditor && this.pathEditor.isEditing) this.pathEditor.undo();
        } else if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === 'z' || event.key === 'Z')) {
            event.preventDefault();
            if (this.pathEditor && this.pathEditor.isEditing) this.pathEditor.redo();
        } else if (event.key === 'm' || event.key === 'M') {
            event.preventDefault();
            this.toggleMeasurements();
        }
    }

    toggleMeasurements(forceState=null) {
        const newState = forceState === null ? !this.measurementsEnabled : !!forceState;
        if (newState === this.measurementsEnabled) return;
        this.measurementsEnabled = newState;
        if (!newState) {
            // kapat: varsa grubu temizle
            if (this._measurementGroup) {
                this._measurementGroup.traverse(ch => { if (ch.geometry) ch.geometry.dispose(); if (ch.material) ch.material.dispose(); });
                this.scene.remove(this._measurementGroup);
                this._measurementGroup = null;
            }
        } else {
            // aç: son seçili tünel varsa yeniden oluştur
            if (this._lastMeasuredTunnel) {
                const { object, data } = this._lastMeasuredTunnel;
                this.buildTunnelMeasurements(object, data);
            }
        }
        console.log('[SimpleMine3DViewer] Measurements toggled ->', this.measurementsEnabled);
    }

    cycleTransformMode() {
        const currentMode = this.transformControls.getMode();
        const modes = ['translate', 'rotate', 'scale'];
        const currentIndex = modes.indexOf(currentMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        
        this.transformControls.setMode(nextMode);
        console.log('[SimpleMine3DViewer] Transform mode changed to:', nextMode);
    }

    async saveObjectToServer(object) {
        try {
            const objectData = {
                mine_id: this.mineId,
                name: `${object.userData.type.charAt(0).toUpperCase() + object.userData.type.slice(1)} ${object.userData.id}`,
                type: object.userData.type,
                geometry: {
                    type: object.userData.type,
                    ...object.userData.parameters
                },
                material: {
                    color: object.material.color.getHex(),
                    opacity: object.material.opacity || 1
                },
                position: [object.position.x, object.position.y, object.position.z],
                rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
                scale: [object.scale.x, object.scale.y, object.scale.z],
                properties: {
                    createdAt: new Date().toISOString(),
                    tool: object.userData.type
                },
                visible: true,
                order: object.userData.id
            };

            const response = await fetch(`/api/mines/${this.mineId}/models`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(objectData)
            });

            if (response.ok) {
                const savedData = await response.json();
                object.userData.serverId = savedData.data?.id;
                console.log('[SimpleMine3DViewer] Successfully saved object to server:', savedData);
                this.showSuccess('Obje başarıyla kaydedildi!');
                
                // Kaydetme bitince düzenleme modundan tamamen çık
                this.deselectObject(); // Transform controls'ı detach et
                this.forceExitCreationMode(); // Creation mode'dan çık
                console.log('[SimpleMine3DViewer] Obje kaydedildi ve düzenleme modu kapatıldı');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('[SimpleMine3DViewer] Error saving object to server:', error);
            this.showError('Obje kaydedilemedi: ' + error.message);
        }
    }

    forceExitCreationMode() {
        // ObjectCreator üzerinden mod kapatma
        if (this.objectCreator) {
            this.objectCreator.isCreating = false;
            try { this.objectCreator.hideCreationUI?.(); } catch(e) {}
            try { this.objectCreator.removePreview(); } catch(e) {}
        }
        
        // Tüm düzenleme modlarından çık
        this.isCreatingMode = false;
        this.isPathDrawingMode = false;
        
        // Transform controls'ı detach et
        if (this.transformControls) {
            this.transformControls.detach();
        }
        
        // Seçimi kaldır
        if (this.selectedObject) {
            this.removeHighlight(this.selectedObject);
            this.selectedObject = null;
        }
        
        // Controls'ı yeniden aktifleştir
        if (this.controls) {
            this.controls.enabled = true;
        }
        
        // Creation paneli açık kalmışsa kaldır
        const panel = document.getElementById('creation-panel');
        if (panel) panel.style.display = 'none';
        
        // Path drawing UI'ını da kapat
        this.showPathDrawingUI(false);
        
        // Tüm butonları pasif duruma getir (HİÇBİR ARAÇ AKTİF DEĞİL)
        this.updateToolButtonStates(null);
        
        console.log('[SimpleMine3DViewer] Force exited all creation/editing modes');
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #44aa44;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                document.body.removeChild(successDiv);
            }
        }, 3000);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                document.body.removeChild(errorDiv);
            }
        }, 3000);
    }

    deleteSelectedObject() {
        if (this.selectedObject) {
            const objectToDelete = this.selectedObject;
            
            // Transform controls'dan ayır
            this.transformControls.detach();
            
            // Scene'den kaldır
            this.scene.remove(objectToDelete);
            
            // Memory temizle
            if (objectToDelete.geometry) objectToDelete.geometry.dispose();
            if (objectToDelete.material) objectToDelete.material.dispose();
            
            // Object creator'dan kaldır
            if (this.objectCreator.createdObjects.has(objectToDelete.userData.id)) {
                this.objectCreator.createdObjects.delete(objectToDelete.userData.id);
            }
            
            this.selectedObject = null;
            
            console.log('[SimpleMine3DViewer] Object deleted:', objectToDelete.userData);
            
            // API'den de sil
            if (objectToDelete.userData.serverId) {
                this.deleteFromServer(objectToDelete.userData.serverId);
            }
        }
    }

    async deleteFromServer(serverId) {
        try {
            const response = await fetch(`/api/mines/${this.mineId}/models/${serverId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                console.log('[SimpleMine3DViewer] Successfully deleted from server');
                this.showSuccess('Obje başarıyla silindi!');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('[SimpleMine3DViewer] Error deleting from server:', error);
            this.showError('Obje silinemedi: ' + error.message);
        }
    }

    // Object selection setup
    setupObjectSelection() {
        this.objectSelector.setCallbacks({
            onObjectSelect: (object, data) => this.onObjectSelected(object, data),
            onObjectDeselect: (object) => this.onObjectDeselected(object),
            onObjectDelete: (object) => this.onObjectDelete(object)
        });
    }

    onObjectSelected(object, data) {
        // Bazı seçim yollarında callback 'data' boş gelebilir; obje üzerindeki userData.objectData'yı fallback olarak kullan
        const meta = data || (object && object.userData && object.userData.objectData) || object.userData || {};
        console.log('[SimpleMine3DViewer] Object selected:', meta);
        this.selectedObject = object;
        // Yeni selection card
        this.showSelectionCard(object, meta);
        // Path ise edit modunu başlat
        if (meta && (meta.pathType || meta.type === 'path') && this.pathEditor) {
            const group = object.parent && object.parent.userData && object.parent.userData.pathData ? object.parent : object;
            this.pathEditor.startEditing(group);
        }
        // Tünel (mesh) seçimi ise ölçüm çizgilerini oluştur
        if (meta && meta.type === 'tunnel') {
            this.buildTunnelMeasurements(object, meta);
        }
    }

    onObjectDeselected(object) {
        console.log('[SimpleMine3DViewer] Object deselected');
        // Ölçüm çizgilerini temizle
        if (this._measurementGroup) {
            this._measurementGroup.traverse(ch => { if (ch.geometry) ch.geometry.dispose(); if (ch.material) ch.material.dispose(); });
            this.scene.remove(this._measurementGroup);
            this._measurementGroup = null;
        }
        this.selectedObject = null;
        this.hideSelectionCard();
        if (this.pathEditor && this.pathEditor.isEditing) this.pathEditor.stopEditing();
    }

    async onObjectDelete(object) {
        console.log('[SimpleMine3DViewer] Deleting object:', object.userData.objectData);
        
        const data = object.userData.objectData;
        if (data && data.id && data.type === 'path') {
            try {
                // Sunucudan sil
                const response = await fetch(`/api/mines/${this.mineId}/paths/${data.id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 3D sahneden kaldır
                    this.pathDrawer.removePath(data.id);
                    this.objectSelector.removeSelectableObject(object);
                    console.log('[SimpleMine3DViewer] Path deleted successfully');
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('[SimpleMine3DViewer] Error deleting path:', error);
                this.showError('Yol silinemedi: ' + error.message);
            }
        }
    }

    // Yol çizimi kontrol metodları
    startPathDrawing() {
        this.isPathDrawingMode = true;
        this.controls.enabled = false; // OrbitControls'u devre dışı bırak
        
        this.pathDrawer.startDrawing({
            onPathStart: () => console.log('[SimpleMine3DViewer] Yol çizimi başladı'),
            onPathUpdate: (points) => console.log('[SimpleMine3DViewer] Yol güncellendi, nokta sayısı:', points.length),
            onPathComplete: (points) => this.onPathDrawingComplete(points)
        });
        
        // UI feedback
        this.showPathDrawingUI(true);
        console.log('[SimpleMine3DViewer] Yol çizim modu aktif');
    }

    stopPathDrawing() {
        this.isPathDrawingMode = false;
        this.controls.enabled = true; // OrbitControls'u yeniden aktifleştir
        this.pathDrawer.stopDrawing();
        this.showPathDrawingUI(false);
        console.log('[SimpleMine3DViewer] Yol çizim modu pasif');
    }

    completeCurrentPath() {
        if (this.isPathDrawingMode) {
            console.log('[SimpleMine3DViewer] Manual path completion');
            const pathPoints = this.pathDrawer.completePath();
            if (pathPoints && pathPoints.length > 1) {
                // Çifte oluşumayı engellemek için direct save
                this.onPathDrawingComplete(pathPoints);
                this.stopPathDrawing();
            }
        }
    }

    onPathDrawingComplete(points) {
        console.log('[SimpleMine3DViewer] Yol çizimi tamamlandı:', points);
        
        // Yolu sunucuya kaydet
        this.savePathToServer(points).then((savedPath) => {
            if (savedPath) {
                // Geçici yolu kaldır ve kalıcı yolu ekle
                const path = this.pathDrawer.createPath({
                    id: savedPath.id,
                    points: points,
                    width: savedPath.width || 2.5,  // Daha küçük varsayılan boyut
                    height: savedPath.height || 2.5,  // Daha küçük varsayılan boyut
                    color: savedPath.color || '#808080',
                    type: savedPath.type || 'tunnel'
                });

                // Yeni yolu seçilebilir yap
                if (path && this.objectSelector) {
                    this.objectSelector.addSelectableObject(path, {
                        id: savedPath.id,
                        type: 'path',
                        name: savedPath.name,
                        pathType: savedPath.type,
                        width: savedPath.width,
                        height: savedPath.height,
                        color: savedPath.color,
                        material: savedPath.material,
                        points: points.map(p => ({ x: p.x, y: p.y, z: p.z })),
                        length: this.pathDrawer.calculatePathLength(points.map(p => ({ x: p.x, y: p.y, z: p.z })))
                    });
                }
                
                // Kaydetme başarılı olduğunda düzenleme modundan tamamen çık
                this.deselectObject(); // Transform controls'ı detach et
                this.forceExitCreationMode(); // Creation mode'dan çık
                console.log('[SimpleMine3DViewer] Yol kaydedildi ve düzenleme modu kapatıldı');
            }
        }).catch((error) => {
            console.error('[SimpleMine3DViewer] Yol kaydetme hatası:', error);
            // Hata durumunda kullanıcıya bilgi ver
            this.showError('Yol kaydedilemedi: ' + error.message);
        });
    }

    async savePathToServer(points) {
        try {
            const pathData = {
                mine_id: this.mineId,
                name: `Yol ${Date.now()}`,
                type: 'tunnel',
                path_points: points.map(p => ({ x: p.x, y: p.y, z: p.z })),
                width: 2.5,  // Daha küçük varsayılan boyut
                height: 2.5,  // Daha küçük varsayılan boyut
                color: '#808080',
                status: 'active'
            };

            const response = await fetch(`/api/mines/${this.mineId}/paths`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pathData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            const savedPath = result.data || result;
            console.log('[SimpleMine3DViewer] Yol başarıyla kaydedildi:', savedPath);
            return savedPath;
        } catch (error) {
            console.error('[SimpleMine3DViewer] Yol kaydetme hatası:', error);
            throw error;
        }
    }

    async updatePathToServer(pathId, data) {
        try {
            const payload = { ...data };
            if (payload.points && !payload.path_points) {
                payload.path_points = payload.points.map(p => ({ x: p.x, y: p.y, z: p.z }));
                delete payload.points;
            }
            const response = await fetch(`/api/mines/${this.mineId}/paths/${pathId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }
            const result = await response.json();
            console.log('[SimpleMine3DViewer] Yol güncellendi:', result.data || result);
            this.showSuccess('Yol güncellendi');
            const btn = document.getElementById('save-path-btn');
            if (btn) {
                btn.classList.add('saved-once');
                setTimeout(()=> btn.classList.remove('saved-once'), 400);
            }
            return result.data || result;
        } catch (error) {
            console.error('[SimpleMine3DViewer] Yol güncelleme hatası:', error);
            this.showError('Yol güncellenemedi: ' + error.message);
            throw error;
        }
    }

    dispose() {
        console.log('[SimpleMine3DViewer] Disposing viewer');
        window.removeEventListener('resize', this._resizeHandler);
        document.removeEventListener('keydown', this._keyHandler);
        if (this.renderer && this.renderer.domElement) {
            const el = this.renderer.domElement;
            el.removeEventListener('click', this._clickHandler);
            el.removeEventListener('mousemove', this._mouseMoveHandler);
        }
        if (this.scene) {
            this.scene.traverse(obj => {
                if (obj.isMesh) {
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) {
                        if (Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose()); else obj.material.dispose();
                    }
                }
            });
        }
        if (this.renderer) this.renderer.dispose();
        this.scene = null; this.camera = null; this.renderer = null;
    }

    buildTunnelMeasurements(object, data) {
        if (!this.measurementsEnabled) return;
        if (!object || !object.geometry) return;
        if (this._measurementGroup) {
            this._measurementGroup.traverse(ch => { if (ch.geometry) ch.geometry.dispose(); if (ch.material) ch.material.dispose(); });
            this.scene.remove(this._measurementGroup);
        }
        const group = new THREE.Group();
        group.name = 'tunnel_measurements';
        this._measurementGroup = group;
        this.scene.add(group);
        // Son referansı sakla
        this._lastMeasuredTunnel = { object, data };

        // Axis assumption: Cylinder was rotated for tunnel; treat its local Y as length if vertical else Z as length
        const params = data.parameters || {}; // width,height,length
        // Normalize orientation
        if (params.orientation === 'yatay') params.orientation = 'horizontal';
        if (params.orientation === 'dikey') params.orientation = 'vertical';
        let width = params.width || 3;
        let height = params.height || 3;
        let length = params.length || 10;
        let orientation = params.orientation || 'horizontal';
        // Bounding box'tan gerçek değerleri türet (özellikle orientation değişiminden sonra doğru eksenleri al)
        try {
            object.geometry.computeBoundingBox();
            const bb = object.geometry.boundingBox; // local space
            const size = new THREE.Vector3();
            bb.getSize(size); // X,Y,Z boyutları
            // Silindir horizontal iken: length ~ XZ düzleminde ? Biz X eksen scale ile width, Y eksen height (rotasyon sonrası) -> pratikçe: 
            // createGeometry yatay tünelde geometry.rotateX(Math.PI/2) yaptığı için length -> Z, height -> ? (cylinder height paramı -> length), scale ile X genişletiliyor.
            // Dikey tünelde length -> Y.
            if (orientation === 'vertical') {
                length = size.y; // dikey uzunluk
                width = size.x;  // çap ~ x
                height = size.z; // yanal varyasyon (yaklaşık aynı)
            } else { // horizontal
                length = size.z; // uzunluk Z
                // width orijinalde X ekseni boyunca scale edildi
                width = size.x; 
                height = size.y; // silindirin kalınlığı
            }
        } catch(e) {}
        const lengthAxis = orientation === 'vertical' ? 'y' : 'z';
        const basePos = object.position.clone();

    // Görünürlüğü artırmak için depthTest/Write kapat
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.85, depthTest: false, depthWrite: false });
    const minorMat = new THREE.LineBasicMaterial({ color: 0x0077cc, transparent: true, opacity: 0.45, depthTest: false, depthWrite: false });
        const textColor = '#00aaff';

        const makeLine = (start, end, material) => {
            const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
            return new THREE.Line(geo, material);
        };

    // Length markers every measurementStep metres (include 0m)
    const lengthStep = Math.max(1, this.measurementStep || 5);
        // 0m label
        {
            const d = 0;
            const ratio = d / length - 0.5;
            const offset = ratio * length;
            let pLabelPos;
            if (lengthAxis === 'z') {
                const yTop = basePos.y + height/2 + 0.02;
                pLabelPos = new THREE.Vector3(basePos.x + width/2 + 0.2, yTop, basePos.z + offset);
            } else {
                const zFront = basePos.z - height/2 - 0.02;
                pLabelPos = new THREE.Vector3(basePos.x + width/2 + 0.2, basePos.y + offset, zFront);
            }
            this._addSpriteLabel('0m', pLabelPos, textColor, group);
        }
        for (let d = lengthStep; d < length + 0.001; d += lengthStep) {
            const ratio = d / length - 0.5; // centered
            const offset = ratio * length;
            let p1, p2;
            if (lengthAxis === 'z') {
                // Çizgiyi tünelin üstünde hafif offset ile göster
                const yTop = basePos.y + height/2 + 0.02;
                p1 = new THREE.Vector3(basePos.x - width/2, yTop, basePos.z + offset);
                p2 = new THREE.Vector3(basePos.x + width/2, yTop, basePos.z + offset);
            } else { // vertical
                // Dikeyde: X genişliği boyunca, Z tarafında hafif offset
                const zFront = basePos.z - height/2 - 0.02;
                p1 = new THREE.Vector3(basePos.x - width/2, basePos.y + offset, zFront);
                p2 = new THREE.Vector3(basePos.x + width/2, basePos.y + offset, zFront);
            }
            const line = makeLine(p1, p2, lineMat);
            group.add(line);
            this._addSpriteLabel(`${d}m`, p2.clone().add(new THREE.Vector3(0.2,0.2,0)), textColor, group);
        }

        // Width & height minor grid every 0.5m at mid-length plane
        const wStep = 0.5;
        const hStep = 0.5;
        const midOffset = 0; // center plane
        for (let w = -width/2; w <= width/2 + 1e-3; w += wStep) {
            let s, e;
            if (lengthAxis === 'z') {
                const zMid = basePos.z + midOffset;
                s = new THREE.Vector3(basePos.x + w, basePos.y - height/2 + 0.01, zMid);
                e = new THREE.Vector3(basePos.x + w, basePos.y + height/2 + 0.01, zMid);
            } else {
                const zStart = basePos.z - height/2;
                s = new THREE.Vector3(basePos.x + w, basePos.y + midOffset, zStart + 0.01);
                e = new THREE.Vector3(basePos.x + w, basePos.y + midOffset, basePos.z + height/2 + 0.01);
            }
            group.add(makeLine(s,e, minorMat));
        }
        for (let h = -height/2; h <= height/2 + 1e-3; h += hStep) {
            let s, e;
            if (lengthAxis === 'z') {
                const zMid = basePos.z + midOffset;
                s = new THREE.Vector3(basePos.x - width/2, basePos.y + h, zMid + 0.01);
                e = new THREE.Vector3(basePos.x + width/2, basePos.y + h, zMid + 0.01);
            } else {
                const zFront = basePos.z - height/2 - 0.01;
                s = new THREE.Vector3(basePos.x - width/2, basePos.y + midOffset, zFront + h);
                e = new THREE.Vector3(basePos.x + width/2, basePos.y + midOffset, zFront + h);
            }
            group.add(makeLine(s,e, minorMat));
        }

        // Eksen etiketi (uzunluk ekseni)
        try {
            const axisLabel = lengthAxis === 'z' ? 'Z Ekseni' : 'Y Ekseni';
            const axisPos = lengthAxis === 'z'
                ? new THREE.Vector3(basePos.x + width/2 + 0.6, basePos.y + height/2 + 0.4, basePos.z)
                : new THREE.Vector3(basePos.x + width/2 + 0.6, basePos.y, basePos.z - height/2 - 0.6);
            this._addSpriteLabel(axisLabel, axisPos, '#ffaa00', group);
        } catch(e) { /* sessiz */ }
    }

    // Legacy tunnel edit panel methods removed (ensure/show/hide/revert/update/save).

    replaceTunnelGeometry(mesh, params) {
        if (!this.objectCreator) return; // objectCreator.createGeometry kullan
        if (params.orientation === 'yatay') params.orientation = 'horizontal';
        if (params.orientation === 'dikey') params.orientation = 'vertical';
        const newGeo = this.objectCreator.createGeometry('tunnel', params);
        if (mesh.geometry) mesh.geometry.dispose();
        mesh.geometry = newGeo;
        mesh.userData.parameters = { ...params };
        // Ölçüm çizgilerini yeniden kur
        if (this.measurementsEnabled) this.buildTunnelMeasurements(mesh, { type:'tunnel', parameters: params });
    }

    // Removed saveTunnelEdits (legacy panel functionality).

    _addSpriteLabel(text, position, color, parentGroup) {
        const canvas = document.createElement('canvas');
        const size = 256;
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0.0)';
        ctx.fillRect(0,0,size,size);
        ctx.fillStyle = color || '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, size/2, size/2);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.5,1.5,1.5);
        sprite.position.copy(position);
        parentGroup.add(sprite);
    }

    showPathDrawingUI(show) {
        console.log('[SimpleMine3DViewer] Path drawing UI:', show ? 'show' : 'hide');
        
        // Sol paneldeki "Yol Ayarları" kontrolü
        const pathControls = document.getElementById('path-controls');
        const pathButton = document.getElementById('draw-path-btn');
        const pathBtnText = document.getElementById('path-btn-text');
        
        if (show) {
            // Yol çizim modunu aç
            if (pathControls) {
                pathControls.style.display = 'block';
            }
            if (pathBtnText) {
                pathBtnText.textContent = 'Çizimi Bitir';
            }
            if (pathButton) {
                pathButton.classList.remove('btn-outline-warning');
                pathButton.classList.add('btn-warning');
            }
        } else {
            // Yol çizim modunu kapat
            if (pathControls) {
                pathControls.style.display = 'none';
            }
            if (pathBtnText) {
                pathBtnText.textContent = 'Yol Çiz';
            }
            if (pathButton) {
                pathButton.classList.remove('btn-warning');
                pathButton.classList.add('btn-outline-warning');
            }
        }

        // UI feedback ekle
        const existingOverlay = document.getElementById('path-drawing-overlay');
        
        if (show && !existingOverlay) {
            const overlay = document.createElement('div');
            overlay.id = 'path-drawing-overlay';
            overlay.innerHTML = `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                           background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px;
                           text-align: center; z-index: 1000;">
                    <h5>Yol Çizim Modu</h5>
                    <p>Yol noktalarını tıklayarak belirleyin</p>
                    <small>Enter: Tamamla | Escape: İptal</small>
                </div>
            `;
            this.container.appendChild(overlay);
        } else if (!show && existingOverlay) {
            existingOverlay.remove();
        }
    }

    showError(message) {
        // Basit error gösterimi
        const errorEl = document.getElementById('error-content');
        if (errorEl) {
            errorEl.textContent = message;
            const modal = new bootstrap.Modal(document.getElementById('errorModal'));
            modal.show();
        } else {
            alert(message);
        }
    }

    // Legacy object-info methods removed (showObjectInfo/hideObjectInfo).

    getTypeDisplayName(type) {
        const types = {
            tunnel: 'Tünel',
            road: 'Yol',
            rail: 'Ray',
            conveyor: 'Konveyör'
        };
        return types[type] || type;
    }

    editSelectedObject() {
        if (this.selectedObject) {
            const data = this.selectedObject.userData.objectData;
            console.log('[SimpleMine3DViewer] Editing object:', data);
            // TODO: Edit modal açılabilir
            alert('Düzenleme özelliği yakında gelecek!');
        }
    }

    deleteSelectedObject() {
        if (this.selectedObject) {
            if (confirm('Bu objeyi silmek istediğinizden emin misiniz?')) {
                this.objectSelector.deleteSelectedObject();
            }
        }
    }

    // ✨ İYİLEŞTİRİLMİŞ KAMERA PRESET'LERİ ✨
    setCameraPreset(preset) {
        switch (preset) {
            case 'overview':
                this.camera.position.set(25, 15, 35);
                this.controls.target.set(0, -2, 0);
                break;
            case 'side':
                this.camera.position.set(40, 0, 0);
                this.controls.target.set(0, -3, 0);
                break;
            case 'top':
                this.camera.position.set(0, 30, 0);
                this.controls.target.set(0, -3, 0);
                break;
            case 'underground':
                this.camera.position.set(10, -40, 25);
                this.controls.target.set(0, -45, 0);
                break;
            case 'close':
                this.camera.position.set(8, 2, 12);
                this.controls.target.set(0, -1, 0);
                break;
            default: // 'default'
                this.camera.position.set(15, 5, 25);
                this.controls.target.set(0, -3, 0);
        }
        this.controls.update();
    }

    // Smooth camera transition
    animateCameraTo(position, target, duration = 1500) {
        if (!this.camera || !this.controls) return;

        const startPos = this.camera.position.clone();
        const startTarget = this.controls.target.clone();
        const endPos = new THREE.Vector3().copy(position);
        const endTarget = new THREE.Vector3().copy(target);

        let startTime = null;

        const animate = (time) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeInOutCubic)
            const eased = progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

            // Interpolate position and target
            this.camera.position.lerpVectors(startPos, endPos, eased);
            this.controls.target.lerpVectors(startTarget, endTarget, eased);
            this.controls.update();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// Global olarak erişilebilir yap
window.SimpleMine3DViewer = SimpleMine3DViewer;
