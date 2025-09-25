// Inline TunnelDesigner - Problem çözümü için basitleştirilmiş versiyon
class TunnelDesigner {
    constructor(containerId, config = {}) {
        this.containerId = containerId;
        this.config = {
            gridSize: config.gridSize || 0.5,
            showGrid: config.showGrid !== false,
            snapToGrid: config.snapToGrid !== false,
            showMeasurements: config.showMeasurements !== false,
            defaultTunnelWidth: config.defaultTunnelWidth || 3.0,
            defaultTunnelHeight: config.defaultTunnelHeight || 3.0,
            defaultCrossSectionType: config.defaultCrossSectionType || 'circle',
            ...config
        };
        
        this.diagram = null;
        this.isDrawing = false;
        this.drawingMode = null;
        this.currentTunnel = null;
        
        // Data storage
        this.tunnelData = {
            segments: new Map(),
            stations: new Map(),
            measurements: new Map()
        };
        
        // Callbacks
        this.onTunnelCreated = null;
        this.onTunnelModified = null;
        this.onStationAdded = null;
        
        this.init();
    }
    
    init() {
        if (typeof go === 'undefined') {
            throw new Error('GoJS library not loaded');
        }
        
        this.setupDiagram();
        this.setupTemplates();
        this.setupEventHandlers();
        
        console.log('✅ TunnelDesigner initialized successfully');
    }
    
    setupDiagram() {
        const $ = go.GraphObject.make;
        
        this.diagram = $(go.Diagram, this.containerId, {
            "undoManager.isEnabled": true,
            "grid.visible": this.config.showGrid,
            "grid.gridCellSize": new go.Size(this.config.gridSize * 20, this.config.gridSize * 20),
            "allowDrop": true,
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
            "initialContentAlignment": go.Spot.Center,
            "initialAutoScale": go.Diagram.Uniform,
            layout: $(go.Layout)
        });
        
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
        const $ = go.GraphObject.make;
        
        // Tunnel segment template
        this.diagram.nodeTemplateMap.add("tunnel_segment", 
            $(go.Node, "Spot",
                {
                    locationSpot: go.Spot.Center,
                    selectionAdorned: true
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                
                $(go.Shape, {
                    name: "TUNNEL_SHAPE",
                    width: 60,
                    height: 20,
                    fill: "lightblue",
                    stroke: "darkblue",
                    strokeWidth: 2
                }),
                
                $(go.TextBlock, {
                    alignment: go.Spot.Top,
                    alignmentFocus: go.Spot.Bottom,
                    margin: 5,
                    font: "12px sans-serif",
                    stroke: "black"
                },
                new go.Binding("text", "name")),
                
                $(go.TextBlock, {
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top,
                    margin: 5,
                    font: "10px sans-serif",
                    stroke: "darkblue"
                },
                new go.Binding("text", "", (data) => {
                    return `${data.width}m × ${data.height}m\nL: ${(data.length || 0).toFixed(1)}m`;
                }))
            )
        );
        
        // Station template
        this.diagram.nodeTemplateMap.add("miner_station",
            $(go.Node, "Auto",
                {
                    locationSpot: go.Spot.Center
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
                new go.Binding("text", "stationId"))
            )
        );
        
        // Measurement template
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
                new go.Binding("text", "measurement"))
            )
        );
    }
    
    setupEventHandlers() {
        this.diagram.addDiagramListener("BackgroundSingleClicked", (e) => {
            if (this.isDrawing) {
                this.addTunnelPoint(e.diagram.lastInput.documentPoint);
            }
        });
        
        this.diagram.addDiagramListener("ObjectSingleClicked", (e) => {
            const obj = e.subject.part;
            if (obj && obj.data) {
                console.log('Selected object:', obj.data);
            }
        });
    }
    
    setDrawingMode(mode) {
        this.drawingMode = mode;
        this.isDrawing = true;
        this.diagram.div.style.cursor = 'crosshair';
        console.log(`📐 Drawing mode: ${mode}`);
    }
    
    exitDrawingMode() {
        this.isDrawing = false;
        this.drawingMode = null;
        this.currentTunnel = null;
        this.diagram.div.style.cursor = 'default';
        console.log('🔚 Drawing mode exited');
    }
    
    addTunnelPoint(point) {
        if (this.drawingMode !== 'tunnel') return;
        
        const snappedPoint = this.snapToGrid(point);
        console.log(`📍 Tunnel point added: ${snappedPoint.x}, ${snappedPoint.y}`);
        
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
        
        console.log('🚇 New tunnel segment started');
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
            angle: this.calculateAngle(this.currentTunnel.startPoint, endPoint)
        };
        
        // Add to diagram
        this.diagram.model.addNodeData(segment);
        
        // Store in data
        this.tunnelData.segments.set(segment.key, segment);
        
        // Add measurement
        if (this.config.showMeasurements) {
            this.addMeasurement(this.currentTunnel.startPoint, endPoint, segment.length);
        }
        
        console.log(`✅ Tunnel segment completed: ${segment.length.toFixed(2)}m`);
        
        // Callback
        if (this.onTunnelCreated) {
            this.onTunnelCreated(segment);
        }
        
        this.currentTunnel = null;
    }
    
    addMeasurement(point1, point2, distance) {
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
    
    snapToGrid(point) {
        if (!this.config.snapToGrid) return point;
        
        const gridSize = this.config.gridSize * 20;
        return new go.Point(
            Math.round(point.x / gridSize) * gridSize,
            Math.round(point.y / gridSize) * gridSize
        );
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
            console.error('❌ Data import error:', error);
        }
    }
    
    loadTunnelData(data) {
        // Clear current data
        this.diagram.model.nodeDataArray = [];
        this.tunnelData.segments.clear();
        this.tunnelData.stations.clear();
        this.tunnelData.measurements.clear();
        
        // Load new data
        const allNodes = [
            ...(data.segments || []),
            ...(data.stations || []),
            ...(data.measurements || [])
        ];
        
        this.diagram.model = new go.GraphLinksModel(allNodes);
        
        // Update data storage
        data.segments?.forEach(seg => this.tunnelData.segments.set(seg.key, seg));
        data.stations?.forEach(sta => this.tunnelData.stations.set(sta.key, sta));
        data.measurements?.forEach(meas => this.tunnelData.measurements.set(meas.key, meas));
        
        console.log('✅ Tunnel data loaded');
    }
}

// Make globally available
window.TunnelDesigner = TunnelDesigner;