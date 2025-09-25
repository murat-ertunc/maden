// Tunnel Designer - GoJS ile Profesyonel Tünel Tasarım Sistemi
// Madencilik projesi için detaylı tünel çizim ve yönetim sistemi

import * as go from 'gojs';

class TunnelDesigner {
    constructor(containerElementId, options = {}) {
        this.containerElementId = containerElementId;
        this.diagram = null;
        this.isDrawing = false;
        this.currentTunnel = null;
        this.drawingMode = 'tunnel'; // tunnel, station, branch
        
        // Konfigürasyon
        this.config = {
            gridSize: 0.5, // 0.5 metre grid snap
            defaultTunnelWidth: 3.0, // metre
            defaultTunnelHeight: 3.0, // metre
            defaultCrossSectionType: 'circle', // circle, square, rectangle, horseshoe
            showMeasurements: true,
            showGrid: true,
            snapToGrid: true,
            ...options
        };
        
        // Veri depolama
        this.tunnelData = {
            segments: new Map(),
            stations: new Map(),
            branches: new Map(),
            measurements: new Map()
        };
        
        // Event callback'leri
        this.onTunnelCreated = null;
        this.onTunnelModified = null;
        this.onStationAdded = null;
        
        this.init();
    }

    init() {
        console.log('🚇 Tunnel Designer başlatılıyor...');
        this.setupDiagram();
        this.setupTemplates();
        this.setupTools();
        this.setupEventHandlers();
        console.log('✅ Tunnel Designer hazır!');
    }

