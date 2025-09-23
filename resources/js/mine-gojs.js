// Mine GoJS System - Maden Sistemleri için GoJS Entegrasyonu
// GoJS v3.0.26 kullanarak diagram ve flowchart sistemi

import * as go from 'gojs';

class MineGoJSSystem {
    constructor(containerElementId) {
        this.containerElementId = containerElementId;
        this.diagram = null;
        this.init();
    }

    init() {
        console.log('🗂️ GoJS Maden Sistemi başlatılıyor...');
        
        // GoJS lisans ayarları (geliştirme için)
        // Prodüksiyon için geçerli lisans gereklidir
        
        this.initDiagram();
        this.setupNodeTemplates();
        this.setupLinkTemplates();
        
        console.log('✅ GoJS Maden Sistemi başarıyla başlatıldı!');
    }

    initDiagram() {
        const $ = go.GraphObject.make;
        
        this.diagram = $(go.Diagram, this.containerElementId, {
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, {
                angle: 90,
                layerSpacing: 35
            })
        });
    }

    setupNodeTemplates() {
        const $ = go.GraphObject.make;
        
        // Mine node template
        this.diagram.nodeTemplate = $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", {
                strokeWidth: 0,
                fill: "lightblue"
            }),
            $(go.TextBlock, {
                margin: 8,
                stroke: "#333",
                font: "bold 14px sans-serif"
            },
            new go.Binding("text", "name"))
        );
    }

    setupLinkTemplates() {
        const $ = go.GraphObject.make;
        
        this.diagram.linkTemplate = $(go.Link,
            {
                routing: go.Link.Orthogonal,
                corner: 5
            },
            $(go.Shape, {
                strokeWidth: 3,
                stroke: "#555"
            })
        );
    }

    // Sample mine data structure for testing
    getSampleData() {
        return {
            "nodeDataArray": [
                { "key": 1, "name": "Ana Maden", "category": "mine" },
                { "key": 2, "name": "Kömür Katmanı", "category": "layer", "parent": 1 },
                { "key": 3, "name": "Demir Katmanı", "category": "layer", "parent": 1 },
                { "key": 4, "name": "Ana Tünel", "category": "tunnel", "parent": 1 },
                { "key": 5, "name": "Yan Galeri", "category": "tunnel", "parent": 4 }
            ],
            "linkDataArray": [
                { "from": 1, "to": 2 },
                { "from": 1, "to": 3 },
                { "from": 1, "to": 4 },
                { "from": 4, "to": 5 }
            ]
        };
    }

    loadData(data) {
        this.diagram.model = new go.GraphLinksModel(data.nodeDataArray, data.linkDataArray);
    }

    // Load sample data for testing
    loadSampleData() {
        this.loadData(this.getSampleData());
    }
}

// Global window objesine ekle
window.MineGoJSSystem = MineGoJSSystem;

export default MineGoJSSystem;
