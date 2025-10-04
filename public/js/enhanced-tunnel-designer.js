// Enhanced TunnelDesigner - Kolay çizim sistemi
class EnhancedTunnelDesigner {
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
            defaultStartWidth: config.defaultStartWidth ?? 1.0,
            defaultEndWidth: config.defaultEndWidth ?? 1.0,
            magneticSnap: config.magneticSnap !== false,
            // New UX opts
            snapToSegments: config.snapToSegments !== false, // snap to existing lines
            snapToPoints: config.snapToPoints !== false,     // snap to endpoints and point markers
            magneticSnapMultiplier: config.magneticSnapMultiplier || 2, // threshold = gridSize * multiplier (in px)
            minSegmentLength: config.minSegmentLength || 0.5, // metres
            showPreview: config.showPreview !== false,
            ...config
        };
        
        this.diagram = null;
        this.isDrawing = false;
        this.drawingMode = null;
        this.currentTunnel = null;
        this.previewNode = null;
        this.dragStartPoint = null;
        this.isDragging = false;
        this.drawingState = 'idle'; // idle, drawing, dragging
        
        // Drawing history for multi-segment tunnels
        this.drawingPath = [];
        this.tempSegments = [];
        
        // Serbest tünel çizimi için nokta listesi
        this.freeTunnelPoints = [];
        
        // Data storage
        this.tunnelData = {
            segments: new Map(),
            stations: new Map(),
            measurements: new Map(),
            gateways: new Map()
        };
        // Map segmentKey -> measurementKey for fast updates
        this.segmentMeasurements = new Map();
        // Map segmentKey -> [gatewayKeys]
        this.segmentGateways = new Map();
        
        // Callbacks
        this.onTunnelCreated = null;
        this.onTunnelModified = null;
        this.onStationAdded = null;
        this.onGatewayAdded = null;

        // UI overlays
        this.hoverMeterLabel = null;
        this.gatewayContextMenu = null;
        this.pendingGatewayContext = null;
        this.boundHoverMouseMove = null;
        this.boundHoverMouseLeave = null;
    this.angleRingOverlay = null;
    this.angleRingPrimaryLabel = null;
    this.angleRingSecondaryLabel = null;
    this.angleRingDeltaLabel = null;
    this.angleRingBaseLine = null;
    this.angleRingNewLine = null;
    this.angleRingState = null;
        
        this.init();
    }
    
    init() {
        if (typeof go === 'undefined') {
            throw new Error('GoJS library not loaded');
        }
        
        this.setupDiagram();
        this.setupTemplates();
        this.setupDrawingHandlers();
        
        // Listen moves/rotations to keep measurements in sync
        this.registerAutoUpdateListeners();

        // Additional interaction helpers
        this.setupInteractionOverlays();

    }
    
    setupDiagram() {
        const $ = go.GraphObject.make;
        
        this.diagram = $(go.Diagram, this.containerId, {
            initialContentAlignment: go.Spot.Center,
            allowDrop: false,
            allowCopy: false,
            allowDelete: true,
            allowZoom: true,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            hasHorizontalScrollbar: false,
            hasVerticalScrollbar: false,
            grid: $(go.Panel, "Grid",
                $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
                $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 })
            ),
            "grid.visible": this.config.showGrid,
            "grid.gridCellSize": new go.Size(20, 20), // 1m = 20px
            "toolManager.hoverDelay": 100,
            "animationManager.isEnabled": false,
            "undoManager.isEnabled": true
        });

        const meterExtent = 5000;
        const pixelExtent = meterExtent * 20;
        const halfExtent = pixelExtent / 2;
        this.diagram.scrollMode = go.Diagram.InfiniteScroll;
        this.diagram.fixedBounds = new go.Rect(-halfExtent, -halfExtent, pixelExtent, pixelExtent);
    }
    
    setupTemplates() {
        const $ = go.GraphObject.make;
        
        // Enhanced tunnel segment template with better visuals and cross-section overlay
        this.diagram.nodeTemplateMap.add("tunnel_segment",
            $(go.Node, "Auto",
                {
                    locationSpot: go.Spot.Center,
                    rotatable: true,
                    resizable: true,
                    reshapable: false,
                    layerName: "Foreground",
                    resizeObjectName: "SEGSHAPE",
                    cursor: "pointer",
                    toolTip: this.createSegmentTooltip(),
                    click: (e, obj) => this.handleSegmentClick(e, obj)
                },
                // Remove default rectangular selection box for horseshoe (circle keeps some selection for length adjustment)
                new go.Binding("selectionAdorned", "crossSectionType", t => t !== 'horseshoe'),
                // Enable resizing for all types, but handle them differently
                new go.Binding("resizable", "crossSectionType", t => true).makeTwoWay(),
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                new go.Binding("angle", "angle").makeTwoWay(),
                
                // Main tunnel shape
                $(go.Shape, {
                    name: "SEGSHAPE",
                    geometryString: "M0 0 L100 0 L100 30 L0 30 Z",
                    fill: "rgba(100, 149, 237, 0.35)",
                    stroke: "#1f5bbd",
                    strokeWidth: 2.5
                },
                new go.Binding("fill", "crossSectionType", (type) => {
                    const palette = {
                        rectangle: "rgba(100, 149, 237, 0.35)",
                        circle: "rgba(76, 175, 80, 0.25)",
                        horseshoe: "rgba(255, 99, 132, 0.25)"
                    };
                    return palette[type] || "rgba(100, 149, 237, 0.3)";
                }),
                new go.Binding("stroke", "crossSectionType", (type) => {
                    const palette = {
                        rectangle: "#1f5bbd",
                        circle: "#2e7d32",
                        horseshoe: "#c2185b"
                    };
                    return palette[type] || "#1f5bbd";
                }),
                new go.Binding("geometryString", "", (data) => {
                    const lengthPx = Math.max(2, (data.length || 0.5) * 20);
                    const startMeters = Math.max(0.05, data.startWidth ?? data.width ?? 1);
                    const endMeters = Math.max(0.05, data.endWidth ?? data.width ?? 1);
                    const halfStart = (startMeters * 20) / 2;
                    const halfEnd = (endMeters * 20) / 2;
                    const maxHalf = Math.max(halfStart, halfEnd);
                    const topStart = (maxHalf - halfStart).toFixed(2);
                    const bottomStart = (maxHalf + halfStart).toFixed(2);
                    const topEnd = (maxHalf - halfEnd).toFixed(2);
                    const bottomEnd = (maxHalf + halfEnd).toFixed(2);
                    const len = lengthPx.toFixed(2);
                    return `M0 ${topStart} L${len} ${topEnd} L${len} ${bottomEnd} L0 ${bottomStart} Z`;
                })),

                // Cross-section overlay: non-horseshoe (circle/rectangle)
                $(go.Shape,
                    {
                        name: "SECTION_ROUND",
                        alignment: go.Spot.Center,
                        stroke: "#333",
                        strokeWidth: 1.2,
                        fill: "rgba(255,255,255,0.6)"
                    },
                    new go.Binding("visible", "crossSectionType", t => t !== 'horseshoe'),
                    new go.Binding("figure", "crossSectionType", (t) => t === 'circle' ? 'Circle' : 'RoundedRectangle'),
                    // Size driven by selected cross-section params
                    new go.Binding("desiredSize", "", (data) => {
                        const cp = data.crossParams || {};
                        const diameter = (cp.diameter ?? data.height ?? data.width ?? 3) * 10;
                        const h = (data.height ?? 3) * 10;
                        const pad = Math.min(14, Math.max(6, h * 0.08));
                        if (data.crossSectionType === 'circle') {
                            const s = Math.max(10, diameter - pad);
                            return new go.Size(s, s);
                        }
                        const wRect = Math.max(10, h * 1.2 - pad);
                        const hRect = Math.max(10, h - pad);
                        return new go.Size(wRect, hRect);
                    }),
                    // Color overlay stroke by type for clarity
                    new go.Binding("stroke", "crossSectionType", (t) => ({
                        circle: "#4169E1",
                        rectangle: "#32CD32",
                        horseshoe: "#FF1493"
                    })[t] || "#4169E1")
                ),
                // Cross-section overlay: horseshoe geometry only when needed
                $(go.Shape,
                    {
                        name: "SECTION_HORSE",
                        alignment: go.Spot.Center,
                        stroke: "#FF1493",
                        strokeWidth: 12,
                        strokeCap: "round",
                        fill: "rgba(255,255,255,0.6)"
                    },
                    new go.Binding("visible", "crossSectionType", t => t === 'horseshoe'),
                    new go.Binding("geometryString", "", (data) => EnhancedTunnelDesigner.createHorseshoeGeometryString(data)),
                    // Make the arch thick based on leg widths (approx)
                    new go.Binding("strokeWidth", "crossParams", (cp) => {
                        if (!cp) return 12;
                        const avg = Math.max(0.1, ((cp.leftWidth || 0.3) + (cp.rightWidth || 0.3)) / 2);
                        return Math.min(80, Math.max(6, avg * 10));
                    })
                ),
                
                // Tunnel name label (hidden by request)
                $(go.TextBlock, {
                    alignment: go.Spot.Center,
                    font: "bold 11px sans-serif",
                    stroke: "white",
                    background: "rgba(0,0,0,0.7)",
                    margin: 2,
                    visible: false
                },
                new go.Binding("text", "name")),
                
                // Dimension info
                $(go.TextBlock, {
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top,
                    margin: 5,
                    font: "10px sans-serif",
                    stroke: "darkblue",
                    background: "rgba(255,255,255,0.8)"
                },
                new go.Binding("text", "", (data) => {
                    const icon = this.getCrossSectionIcon(data.crossSectionType);
                    const startW = (data.startWidth ?? data.width ?? this.config.defaultStartWidth ?? 0).toFixed(2);
                    const endW = (data.endWidth ?? data.width ?? this.config.defaultEndWidth ?? 0).toFixed(2);
                    return `${icon} Giriş:${startW}m → Çıkış:${endW}m | L:${(data.length || 0).toFixed(1)}m`;
                }))
            )
        );
        
        // Preview template for drawing
        this.diagram.nodeTemplateMap.add("tunnel_preview",
            $(go.Node, "Auto",
                {
                    isInDocumentBounds: false,
                    selectable: false,
                    avoidable: false,
                    layerName: "Foreground"
                },
                new go.Binding("location", "position", go.Point.parse),
                new go.Binding("angle", "angle"),
                
                $(go.Shape, {
                    name: "SEGSHAPE",
                    geometryString: "M0 0 L100 0 L100 30 L0 30 Z",
                    fill: "rgba(255, 255, 0, 0.4)",
                    stroke: "#FFD700",
                    strokeWidth: 2,
                    strokeDashArray: [4, 4]
                },
                new go.Binding("geometryString", "", (data) => {
                    const w = (data.length || 5) * 20;
                    const h = (data.height ?? data.width ?? 3) * 10;
                    return `M0 0 L${w} 0 L${w} ${h} L0 ${h} Z`;
                })),
                
                $(go.TextBlock, {
                    alignment: go.Spot.Center,
                    font: "bold 10px sans-serif",
                    stroke: "#B8860B",
                    text: "ÖNİZLEME"
                })
            )
        );
        
        // Station template
        this.setupStationTemplate();
        
        // Measurement template
        this.setupMeasurementTemplate();

        // Horseshoe adjustable handle template
        this.diagram.nodeTemplateMap.add("hs_handle",
            $(go.Node, "Auto",
                {
                    selectable: true,
                    movable: true,
                    deletable: false,
                    avoidable: false,
                    layerName: "Foreground"
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Circle", {
                    width: 16,
                    height: 16,
                    fill: "#1f77ff",
                    stroke: "white",
                    strokeWidth: 2
                })
            )
        );

        // Circle diameter handle template
        this.diagram.nodeTemplateMap.add("circle_handle",
            $(go.Node, "Auto",
                {
                    selectable: true,
                    movable: true,
                    deletable: false,
                    avoidable: false,
                    layerName: "Foreground"
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Square", {
                    width: 18,
                    height: 18,
                    fill: "#4169E1",
                    stroke: "white",
                    strokeWidth: 2
                })
            )
        );
    }
    
    setupStationTemplate() {
        const $ = go.GraphObject.make;
        
        this.diagram.nodeTemplateMap.add("miner_station",
            $(go.Node, "Auto",
                {
                    locationSpot: go.Spot.Center,
                    selectable: true,
                    deletable: true
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                
                $(go.Shape, "Circle", {
                    width: 35,
                    height: 35,
                    fill: "yellow",
                    stroke: "orange",
                    strokeWidth: 3
                }),
                
                $(go.TextBlock, {
                    margin: 2,
                    font: "bold 10px sans-serif",
                    stroke: "black"
                },
                new go.Binding("text", "stationId"))
            )
        );
        
        // Gateway/Sensor template - Alıcı şablonu
        this.diagram.nodeTemplateMap.add("gateway",
            $(go.Node, "Spot",
                {
                    locationSpot: go.Spot.Center,
                    selectable: true,
                    deletable: true,
                    cursor: "pointer"
                },
                new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
                
                $(go.Panel, "Auto",
                    $(go.Shape, "RoundedRectangle", {
                        width: 50,
                        height: 30,
                        fill: "#00C853",
                        stroke: "#00796B",
                        strokeWidth: 2
                    }),
                    
                    $(go.TextBlock, {
                        margin: 3,
                        font: "bold 9px sans-serif",
                        stroke: "white",
                        overflow: go.TextBlock.OverflowEllipsis,
                        maxSize: new go.Size(45, NaN)
                    },
                    new go.Binding("text", "gatewayId"))
                ),
                
                // Metraj gösterimi (altında)
                $(go.TextBlock, {
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top,
                    margin: new go.Margin(3, 4, 0, 4),
                    font: "10px sans-serif",
                    stroke: "#00796B",
                    background: "rgba(255,255,255,0.9)"
                },
                new go.Binding("text", "meterage", m => `${m.toFixed(1)}m`))
            )
        );
    }
    
    setupMeasurementTemplate() {
        const $ = go.GraphObject.make;
        
        this.diagram.nodeTemplateMap.add("measurement",
            $(go.Node,
                {
                    selectable: false,
                    avoidable: false,
                    pickable: false
                },
                new go.Binding("location", "position", go.Point.parse),
                
                $(go.TextBlock, {
                    font: "bold 12px sans-serif",
                    stroke: "blue",
                    background: "rgba(255,255,255,0.9)",
                    margin: 3,
                    segmentOffset: new go.Point(0, -15)
                },
                new go.Binding("text", "measurement"))
            )
        );

        // Serbest tünel çizimi için geçici elementler
        this.diagram.nodeTemplateMap.add("pointer_indicator",
            $(go.Node,
                {
                    selectable: false,
                    avoidable: false,
                    pickable: false,
                    layerName: "Foreground"
                },
                new go.Binding("location", "loc", go.Point.parse),
                
                $(go.Shape, "Circle", {
                    width: 16,
                    height: 16,
                    fill: "#ff0000",
                    stroke: "#cc0000",
                    strokeWidth: 3,
                    opacity: 0.9
                })
            )
        );

        // Snap feedback indicator at current mouse snapped position
        this.diagram.nodeTemplateMap.add("snap_indicator",
            $(go.Node,
                {
                    selectable: false,
                    avoidable: false,
                    pickable: false,
                    layerName: "Foreground"
                },
                new go.Binding("location", "loc", go.Point.parse),
                $(go.Shape, "Circle", {
                    width: 12,
                    height: 12,
                    stroke: "white",
                    strokeWidth: 2,
                    opacity: 0.95
                },
                new go.Binding("fill", "kind", (k) => ({ marker: "#00B8D4", point: "#00C853", segment: "#8E24AA" }[k] || "#00C853")))
            )
        );

        this.diagram.nodeTemplateMap.add("preview_line",
                $(go.Node,
                    {
                        selectable: false,
                        avoidable: false,
                        pickable: false,
                        layerName: "Foreground"
                    },
                new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                
                    $(go.Shape, {
                        geometryString: "M0 0 L10 10",
                        stroke: "#ff4444",
                        strokeWidth: 4,
                        strokeDashArray: [10, 6],
                        strokeCap: "round",
                        opacity: 0.8
                    },
                    new go.Binding("geometryString", "", function(data) {
                        if (data.from && data.to) {
                            const from = go.Point.parse(data.from);
                            const to = go.Point.parse(data.to);
                            const pos = data.pos ? go.Point.parse(data.pos) : new go.Point(Math.min(from.x, to.x), Math.min(from.y, to.y));
                            const fx = from.x - pos.x;
                            const fy = from.y - pos.y;
                            const tx = to.x - pos.x;
                            const ty = to.y - pos.y;
                            return `M${fx} ${fy} L${tx} ${ty}`;
                        }
                        return "M0 0 L0 0";
                    }))
                )
            );

        // Serbest çizimde yerleştirilen tüm noktaları (ilk nokta dahil) küçük işaretçilerle göster
        this.diagram.nodeTemplateMap.add("path_point",
            $(go.Node,
                {
                    selectable: false,
                    avoidable: false,
                    pickable: false,
                    layerName: "Foreground"
                },
                new go.Binding("location", "loc", go.Point.parse),
                $(go.Shape, "Circle", {
                    width: 10,
                    height: 10,
                    fill: "#7f8c8d",
                    stroke: "white",
                    strokeWidth: 2,
                    opacity: 0.95
                })
            )
        );

        // Serbest mod kalıcı segment (sadece çizgi)
        this.diagram.nodeTemplateMap.add("free_tunnel_segment",
                $(go.Node,
                    {
                        selectable: true,
                        avoidable: false,
                        pickable: true,
                        layerName: "Foreground",
                        click: (e, obj) => this.handleSegmentClick(e, obj)
                    },
                new go.Binding("position", "pos", go.Point.parse),
                    $(go.Shape, {
                        geometryString: "M0 0 L10 0 L10 10 L0 10 Z",
                        fill: "rgba(31, 91, 189, 0.35)",
                        stroke: "#1f5bbd",
                        strokeWidth: 1.4
                    },
                    new go.Binding("geometryString", "geometryString", (geom) => geom || "M0 0 L0 0"))
                )
            );
    }

    registerAutoUpdateListeners() {
        // Update measurement when a segment is moved or rotated
        const updateForSelection = () => {
            this.diagram.selection.each(part => {
                const data = part.data;
                if (data && data.category === 'tunnel_segment') {
                    this.updateMeasurementForSegment(data);
                    if (data.crossSectionType === 'horseshoe' && this.hsHandles && this.hsHandles.has(data.key)) {
                        this.updateHorseshoeHandlesPositions(data);
                    }
                }
            });
        };
        // These DiagramEvents fire after an interaction completes
        this.diagram.addDiagramListener('SelectionMoved', (e) => {
            // If a horseshoe handle was dragged (handles are selected while dragging), update params
            e.diagram.selection.each(part => {
                if (part && part.data && part.data.category === 'hs_handle') {
                    this.updateHorseshoeFromHandle(part.data);
                } else if (part && part.data && part.data.category === 'circle_handle') {
                    this.updateCircleFromHandle(part.data);
                }
            });
            updateForSelection();
        });
        this.diagram.addDiagramListener('PartRotated', (e) => {
            const part = e.subject && e.subject.part;
            if (part && part.data && part.data.category === 'tunnel_segment') {
                this.updateMeasurementForSegment(part.data);
            }
        });

        // Keep measurement centered after resizing
        this.diagram.addDiagramListener('PartResized', (e) => {
            const part = e.subject && e.subject.part;
            if (!part || !part.data || part.data.category !== 'tunnel_segment') return;
            const data = part.data;
            // Infer new length/height from resizeObject's actual size
            const shape = part.findObject('SEGSHAPE');
            if (shape) {
                const size = shape.actualBounds;
                // actualBounds are in document coordinates; convert back to data units
                let newLength = Math.max(0.1, size.width / 20);
                let newHeight = Math.max(0.5, size.height / 10);
                const prevLength = data.length || this.calculateDistance(go.Point.parse(data.from), go.Point.parse(data.to)) || newLength;
                if (data.crossSectionType === 'circle') {
                    // lock the length; only allow diameter (height) change
                    newLength = prevLength;
                }
                this.diagram.startTransaction('resizeSegment');
                this.diagram.model.setDataProperty(data, 'length', newLength);
                this.diagram.model.setDataProperty(data, 'height', newHeight);
                if (data.crossSectionType === 'circle') {
                    // keep diameter by syncing width and height
                    this.diagram.model.setDataProperty(data, 'width', newHeight);
                    // and update cross-section params so overlay circle grows with resize
                    const cp = data.crossParams || {};
                    cp.diameter = newHeight;
                    this.diagram.model.setDataProperty(data, 'crossParams', { ...cp });
                }
                // Re-center position to keep measurement and segment label centered
                // Compute from current angle and new length around the segment's center (location)
                const mid = part.location.copy();
                this.diagram.model.setDataProperty(data, 'position', go.Point.stringify(mid));
                // Update from/to to align with center, so snap and server save stay consistent
                const angleRad = (data.angle || 0) * Math.PI / 180;
                const half = (newLength * 20) / 2;
                const dx = Math.cos(angleRad) * half;
                const dy = Math.sin(angleRad) * half;
                const p1 = new go.Point(mid.x - dx, mid.y - dy);
                const p2 = new go.Point(mid.x + dx, mid.y + dy);
                this.diagram.model.setDataProperty(data, 'from', go.Point.stringify(p1));
                this.diagram.model.setDataProperty(data, 'to', go.Point.stringify(p2));
                this.diagram.commitTransaction('resizeSegment');
                // Update measurement position/text
                this.updateMeasurementForSegment(data);
                // Also refresh the stored segment cache so export/save uses latest
                if (this.tunnelData && this.tunnelData.segments && this.tunnelData.segments.has(data.key)) {
                    const updated = { ...this.tunnelData.segments.get(data.key), length: newLength, height: newHeight, position: go.Point.stringify(mid), from: go.Point.stringify(p1), to: go.Point.stringify(p2) };
                    this.tunnelData.segments.set(data.key, updated);
                }
            }
        });

        // Show or hide horseshoe handles when selection changes
        this.diagram.addDiagramListener('ChangedSelection', () => {
            this.refreshHorseshoeHandlesForSelection();
        });
    }

    setupInteractionOverlays() {
        if (!this.diagram || !this.diagram.div) return;

        const host = this.diagram.div;
        const computedStyle = window.getComputedStyle(host);
        if (computedStyle.position === 'static') {
            host.style.position = 'relative';
        }

        this.createHoverMeterLabel(host);
        this.createGatewayContextMenu(host);
    this.createAngleRingOverlay(host);

        if (!this.boundHoverMouseMove) {
            this.boundHoverMouseMove = (evt) => {
                if (!this.diagram) return;
                const rect = host.getBoundingClientRect();
                const viewPoint = new go.Point(evt.clientX - rect.left, evt.clientY - rect.top);
                const docPoint = this.diagram.transformViewToDoc(viewPoint);
                this.handleDiagramPointerMove(docPoint);
            };
        }

        if (!this.boundHoverMouseLeave) {
            this.boundHoverMouseLeave = () => {
                this.hideHoverMeterLabel();
                this.hideGatewayContextMenu();
            };
        }

        host.addEventListener('mousemove', this.boundHoverMouseMove);
        host.addEventListener('mouseleave', this.boundHoverMouseLeave);

        this.diagram.addDiagramListener('BackgroundSingleClicked', () => this.hideGatewayContextMenu());
        this.diagram.addDiagramListener('ViewportBoundsChanged', () => {
            this.hideGatewayContextMenu();
            this.refreshAngleRingPosition();
        });
    }

    createHoverMeterLabel(host) {
        if (this.hoverMeterLabel) return;
        const label = document.createElement('div');
        label.className = 'hover-meter-label';
        Object.assign(label.style, {
            position: 'absolute',
            display: 'none',
            pointerEvents: 'none',
            transform: 'translate(-50%, -120%)',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            zIndex: '20'
        });
        host.appendChild(label);
        this.hoverMeterLabel = label;
    }

    handleDiagramPointerMove(docPoint) {
        if (!this.hoverMeterLabel || this.isDrawing || !docPoint) {
            this.hideHoverMeterLabel();
            return;
        }

        const part = this.diagram.findPartAt(docPoint, true);
        const data = part && part.data;
        if (data && (data.category === 'tunnel_segment' || data.category === 'free_tunnel_segment')) {
            const startPoint = go.Point.parse(data.from);
            const endPoint = go.Point.parse(data.to);
            const totalLength = data.length || this.calculateDistance(startPoint, endPoint);
            const meterage = this.calculateMeterageOnSegment(docPoint, startPoint, endPoint, totalLength);
            this.showHoverMeterLabel(docPoint, `${meterage.toFixed(1)} m`);
        } else {
            this.hideHoverMeterLabel();
        }
    }

    showHoverMeterLabel(docPoint, text) {
        if (!this.hoverMeterLabel) return;
        const viewPoint = this.diagram.transformDocToView(docPoint);
        this.hoverMeterLabel.textContent = text;
        this.hoverMeterLabel.style.left = `${viewPoint.x}px`;
        this.hoverMeterLabel.style.top = `${viewPoint.y}px`;
        this.hoverMeterLabel.style.display = 'block';
    }

    hideHoverMeterLabel() {
        if (this.hoverMeterLabel) {
            this.hoverMeterLabel.style.display = 'none';
        }
    }

    createGatewayContextMenu(host) {
        if (this.gatewayContextMenu) return;

        const menu = document.createElement('div');
        menu.className = 'gateway-context-menu';
        Object.assign(menu.style, {
            position: 'absolute',
            display: 'none',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px 12px',
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.15)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
            zIndex: '30',
            minWidth: '160px'
        });

        const info = document.createElement('div');
        info.style.display = 'flex';
        info.style.flexDirection = 'column';
        info.style.gap = '4px';

        const title = document.createElement('span');
        title.textContent = 'Metraj';
        title.style.fontSize = '11px';
        title.style.fontWeight = '600';
        title.style.color = '#607D8B';

        const meterText = document.createElement('span');
        meterText.style.fontSize = '13px';
        meterText.style.fontWeight = '700';
        meterText.style.color = '#00796B';

        info.appendChild(title);
        info.appendChild(meterText);

        menu.appendChild(info);
        this.gatewayContextInfo = meterText;

        const actions = document.createElement('div');
        Object.assign(actions.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        });

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.textContent = 'Alıcı ekle';
        Object.assign(addButton.style, {
            background: '#00C853',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            cursor: 'pointer',
            fontWeight: '600'
        });

        addButton.addEventListener('click', () => {
            if (!this.pendingGatewayContext) return;
            const { segment, docPoint, meterage } = this.pendingGatewayContext;
            this.hideGatewayContextMenu();
            this.showAddGatewayDialog(segment, docPoint.copy ? docPoint.copy() : docPoint, meterage);
        });

        const extendButton = document.createElement('button');
        extendButton.type = 'button';
        extendButton.textContent = 'Çizgi ekle';
        Object.assign(extendButton.style, {
            background: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            cursor: 'pointer',
            fontWeight: '600'
        });

        extendButton.addEventListener('click', () => {
            if (!this.pendingGatewayContext) return;
            this.hideGatewayContextMenu();
            this.handleExtendSegmentRequest();
        });

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Çizgiyi sil';
        Object.assign(deleteButton.style, {
            background: '#FF5252',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            cursor: 'pointer',
            fontWeight: '600'
        });

        deleteButton.addEventListener('click', () => {
            if (!this.pendingGatewayContext) return;
            const { segment } = this.pendingGatewayContext;
            this.hideGatewayContextMenu();
            this.deleteSegment(segment);
        });

        actions.appendChild(addButton);
        actions.appendChild(extendButton);
        actions.appendChild(deleteButton);

        menu.appendChild(actions);

        host.appendChild(menu);
        this.gatewayContextMenu = menu;
    }

    showGatewayContextMenu(segment, docPoint, meterage, anchorContext = null) {
        if (!this.gatewayContextMenu) return;

        this.pendingGatewayContext = {
            segment,
            docPoint: docPoint.copy ? docPoint.copy() : docPoint,
            meterage,
            anchorKey: anchorContext?.anchorKey,
            anchorPoint: anchorContext?.anchorPoint ? (anchorContext.anchorPoint.copy ? anchorContext.anchorPoint.copy() : new go.Point(anchorContext.anchorPoint.x, anchorContext.anchorPoint.y)) : null,
            baseAngleDeg: anchorContext?.baseAngleDeg
        };

        if (this.gatewayContextInfo) {
            const anchorLabel = anchorContext?.anchorKey === 'start' ? ' (başlangıç ucu)' : (anchorContext?.anchorKey === 'end' ? ' (bitiş ucu)' : '');
            this.gatewayContextInfo.textContent = `${meterage.toFixed(1)} m${anchorLabel}`;
        }

        const viewPoint = this.diagram.transformDocToView(docPoint);
        this.gatewayContextMenu.style.left = `${viewPoint.x + 10}px`;
        this.gatewayContextMenu.style.top = `${viewPoint.y + 10}px`;
        this.gatewayContextMenu.style.display = 'flex';

        this.hideHoverMeterLabel();
    }

    hideGatewayContextMenu() {
        if (this.gatewayContextMenu) {
            this.gatewayContextMenu.style.display = 'none';
        }
        this.pendingGatewayContext = null;
    }

    createAngleRingOverlay(host) {
        if (this.angleRingOverlay) return;

        const ring = document.createElement('div');
        ring.className = 'angle-ring-overlay';
        Object.assign(ring.style, {
            position: 'absolute',
            display: 'none',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '2px solid rgba(255,152,0,0.65)',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 65%, rgba(0,0,0,0) 100%)',
            boxShadow: '0 0 12px rgba(255,152,0,0.45)',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            zIndex: '32'
        });

        const createLabel = (styles) => {
            const label = document.createElement('div');
            Object.assign(label.style, {
                position: 'absolute',
                color: '#fff',
                fontWeight: '700',
                fontSize: '13px',
                padding: '4px 8px',
                borderRadius: '14px',
                background: 'rgba(33,33,33,0.85)',
                boxShadow: '0 3px 8px rgba(0,0,0,0.35)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                ...styles
            });
            ring.appendChild(label);
            return label;
        };

        this.angleRingPrimaryLabel = createLabel({ top: '-28px', left: '50%', transform: 'translate(-50%, 0)' });
        this.angleRingSecondaryLabel = createLabel({ bottom: '-28px', left: '50%', transform: 'translate(-50%, 0)' });
        this.angleRingDeltaLabel = createLabel({ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(25,118,210,0.9)', fontSize: '12px' });

        const baseLine = document.createElement('div');
        Object.assign(baseLine.style, {
            position: 'absolute',
            width: '3px',
            height: '74px',
            left: '50%',
            top: '50%',
            transformOrigin: '50% 100%',
            transform: 'translate(-50%, -100%)',
            background: 'rgba(0,188,212,0.95)',
            borderRadius: '2px',
            boxShadow: '0 0 6px rgba(0,188,212,0.6)'
        });

        const newLine = document.createElement('div');
        Object.assign(newLine.style, {
            position: 'absolute',
            width: '3px',
            height: '74px',
            left: '50%',
            top: '50%',
            transformOrigin: '50% 100%',
            transform: 'translate(-50%, -100%)',
            background: 'rgba(244,67,54,0.95)',
            borderRadius: '2px',
            boxShadow: '0 0 6px rgba(244,67,54,0.6)'
        });

        ring.appendChild(baseLine);
        ring.appendChild(newLine);

        this.angleRingBaseLine = baseLine;
        this.angleRingNewLine = newLine;

        host.appendChild(ring);
        this.angleRingOverlay = ring;
    }

    showAngleRing(basePoint, baseAngleDeg) {
        if (!this.angleRingOverlay || !this.diagram) return;

        const point = basePoint.copy ? basePoint.copy() : new go.Point(basePoint.x, basePoint.y);
        const normalizedAngle = this.normalizeAngle(baseAngleDeg);

        this.angleRingState = {
            basePoint: point,
            baseAngleDeg: normalizedAngle,
            currentAngleDeg: normalizedAngle
        };

        this.angleRingOverlay.style.display = 'block';
        this.angleRingPrimaryLabel.textContent = '0°';
        this.angleRingSecondaryLabel.textContent = '360°';
        this.angleRingDeltaLabel.textContent = 'Δ 0°';

        const rotation = normalizedAngle - 90;
        this.angleRingBaseLine.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
        this.angleRingNewLine.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;

        this.refreshAngleRingPosition();
    }

    updateAngleRing(currentPoint) {
        if (!this.angleRingOverlay || !this.angleRingState || !this.diagram) return;
        if (!currentPoint) return;

        const target = currentPoint.copy ? currentPoint.copy() : new go.Point(currentPoint.x, currentPoint.y);
        const base = this.angleRingState.basePoint;
        const dx = target.x - base.x;
        const dy = target.y - base.y;
        const lengthSq = dx * dx + dy * dy;

        this.refreshAngleRingPosition();

        if (lengthSq < 1) {
            this.angleRingPrimaryLabel.textContent = '0°';
            this.angleRingSecondaryLabel.textContent = '360°';
            this.angleRingDeltaLabel.textContent = 'Δ 0°';
            return;
        }

        const absoluteAngle = this.normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI);
        const baseAngle = this.angleRingState.baseAngleDeg;
        const diffRaw = this.normalizeAngle(absoluteAngle - baseAngle);
        const complement = diffRaw === 0 ? 360 : (360 - diffRaw);
        const smaller = diffRaw <= complement ? diffRaw : complement;
        const larger = diffRaw <= complement ? complement : diffRaw;

        this.angleRingPrimaryLabel.textContent = `${smaller.toFixed(0)}°`;
        this.angleRingSecondaryLabel.textContent = `${larger.toFixed(0)}°`;
        this.angleRingDeltaLabel.textContent = `Δ ${diffRaw.toFixed(0)}°`;

        const baseRotation = baseAngle - 90;
        const newRotation = absoluteAngle - 90;
        this.angleRingBaseLine.style.transform = `translate(-50%, -100%) rotate(${baseRotation}deg)`;
        this.angleRingNewLine.style.transform = `translate(-50%, -100%) rotate(${newRotation}deg)`;

        this.angleRingState.currentAngleDeg = absoluteAngle;
    }

    refreshAngleRingPosition() {
        if (!this.angleRingOverlay || !this.angleRingState || !this.diagram) return;
        const viewPoint = this.diagram.transformDocToView(this.angleRingState.basePoint);
        this.angleRingOverlay.style.left = `${viewPoint.x}px`;
        this.angleRingOverlay.style.top = `${viewPoint.y}px`;
    }

    hideAngleRing() {
        if (this.angleRingOverlay) {
            this.angleRingOverlay.style.display = 'none';
        }
        this.angleRingState = null;
    }

    normalizeAngle(angleDegrees) {
        let value = angleDegrees % 360;
        if (value < 0) value += 360;
        return value;
    }

    updateMeasurementForSegment(seg) {
        try {
            // Find measurement bound to this segment (if any)
            let measKey = this.segmentMeasurements.get(seg.key);
            if (!measKey) {
                for (let m of this.tunnelData.measurements.values()) {
                    if (m.segmentKey === seg.key) { measKey = m.key; break; }
                }
            }
            const measurement = measKey ? this.tunnelData.measurements.get(measKey) : null;

            // Derive endpoints from current data
            let mid = seg.position ? go.Point.parse(seg.position) : null;
            let length = seg.length != null ? seg.length : null;
            let angle = seg.angle != null ? seg.angle : null;
            if ((!mid || length == null || angle == null) && seg.from && seg.to) {
                const p1 = go.Point.parse(seg.from);
                const p2 = go.Point.parse(seg.to);
                mid = new go.Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
                length = this.calculateDistance(p1, p2);
                angle = this.calculateAngle(p1, p2);
            }
            if (!mid || length == null) return;

            const angleRad = angle * Math.PI / 180;
            const half = (length * 20) / 2;
            const dx = Math.cos(angleRad) * half;
            const dy = Math.sin(angleRad) * half;
            const p1 = new go.Point(mid.x - dx, mid.y - dy);
            const p2 = new go.Point(mid.x + dx, mid.y + dy);
            const trueMid = new go.Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
            const trueLen = this.calculateDistance(p1, p2);

            this.diagram.startTransaction('updateSegmentAndMeasurement');
            this.diagram.model.setDataProperty(seg, 'position', go.Point.stringify(trueMid));
            this.diagram.model.setDataProperty(seg, 'from', go.Point.stringify(p1));
            this.diagram.model.setDataProperty(seg, 'to', go.Point.stringify(p2));
            this.diagram.model.setDataProperty(seg, 'length', trueLen);
            if (measurement) {
                this.diagram.model.setDataProperty(measurement, 'position', go.Point.stringify(trueMid));
                this.diagram.model.setDataProperty(measurement, 'measurement', `${trueLen.toFixed(2)}m`);
            }
            this.diagram.commitTransaction('updateSegmentAndMeasurement');

        } catch (err) {

        }
    }

    // ---- Horseshoe interactive handles ----
    ensureCrossParams(seg) {
        const p = seg.crossParams || {};
        const cp = {
            diameter: p.diameter ?? (seg.height ?? this.config.defaultTunnelHeight),
            leftWidth: p.leftWidth ?? (this.config.defaultTunnelWidth * 0.4),
            rightWidth: p.rightWidth ?? (this.config.defaultTunnelWidth * 0.4),
            legHeight: p.legHeight ?? (this.config.defaultTunnelHeight * 0.4),
            archRise: p.archRise ?? (this.config.defaultTunnelHeight * 0.35),
            archAngle: p.archAngle ?? 180
        };
        if (!seg.crossParams) {
            this.diagram.model.setDataProperty(seg, 'crossParams', cp);
        }
        return cp;
    }

    refreshHorseshoeHandlesForSelection() {
        const sel = this.diagram.selection.first();
        if (sel && sel.data && sel.data.category === 'tunnel_segment' && sel.data.crossSectionType === 'horseshoe') {
            this.createOrUpdateHorseshoeHandles(sel.data);
            this.removeCircleHandle();
        } else if (sel && sel.data && sel.data.category === 'tunnel_segment' && sel.data.crossSectionType === 'circle') {
            this.removeHorseshoeHandles();
            this.createOrUpdateCircleHandle(sel.data);
        } else {
            this.removeHorseshoeHandles();
            this.removeCircleHandle();
        }
    }

    createOrUpdateHorseshoeHandles(seg) {
        this.ensureCrossParams(seg);
        if (!this.hsHandles) this.hsHandles = new Map();
        const existing = this.hsHandles.get(seg.key) || [];
        if (existing.length === 0) {
            // create five handles: leftWidth, rightWidth, legHeight, archRise, archAngle
            const types = ['left', 'right', 'leg', 'arch', 'angle'];
            const nodes = [];
            types.forEach(t => {
                const node = {
                    key: `hsh_${seg.key}_${t}`,
                    category: 'hs_handle',
                    handleType: t,
                    segmentKey: seg.key,
                    position: go.Point.stringify(this.diagram.position) // will update immediately
                };
                this.diagram.model.addNodeData(node);
                nodes.push(node);
            });
            this.hsHandles.set(seg.key, nodes);
        }
        this.updateHorseshoeHandlesPositions(seg);
    }

    removeHorseshoeHandles() {
        if (!this.hsHandles) return;
        for (const nodes of this.hsHandles.values()) {
            nodes.forEach(n => {
                try { this.diagram.model.removeNodeData(n); } catch {}
            });
        }
        this.hsHandles.clear();
    }

    createOrUpdateCircleHandle(seg) {
        // Single handle to the right of center controls diameter
        const mid = seg.position ? go.Point.parse(seg.position) : new go.Point(0,0);
        const cp = this.ensureCrossParams(seg);
        const px = (cp.diameter || (seg.height ?? this.config.defaultTunnelHeight)) * 10 / 2;
        const angle = (seg.angle || 0) * Math.PI/180;
        const a = new go.Point(Math.cos(angle), Math.sin(angle));
        const pos = mid.copy().add(a.copy().scale(px, px));
        if (!this.circleHandle) {
            const node = {
                key: `circle_h_${seg.key}`,
                category: 'circle_handle',
                handleType: 'diameter',
                segmentKey: seg.key,
                position: go.Point.stringify(pos)
            };
            this.diagram.model.addNodeData(node);
            this.circleHandle = node;
        } else {
            this.diagram.model.setDataProperty(this.circleHandle, 'position', go.Point.stringify(pos));
        }
    }
    removeCircleHandle() {
        if (this.circleHandle) {
            try { this.diagram.model.removeNodeData(this.circleHandle); } catch {}
            this.circleHandle = null;
        }
    }

    updateHorseshoeHandlesPositions(seg) {
        if (!this.hsHandles || !this.hsHandles.has(seg.key)) return;
        const nodes = this.hsHandles.get(seg.key);
        const mid = seg.position ? go.Point.parse(seg.position) : new go.Point(0,0);
        const angle = (seg.angle || 0) * Math.PI/180;
        const a = new go.Point(Math.cos(angle), Math.sin(angle)); // along length
        const n = new go.Point(-Math.sin(angle), Math.cos(angle)); // cross-section normal
        const H = (seg.height ?? this.config.defaultTunnelHeight) * 10;
        const W = H * 1.2;
        const p = seg.crossParams || {};
        const leftWpx = (p.leftWidth ?? this.config.defaultTunnelWidth*0.4) * 10;
        const rightWpx = (p.rightWidth ?? this.config.defaultTunnelWidth*0.4) * 10;
        const legHpx = (p.legHeight ?? this.config.defaultTunnelHeight*0.4) * 10;
        const archRpx = (p.archRise ?? this.config.defaultTunnelHeight*0.35) * 10;
        const innerHalf = Math.max(8, (W - leftWpx - rightWpx) / 2);
        // positions in doc coords
        const leftPos = mid.copy().add(a.copy().scale(-innerHalf - leftWpx, -innerHalf - leftWpx));
        const rightPos = mid.copy().add(a.copy().scale(innerHalf + rightWpx, innerHalf + rightWpx));
        const legPos = mid.copy().add(n.copy().scale(H/2 - legHpx, H/2 - legHpx));
        const archPos = mid.copy().add(n.copy().scale(-H/2 + archRpx, -H/2 + archRpx));
        const angleCtrlOffset = 30; // px along length
        const anglePos = mid.copy().add(n.copy().scale(-H/2 + archRpx + 4, -H/2 + archRpx + 4)).add(a.copy().scale(angleCtrlOffset, angleCtrlOffset));
        const map = new Map(nodes.map(n => [n.handleType, n]));
        this.diagram.startTransaction('moveHsHandles');
        if (map.get('left')) this.diagram.model.setDataProperty(map.get('left'), 'position', go.Point.stringify(leftPos));
        if (map.get('right')) this.diagram.model.setDataProperty(map.get('right'), 'position', go.Point.stringify(rightPos));
        if (map.get('leg')) this.diagram.model.setDataProperty(map.get('leg'), 'position', go.Point.stringify(legPos));
        if (map.get('arch')) this.diagram.model.setDataProperty(map.get('arch'), 'position', go.Point.stringify(archPos));
        if (map.get('angle')) this.diagram.model.setDataProperty(map.get('angle'), 'position', go.Point.stringify(anglePos));
        this.diagram.commitTransaction('moveHsHandles');
    }

    updateHorseshoeFromHandle(handle) {
        const seg = this.tunnelData.segments.get(handle.segmentKey) || (this.diagram.findNodeForKey(handle.segmentKey)?.data);
        if (!seg) return;
        // compute local coordinates of handle relative to segment center
        const mid = seg.position ? go.Point.parse(seg.position) : new go.Point(0,0);
        const hp = handle.position ? go.Point.parse(handle.position) : mid;
        const angle = (seg.angle || 0) * Math.PI/180;
        const a = new go.Point(Math.cos(angle), Math.sin(angle)); // along length
        const n = new go.Point(-Math.sin(angle), Math.cos(angle)); // normal
        const v = new go.Point(hp.x - mid.x, hp.y - mid.y);
        // projections
        const projA = v.x * a.x + v.y * a.y; // signed pixels
        const projN = v.x * n.x + v.y * n.y;
        const H = (seg.height ?? this.config.defaultTunnelHeight) * 10;
        const W = H * 1.2;
        const cp = this.ensureCrossParams(seg);
        if (handle.handleType === 'left') {
            const innerHalf = Math.max(8, (W - (cp.leftWidth*10) - (cp.rightWidth*10)) / 2);
            let newLeftPx = Math.max(4, -(projA) - innerHalf);
            cp.leftWidth = newLeftPx / 10;
        } else if (handle.handleType === 'right') {
            const innerHalf = Math.max(8, (W - (cp.leftWidth*10) - (cp.rightWidth*10)) / 2);
            let newRightPx = Math.max(4, projA - innerHalf);
            cp.rightWidth = newRightPx / 10;
        } else if (handle.handleType === 'leg') {
            let newLegPx = Math.max(4, (H/2) - projN);
            cp.legHeight = newLegPx / 10;
        } else if (handle.handleType === 'arch') {
            let newArchPx = Math.max(4, projN + (H/2));
            cp.archRise = newArchPx / 10;
        } else if (handle.handleType === 'angle') {
            // horizontal movement along segment direction controls arc sweep angle (in degrees)
            const offset = projA; // pixels left/right
            const base = 180; // default
            let sweep = base + (offset / 2); // scale factor
            sweep = Math.max(90, Math.min(270, sweep));
            cp.archAngle = sweep;
        }
        this.diagram.startTransaction('hsParams');
        // Replace the object to trigger bindings
        this.diagram.model.setDataProperty(seg, 'crossParams', { ...cp });
        this.diagram.commitTransaction('hsParams');
        // reposition handles to reflect new values
        this.updateHorseshoeHandlesPositions(seg);
    }

    updateCircleFromHandle(handle) {
        const seg = this.tunnelData.segments.get(handle.segmentKey) || (this.diagram.findNodeForKey(handle.segmentKey)?.data);
        if (!seg) return;
        const mid = seg.position ? go.Point.parse(seg.position) : new go.Point(0,0);
        const hp = handle.position ? go.Point.parse(handle.position) : mid;
        // Diameter is twice the distance from center to handle projected along segment axis
        const angle = (seg.angle || 0) * Math.PI/180;
        const a = new go.Point(Math.cos(angle), Math.sin(angle));
        const v = new go.Point(hp.x - mid.x, hp.y - mid.y);
        const proj = v.x * a.x + v.y * a.y; // signed px
        const radiusPx = Math.max(5, Math.abs(proj));
        const diameterM = (radiusPx * 2) / 10; // px -> m (10px = 1m vertical scale used for cross-section)
        const cp = this.ensureCrossParams(seg);
        cp.diameter = diameterM;
        this.diagram.startTransaction('circleDia');
        this.diagram.model.setDataProperty(seg, 'crossParams', { ...cp });
        this.diagram.model.setDataProperty(seg, 'width', diameterM);
        this.diagram.model.setDataProperty(seg, 'height', diameterM);
        this.diagram.commitTransaction('circleDia');
        this.createOrUpdateCircleHandle(seg);
    }

    setupDrawingHandlers() {
        // Serbest tünel çizimi için yeni event handlers
        this.freeTunnelPoints = []; // Serbest çizim için nokta listesi
        this.previewLine = null; // Canlı dotted line preview
        this.distanceLabel = null; // Mesafe göstergesi
        
        // Background click for free tunnel drawing
        this.diagram.addDiagramListener("BackgroundSingleClicked", (e) => {
            if (this.isDrawing && this.drawingMode === 'tunnel_drag') {
                this.addFreeTunnelPoint(e.diagram.lastInput.documentPoint);
            } else if (this.isDrawing && this.drawingMode === 'tunnel_point') {
                this.addPathPoint(e.diagram.lastInput.documentPoint);
            }
        });
        
        // Mouse move için DOM event kullan (GoJS'te DocumentMouseMove yok)
        this.diagram.div.addEventListener('mousemove', (e) => {
            if (this.isDrawing) {
                const rect = this.diagram.div.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const docPoint = this.diagram.transformViewToDoc(new go.Point(x, y));
                
                if (this.drawingMode === 'tunnel_drag' && this.freeTunnelPoints.length > 0) {
                    this.updateFreeTunnelPreview(docPoint);
                } else if (this.drawingMode === 'tunnel_point' && this.drawingPath.length > 0) {
                    this.updatePointPreview(docPoint);
                }
            }
        });
        
        // Double click to finish path drawing
        this.diagram.addDiagramListener("BackgroundDoubleClicked", (e) => {
            if (this.isDrawing && (this.drawingMode === 'tunnel_drag' || this.drawingMode === 'tunnel_point')) {
                this.finishFreeTunnelDrawing();
            }
        });
        
        // Escape key to cancel drawing
        this.diagram.div.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isDrawing) {
                this.cancelDrawing();
            }
        });
    }
    
    // Drawing modes
    enterDrawingMode(mode) {
        this.setDrawingMode(mode);
    }
    
    setDrawingMode(mode) {
        this.drawingMode = mode;
        this.isDrawing = true;
        this.drawingState = 'drawing';
        this.drawingPath = [];
        this.tempSegments = [];
        
        // Serbest tünel çizimi için nokta listesini sıfırla
        this.freeTunnelPoints = [];
        
        // Visual feedback
        this.diagram.div.style.cursor = 'crosshair';
        this.diagram.div.classList.add('drawing-mode');
        
        // Add instruction overlay
        this.showDrawingInstructions(mode);
        

    }
    
    exitDrawingMode() {
        const prevMode = this.drawingMode;
        this.isDrawing = false;
        this.drawingMode = null;
        this.drawingState = 'idle';
        this.currentTunnel = null;
        this.dragStartPoint = null;
        this.isDragging = false;
        
        // Serbest tünel çizimi temizliği
        this.clearPointerIndicator();
        this.clearPreviewLine();
        this.clearDistanceLabel();
    this.clearSnapIndicator();
    this.clearPathPointMarkers();
        this.freeTunnelPoints = [];
        
        // Clear preview; for point mode, keep user work by committing temp segments
        this.clearPreview();
        try {
            if (prevMode === 'tunnel_point' && this.tempSegments && this.tempSegments.length > 0) {
                this.diagram.startTransaction('exitCommitPath');
                this.commitTempSegments();
                this.diagram.commitTransaction('exitCommitPath');
            } else {
                this.clearTempSegments();
            }
        } catch (err) {

        }
        
        this.hideAngleRing();
        // Reset visuals
        this.diagram.div.style.cursor = 'default';
        this.diagram.div.classList.remove('drawing-mode');
        this.hideDrawingInstructions();
        

    }
    
    cancelDrawing() {
        // In point-path mode, ESC should finalize existing segments instead of deleting them
        try {
            if (this.drawingMode === 'tunnel_point' && this.tempSegments && this.tempSegments.length > 0) {
                this.diagram.startTransaction('escCommitPath');
                this.commitTempSegments();
                this.diagram.commitTransaction('escCommitPath');
            } else if (this.drawingMode === 'tunnel_drag' && this.freeTunnelPoints.length > 0) {
                // Serbest tünel modunda ESC - tamamla
                this.finishFreeTunnelDrawing();
                return;
            } else {
                // No committed segments yet (e.g., drag preview or no path) → clear temp
                this.clearTempSegments();
            }
        } catch (err) {

        }
        
        // Serbest tünel çizimi için temizlik
        this.clearPointerIndicator();
        this.clearPreviewLine();
        this.clearDistanceLabel();
    this.clearSnapIndicator();
        this.clearPathPointMarkers();
        this.freeTunnelPoints = [];
        
        // Always clear any preview
        this.clearPreview();
        this.drawingPath = [];
        this.exitDrawingMode();

        this.hideAngleRing();
    }
    
    // Enhanced drawing methods
    startDragDrawing(startPoint) {
    this.dragStartPoint = this.snapToGrid(startPoint);
    this.isDragging = true;
    this.drawingState = 'dragging';
    this.dragEndPoint = null;

    }
    
    updateDragDrawing(currentPoint) {
    if (!this.isDragging || !this.dragStartPoint) return;
    this.dragEndPoint = this.snapToGrid(currentPoint);
    const length = this.calculateDistance(this.dragStartPoint, this.dragEndPoint);
    const angle = this.calculateAngle(this.dragStartPoint, this.dragEndPoint);
    // Update or create preview
    this.updateDragPreview(this.dragStartPoint, this.dragEndPoint, length, angle);
    }
    
    completeDragDrawing(endPoint) {
        if (!this.isDragging || !this.dragStartPoint) return;
        const finalEndPoint = this.snapToGrid(endPoint);
        const length = this.calculateDistance(this.dragStartPoint, finalEndPoint);
        // Minimum length check
        if (length < 0.5) {

            this.cancelDrawing();
            return;
        }
        // Create tunnel segment with from/to
        this.createTunnelSegment(this.dragStartPoint, finalEndPoint, {
            startWidth: this.config.defaultStartWidth,
            endWidth: this.config.defaultEndWidth
        });
        // Reset drag state
        this.isDragging = false;
        this.dragStartPoint = null;
        this.dragEndPoint = null;
        this.clearPreview();
        this.hideAngleRing();
        // Clear any selection to not interfere with next draw
        this.diagram.clearSelection();

    }
    
    addPathPoint(point) {
        const snappedPoint = this.snapToGrid(point);
        this.drawingPath.push(snappedPoint);
        

        
        // Create segment if we have 2+ points
        if (this.drawingPath.length >= 2) {
            const lastIndex = this.drawingPath.length - 1;
            const start = this.drawingPath[lastIndex - 1];
            const end = this.drawingPath[lastIndex];
            
            this.createTempSegment(start, end, lastIndex - 1, {
                startWidth: this.config.defaultStartWidth,
                endWidth: this.config.defaultEndWidth
            });

            const segmentAngle = this.calculateAngle(start, end);
            this.showAngleRing(end, segmentAngle);
        }
        
        this.updatePathInstructions();
    }
    
    finishPathDrawing() {
        if (this.drawingPath.length < 2) {

            return;
        }
        
    // Convert temp segments to real segments
    this.diagram.startTransaction('commitPath');
    this.commitTempSegments();
    this.diagram.commitTransaction('commitPath');
        
        // Clear path
        this.drawingPath = [];
        this.exitDrawingMode();
        
        this.hideAngleRing();

    }
    
    createTunnelSegment(startPoint, endPoint, overrides = {}) {
        const midPoint = new go.Point(
            (startPoint.x + endPoint.x) / 2,
            (startPoint.y + endPoint.y) / 2
        );
        const startWidth = Math.max(0.05, overrides.startWidth ?? this.config.defaultStartWidth ?? 1);
        const endWidth = Math.max(0.05, overrides.endWidth ?? this.config.defaultEndWidth ?? 1);
        const segment = {
            key: this.generateSegmentId(),
            category: 'tunnel_segment',
            name: `T-${this.generateShortId()}`,
            from: go.Point.stringify(startPoint),
            to: go.Point.stringify(endPoint),
            position: go.Point.stringify(midPoint),
            width: this.config.defaultCrossSectionType === 'circle' ? this.config.defaultTunnelHeight : this.config.defaultTunnelWidth,
            height: this.config.defaultTunnelHeight,
            crossSectionType: this.config.defaultCrossSectionType,
            crossParams: {
                diameter: this.config.defaultTunnelHeight,
                leftWidth: this.config.defaultTunnelWidth * 0.4,
                rightWidth: this.config.defaultTunnelWidth * 0.4,
                legHeight: this.config.defaultTunnelHeight * 0.4,
                archRise: this.config.defaultTunnelHeight * 0.35,
                archAngle: 180
            },
            length: this.calculateDistance(startPoint, endPoint),
            angle: this.calculateAngle(startPoint, endPoint),
            startWidth,
            endWidth
        };
        
        // Add to diagram
        this.diagram.startTransaction('addSegment');
        this.diagram.model.addNodeData(segment);
        this.diagram.commitTransaction('addSegment');
        
        // Store in data
        this.tunnelData.segments.set(segment.key, segment);
        
        // Add measurement
        if (this.config.showMeasurements) {
            this.addMeasurement(startPoint, endPoint, segment.length, segment.key);
            this.updateMeasurementForSegment(segment);
        }
        
        // Callback
        if (this.onTunnelCreated) {
            this.onTunnelCreated(segment);
        }
        
        return segment;
    }
    
    createTempSegment(startPoint, endPoint, index, overrides = {}) {
        const midPoint = new go.Point(
            (startPoint.x + endPoint.x) / 2,
            (startPoint.y + endPoint.y) / 2
        );
        const startWidth = Math.max(0.05, overrides.startWidth ?? this.config.defaultStartWidth ?? 1);
        const endWidth = Math.max(0.05, overrides.endWidth ?? this.config.defaultEndWidth ?? 1);
        const segment = {
            key: `temp_${index}`,
            category: 'tunnel_segment',
            name: `T-${index + 1}`,
            from: go.Point.stringify(startPoint),
            to: go.Point.stringify(endPoint),
            position: go.Point.stringify(midPoint),
            width: this.config.defaultCrossSectionType === 'circle' ? this.config.defaultTunnelHeight : this.config.defaultTunnelWidth,
            height: this.config.defaultTunnelHeight,
            crossSectionType: this.config.defaultCrossSectionType,
            crossParams: {
                diameter: this.config.defaultTunnelHeight,
                leftWidth: this.config.defaultTunnelWidth * 0.4,
                rightWidth: this.config.defaultTunnelWidth * 0.4,
                legHeight: this.config.defaultTunnelHeight * 0.4,
                archRise: this.config.defaultTunnelHeight * 0.35,
                archAngle: 180
            },
            length: this.calculateDistance(startPoint, endPoint),
            angle: this.calculateAngle(startPoint, endPoint),
            isTemporary: true,
            startWidth,
            endWidth
        };
        
        this.diagram.startTransaction('addTempSegment');
        this.diagram.model.addNodeData(segment);
        this.diagram.commitTransaction('addTempSegment');
        this.tempSegments.push(segment);
        
        return segment;
    }
    
    commitTempSegments() {
        // Convert temp segments to permanent
        this.tempSegments.forEach((tempSeg, index) => {
            const permanentSeg = {
                ...tempSeg,
                key: this.generateSegmentId(),
                name: `T-${this.generateShortId()}`,
                isTemporary: false
            };
            
            // Remove temp and add permanent
            this.diagram.startTransaction('swapTempToPermanent');
            this.diagram.model.removeNodeData(tempSeg);
            this.diagram.model.addNodeData(permanentSeg);
            this.diagram.commitTransaction('swapTempToPermanent');
            
            // Store in data
            this.tunnelData.segments.set(permanentSeg.key, permanentSeg);
            
            // Add measurement
            if (this.config.showMeasurements) {
                let startPoint, endPoint;
                if (permanentSeg.from && permanentSeg.to) {
                    startPoint = go.Point.parse(permanentSeg.from);
                    endPoint = go.Point.parse(permanentSeg.to);
                } else if (permanentSeg.p1 && permanentSeg.p2) {
                    startPoint = go.Point.parse(permanentSeg.p1);
                    endPoint = go.Point.parse(permanentSeg.p2);
                } else if (permanentSeg.position && permanentSeg.length != null && permanentSeg.angle != null) {
                    startPoint = go.Point.parse(permanentSeg.position);
                    endPoint = this.calculateEndPoint(startPoint, permanentSeg.length, permanentSeg.angle);
                }
                if (startPoint && endPoint) this.addMeasurement(startPoint, endPoint, permanentSeg.length ?? this.calculateDistance(startPoint, endPoint), permanentSeg.key);
            }
            
            // Callback
            if (this.onTunnelCreated) {
                this.onTunnelCreated(permanentSeg);
            }
        });
        
        this.tempSegments = [];
        this.hideAngleRing();
    }
    
    clearTempSegments() {
        if (this.tempSegments.length) {
            this.diagram.startTransaction('removeTempSegments');
            this.tempSegments.forEach(seg => {
                if (seg && seg.isTemporary) {
                    this.diagram.model.removeNodeData(seg);
                }
            });
            this.diagram.commitTransaction('removeTempSegments');
        }
        this.tempSegments = [];
    }
    
    // Serbest tünel çizimi için yeni metodlar
    addFreeTunnelPoint(point) {
        try {
            const snappedPoint = this.snapToGrid(point);
            
            // İlk nokta - sadece ekle ve pointer oluştur
            if (this.freeTunnelPoints.length === 0) {
                this.freeTunnelPoints.push(snappedPoint);
                this.createPointerIndicator(snappedPoint);
                this.addPathPointMarker(snappedPoint, 0);

                return;
            }
            
            // İkinci ve sonraki noktalar - sadece nokta ekle (segment oluşturma)
            const lastPoint = this.freeTunnelPoints[this.freeTunnelPoints.length - 1];
            const length = this.calculateDistance(lastPoint, snappedPoint);
            
            if (length < (this.config.minSegmentLength || 0.5)) {

                return;
            }
            
            // Sadece nokta ekle - segment oluşturma
            this.freeTunnelPoints.push(snappedPoint);
            
            // Pointer indicator'ı yeni noktaya taşı (clearPointerIndicator çağırma, createPointerIndicator günceller)
            this.createPointerIndicator(snappedPoint);
            this.addPathPointMarker(snappedPoint, this.freeTunnelPoints.length - 1);

            // Anında kalıcı bir çizgi segmenti oluştur (serbest modda kesit değil çizgi)
            const newSegment = this.createFreeSegment(lastPoint, snappedPoint);

            if (newSegment) {
                const segmentAngle = this.calculateAngle(lastPoint, snappedPoint);
                this.showAngleRing(snappedPoint, segmentAngle);
            }
            

        } catch (err) {

        }
    }
    
    updateFreeTunnelPreview(currentPoint) {
        try {
            if (this.freeTunnelPoints.length === 0) return;
            
            const lastPoint = this.freeTunnelPoints[this.freeTunnelPoints.length - 1];
            const snappedCur = this.snapToGrid(currentPoint);
            const distance = this.calculateDistance(lastPoint, snappedCur);
            
            // Dotted line preview güncelle
            this.updatePreviewLine(lastPoint, snappedCur);
            
            // Mesafe labelını güncelle
            this.updateDistanceLabel(snappedCur, distance);
            this.updateAngleRing(snappedCur);
            
        } catch (err) {

        }
    }
    
    createPointerIndicator(point) {
        try {
            // Mevcut pointer'ı güncelle, yoksa oluştur
            let pointerNode = null;
            this.diagram.nodes.each(node => {
                if (node.data.category === "pointer_indicator" && node.data.key === "free_tunnel_pointer") {
                    pointerNode = node;
                }
            });
            
            if (pointerNode) {
                // Mevcut pointer'ı güncelle
                this.diagram.startTransaction('updatePointer');
                this.diagram.model.setDataProperty(pointerNode.data, "loc", go.Point.stringify(point));
                this.diagram.commitTransaction('updatePointer');
            } else {
                // Yeni pointer oluştur
                const pointerData = {
                    category: "pointer_indicator",
                    key: "free_tunnel_pointer",
                    loc: go.Point.stringify(point),
                    temporary: true
                };
                
                this.diagram.model.addNodeData(pointerData);
            }
        } catch (err) {

        }
    }
    
    clearPointerIndicator() {
        try {
            const toRemove = [];
            this.diagram.nodes.each(node => {
                if (node.data.category === "pointer_indicator") {
                    toRemove.push(node.data);
                }
            });
            
            toRemove.forEach(data => {
                this.diagram.model.removeNodeData(data);
            });
        } catch (err) {

        }
    }
    
    updatePreviewLine(fromPoint, toPoint) {
        try {
            // Mevcut preview line'ı güncelle, yoksa oluştur
            let previewNode = null;
            this.diagram.nodes.each(node => {
                if (node.data.category === "preview_line" && node.data.key === "free_tunnel_preview") {
                    previewNode = node;
                }
            });
            
            // grid'e oturtulmuş ve bağıl geometri için referans noktası
            const from = (fromPoint.copy ? fromPoint.copy() : new go.Point(fromPoint.x, fromPoint.y));
            const to = (toPoint.copy ? toPoint.copy() : new go.Point(toPoint.x, toPoint.y));
            const pos = new go.Point(Math.min(from.x, to.x), Math.min(from.y, to.y));

            if (previewNode) {
                // Mevcut preview line'ı güncelle
                this.diagram.startTransaction('updatePreviewLine');
                this.diagram.model.setDataProperty(previewNode.data, "pos", go.Point.stringify(pos));
                this.diagram.model.setDataProperty(previewNode.data, "from", go.Point.stringify(from));
                this.diagram.model.setDataProperty(previewNode.data, "to", go.Point.stringify(to));
                this.diagram.commitTransaction('updatePreviewLine');
            } else {
                // Yeni preview line oluştur
                const previewData = {
                    category: "preview_line",
                    key: "free_tunnel_preview",
                    pos: go.Point.stringify(pos),
                    from: go.Point.stringify(from),
                    to: go.Point.stringify(to),
                    temporary: true
                };
                
                this.diagram.model.addNodeData(previewData);
            }
        } catch (err) {

        }
    }
    
    clearPreviewLine() {
        try {
            const toRemove = [];
            this.diagram.nodes.each(node => {
                if (node.data.category === "preview_line") {
                    toRemove.push(node.data);
                }
            });
            
            toRemove.forEach(data => {
                this.diagram.model.removeNodeData(data);
            });
        } catch (err) {

        }
    }
    
    updateDistanceLabel(point, distance) {
        try {
            // Mevcut distance label'ı güncelle, yoksa oluştur
            let labelNode = null;
            this.diagram.nodes.each(node => {
                if (node.data.category === "distance_label" && node.data.key === "free_tunnel_distance") {
                    labelNode = node;
                }
            });
            
            const distanceText = Math.round(distance * 10) / 10 + "m";
            
            if (labelNode) {
                // Mevcut label'ı güncelle
                this.diagram.startTransaction('updateDistanceLabel');
                this.diagram.model.setDataProperty(labelNode.data, "loc", go.Point.stringify(point));
                this.diagram.model.setDataProperty(labelNode.data, "text", distanceText);
                this.diagram.commitTransaction('updateDistanceLabel');
            } else {
                // Yeni label oluştur
                const labelData = {
                    category: "distance_label",
                    key: "free_tunnel_distance",
                    loc: go.Point.stringify(point),
                    text: distanceText,
                    temporary: true
                };
                
                this.diagram.model.addNodeData(labelData);
            }
        } catch (err) {

        }
    }
    
    clearDistanceLabel() {
        try {
            const toRemove = [];
            this.diagram.nodes.each(node => {
                if (node.data.category === "distance_label") {
                    toRemove.push(node.data);
                }
            });
            
            toRemove.forEach(data => {
                this.diagram.model.removeNodeData(data);
            });
        } catch (err) {

        }
    }

    // Free-mode: kalıcı çizgi segmenti oluştur
    createFreeSegment(startPoint, endPoint, overrides = {}) {
        const from = (startPoint.copy ? startPoint.copy() : new go.Point(startPoint.x, startPoint.y));
        const to = (endPoint.copy ? endPoint.copy() : new go.Point(endPoint.x, endPoint.y));
        const startWidth = Math.max(0.05, overrides.startWidth ?? this.config.defaultStartWidth ?? 1);
        const endWidth = Math.max(0.05, overrides.endWidth ?? this.config.defaultEndWidth ?? 1);
        const shape = this.computeFreeSegmentGeometry(from, to, startWidth, endWidth);

        if (!shape) {
            console.warn('⚠️ Free segment could not be created due to invalid geometry.');
            return null;
        }

        const seg = {
            key: this.generateSegmentId(),
            category: 'free_tunnel_segment',
            pos: go.Point.stringify(shape.position),
            from: go.Point.stringify(from),
            to: go.Point.stringify(to),
            length: this.calculateDistance(from, to),
            angle: this.calculateAngle(from, to),
            startWidth,
            endWidth,
            geometryString: shape.geometry
        };

        this.diagram.startTransaction('addFreeSeg');
        this.diagram.model.addNodeData(seg);
        this.diagram.commitTransaction('addFreeSeg');
        if (this.config.showMeasurements) {
            this.addMeasurement(from, to, seg.length, seg.key);
        }
        return seg;
    }

    // --- Free tunnel path point markers ---
    addPathPointMarker(point, index) {
        try {
            const data = {
                category: 'path_point',
                key: `free_point_${index}`,
                loc: go.Point.stringify(point),
                temporary: true
            };
            this.diagram.model.addNodeData(data);
        } catch (err) {

        }
    }

    clearPathPointMarkers() {
        try {
            const toRemove = [];
            this.diagram.nodes.each(node => {
                if (node.data && node.data.category === 'path_point' && node.data.key && node.data.key.startsWith('free_point_')) {
                    toRemove.push(node.data);
                }
            });
            toRemove.forEach(d => this.diagram.model.removeNodeData(d));
        } catch (err) {

        }
    }
    
    finishFreeTunnelDrawing() {
        try {

            
            // Tüm geçici elementleri temizle
            this.clearPointerIndicator();
            this.clearPreviewLine();
            this.clearDistanceLabel();
            
            // Drawing state'i sıfırla
            this.freeTunnelPoints = [];
            this.exitDrawingMode();
            this.hideAngleRing();
            
        } catch (err) {

        }
    }
    
    // Preview system
    updatePreview(mousePoint) {
        if (!this.isDrawing) return;
        
        if (this.drawingMode === 'tunnel_drag' && this.isDragging) {
            this.updateDragDrawing(mousePoint);
        } else if (this.drawingMode === 'tunnel_point' && this.drawingPath.length > 0) {
            this.updatePointPreview(mousePoint);
        }
    }
    
    updateDragPreview(startPoint, endPoint, length, angle) {
        const midPoint = new go.Point(
            (startPoint.x + endPoint.x) / 2,
            (startPoint.y + endPoint.y) / 2
        );
        const preview = {
            key: 'preview',
            category: 'tunnel_preview',
            from: go.Point.stringify(startPoint),
            to: go.Point.stringify(endPoint),
            position: go.Point.stringify(midPoint),
            width: this.config.defaultTunnelWidth,
            height: this.config.defaultTunnelHeight,
            length: length,
            angle: angle
        };
        if (this.previewNode) {
            this.diagram.startTransaction('updatePreview');
            this.diagram.model.setDataProperty(this.previewNode, "from", preview.from);
            this.diagram.model.setDataProperty(this.previewNode, "to", preview.to);
            this.diagram.model.setDataProperty(this.previewNode, "position", preview.position);
            this.diagram.model.setDataProperty(this.previewNode, "length", preview.length);
            this.diagram.model.setDataProperty(this.previewNode, "angle", preview.angle);
            this.diagram.commitTransaction('updatePreview');
        } else {
            this.diagram.startTransaction('addPreview');
            this.diagram.model.addNodeData(preview);
            this.previewNode = preview;
            this.diagram.commitTransaction('addPreview');
        }

        this.updateAngleRing(endPoint);
    }
    
    updatePointPreview(mousePoint) {
        const lastPoint = this.drawingPath[this.drawingPath.length - 1];
        const snappedPoint = this.snapToGrid(mousePoint);
        const length = this.calculateDistance(lastPoint, snappedPoint);
        const angle = this.calculateAngle(lastPoint, snappedPoint);
        
        this.updateDragPreview(lastPoint, snappedPoint, length, angle);
        this.updateAngleRing(snappedPoint);
    }
    
    clearPreview() {
        if (this.previewNode) {
            this.diagram.startTransaction('removePreview');
            this.diagram.model.removeNodeData(this.previewNode);
            this.diagram.commitTransaction('removePreview');
            this.previewNode = null;
        }
    }
    
    // UI Instructions
    showDrawingInstructions(mode) {
        const instructions = {
            'tunnel_drag': '� Serbest tünel: Noktalara tıklayın, dotted çizgi ile önizleme | Bitirmek için çift tıklayın',
            'tunnel_point': '📍 Tünel yolu için noktalara tıklayın, bitirmek için çift tıklayın',
            'station': '🚉 İstasyon eklemek için bir yere tıklayın'
        };
        
        const instructionText = instructions[mode] || 'Çizim modunda...';
        
        // Create or update instruction overlay
        let overlay = document.getElementById('drawing-instructions');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'drawing-instructions';
            overlay.style.cssText = `
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
            `;
            this.diagram.div.appendChild(overlay);
        }
        
        overlay.textContent = instructionText;
        overlay.style.display = 'block';
    }
    
    hideDrawingInstructions() {
        const overlay = document.getElementById('drawing-instructions');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
    
    updatePathInstructions() {
        const overlay = document.getElementById('drawing-instructions');
        if (overlay && this.drawingPath.length > 0) {
            overlay.textContent = `📍 Nokta ${this.drawingPath.length} eklendi. Devam için tıklayın, bitirmek için çift tıklayın veya ESC ile iptal edin`;
        }
    }
    
    // Utility methods
    snapToGrid(point) {
        if (!this.config.snapToGrid) return point;
        
        const gridSize = this.config.gridSize * 20;
        const snapped = new go.Point(
            Math.round(point.x / gridSize) * gridSize,
            Math.round(point.y / gridSize) * gridSize
        );
        
        // Advanced magnetic snap: endpoints, markers, and projections on segments
        if (!this.config.magneticSnap) return snapped;

        const magneticDistance = gridSize * (this.config.magneticSnapMultiplier || 2);
        const thresh2 = magneticDistance * magneticDistance;

        let bestPoint = null;
        let bestDist2 = thresh2 + 1;

        const consider = (p, type) => {
            if (!p) return;
            const d2 = snapped.distanceSquaredPoint(p);
            if (d2 < bestDist2 && d2 <= thresh2) {
                bestDist2 = d2;
                bestPoint = p;
                this._lastSnapType = type || 'point';
            }
        };

        // 1) Snap to existing point markers (including current path markers)
        if (this.config.snapToPoints) {
            this.diagram.nodes.each(node => {
                const cat = node.data && node.data.category;
                if (cat === 'path_point' && node.data.loc) {
                    consider(go.Point.parse(node.data.loc), 'marker');
                }
            });
        }

        // 2) Snap to segment endpoints and projected points on segments
        if (this.config.snapToSegments) {
            const nodes = (this.diagram && this.diagram.model) ? this.diagram.model.nodeDataArray : [];
            for (const n of nodes) {
                if (n.category !== 'tunnel_segment' && n.category !== 'free_tunnel_segment') continue;
                if (!n.from || !n.to) continue;
                const a = go.Point.parse(n.from);
                const b = go.Point.parse(n.to);
                // endpoints
                if (this.config.snapToPoints) {
                    consider(a, 'point');
                    consider(b, 'point');
                }
                // projection onto segment
                const proj = this.projectPointToSegment(snapped, a, b);
                consider(proj, 'segment');
            }
        }

        // 3) Also consider freeTunnelPoints (in-progress points not yet committed as markers)
        if (this.config.snapToPoints && this.freeTunnelPoints && this.freeTunnelPoints.length) {
            for (const p of this.freeTunnelPoints) consider(p, 'point');
        }

        // Visual feedback
        if (bestPoint && this.isDrawing) {
            this.updateSnapIndicator(bestPoint, this._lastSnapType || 'point');
        } else {
            this.clearSnapIndicator();
        }

        return bestPoint || snapped;
    }

    // Return the nearest point on the segment AB to point P (clamped to segment)
    projectPointToSegment(p, a, b) {
        const abx = b.x - a.x, aby = b.y - a.y;
        const apx = p.x - a.x, apy = p.y - a.y;
        const ab2 = abx*abx + aby*aby;
        if (ab2 === 0) return a.copy ? a.copy() : new go.Point(a.x, a.y);
        let t = (apx*abx + apy*aby) / ab2;
        if (t < 0) t = 0; else if (t > 1) t = 1;
        return new go.Point(a.x + t*abx, a.y + t*aby);
    }

    // --- Snap indicator helpers ---
    updateSnapIndicator(point, kind = 'point') {
        try {
            if (!this.isDrawing) return;
            let node = null;
            this.diagram.nodes.each(n => {
                if (n.data.category === 'snap_indicator' && n.data.key === 'free_snap_indicator') node = n;
            });
            if (node) {
                this.diagram.startTransaction('updateSnapIndicator');
                this.diagram.model.setDataProperty(node.data, 'loc', go.Point.stringify(point));
                this.diagram.model.setDataProperty(node.data, 'kind', kind);
                this.diagram.commitTransaction('updateSnapIndicator');
            } else {
                const data = { key: 'free_snap_indicator', category: 'snap_indicator', loc: go.Point.stringify(point), kind, temporary: true };
                this.diagram.model.addNodeData(data);
            }
        } catch (e) {

        }
    }
    clearSnapIndicator() {
        try {
            const toRemove = [];
            this.diagram.nodes.each(n => { if (n.data.category === 'snap_indicator') toRemove.push(n.data); });
            toRemove.forEach(d => this.diagram.model.removeNodeData(d));
        } catch (e) {
            // silent
        }
    }
    
    computeFreeSegmentGeometry(startPoint, endPoint, startWidthMeters, endWidthMeters) {
        if (!startPoint || !endPoint) return null;

        const startWidth = Math.max(0.05, startWidthMeters ?? this.config.defaultStartWidth ?? 1);
        const endWidth = Math.max(0.05, endWidthMeters ?? this.config.defaultEndWidth ?? 1);

        const dx = endPoint.x - startPoint.x;
        const dy = endPoint.y - startPoint.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length < 0.0001) return null;

        const halfStart = (startWidth * 20) / 2;
        const halfEnd = (endWidth * 20) / 2;

        const nx = -dy / length;
        const ny = dx / length;

        const p1 = new go.Point(startPoint.x + nx * halfStart, startPoint.y + ny * halfStart);
        const p2 = new go.Point(endPoint.x + nx * halfEnd, endPoint.y + ny * halfEnd);
        const p3 = new go.Point(endPoint.x - nx * halfEnd, endPoint.y - ny * halfEnd);
        const p4 = new go.Point(startPoint.x - nx * halfStart, startPoint.y - ny * halfStart);

        const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        const minY = Math.min(p1.y, p2.y, p3.y, p4.y);

        const local = [p1, p2, p3, p4].map(pt => ({
            x: (pt.x - minX).toFixed(2),
            y: (pt.y - minY).toFixed(2)
        }));

        const geometry = `M${local[0].x} ${local[0].y} L${local[1].x} ${local[1].y} L${local[2].x} ${local[2].y} L${local[3].x} ${local[3].y} Z`;

        return {
            position: new go.Point(minX, minY),
            geometry,
            startWidth,
            endWidth
        };
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
    
    calculateEndPoint(startPoint, length, angle) {
        const angleRad = angle * Math.PI / 180;
        const pixelLength = length * 20;
        return new go.Point(
            startPoint.x + Math.cos(angleRad) * pixelLength,
            startPoint.y + Math.sin(angleRad) * pixelLength
        );
    }
    
    getCrossSectionIcon(type) {
        const icons = {
            circle: '🔵',
            rectangle: '▭',
            horseshoe: '🏛️'
        };
        return icons[type] || '🔵';
    }
    
    generateSegmentId() {
        return `seg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    }
    
    generateShortId() {
        return Math.random().toString(36).substr(2, 4).toUpperCase();
    }
    
    generateMeasurementId() {
        return `meas_${Date.now()}_${Math.random().toString(36).substr(2, 3)}`;
    }
    
    addMeasurement(point1, point2, distance, segmentKey = null) {
        const midPoint = new go.Point(
            (point1.x + point2.x) / 2,
            (point1.y + point2.y) / 2
        );
        
        const measurement = {
            key: this.generateMeasurementId(),
            category: 'measurement',
            position: go.Point.stringify(midPoint),
            measurement: `${distance.toFixed(2)}m`,
            segmentKey: segmentKey || undefined
        };
        
        this.diagram.startTransaction('addMeasurement');
        this.diagram.model.addNodeData(measurement);
        this.diagram.commitTransaction('addMeasurement');
        
        this.tunnelData.measurements.set(measurement.key, measurement);
        if (segmentKey) {
            this.segmentMeasurements.set(segmentKey, measurement.key);
        }
        
        console.log('📏 Measurement added:', measurement);
    }
    
    // Data methods
    getTunnelData() {
        // Prefer live model data to include user edits (resize/move/rotate)
        const nodes = this.diagram && this.diagram.model ? this.diagram.model.nodeDataArray : [];
        const segments = nodes.filter(n => (n.category === 'tunnel_segment' || n.category === 'free_tunnel_segment') && !n.isTemporary);
        const stations = nodes.filter(n => n.category === 'miner_station');
        const measurements = nodes.filter(n => n.category === 'measurement');
        const gateways = nodes.filter(n => n.category === 'gateway');
        return { segments, stations, measurements, gateways };
    }
    
    exportTunnelData() {
        return JSON.stringify(this.getTunnelData(), null, 2);
    }
    
    importTunnelData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.loadTunnelData(data);
        } catch (error) {

        }
    }
    
    loadTunnelData(data) {
        // Clear maps (do not mutate existing model arrays outside of transaction)
        this.tunnelData.segments.clear();
        this.tunnelData.stations.clear();
        this.tunnelData.measurements.clear();
        
        // Process segments and recalculate length if missing
        const processedSegments = (data.segments || []).map(seg => {
            // If length is missing or 0, recalculate it
            if (!seg.length || seg.length === 0) {
                if (seg.from && seg.to) {
                    const startPoint = go.Point.parse(seg.from);
                    const endPoint = go.Point.parse(seg.to);
                    seg.length = this.calculateDistance(startPoint, endPoint);
                }
            }

            if (seg.category === 'tunnel_segment') {
                if (typeof seg.startWidth !== 'number') {
                    seg.startWidth = this.config.defaultStartWidth ?? 1;
                }
                if (typeof seg.endWidth !== 'number') {
                    seg.endWidth = seg.startWidth;
                }
            }

            if (seg.category === 'free_tunnel_segment') {
                const startPoint = seg.from ? go.Point.parse(seg.from) : null;
                const endPoint = seg.to ? go.Point.parse(seg.to) : null;
                if (typeof seg.startWidth !== 'number') {
                    seg.startWidth = this.config.defaultStartWidth ?? 1;
                }
                if (typeof seg.endWidth !== 'number') {
                    seg.endWidth = seg.startWidth;
                }
                if (startPoint && endPoint) {
                    const shape = this.computeFreeSegmentGeometry(startPoint, endPoint, seg.startWidth, seg.endWidth);
                    if (shape) {
                        seg.geometryString = shape.geometry;
                        seg.pos = go.Point.stringify(shape.position);
                    }
                }
            }
            return seg;
        });
        
        // Load segments, stations, and gateways
        const allNodes = [
            ...processedSegments,
            ...(data.stations || []),
            ...(data.gateways || [])
        ];
        
        // Rebuild model and add nodes within a transaction to avoid warnings
        this.diagram.model = new go.GraphLinksModel();
        this.diagram.startTransaction('loadData');
        allNodes.forEach(nd => this.diagram.model.addNodeData(nd));
        this.diagram.commitTransaction('loadData');
        
        // Update data storage for segments, stations, and gateways
        processedSegments.forEach(seg => this.tunnelData.segments.set(seg.key, seg));
        data.stations?.forEach(sta => this.tunnelData.stations.set(sta.key, sta));
        data.gateways?.forEach(gw => {
            this.tunnelData.gateways.set(gw.key, gw);
            // Track segment-gateway relationship
            if (gw.segmentKey) {
                if (!this.segmentGateways.has(gw.segmentKey)) {
                    this.segmentGateways.set(gw.segmentKey, []);
                }
                this.segmentGateways.get(gw.segmentKey).push(gw.key);
            }
        });
        
        // Recreate measurements for all segments if showMeasurements is enabled
        if (this.config.showMeasurements) {
            processedSegments.forEach(seg => {
                if (seg.from && seg.to && seg.length) {
                    const startPoint = go.Point.parse(seg.from);
                    const endPoint = go.Point.parse(seg.to);
                    this.addMeasurement(startPoint, endPoint, seg.length, seg.key);
                }
            });
        }
        
        // Try to link orphan measurements to nearest segment so they follow on move
        this.linkMeasurementsToSegments();
        

    }

    linkMeasurementsToSegments() {
        try {
            if (!this.tunnelData.segments.size || !this.tunnelData.measurements.size) return;
            const segments = Array.from(this.tunnelData.segments.values());
            const unlinked = Array.from(this.tunnelData.measurements.values()).filter(m => !m.segmentKey);
            if (!unlinked.length) return;
            const threshold2 = (80 /*px*/)**2;
            unlinked.forEach(m => {
                const mp = m.position ? go.Point.parse(m.position) : null;
                if (!mp) return;
                let best = null, bestd2 = Infinity;
                segments.forEach(s => {
                    if (!s.position) return;
                    const sp = go.Point.parse(s.position);
                    const d2 = (sp.x - mp.x) * (sp.x - mp.x) + (sp.y - mp.y) * (sp.y - mp.y);
                    if (d2 < bestd2) { bestd2 = d2; best = s; }
                });
                if (best && bestd2 <= threshold2) {
                    this.diagram.startTransaction('linkMeasurement');
                    this.diagram.model.setDataProperty(m, 'segmentKey', best.key);
                    this.diagram.commitTransaction('linkMeasurement');
                    this.segmentMeasurements.set(best.key, m.key);
                }
            });
        } catch (err) {

        }
    }
    
    // ========== GATEWAY/SENSOR (ALICI) METHODS ==========
    resolveSegmentAnchor(segment, referencePoint = null) {
        if (!segment || !segment.from || !segment.to) return null;

        const startPoint = go.Point.parse(segment.from);
        const endPoint = go.Point.parse(segment.to);
        let anchorKey = 'end';
        let anchorPoint = endPoint.copy ? endPoint.copy() : new go.Point(endPoint.x, endPoint.y);

        if (referencePoint) {
            const docPoint = referencePoint.copy ? referencePoint.copy() : new go.Point(referencePoint.x, referencePoint.y);
            const distStart = Math.pow(docPoint.x - startPoint.x, 2) + Math.pow(docPoint.y - startPoint.y, 2);
            const distEnd = Math.pow(docPoint.x - endPoint.x, 2) + Math.pow(docPoint.y - endPoint.y, 2);
            anchorKey = distStart <= distEnd ? 'start' : 'end';
            anchorPoint = anchorKey === 'start' ? (startPoint.copy ? startPoint.copy() : new go.Point(startPoint.x, startPoint.y)) : (endPoint.copy ? endPoint.copy() : new go.Point(endPoint.x, endPoint.y));
        }

        let baseVector;
        if (anchorKey === 'start') {
            baseVector = new go.Point(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
        } else {
            baseVector = new go.Point(startPoint.x - endPoint.x, startPoint.y - endPoint.y);
        }

        if (Math.abs(baseVector.x) < 0.001 && Math.abs(baseVector.y) < 0.001) {
            baseVector = new go.Point(1, 0);
        }

        const baseAngleDeg = this.normalizeAngle((Math.atan2(baseVector.y, baseVector.x) * 180) / Math.PI);

        return {
            segment,
            anchorKey,
            anchorPoint,
            baseAngleDeg,
            startPoint,
            endPoint
        };
    }

    createSegmentTooltip() {
        const $ = go.GraphObject.make;
        return $(go.Adornment, "Auto",
            $(go.Shape, "RoundedRectangle", {
                fill: "rgba(0, 0, 0, 0.8)",
                stroke: "#00C853",
                strokeWidth: 2
            }),
            $(go.TextBlock, {
                margin: 8,
                font: "bold 12px sans-serif",
                stroke: "white"
            },
            new go.Binding("text", "", (data) => {
                // Bu tooltip mouse hareket ettikçe güncellenmeyecek
                // Gerçek metraj hesaplaması click handler'da yapılacak
                return `Tıklayarak alıcı ekle`;
            }))
        );
    }

    handleExtendSegmentRequest() {
        if (!this.pendingGatewayContext || !this.pendingGatewayContext.segment) {
            return;
        }

        const context = this.pendingGatewayContext;
        const anchorPoint = context.anchorPoint ? (context.anchorPoint.copy ? context.anchorPoint.copy() : new go.Point(context.anchorPoint.x, context.anchorPoint.y)) : null;
        const payload = {
            segmentKey: context.segment.key,
            anchorKey: context.anchorKey || 'end',
            baseAngleDeg: context.baseAngleDeg ?? 0,
            anchorPoint: anchorPoint ? { x: anchorPoint.x, y: anchorPoint.y } : null,
            startWidth: this.config.defaultStartWidth,
            endWidth: this.config.defaultEndWidth
        };

        const confirmHandler = (angleDelta, lengthMeters) => {
            this.manualExtendSegment(context, angleDelta, lengthMeters);
        };

        if (window.openSegmentExtensionDialog) {
            window.openSegmentExtensionDialog(payload, confirmHandler);
        } else {
            const lengthPrompt = parseFloat(prompt('Uzunluk (metre):', `${Math.max(this.config.minSegmentLength || 0.5, 5).toFixed(2)}`));
            if (!lengthPrompt || lengthPrompt <= 0) return;
            const anglePrompt = parseFloat(prompt('Açı (derece):', '0')) || 0;
            confirmHandler(anglePrompt, lengthPrompt);
        }
    }

    manualExtendSegment(context, angleDelta, lengthMeters) {
        if (!context || !context.segment || !context.anchorPoint) return;

        const minLength = this.config.minSegmentLength || 0.5;
        if (lengthMeters < minLength) {
            if (typeof window.showMessage === 'function') {
                window.showMessage(`Uzunluk en az ${minLength.toFixed(2)} m olmalı.`, 'warning');
            }
            return;
        }

    this.hideGatewayContextMenu();
    const rawAnchor = context.anchorPoint.copy ? context.anchorPoint.copy() : new go.Point(context.anchorPoint.x, context.anchorPoint.y);
    const anchorPoint = this.snapToGrid ? this.snapToGrid(rawAnchor) : rawAnchor;
        const baseAngle = context.baseAngleDeg ?? 0;
        const absoluteAngle = this.normalizeAngle(baseAngle + angleDelta);

    let endPoint = this.calculateEndPoint(anchorPoint, lengthMeters, absoluteAngle);
        if (this.config.snapToGrid) {
            endPoint = this.snapToGrid(endPoint);
        }

        const segment = this.createTunnelSegment(anchorPoint, endPoint, {
            startWidth: this.config.defaultStartWidth,
            endWidth: this.config.defaultEndWidth
        });

        if (segment) {
            if (this.diagram) {
                this.diagram.clearSelection();
            }
            const part = this.diagram.findPartForKey(segment.key);
            if (part) {
                this.diagram.select(part);
            }
        }

        this.hideAngleRing();
        this.pendingGatewayContext = null;
    }
    
    startDrawingFromSegmentEndpoint(segment, clickPoint) {
        const anchor = this.resolveSegmentAnchor(segment, clickPoint);
        if (!anchor) return;

        const anchorPoint = anchor.anchorPoint.copy ? anchor.anchorPoint.copy() : new go.Point(anchor.anchorPoint.x, anchor.anchorPoint.y);

        this.hideGatewayContextMenu();
        this.pendingGatewayContext = null;
        this.hideAngleRing();

        if (this.drawingMode === 'tunnel_drag') {
            this.clearPointerIndicator();
            this.clearPreviewLine();
            this.clearDistanceLabel();
            this.clearPathPointMarkers();
            this.freeTunnelPoints = [];
            this.addFreeTunnelPoint(anchorPoint);
        } else if (this.drawingMode === 'tunnel_point') {
            this.clearPreview();
            this.clearTempSegments();
            this.drawingPath = [];
            this.tempSegments = [];
            this.drawingPath.push(anchorPoint.copy ? anchorPoint.copy() : new go.Point(anchorPoint.x, anchorPoint.y));
            this.updatePathInstructions();
        }

        this.showAngleRing(anchorPoint, anchor.baseAngleDeg);

        if (typeof this.diagram?.clearSelection === 'function') {
            this.diagram.clearSelection();
        }
    }

    handleSegmentClick(e, obj) {
        const segment = obj?.part?.data;
        if (!segment || !segment.from || !segment.to) return;

        const clickPoint = (e && e.documentPoint) ? e.documentPoint : this.diagram.lastInput.documentPoint;

        if (this.isDrawing) {
            if (this.drawingMode === 'tunnel_drag' || this.drawingMode === 'tunnel_point') {
                if (e) e.handled = true;
                this.startDrawingFromSegmentEndpoint(segment, clickPoint);
            }
            return;
        }

        // Varsayılan seçimi engelle
        if (e) {
            e.handled = true;
        }
        this.diagram.clearSelection();

        const anchor = this.resolveSegmentAnchor(segment, clickPoint);
        const startPoint = anchor?.startPoint || go.Point.parse(segment.from);
        const endPoint = anchor?.endPoint || go.Point.parse(segment.to);
        const meterage = this.calculateMeterageOnSegment(clickPoint, startPoint, endPoint, segment.length);

        this.showGatewayContextMenu(segment, clickPoint, meterage, anchor);
    }

    deleteSegment(segment) {
        if (!segment) return;

        const segKey = segment.key;

        try {
            this.diagram.startTransaction('deleteSegment');

            // Remove measurement linked to this segment
            if (segKey && this.segmentMeasurements && this.segmentMeasurements.has(segKey)) {
                const measurementKey = this.segmentMeasurements.get(segKey);
                if (measurementKey) {
                    const measurementData = this.diagram.model.findNodeDataForKey(measurementKey);
                    if (measurementData) {
                        this.diagram.model.removeNodeData(measurementData);
                    }
                    this.tunnelData.measurements.delete(measurementKey);
                }
                this.segmentMeasurements.delete(segKey);
            }

            // Remove gateways tied to this segment
            if (segKey && this.segmentGateways && this.segmentGateways.has(segKey)) {
                const gatewayKeys = this.segmentGateways.get(segKey) || [];
                gatewayKeys.forEach((gatewayKey) => {
                    const gatewayData = this.diagram.model.findNodeDataForKey(gatewayKey);
                    if (gatewayData) {
                        this.diagram.model.removeNodeData(gatewayData);
                    }
                    this.tunnelData.gateways.delete(gatewayKey);
                });
                this.segmentGateways.delete(segKey);
            }

            // Remove the segment itself
            this.diagram.model.removeNodeData(segment);
            if (segKey) {
                this.tunnelData.segments.delete(segKey);
            }

            // Cleanup any custom handles associated with this segment
            if (segment.crossSectionType === 'horseshoe' && this.hsHandles && this.hsHandles.has(segKey)) {
                this.removeHorseshoeHandles();
            }
            if (this.circleHandle && this.circleHandle.segmentKey === segKey) {
                this.removeCircleHandle();
            }

            this.diagram.commitTransaction('deleteSegment');
        } catch (err) {
            try { this.diagram.rollbackTransaction('deleteSegment'); } catch (_) { /* noop */ }
            console.error('Segment deletion failed', err);
            return;
        }

        this.hideGatewayContextMenu();
        this.hideHoverMeterLabel();
        this.pendingGatewayContext = null;
        this.diagram.clearSelection();

        if (typeof this.onTunnelModified === 'function') {
            this.onTunnelModified(this.getTunnelData());
        }
    }
    
    calculateMeterageOnSegment(clickPoint, startPoint, endPoint, totalLength) {
        // Segment vektörü
        const segmentVector = new go.Point(
            endPoint.x - startPoint.x,
            endPoint.y - startPoint.y
        );
        
        // Click noktasının başlangıç noktasına göre vektörü
        const clickVector = new go.Point(
            clickPoint.x - startPoint.x,
            clickPoint.y - startPoint.y
        );
        
        // Segment vektörünün uzunluğu (piksel)
        const segmentLengthPx = Math.sqrt(
            segmentVector.x * segmentVector.x +
            segmentVector.y * segmentVector.y
        );
        
        // Nokta'nın segment üzerine projeksiyon yüzdesi (0-1 arası)
        const dotProduct = clickVector.x * segmentVector.x + clickVector.y * segmentVector.y;
        const projectionRatio = dotProduct / (segmentLengthPx * segmentLengthPx);
        
        // Sınırlandır (0-1 arası)
        const clampedRatio = Math.max(0, Math.min(1, projectionRatio));
        
        // Metrajı hesapla
        const meterage = totalLength * clampedRatio;
        
        return meterage;
    }
    
    showAddGatewayDialog(segment, position, meterage) {
        // Global callback çağır - UI tarafında modal açılacak
        if (window.openGatewayDialog) {
            window.openGatewayDialog(segment, position, meterage, (gatewayId) => {
                this.addGateway(segment.key, position, meterage, gatewayId);
            });
        } else {
            // Fallback - basit prompt
            const gatewayId = prompt(`Alıcı ID girin (Metraj: ${meterage.toFixed(1)}m):`);
            if (gatewayId && gatewayId.trim()) {
                this.addGateway(segment.key, position, meterage, gatewayId.trim());
            }
        }
    }
    
    addGateway(segmentKey, position, meterage, gatewayId) {
        const gateway = {
            key: `gateway_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            category: 'gateway',
            position: go.Point.stringify(position),
            meterage: meterage,
            gatewayId: gatewayId,
            segmentKey: segmentKey
        };
        
        this.diagram.startTransaction('addGateway');
        this.diagram.model.addNodeData(gateway);
        this.diagram.commitTransaction('addGateway');
        
        this.tunnelData.gateways.set(gateway.key, gateway);
        
        // Segment'e ait gateway'leri takip et
        if (!this.segmentGateways.has(segmentKey)) {
            this.segmentGateways.set(segmentKey, []);
        }
        this.segmentGateways.get(segmentKey).push(gateway.key);
        
        console.log('📡 Gateway added:', gateway);
        
        // Callback
        if (this.onGatewayAdded) {
            this.onGatewayAdded(gateway);
        }
        
        return gateway;
    }
}