    setupDiagram() {
        const $ = go.GraphObject.make;
        
        this.diagram = $(go.Diagram, this.containerElementId, {
            // Temel ayarlar
            "undoManager.isEnabled": true,
            "grid.visible": this.config.showGrid,
            "grid.gridCellSize": new go.Size(this.config.gridSize * 20, this.config.gridSize * 20), // 20px = 1m
            "allowDrop": true,
            "allowClipboard": false,
            
            // Mouse ve selection ayarları
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
            "initialContentAlignment": go.Spot.Center,
            "initialAutoScale": go.Diagram.Uniform,
            
            // Layout - Manuel konumlandırma için
            layout: $(go.Layout),
            
            // Arka plan ayarları
            "animationManager.isEnabled": false,
            "SelectionMoved": this.onSelectionMoved.bind(this),
            "Modified": this.onDiagramModified.bind(this)
        });
        
        // Grid ayarları
        if (this.config.showGrid) {
            this.diagram.grid = $(go.Panel, "Grid",
                $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
                $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
                $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 1, interval: 5 }),
                $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 1, interval: 5 })
            );
        }
    }

    setupTemplates() {
        this.setupTunnelSegmentTemplate();
        this.setupStationTemplate();
        this.setupMeasurementTemplate();
        this.setupLinkTemplate();
    }

    setupTunnelSegmentTemplate() {
        const $ = go.GraphObject.make;
        
        // Tünel segmenti template'i
        this.diagram.nodeTemplateMap.add("tunnel_segment", 
            $(go.Node, "Spot",
                {
                    locationSpot: go.Spot.Center,
                    selectionAdorned: true,
                    resizable: true,
                    rotatable: true,
                    dragComputation: this.snapToGrid.bind(this),
                    mouseDrop: this.onNodeDrop.bind(this)
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                new go.Binding("angle", "rotation").makeTwoWay(),
                
                // Ana tünel şekli
                $(go.Shape, {
                    name: "TUNNEL_SHAPE",
                    width: 60, // 3m * 20px/m
                    height: 20, // Tünel kalınlığı görsel
                    fill: "lightblue",
                    stroke: "darkblue",
                    strokeWidth: 2
                },
                new go.Binding("figure", "crossSectionType", this.getCrossSectionFigure.bind(this)),
                new go.Binding("width", "width", (w) => w * 20), // metre to pixel
                new go.Binding("height", "height", (h) => Math.max(h * 4, 20)), // Görsel yükseklik
                new go.Binding("fill", "material", this.getMaterialColor.bind(this)),
                new go.Binding("stroke", "selected", (s) => s ? "red" : "darkblue")
                ),
                
                // Tünel ID/adı
                $(go.TextBlock, {
                    alignment: go.Spot.Top,
                    alignmentFocus: go.Spot.Bottom,
                    margin: 5,
                    font: "12px sans-serif",
                    stroke: "black"
                },
                new go.Binding("text", "name")
                ),
                
                // Boyut bilgisi
                $(go.TextBlock, {
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top,
                    margin: 5,
                    font: "10px sans-serif",
                    stroke: "darkblue"
                },
                new go.Binding("text", "", this.getSegmentInfo.bind(this))
                )
            )
        );
    }

    setupStationTemplate() {
        const $ = go.GraphObject.make;
        
        // Madenci istasyonu template'i
        this.diagram.nodeTemplateMap.add("miner_station",
            $(go.Node, "Auto",
                {
                    locationSpot: go.Spot.Center,
                    dragComputation: this.snapToGrid.bind(this)
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                
                $(go.Shape, "Circle", {
                    width: 30,
                    height: 30,
                    fill: "yellow",
                    stroke: "orange",
                    strokeWidth: 2
                }),
                
                $(go.TextBlock, {
                    margin: 2,
                    font: "10px sans-serif",
                    stroke: "black"
                },
                new go.Binding("text", "stationId")
                )
            )
        );
    }

    setupMeasurementTemplate() {
        const $ = go.GraphObject.make;
        
        // Ölçüm template'i
        this.diagram.nodeTemplateMap.add("measurement",
            $(go.Node,
                {
                    selectable: false,
                    avoidable: false
                },
                new go.Binding("location", "position", go.Point.parse),
                
                $(go.TextBlock, {
                    font: "bold 11px sans-serif",
                    stroke: "blue",
                    background: "white",
                    margin: 2
                },
                new go.Binding("text", "measurement")
                )
            )
        );
    }

    setupLinkTemplate() {
        const $ = go.GraphObject.make;
        
        // Tünel bağlantı template'i
        this.diagram.linkTemplate = $(go.Link,
            {
                routing: go.Link.Orthogonal,
                corner: 0,
                selectable: true,
                reshapable: true
            },
            new go.Binding("points").makeTwoWay(),
            
            $(go.Shape, {
                strokeWidth: 4,
                stroke: "darkblue"
            },
            new go.Binding("stroke", "tunnelType", this.getTunnelTypeColor.bind(this))
            ),
            
            // Ok ucu (yön göstergesi)
            $(go.Shape, {
                toArrow: "Standard",
                fill: "darkblue",
                stroke: null,
                scale: 1.5
            })
        );
    }

    setupTools() {
        // Özel çizim aracı
        this.setupDrawingTool();
        this.setupMeasurementTool();
        this.setupEditingTools();
    }

    setupDrawingTool() {
        const $ = go.GraphObject.make;
        
        // Tünel çizim aracı
        this.diagram.toolManager.mouseMoveTools.insertAt(0, 
            $(DrawingTool, {
                name: "TunnelDrawing",
                designer: this
            })
        );
    }

    setupMeasurementTool() {
        // Ölçüm aracı - iki nokta arası mesafe
        // Bu tool aktif olduğunda iki tıklama arası mesafeyi gösterir
    }

    setupEditingTools() {
        // Düzenleme araçları - segment uzatma, kısaltma, bölme
    }

    setupEventHandlers() {
        // Diagram event'leri
        this.diagram.addDiagramListener("BackgroundSingleClicked", this.onBackgroundClick.bind(this));
        this.diagram.addDiagramListener("ObjectSingleClicked", this.onObjectClick.bind(this));
        this.diagram.addDiagramListener("SelectionDeleted", this.onSelectionDeleted.bind(this));
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        // T: Tünel çizim modu
        // S: İstasyon ekleme modu  
        // M: Ölçüm modu
        // ESC: Çizim modunu sonlandır
        // DEL: Seçili objeyi sil
        
        document.addEventListener('keydown', (e) => {
            if (!this.diagram.div.contains(document.activeElement)) return;
            
            switch(e.key.toLowerCase()) {
                case 't':
                    this.setDrawingMode('tunnel');
                    break;
                case 's':
                    this.setDrawingMode('station');
                    break;
                case 'm':
                    this.setDrawingMode('measurement');
                    break;
                case 'escape':
                    this.exitDrawingMode();
                    break;
                case 'delete':
                    this.deleteSelected();
                    break;
            }
        });
    }

    // Yardımcı metodlar
    snapToGrid(diagram, node, point) {
        if (!this.config.snapToGrid) return point;
        
        const gridSize = this.config.gridSize * 20; // pixel cinsinden
        return new go.Point(
            Math.round(point.x / gridSize) * gridSize,
            Math.round(point.y / gridSize) * gridSize
        );
    }

    getCrossSectionFigure(type) {
        switch(type) {
            case 'circle': return 'Circle';
            case 'square': return 'Square';
            case 'rectangle': return 'Rectangle';
            case 'horseshoe': return 'RoundedRectangle';
            default: return 'Circle';
        }
    }

    getMaterialColor(material) {
        const colors = {
            'concrete': 'lightgray',
            'steel': 'silver', 
            'rock': 'brown',
            'reinforced': 'darkgray'
        };
        return colors[material] || 'lightblue';
    }

    getTunnelTypeColor(type) {
        const colors = {
            'main': 'darkblue',
            'branch': 'green',
            'emergency': 'red',
            'ventilation': 'cyan'
        };
        return colors[type] || 'darkblue';
    }

    getSegmentInfo(data) {
        return `${data.width}m × ${data.height}m\nL: ${data.length?.toFixed(1) || '0.0'}m`;
    }

    // Event handlers
    onBackgroundClick(e) {
        if (this.isDrawing) {
            this.addTunnelPoint(e.diagram.lastInput.documentPoint);
        }
    }

    onObjectClick(e) {
        const obj = e.subject.part;
        if (obj && obj.data) {
            this.selectObject(obj.data);
        }
    }

    onSelectionMoved(e) {
        // Seçili obje taşındığında ölçümleri güncelle
        this.updateMeasurements();
    }

    onDiagramModified(e) {
        // Diagram değiştiğinde callback çağır
        if (this.onTunnelModified) {
            this.onTunnelModified(this.getTunnelData());
        }
    }

    onSelectionDeleted(e) {
        // Silinen objeler için cleanup
        e.subject.each(obj => {
            if (obj.data && obj.data.category === 'tunnel_segment') {
                this.tunnelData.segments.delete(obj.data.key);
            }
        });
    }

    onNodeDrop(e, node) {
        // Drag & drop işlemleri
    }

    // API metodları
    setDrawingMode(mode) {
        this.drawingMode = mode;
        this.isDrawing = true;
        this.diagram.div.style.cursor = 'crosshair';
        console.log(`📐 Çizim modu: ${mode}`);
    }

    exitDrawingMode() {
        this.isDrawing = false;
        this.drawingMode = null;
        this.currentTunnel = null;
        this.diagram.div.style.cursor = 'default';
        console.log('🔚 Çizim modu sonlandırıldı');
    }

    addTunnelPoint(point) {
        // Tünel noktası ekleme mantığı
        if (this.drawingMode !== 'tunnel') return;
        
        const snappedPoint = this.snapToGrid(this.diagram, null, point);
        console.log(`📍 Tünel noktası eklendi: ${snappedPoint.x}, ${snappedPoint.y}`);
        
        // İlk nokta ise yeni tünel segmenti başlat
        if (!this.currentTunnel) {
            this.startNewTunnelSegment(snappedPoint);
        } else {
            this.completeTunnelSegment(snappedPoint);
        }
    }

    startNewTunnelSegment(startPoint) {
        this.currentTunnel = {
            startPoint: startPoint,
            segmentId: this.generateSegmentId(),
            width: this.config.defaultTunnelWidth,
            height: this.config.defaultTunnelHeight,
            crossSectionType: this.config.defaultCrossSectionType
        };
        
        console.log('🚇 Yeni tünel segmenti başlatıldı');
    }

    completeTunnelSegment(endPoint) {
        if (!this.currentTunnel) return;
        
        const segment = {
            key: this.currentTunnel.segmentId,
            category: 'tunnel_segment',
            name: `T-${this.currentTunnel.segmentId}`,
            position: go.Point.stringify(this.currentTunnel.startPoint),
            width: this.currentTunnel.width,
            height: this.currentTunnel.height,
            crossSectionType: this.currentTunnel.crossSectionType,
            length: this.calculateDistance(this.currentTunnel.startPoint, endPoint),
            angle: this.calculateAngle(this.currentTunnel.startPoint, endPoint),
            material: 'concrete',
            tunnelType: 'main'
        };
        
        // Segmenti diyagrama ekle
        this.diagram.model.addNodeData(segment);
        
        // Veri deposuna kaydet
        this.tunnelData.segments.set(segment.key, segment);
        
        // Ölçüm ekle
        this.addMeasurement(this.currentTunnel.startPoint, endPoint, segment.length);
        
        console.log(`✅ Tünel segmenti tamamlandı: ${segment.length.toFixed(2)}m`);
        
        // Callback çağır
        if (this.onTunnelCreated) {
            this.onTunnelCreated(segment);
        }
        
        // Bir sonraki segment için hazırlık
        this.currentTunnel = null;
    }

    addMeasurement(point1, point2, distance) {
        if (!this.config.showMeasurements) return;
        
        const midPoint = new go.Point(
            (point1.x + point2.x) / 2,
            (point1.y + point2.y) / 2
        );
        
        const measurement = {
            key: this.generateMeasurementId(),
            category: 'measurement',
            position: go.Point.stringify(midPoint),
            measurement: `${distance.toFixed(2)}m`
        };
        
        this.diagram.model.addNodeData(measurement);
        this.tunnelData.measurements.set(measurement.key, measurement);
    }

    calculateDistance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const pixelDistance = Math.sqrt(dx * dx + dy * dy);
        return pixelDistance / 20; // pixel to metre
    }

    calculateAngle(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    generateSegmentId() {
        return `seg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    }

    generateMeasurementId() {
        return `meas_${Date.now()}_${Math.random().toString(36).substr(2, 3)}`;
    }

    // Veri alma metodları
    getTunnelData() {
        return {
            segments: Array.from(this.tunnelData.segments.values()),
            stations: Array.from(this.tunnelData.stations.values()),
            measurements: Array.from(this.tunnelData.measurements.values())
        };
    }

    exportTunnelData() {
        return JSON.stringify(this.getTunnelData(), null, 2);
    }

    importTunnelData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.loadTunnelData(data);
        } catch (error) {
            console.error('❌ Veri import hatası:', error);
        }
    }

    loadTunnelData(data) {
        // Mevcut veriyi temizle
        this.diagram.model.nodeDataArray = [];
        this.tunnelData.segments.clear();
        this.tunnelData.stations.clear();
        this.tunnelData.measurements.clear();
        
        // Yeni veriyi yükle
        const allNodes = [
            ...(data.segments || []),
            ...(data.stations || []),
            ...(data.measurements || [])
        ];
        
        this.diagram.model = new go.GraphLinksModel(allNodes);
        
        // Veri deposunu güncelle
        data.segments?.forEach(seg => this.tunnelData.segments.set(seg.key, seg));
        data.stations?.forEach(sta => this.tunnelData.stations.set(sta.key, sta));
        data.measurements?.forEach(meas => this.tunnelData.measurements.set(meas.key, meas));
        
        console.log('✅ Tünel verisi yüklendi');
    }

    updateMeasurements() {
        // Tüm ölçümleri güncelle (segment'ler taşındığında)
        // Bu gelişmiş bir özellik olarak sonra implementasyonu yapılabilir
    }

    deleteSelected() {
        this.diagram.commandHandler.deleteSelection();
    }

    selectObject(data) {
        console.log('🎯 Seçilen obje:', data);
    }

    // Test metodları
    createSampleTunnel() {
        const sampleData = {
            segments: [
                {
                    key: "sample_1",
                    category: "tunnel_segment",
                    name: "Ana Tünel 1",
                    position: "100 100",
                    width: 3.0,
                    height: 3.0,
                    length: 26.49,
                    angle: 0,
                    crossSectionType: "circle",
                    material: "concrete",
                    tunnelType: "main"
                },
                {
                    key: "sample_2", 
                    category: "tunnel_segment",
                    name: "Ana Tünel 2",
                    position: "300 150",
                    width: 3.0,
                    height: 3.0,
                    length: 13.13,
                    angle: 45,
                    crossSectionType: "circle",
                    material: "concrete",
                    tunnelType: "main"
                }
            ],
            measurements: [
                {
                    key: "meas_1",
                    category: "measurement",
                    position: "200 125",
                    measurement: "26.49m"
                }
            ]
        };
        
        this.loadTunnelData(sampleData);
        console.log('🏗️ Örnek tünel oluşturuldu');
    }
}

// Özel çizim aracı sınıfı
class DrawingTool extends go.Tool {
    constructor() {
        super();
        this.name = "TunnelDrawing";
        this.designer = null;
    }

    canStart() {
        return this.designer && this.designer.isDrawing;
    }

    doMouseDown() {
        if (!this.canStart()) return false;
        
        const point = this.diagram.lastInput.documentPoint;
        this.designer.addTunnelPoint(point);
        
        return true;
    }
    
    doMouseMove() {
        // Çizim sırasında preview gösterimi için
        return true;
    }
}

// Global export
window.TunnelDesigner = TunnelDesigner;
export default TunnelDesigner;