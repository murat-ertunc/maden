import * as dat from 'dat.gui';

export default class MineControlPanel {
    constructor(scene, modelManager, layerManager) {
        this.scene = scene;
        this.modelManager = modelManager;
        this.layerManager = layerManager;
        this.gui = null;
        this.panels = {};
        
        // Control state
        this.state = {
            // Layer controls
            layerOpacity: 0.7,
            layerWireframe: false,
            showLayers: true,
            
            // Model controls
            showModels: true,
            
            // Scene controls
            enableShadows: true,
            showGrid: true,
            showAxes: true,
            
            // Camera controls
            cameraSpeed: 1.0,
            
            // Cross section
            crossSectionEnabled: false,
            crossSectionPosition: 0,
            
            // Selected object
            selectedObject: null
        };
        
        this.setupEventListeners();
    }

    init() {
        this.createGUI();
        this.createSceneControls();
        this.createLayerControls();
        this.createModelControls();
        this.createToolsPanel();
        this.createInfoPanel();
    }

    createGUI() {
        this.gui = new dat.GUI({ 
            autoPlace: false,
            width: 300,
            closed: false
        });
        
        // GUI'yi belirli bir konuma yerleştir
        this.gui.domElement.style.position = 'absolute';
        this.gui.domElement.style.top = '10px';
        this.gui.domElement.style.right = '10px';
        this.gui.domElement.style.zIndex = '1000';
        
        // Container'a ekle
        this.scene.container.style.position = 'relative';
        this.scene.container.appendChild(this.gui.domElement);
    }

    createSceneControls() {
        const sceneFolder = this.gui.addFolder('Sahne Ayarları');
        this.panels.scene = sceneFolder;
        
        sceneFolder.add(this.state, 'enableShadows')
            .name('Gölgeler')
            .onChange((value) => {
                this.scene.renderer.shadowMap.enabled = value;
            });
            
        sceneFolder.add(this.state, 'showGrid')
            .name('Grid')
            .onChange((value) => {
                const grid = this.scene.scene.getObjectByName('GridHelper');
                if (grid) grid.visible = value;
            });
            
        sceneFolder.add(this.state, 'showAxes')
            .name('Eksenler')
            .onChange((value) => {
                const axes = this.scene.scene.getObjectByName('AxesHelper');
                if (axes) axes.visible = value;
            });
            
        sceneFolder.add(this.state, 'cameraSpeed', 0.1, 3.0)
            .name('Kamera Hızı')
            .onChange((value) => {
                this.scene.controls.dampingFactor = 0.05 / value;
            });
            
        // Background color
        const bgColor = { color: this.scene.scene.background.getHex() };
        sceneFolder.addColor(bgColor, 'color')
            .name('Arkaplan')
            .onChange((value) => {
                this.scene.scene.background.setHex(value);
            });
            
        sceneFolder.open();
    }

    createLayerControls() {
        const layerFolder = this.gui.addFolder('Katman Ayarları');
        this.panels.layers = layerFolder;
        
        layerFolder.add(this.state, 'showLayers')
            .name('Katmanları Göster')
            .onChange((value) => {
                this.layerManager.getAllLayers().forEach(layer => {
                    layer.mesh.visible = value && layer.data.visible;
                });
            });
            
        layerFolder.add(this.state, 'layerOpacity', 0, 1, 0.1)
            .name('Saydamlık')
            .onChange((value) => {
                this.layerManager.setOpacity(value);
            });
            
        layerFolder.add(this.state, 'layerWireframe')
            .name('Wireframe')
            .onChange((value) => {
                this.layerManager.setWireframe(value);
            });
            
        // Cross section controls
        const crossSectionFolder = layerFolder.addFolder('Kesit Görünümü');
        
        crossSectionFolder.add(this.state, 'crossSectionEnabled')
            .name('Kesit Aktif')
            .onChange((value) => {
                if (value) {
                    this.enableCrossSection();
                } else {
                    this.disableCrossSection();
                }
            });
            
        crossSectionFolder.add(this.state, 'crossSectionPosition', -50, 50, 1)
            .name('Kesit Pozisyonu')
            .onChange((value) => {
                if (this.state.crossSectionEnabled) {
                    this.updateCrossSection(value);
                }
            });
            
        // Layer templates
        const templates = this.layerManager.getLayerTemplates();
        const templateNames = Object.keys(templates);
        const templateControl = { template: templateNames[0] };
        
        layerFolder.add(templateControl, 'template', templateNames)
            .name('Şablon Seç');
            
        layerFolder.add({ addLayer: () => this.addLayerFromTemplate(templateControl.template) }, 'addLayer')
            .name('Katman Ekle');
            
        layerFolder.open();
    }

