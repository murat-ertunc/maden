export class MineAPI {
    constructor() {
        this.baseUrl = '/api/mines';
        this.token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    }

    async request(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.token,
                'X-Requested-With': 'XMLHttpRequest',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Sahne verilerini getir
    async getSceneData(mineId) {
        return this.request(`${this.baseUrl}/${mineId}/scene-data`);
    }

    // Model operasyonları
    async addModel(mineId, modelData) {
        return this.request(`${this.baseUrl}/${mineId}/models`, {
            method: 'POST',
            body: JSON.stringify(modelData)
        });
    }

    async updateModel(mineId, modelId, modelData) {
        return this.request(`${this.baseUrl}/${mineId}/models/${modelId}`, {
            method: 'PUT',
            body: JSON.stringify(modelData)
        });
    }

    async deleteModel(mineId, modelId) {
        return this.request(`${this.baseUrl}/${mineId}/models/${modelId}`, {
            method: 'DELETE'
        });
    }

    // Katman operasyonları
    async addLayer(mineId, layerData) {
        return this.request(`${this.baseUrl}/${mineId}/layers`, {
            method: 'POST',
            body: JSON.stringify(layerData)
        });
    }

    async updateLayer(mineId, layerId, layerData) {
        return this.request(`${this.baseUrl}/${mineId}/layers/${layerId}`, {
            method: 'PUT',
            body: JSON.stringify(layerData)
        });
    }

    async deleteLayer(mineId, layerId) {
        return this.request(`${this.baseUrl}/${mineId}/layers/${layerId}`, {
            method: 'DELETE'
        });
    }

    // Konfigürasyon güncelleme
    async updateConfiguration(mineId, config) {
        return this.request(`${this.baseUrl}/${mineId}/configuration`, {
            method: 'PUT',
            body: JSON.stringify(config)
        });
    }
}