class DrawingTool extends go.Tool {
    constructor(tunnelDesigner) {
        super();
        this.name = "DrawingTool";
        this.tunnelDesigner = tunnelDesigner;
    }
    
    canStart() {
        if (!this.tunnelDesigner.isDrawing) return false;
        if (this.tunnelDesigner.drawingMode !== 'tunnel_drag') return false;
        
        return this.diagram.lastInput.left && this.diagram.lastInput.documentPoint;
    }
    
    doActivate() {
        super.doActivate();
        const point = this.diagram.lastInput.documentPoint;
        this.tunnelDesigner.startDragDrawing(point);
        this.diagram.isMouseCaptured = true;
    }
    
    doMouseMove() {
        if (this.isActive) {
            const point = this.diagram.lastInput.documentPoint;
            this.tunnelDesigner.updateDragDrawing(point);
        }
    }
    
    doMouseUp() {
        if (this.isActive) {
            const point = this.diagram.lastInput.documentPoint;
            this.tunnelDesigner.completeDragDrawing(point);
        }
        this.stopTool();
    }
    
    doDeactivate() {
        this.diagram.isMouseCaptured = false;
        super.doDeactivate();
    }
}

// Make globally available
window.EnhancedTunnelDesigner = EnhancedTunnelDesigner;