    createModelControls() {
        const modelFolder = this.gui.addFolder('Model Ayarları');
        this.panels.models = modelFolder;
        
        modelFolder.add(this.state, 'showModels')
            .name('Modelleri Göster')
            .onChange((value) => {
                this.modelManager.getAllModels().forEach(model => {
                    model.mesh.visible = value && model.data.visible;
                });
            });
            
        // Model templates
        const templates = this.modelManager.getModelTemplates();
        const templateNames = Object.keys(templates);
        const templateControl = { template: templateNames[0] };
        
        modelFolder.add(templateControl, 'template', templateNames)
            .name('Şablon Seç');
            
        modelFolder.add({ addModel: () => this.addModelFromTemplate(templateControl.template) }, 'addModel')
            .name('Model Ekle');
            
        modelFolder.open();
    }

    createToolsPanel() {
        const toolsFolder = this.gui.addFolder('Araçlar');
        this.panels.tools = toolsFolder;
        
        toolsFolder.add({ resetCamera: () => this.resetCamera() }, 'resetCamera')
            .name('Kamerayı Sıfırla');
            
        toolsFolder.add({ exportScene: () => this.exportScene() }, 'exportScene')
            .name('Sahneyi Dışa Aktar');
            
        toolsFolder.add({ saveConfiguration: () => this.saveConfiguration() }, 'saveConfiguration')
            .name('Ayarları Kaydet');
            
        toolsFolder.add({ toggleFullscreen: () => this.toggleFullscreen() }, 'toggleFullscreen')
            .name('Tam Ekran');
            
        toolsFolder.open();
    }

    createInfoPanel() {
        const infoFolder = this.gui.addFolder('Bilgi');
        this.panels.info = infoFolder;
        
        // Performance info
        const perfInfo = {
            fps: '60',
            objects: '0',
            triangles: '0'
        };
        
        this.infoControls = {
            fps: infoFolder.add(perfInfo, 'fps').name('FPS').listen(),
            objects: infoFolder.add(perfInfo, 'objects').name('Objeler').listen(),
            triangles: infoFolder.add(perfInfo, 'triangles').name('Üçgenler').listen()
        };
        
        // Update info periodically
        setInterval(() => {
            this.updatePerformanceInfo(perfInfo);
        }, 1000);
        
        infoFolder.open();
    }

    setupEventListeners() {
        // Object selection
        this.scene.onObjectSelect = (object) => {
            this.state.selectedObject = object;
            this.updateObjectControls(object);
        };
        
        // Object hover
        this.scene.onObjectHover = (object) => {
            // Show hover info
            this.showHoverInfo(object);
        };
    }

    updateObjectControls(object) {
        // Remove existing object controls
        if (this.panels.objectControls) {
            this.gui.removeFolder(this.panels.objectControls);
        }
        
        if (!object) return;
        
        // Create new object controls
        const objectFolder = this.gui.addFolder('Seçili Obje');
        this.panels.objectControls = objectFolder;
        
        const data = object.userData.data;
        const isModel = object.userData.type === 'model';
        
        // Common controls
        objectFolder.add(data, 'name').name('İsim').onChange((value) => {
            this.updateObjectProperty(object, 'name', value);
        });
        
        if (isModel) {
            // Model-specific controls
            const position = object.position;
            const rotation = object.rotation;
            const scale = object.scale;
            
            // Position controls
            const posFolder = objectFolder.addFolder('Pozisyon');
            posFolder.add(position, 'x', -50, 50, 0.1).onChange(() => this.updateModelPosition(object));
            posFolder.add(position, 'y', -50, 50, 0.1).onChange(() => this.updateModelPosition(object));
            posFolder.add(position, 'z', -50, 50, 0.1).onChange(() => this.updateModelPosition(object));
            
            // Rotation controls
            const rotFolder = objectFolder.addFolder('Rotasyon');
            rotFolder.add(rotation, 'x', 0, Math.PI * 2, 0.1).onChange(() => this.updateModelRotation(object));
            rotFolder.add(rotation, 'y', 0, Math.PI * 2, 0.1).onChange(() => this.updateModelRotation(object));
            rotFolder.add(rotation, 'z', 0, Math.PI * 2, 0.1).onChange(() => this.updateModelRotation(object));
            
            // Scale controls
            const scaleFolder = objectFolder.addFolder('Ölçek');
            scaleFolder.add(scale, 'x', 0.1, 5, 0.1).onChange(() => this.updateModelScale(object));
            scaleFolder.add(scale, 'y', 0.1, 5, 0.1).onChange(() => this.updateModelScale(object));
            scaleFolder.add(scale, 'z', 0.1, 5, 0.1).onChange(() => this.updateModelScale(object));
        } else {
            // Layer-specific controls
            objectFolder.add(data, 'mineral_type').name('Mineral Türü').onChange((value) => {
                this.updateObjectProperty(object, 'mineral_type', value);
            });
            
            objectFolder.add(data, 'depth_from').name('Başlangıç Derinliği').onChange((value) => {
                this.updateObjectProperty(object, 'depth_from', value);
            });
            
            objectFolder.add(data, 'depth_to').name('Bitiş Derinliği').onChange((value) => {
                this.updateObjectProperty(object, 'depth_to', value);
            });
        }
        
        // Visibility control
        objectFolder.add(object, 'visible').name('Görünür').onChange((value) => {
            this.updateObjectProperty(object, 'visible', value);
        });
        
        // Delete button
        objectFolder.add({ delete: () => this.deleteObject(object) }, 'delete')
            .name('Sil');
            
        objectFolder.open();
    }

