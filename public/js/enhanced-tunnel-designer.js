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
            magneticSnap: config.magneticSnap !== false,
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
        
        // Data storage
        this.tunnelData = {
            segments: new Map(),
            stations: new Map(),
            measurements: new Map()
        };
        // Map segmentKey -> measurementKey for fast updates
        this.segmentMeasurements = new Map();
        
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
        this.setupDrawingHandlers();
        
        // Listen moves/rotations to keep measurements in sync
        this.registerAutoUpdateListeners();
        console.log('✅ Enhanced TunnelDesigner initialized successfully');
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
                    resizeObjectName: "SEGSHAPE"
                },
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
                    const colors = {
                        circle: "rgba(100, 149, 237, 0.3)",
                        rectangle: "rgba(50, 205, 50, 0.3)",
                        horseshoe: "rgba(255, 20, 147, 0.3)"
                    };
                    return colors[type] || colors.circle;
                }),
                new go.Binding("stroke", "crossSectionType", (type) => {
                    const colors = {
                        circle: "#4169E1",
                        rectangle: "#32CD32",
                        horseshoe: "#FF1493"
                    };
                    return colors[type] || colors.circle;
                }),
                new go.Binding("geometryString", "", (data) => {
                    const w = (data.length || 5) * 20; // length in pixels
                    const h = (data.height ?? data.width ?? 3) * 10; // cross-section height in pixels
                    return `M0 0 L${w} 0 L${w} ${h} L0 ${h} Z`;
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
                    new go.Binding("desiredSize", "", (data) => {
                        const h = (data.height ?? data.width ?? 3) * 10;
                        const pad = Math.min(14, Math.max(6, h * 0.08));
                        if (data.crossSectionType === 'circle') {
                            return new go.Size(Math.max(10, h - pad), Math.max(10, h - pad));
                        }
                        return new go.Size(Math.max(10, h * 1.2 - pad), Math.max(10, h - pad));
                    })
                ),
                // Cross-section overlay: horseshoe geometry only when needed
                $(go.Shape,
                    {
                        name: "SECTION_HORSE",
                        alignment: go.Spot.Center,
                        stroke: "#333",
                        strokeWidth: 1.2,
                        fill: "rgba(255,255,255,0.6)"
                    },
                    new go.Binding("visible", "crossSectionType", t => t === 'horseshoe'),
                    new go.Binding("geometryString", "", (data) => EnhancedTunnelDesigner.createHorseshoeGeometryString(data))
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
                    if (data.crossSectionType === 'circle') {
                        const d = (data.height ?? data.width ?? 0).toFixed(2);
                        return `${icon} Ø${d}m | L:${(data.length || 0).toFixed(1)}m`;
                    }
                    return `${icon} ${(data.width ?? 0).toFixed(2)}×${(data.height ?? 0).toFixed(2)}m | L:${(data.length || 0).toFixed(1)}m`;
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
                    width: 10,
                    height: 10,
                    fill: "#1f77ff",
                    stroke: "white",
                    strokeWidth: 1.5
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
            console.error('updateMeasurementForSegment error:', err);
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
        } else {
            this.removeHorseshoeHandles();
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

    setupDrawingHandlers() {
        // Direct mouse event handlers for drag drawing (fallback)
        let isDragging = false;
        let dragStartPoint = null;
        
        // Use DocumentMouseDown instead of BackgroundMouseDown
    this.diagram.div.addEventListener('mousedown', (e) => {
            try {
                if (this.isDrawing && this.drawingMode === 'tunnel_drag') {
                    e.preventDefault();
                    e.stopPropagation();
                    const rect = this.diagram.div.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const docPoint = this.diagram.transformViewToDoc(new go.Point(x, y));
                    // Ensure no stale preview remains
                    this.clearPreview();
                    isDragging = true;
                    dragStartPoint = docPoint;
                    this.startDragDrawing(dragStartPoint);
                }
            } catch (err) {
                console.error('mousedown drawing error:', err);
            }
    }, true);
        
    this.diagram.div.addEventListener('mousemove', (e) => {
            try {
                const rect = this.diagram.div.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const docPoint = this.diagram.transformViewToDoc(new go.Point(x, y));
                
                if (isDragging && this.drawingMode === 'tunnel_drag') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.updateDragDrawing(docPoint);
                } else if (this.isDrawing && this.config.showPreview) {
                    this.updatePreview(docPoint);
                }
            } catch (err) {
                console.error('mousemove drawing error:', err);
            }
    }, true);
        
    this.diagram.div.addEventListener('mouseup', (e) => {
            try {
                if (isDragging && this.drawingMode === 'tunnel_drag') {
                    e.preventDefault();
                    e.stopPropagation();
                    const rect = this.diagram.div.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const docPoint = this.diagram.transformViewToDoc(new go.Point(x, y));
                    
                    this.completeDragDrawing(docPoint);
                    isDragging = false;
                    dragStartPoint = null;
                }
            } catch (err) {
                console.error('mouseup drawing error:', err);
            }
    }, true);
        
        // Background click for point-to-point drawing - use valid GoJS event
        this.diagram.addDiagramListener("BackgroundSingleClicked", (e) => {
            if (this.isDrawing && this.drawingMode === 'tunnel_point') {
                this.addPathPoint(e.diagram.lastInput.documentPoint);
            }
        });
        
        // Double click to finish path drawing
        this.diagram.addDiagramListener("BackgroundDoubleClicked", (e) => {
            if (this.isDrawing && this.drawingPath.length > 0) {
                this.finishPathDrawing();
            }
        });
        
        // Escape key to cancel drawing
        this.diagram.div.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isDrawing) {
                this.cancelDrawing();
            }
        });
        
        // Mouse move preview is now handled by DOM event listener above
    }
    
    // Drawing modes
    setDrawingMode(mode) {
        this.drawingMode = mode;
        this.isDrawing = true;
        this.drawingState = 'drawing';
        this.drawingPath = [];
        this.tempSegments = [];
        
        // Visual feedback
        this.diagram.div.style.cursor = 'crosshair';
        this.diagram.div.classList.add('drawing-mode');
        
        // Add instruction overlay
        this.showDrawingInstructions(mode);
        
        console.log(`🎨 Enhanced drawing mode: ${mode}`);
    }
    
    exitDrawingMode() {
        const prevMode = this.drawingMode;
        this.isDrawing = false;
        this.drawingMode = null;
        this.drawingState = 'idle';
        this.currentTunnel = null;
        this.dragStartPoint = null;
        this.isDragging = false;
        
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
            console.error('exitDrawingMode commit/clear error:', err);
        }
        
        // Reset visuals
        this.diagram.div.style.cursor = 'default';
        this.diagram.div.classList.remove('drawing-mode');
        this.hideDrawingInstructions();
        
        console.log('🔚 Drawing mode exited');
    }
    
    cancelDrawing() {
        // In point-path mode, ESC should finalize existing segments instead of deleting them
        try {
            if (this.drawingMode === 'tunnel_point' && this.tempSegments && this.tempSegments.length > 0) {
                this.diagram.startTransaction('escCommitPath');
                this.commitTempSegments();
                this.diagram.commitTransaction('escCommitPath');
            } else {
                // No committed segments yet (e.g., drag preview or no path) → clear temp
                this.clearTempSegments();
            }
        } catch (err) {
            console.error('ESC cancel/commit error:', err);
        }
        // Always clear any preview
        this.clearPreview();
        this.drawingPath = [];
        this.exitDrawingMode();
        console.log('❌ Drawing cancelled / exited');
    }
    
    // Enhanced drawing methods
    startDragDrawing(startPoint) {
    this.dragStartPoint = this.snapToGrid(startPoint);
    this.isDragging = true;
    this.drawingState = 'dragging';
    this.dragEndPoint = null;
    console.log('🖱️ Drag drawing started');
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
            console.log('⚠️ Tunnel too short, minimum 0.5m');
            this.cancelDrawing();
            return;
        }
        // Create tunnel segment with from/to
        this.createTunnelSegment(this.dragStartPoint, finalEndPoint);
        // Reset drag state
        this.isDragging = false;
        this.dragStartPoint = null;
        this.dragEndPoint = null;
        this.clearPreview();
        // Clear any selection to not interfere with next draw
        this.diagram.clearSelection();
        console.log(`✅ Drag drawing completed: ${length.toFixed(2)}m`);
    }
    
    addPathPoint(point) {
        const snappedPoint = this.snapToGrid(point);
        this.drawingPath.push(snappedPoint);
        
        console.log(`📍 Path point ${this.drawingPath.length}: ${snappedPoint.x}, ${snappedPoint.y}`);
        
        // Create segment if we have 2+ points
        if (this.drawingPath.length >= 2) {
            const lastIndex = this.drawingPath.length - 1;
            const start = this.drawingPath[lastIndex - 1];
            const end = this.drawingPath[lastIndex];
            
            this.createTempSegment(start, end, lastIndex - 1);
        }
        
        this.updatePathInstructions();
    }
    
    finishPathDrawing() {
        if (this.drawingPath.length < 2) {
            console.log('⚠️ Need at least 2 points for tunnel path');
            return;
        }
        
    // Convert temp segments to real segments
    this.diagram.startTransaction('commitPath');
    this.commitTempSegments();
    this.diagram.commitTransaction('commitPath');
        
        // Clear path
        this.drawingPath = [];
        this.exitDrawingMode();
        
        console.log(`✅ Path drawing completed with ${this.tempSegments.length} segments`);
    }
    
    createTunnelSegment(startPoint, endPoint) {
        const midPoint = new go.Point(
            (startPoint.x + endPoint.x) / 2,
            (startPoint.y + endPoint.y) / 2
        );
        const segment = {
            key: this.generateSegmentId(),
            category: 'tunnel_segment',
            name: `T-${this.generateShortId()}`,
            from: go.Point.stringify(startPoint),
            to: go.Point.stringify(endPoint),
            position: go.Point.stringify(midPoint),
            width: this.config.defaultTunnelWidth,
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
            angle: this.calculateAngle(startPoint, endPoint)
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
    
    createTempSegment(startPoint, endPoint, index) {
        const midPoint = new go.Point(
            (startPoint.x + endPoint.x) / 2,
            (startPoint.y + endPoint.y) / 2
        );
        const segment = {
            key: `temp_${index}`,
            category: 'tunnel_segment',
            name: `T-${index + 1}`,
            from: go.Point.stringify(startPoint),
            to: go.Point.stringify(endPoint),
            position: go.Point.stringify(midPoint),
            width: this.config.defaultTunnelWidth,
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
            isTemporary: true
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
    }
    
    updatePointPreview(mousePoint) {
        const lastPoint = this.drawingPath[this.drawingPath.length - 1];
        const snappedPoint = this.snapToGrid(mousePoint);
        const length = this.calculateDistance(lastPoint, snappedPoint);
        const angle = this.calculateAngle(lastPoint, snappedPoint);
        
        this.updateDragPreview(lastPoint, snappedPoint, length, angle);
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
            'tunnel_drag': '🖱️ Tüneli çizmek için fare ile sürükleyin',
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
        
        // Magnetic snap - find nearby tunnel endpoints
        if (this.config.magneticSnap) {
            const magneticDistance = gridSize * 2;
            const thresh2 = magneticDistance * magneticDistance;
            for (let segment of this.tunnelData.segments.values()) {
                let segStart, segEnd;
                if (segment.from && segment.to) {
                    segStart = go.Point.parse(segment.from);
                    segEnd = go.Point.parse(segment.to);
                } else if (segment.p1 && segment.p2) {
                    segStart = go.Point.parse(segment.p1);
                    segEnd = go.Point.parse(segment.p2);
                } else if (segment.position && segment.length != null && segment.angle != null) {
                    segStart = go.Point.parse(segment.position);
                    segEnd = this.calculateEndPoint(segStart, segment.length, segment.angle);
                } else {
                    continue;
                }
                if (snapped.distanceSquaredPoint(segStart) < thresh2) return segStart;
                if (snapped.distanceSquaredPoint(segEnd) < thresh2) return segEnd;
            }
        }
        
        return snapped;
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
        
        this.diagram.model.addNodeData(measurement);
        this.tunnelData.measurements.set(measurement.key, measurement);
        if (segmentKey) {
            this.segmentMeasurements.set(segmentKey, measurement.key);
        }
    }
    
    // Data methods
    getTunnelData() {
        // Prefer live model data to include user edits (resize/move/rotate)
        const nodes = this.diagram && this.diagram.model ? this.diagram.model.nodeDataArray : [];
        const segments = nodes.filter(n => n.category === 'tunnel_segment' && !n.isTemporary);
        const stations = nodes.filter(n => n.category === 'miner_station');
        const measurements = nodes.filter(n => n.category === 'measurement');
        return { segments, stations, measurements };
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
        // Clear maps (do not mutate existing model arrays outside of transaction)
        this.tunnelData.segments.clear();
        this.tunnelData.stations.clear();
        this.tunnelData.measurements.clear();
        
        // Load new data
        const allNodes = [
            ...(data.segments || []),
            ...(data.stations || []),
            ...(data.measurements || [])
        ];
        
        // Rebuild model and add nodes within a transaction to avoid warnings
        this.diagram.model = new go.GraphLinksModel();
        this.diagram.startTransaction('loadData');
        allNodes.forEach(nd => this.diagram.model.addNodeData(nd));
        this.diagram.commitTransaction('loadData');
        
        // Update data storage
        data.segments?.forEach(seg => this.tunnelData.segments.set(seg.key, seg));
        data.stations?.forEach(sta => this.tunnelData.stations.set(sta.key, sta));
        data.measurements?.forEach(meas => this.tunnelData.measurements.set(meas.key, meas));
        // Try to link orphan measurements to nearest segment so they follow on move
        this.linkMeasurementsToSegments();
        
        console.log('✅ Tunnel data loaded');
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
            console.error('linkMeasurementsToSegments error:', err);
        }
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