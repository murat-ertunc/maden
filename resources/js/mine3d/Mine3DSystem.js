// 3D Maden Modülleri
import MineScene from './components/MineScene.js';
import MineModelManager from './components/MineModelManager.js';
import MineLayerManager from './components/MineLayerManager.js';
import MineControlPanel from './components/MineControlPanel.js';

// API yardımcı fonksiyonları
import { MineAPI } from './utils/api.js';

class Mine3DSystem {
    constructor(containerId, mineId) {
        this.containerId = containerId;
        this.mineId = mineId;
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }

        this.api = new MineAPI();
        this.scene = null;
        this.modelManager = null;
        this.layerManager = null;
        this.controlPanel = null;
        
        this.init();
    }

    async init() {
        try {
            // Loading göster
            this.showLoading();
            
            // Sahne verilerini yükle
            const sceneData = await this.api.getSceneData(this.mineId);
            
            // 3D Sahneyi başlat
            this.scene = new MineScene(this.container, sceneData.configuration);
            
            // Yöneticileri başlat
            this.modelManager = new MineModelManager(this.scene, this.api, this.mineId);
            this.layerManager = new MineLayerManager(this.scene, this.api, this.mineId);
            this.controlPanel = new MineControlPanel(this.scene, this.modelManager, this.layerManager);
            
            // Verileri yükle
            await this.loadSceneData(sceneData);
            
            // Control panel'i başlat
            this.controlPanel.init();
            
            // Loading'i gizle
            this.hideLoading();
            
            console.log('Mine 3D System initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Mine 3D System:', error);
            this.showError('3D sahne yüklenirken bir hata oluştu: ' + error.message);
        }
    }

    async loadSceneData(sceneData) {
        // Katmanları yükle
        if (sceneData.layers && sceneData.layers.length > 0) {
            await this.layerManager.loadLayers(sceneData.layers);
        }
        
        // Modelleri yükle
        if (sceneData.models && sceneData.models.length > 0) {
            await this.modelManager.loadModels(sceneData.models);
        }
    }

    showLoading() {
        this.container.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 500px;">
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Yükleniyor...</span>
                    </div>
                    <div class="mt-3">3D Sahne yükleniyor...</div>
                </div>
            </div>
        `;
    }

    hideLoading() {
        // Loading HTML'ini temizle - scene kendi container'ını oluşturacak
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h5 class="alert-heading">Hata!</h5>
                <p>${message}</p>
                <button class="btn btn-outline-danger" onclick="location.reload()">
                    Tekrar Dene
                </button>
            </div>
        `;
    }

    // Public metodlar
    addModel(modelData) {
        return this.modelManager.addModel(modelData);
    }

    addLayer(layerData) {
        return this.layerManager.addLayer(layerData);
    }

    saveScene() {
        return this.scene.saveConfiguration();
    }

    exportScene() {
        return this.scene.exportData();
    }

    destroy() {
        if (this.scene) {
            this.scene.destroy();
        }
        if (this.controlPanel) {
            this.controlPanel.destroy();
        }
    }
}

// Global olarak erişilebilir yap
window.Mine3DSystem = Mine3DSystem;

export default Mine3DSystem;