    // Object manipulation methods
    updateModelPosition(object) {
        const position = [object.position.x, object.position.y, object.position.z];
        this.modelManager.updateModel(object.userData.id, { position });
    }

    updateModelRotation(object) {
        const rotation = [object.rotation.x, object.rotation.y, object.rotation.z];
        this.modelManager.updateModel(object.userData.id, { rotation });
    }

    updateModelScale(object) {
        const scale = [object.scale.x, object.scale.y, object.scale.z];
        this.modelManager.updateModel(object.userData.id, { scale });
    }

    updateObjectProperty(object, property, value) {
        const updateData = { [property]: value };
        
        if (object.userData.type === 'model') {
            this.modelManager.updateModel(object.userData.id, updateData);
        } else {
            this.layerManager.updateLayer(object.userData.id, updateData);
        }
    }

    deleteObject(object) {
        if (confirm('Bu objeyi silmek istediğinizden emin misiniz?')) {
            if (object.userData.type === 'model') {
                this.modelManager.removeModel(object.userData.id);
            } else {
                this.layerManager.removeLayer(object.userData.id);
            }
            
            this.updateObjectControls(null);
        }
    }

    // Template methods
    async addLayerFromTemplate(templateName) {
        try {
            const templates = this.layerManager.getLayerTemplates();
            const template = templates[templateName];
            
            if (!template) return;
            
            const layerData = {
                name: template.name + ` ${Date.now()}`,
                mineral_type: template.mineral_type,
                depth_from: 0,
                depth_to: 5,
                color: template.color,
                density: template.density,
                grade: template.grade,
                visible: true
            };
            
            await this.layerManager.addLayer(layerData);
        } catch (error) {
            console.error('Katman eklenirken hata:', error);
            alert('Katman eklenirken bir hata oluştu: ' + error.message);
        }
    }

    async addModelFromTemplate(templateName) {
        try {
            const templates = this.modelManager.getModelTemplates();
            const template = templates[templateName];
            
            if (!template) return;
            
            const modelData = {
                name: template.name + ` ${Date.now()}`,
                type: template.type,
                geometry: template.geometry,
                material: template.material,
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
                visible: true
            };
            
            await this.modelManager.addModel(modelData);
        } catch (error) {
            console.error('Model eklenirken hata:', error);
            alert('Model eklenirken bir hata oluştu: ' + error.message);
        }
    }

    // Cross section methods
    enableCrossSection() {
        const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        this.layerManager.createCrossSection(plane);
    }

    disableCrossSection() {
        this.layerManager.removeCrossSection();
    }

    updateCrossSection(position) {
        const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), -position);
        this.layerManager.createCrossSection(plane);
    }

    // Utility methods
    resetCamera() {
        this.scene.camera.position.set(0, 10, 20);
        this.scene.controls.target.set(0, 0, 0);
        this.scene.controls.update();
    }

    exportScene() {
        const sceneData = this.scene.saveConfiguration();
        const dataStr = JSON.stringify(sceneData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'mine_scene.json';
        link.click();
    }

    saveConfiguration() {
        // API üzerinden konfigürasyonu kaydet
        const config = this.scene.saveConfiguration();
        // TODO: API call to save configuration
        console.log('Configuration saved:', config);
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.scene.container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    updatePerformanceInfo(perfInfo) {
        // FPS hesapla (basit implementasyon)
        perfInfo.fps = Math.round(1000 / 16).toString(); // Placeholder
        
        // Object sayısı
        perfInfo.objects = this.scene.scene.children.length.toString();
        
        // Triangle sayısı (yaklaşık)
        let triangles = 0;
        this.scene.scene.traverse((object) => {
            if (object.geometry) {
                triangles += object.geometry.attributes.position ? 
                    object.geometry.attributes.position.count / 3 : 0;
            }
        });
        perfInfo.triangles = Math.round(triangles).toString();
    }

    showHoverInfo(object) {
        // TODO: Show hover tooltip with object info
        if (object) {
            const data = object.userData.data;
            console.log('Hovering over:', data.name);
        }
    }

    destroy() {
        if (this.gui) {
            this.gui.destroy();
            this.scene.container.removeChild(this.gui.domElement);
        }
    }
}