// Static helper for SECTION shape when crossSectionType === 'horseshoe'
EnhancedTunnelDesigner.createHorseshoeGeometryString = function(data) {
    try {
        const H = Math.max(10, ((data.height ?? data.width ?? 3) * 10) - 8);
        const W = Math.max(10, (H * 1.2));
        const p = data.crossParams || {};
        const legH = Math.max(6, (p.legHeight ?? H * 0.4));
        const innerW = Math.max(8, W * 0.6);
        const archR = Math.max(6, innerW / 2);
        const sweepDeg = Math.max(90, Math.min(270, (data.crossParams && data.crossParams.archAngle) ? data.crossParams.archAngle : 180));
        const cx = W / 2;
        const bottom = H - 4;
        const top = bottom - legH - archR;
        const leftX = cx - innerW / 2;
        const rightX = cx + innerW / 2;
        const geo = new go.Geometry();
        const fig = new go.PathFigure(leftX, bottom, false);
        fig.add(new go.PathSegment(go.PathSegment.Line, leftX, top + archR));
        fig.add(new go.PathSegment(go.PathSegment.Arc, 180, sweepDeg, cx, top + archR, archR, archR));
        fig.add(new go.PathSegment(go.PathSegment.Line, rightX, bottom));
        geo.add(fig);
        const str = geo.toString();
        return typeof str === 'string' ? str : 'M0 0';
    } catch (e) {
        return 'M0 0';
    }
};
