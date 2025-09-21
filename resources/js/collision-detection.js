// Advanced Collision Detection System for Mine3D
import * as THREE from 'three';

export class CollisionDetectionSystem {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.options = {
            enableSpatialPartitioning: true,
            gridSize: 10,
            maxObjectsPerCell: 20,
            enableContinuousDetection: true,
            debugVisualization: options.debug || false,
            toleranceDistance: 0.1,
            ...options
        };
        
        this.spatialGrid = new Map();
        this.dynamicObjects = new Set();
        this.staticObjects = new Set();
        this.collisionPairs = new Set();
        this.callbacks = new Map();
        
        // Collision detection helpers
        this.raycaster = new THREE.Raycaster();
        this.tempBox3 = new THREE.Box3();
        this.tempSphere = new THREE.Sphere();
        this.tempVector = new THREE.Vector3();
        
        // Debug visualization
        this.debugMeshes = [];
        
        this.init();
    }

    init() {
        console.log('🔍 Collision Detection System initialized');
        
        if (this.options.debugVisualization) {
            this.setupDebugVisualization();
        }
    }

    // Register object for collision detection
    registerObject(object, type = 'static', metadata = {}) {
        if (!object.userData) {
            object.userData = {};
        }
        
        object.userData.collisionData = {
            type: type, // 'static', 'dynamic', 'trigger'
            enabled: true,
            bounds: null,
            lastPosition: object.position.clone(),
            velocity: new THREE.Vector3(),
            metadata: metadata,
            id: object.uuid || THREE.MathUtils.generateUUID()
        };
        
        // Update bounding volume
        this.updateObjectBounds(object);
        
        // Add to appropriate collection
        if (type === 'dynamic') {
            this.dynamicObjects.add(object);
        } else {
            this.staticObjects.add(object);
        }
        
        // Add to spatial grid
        if (this.options.enableSpatialPartitioning) {
            this.addToSpatialGrid(object);
        }
        
        console.log(`📦 Registered ${type} object for collision:`, object.userData.collisionData.id);
        return object.userData.collisionData.id;
    }

    // Unregister object
    unregisterObject(object) {
        if (!object.userData?.collisionData) return;
        
        const id = object.userData.collisionData.id;
        
        this.dynamicObjects.delete(object);
        this.staticObjects.delete(object);
        this.removeFromSpatialGrid(object);
        this.callbacks.delete(id);
        
        delete object.userData.collisionData;
        
        console.log(`🗑️ Unregistered collision object:`, id);
    }

    // Update object bounds and spatial position
    updateObjectBounds(object) {
        if (!object.userData?.collisionData) return;
        
        const collisionData = object.userData.collisionData;
        
        // Calculate bounding box
        if (object.geometry) {
            if (!object.geometry.boundingBox) {
                object.geometry.computeBoundingBox();
            }
            
            const localBox = object.geometry.boundingBox.clone();
            localBox.applyMatrix4(object.matrixWorld);
            collisionData.bounds = localBox;
        } else {
            // Fallback for groups or complex objects
            const box = new THREE.Box3().setFromObject(object);
            collisionData.bounds = box;
        }
        
        // Update spatial grid position if object moved
        if (this.options.enableSpatialPartitioning) {
            const currentPos = object.position.clone();
            if (currentPos.distanceTo(collisionData.lastPosition) > 0.1) {
                this.removeFromSpatialGrid(object);
                this.addToSpatialGrid(object);
                collisionData.lastPosition.copy(currentPos);
            }
        }
    }

    // Spatial grid operations
    getGridKey(position) {
        const gridSize = this.options.gridSize;
        const x = Math.floor(position.x / gridSize);
        const y = Math.floor(position.y / gridSize);
        const z = Math.floor(position.z / gridSize);
        return `${x},${y},${z}`;
    }

    addToSpatialGrid(object) {
        if (!object.userData?.collisionData?.bounds) return;
        
        const bounds = object.userData.collisionData.bounds;
        const min = bounds.min;
        const max = bounds.max;
        const gridSize = this.options.gridSize;
        
        // Get all grid cells this object spans
        const minGrid = {
            x: Math.floor(min.x / gridSize),
            y: Math.floor(min.y / gridSize),
            z: Math.floor(min.z / gridSize)
        };
        
        const maxGrid = {
            x: Math.floor(max.x / gridSize),
            y: Math.floor(max.y / gridSize),
            z: Math.floor(max.z / gridSize)
        };
        
        // Add object to all spanning cells
        for (let x = minGrid.x; x <= maxGrid.x; x++) {
            for (let y = minGrid.y; y <= maxGrid.y; y++) {
                for (let z = minGrid.z; z <= maxGrid.z; z++) {
                    const key = `${x},${y},${z}`;
                    
                    if (!this.spatialGrid.has(key)) {
                        this.spatialGrid.set(key, new Set());
                    }
                    
                    this.spatialGrid.get(key).add(object);
                }
            }
        }
    }

    removeFromSpatialGrid(object) {
        // Remove object from all grid cells
        for (const [key, objects] of this.spatialGrid) {
            objects.delete(object);
            if (objects.size === 0) {
                this.spatialGrid.delete(key);
            }
        }
    }

    // Get nearby objects using spatial grid
    getNearbyObjects(object, radius = 5) {
        if (!this.options.enableSpatialPartitioning) {
            return new Set([...this.staticObjects, ...this.dynamicObjects]);
        }
        
        const position = object.position;
        const gridSize = this.options.gridSize;
        const gridRadius = Math.ceil(radius / gridSize);
        const nearbyObjects = new Set();
        
        const centerGrid = {
            x: Math.floor(position.x / gridSize),
            y: Math.floor(position.y / gridSize),
            z: Math.floor(position.z / gridSize)
        };
        
        // Check surrounding grid cells
        for (let x = centerGrid.x - gridRadius; x <= centerGrid.x + gridRadius; x++) {
            for (let y = centerGrid.y - gridRadius; y <= centerGrid.y + gridRadius; y++) {
                for (let z = centerGrid.z - gridRadius; z <= centerGrid.z + gridRadius; z++) {
                    const key = `${x},${y},${z}`;
                    const cellObjects = this.spatialGrid.get(key);
                    
                    if (cellObjects) {
                        cellObjects.forEach(obj => {
                            if (obj !== object) {
                                nearbyObjects.add(obj);
                            }
                        });
                    }
                }
            }
        }
        
        return nearbyObjects;
    }

    // Main collision detection update
    update() {
        // Update bounds for all dynamic objects
        this.dynamicObjects.forEach(object => {
            this.updateObjectBounds(object);
        });
        
        // Clear previous collision pairs
        this.collisionPairs.clear();
        
        // Check collisions for dynamic objects
        this.dynamicObjects.forEach(dynamicObj => {
            if (!dynamicObj.userData?.collisionData?.enabled) return;
            
            const nearbyObjects = this.getNearbyObjects(dynamicObj, 10);
            
            nearbyObjects.forEach(staticObj => {
                if (!staticObj.userData?.collisionData?.enabled) return;
                if (dynamicObj === staticObj) return;
                
                const collision = this.checkCollision(dynamicObj, staticObj);
                
                if (collision) {
                    const pairId = this.getCollisionPairId(dynamicObj, staticObj);
                    this.collisionPairs.add(pairId);
                    
                    // Trigger collision callbacks
                    this.handleCollision(dynamicObj, staticObj, collision);
                }
            });
        });
        
        // Update debug visualization
        if (this.options.debugVisualization) {
            this.updateDebugVisualization();
        }
    }

    // Collision detection algorithms
    checkCollision(obj1, obj2) {
        const data1 = obj1.userData.collisionData;
        const data2 = obj2.userData.collisionData;
        
        if (!data1 || !data2 || !data1.bounds || !data2.bounds) {
            return null;
        }
        
        // Broad phase: AABB check
        if (!data1.bounds.intersectsBox(data2.bounds)) {
            return null;
        }
        
        // Narrow phase: More precise collision detection
        const collision = this.detailedCollisionCheck(obj1, obj2);
        
        if (collision) {
            return {
                object1: obj1,
                object2: obj2,
                point: collision.point,
                normal: collision.normal,
                penetration: collision.penetration,
                distance: collision.distance
            };
        }
        
        return null;
    }

    detailedCollisionCheck(obj1, obj2) {
        // Get object types for specialized collision detection
        const type1 = obj1.userData.collisionData.metadata.type || 'box';
        const type2 = obj2.userData.collisionData.metadata.type || 'box';
        
        // Tunnel-specific collision detection
        if (type1 === 'tunnel' || type2 === 'tunnel') {
            return this.checkTunnelCollision(obj1, obj2);
        }
        
        // Path-specific collision detection
        if (type1 === 'path' || type2 === 'path') {
            return this.checkPathCollision(obj1, obj2);
        }
        
        // Default box-box collision
        return this.checkBoxCollision(obj1, obj2);
    }

    checkTunnelCollision(tunnel, other) {
        // Get tunnel geometry and other object bounds
        const tunnelData = tunnel.userData.collisionData;
        const otherData = other.userData.collisionData;
        
        if (!tunnelData.bounds || !otherData.bounds) return null;
        
        // Check if other object is inside tunnel volume
        const tunnelBounds = tunnelData.bounds;
        const otherBounds = otherData.bounds;
        
        // Calculate overlap volume
        const intersection = tunnelBounds.clone().intersect(otherBounds);
        
        if (intersection.isEmpty()) return null;
        
        // Calculate collision details
        const intersectionSize = intersection.getSize(new THREE.Vector3());
        const penetration = Math.min(intersectionSize.x, intersectionSize.y, intersectionSize.z);
        
        const center1 = tunnelBounds.getCenter(new THREE.Vector3());
        const center2 = otherBounds.getCenter(new THREE.Vector3());
        const direction = center2.clone().sub(center1).normalize();
        
        return {
            point: intersection.getCenter(new THREE.Vector3()),
            normal: direction,
            penetration: penetration,
            distance: center1.distanceTo(center2)
        };
    }

    checkPathCollision(path, other) {
        // Path collision using line-box intersection
        const pathData = path.userData.pathData;
        const otherBounds = other.userData.collisionData.bounds;
        
        if (!pathData || !pathData.points || !otherBounds) return null;
        
        // Check each path segment against other object
        for (let i = 0; i < pathData.points.length - 1; i++) {
            const start = new THREE.Vector3().copy(pathData.points[i]);
            const end = new THREE.Vector3().copy(pathData.points[i + 1]);
            
            // Convert to world coordinates
            path.localToWorld(start);
            path.localToWorld(end);
            
            // Ray from start to end
            this.raycaster.set(start, end.clone().sub(start).normalize());
            this.raycaster.far = start.distanceTo(end);
            
            // Check intersection with other object
            const intersections = this.raycaster.intersectObject(other, true);
            
            if (intersections.length > 0) {
                const intersection = intersections[0];
                return {
                    point: intersection.point,
                    normal: intersection.face?.normal || new THREE.Vector3(0, 1, 0),
                    penetration: 0.1,
                    distance: intersection.distance
                };
            }
        }
        
        return null;
    }

    checkBoxCollision(obj1, obj2) {
        const bounds1 = obj1.userData.collisionData.bounds;
        const bounds2 = obj2.userData.collisionData.bounds;
        
        const intersection = bounds1.clone().intersect(bounds2);
        
        if (intersection.isEmpty()) return null;
        
        const size = intersection.getSize(new THREE.Vector3());
        const penetration = Math.min(size.x, size.y, size.z);
        
        const center1 = bounds1.getCenter(new THREE.Vector3());
        const center2 = bounds2.getCenter(new THREE.Vector3());
        const normal = center2.clone().sub(center1).normalize();
        
        return {
            point: intersection.getCenter(new THREE.Vector3()),
            normal: normal,
            penetration: penetration,
            distance: center1.distanceTo(center2)
        };
    }

    // Collision response and callbacks
    handleCollision(obj1, obj2, collision) {
        const id1 = obj1.userData.collisionData.id;
        const id2 = obj2.userData.collisionData.id;
        
        // Trigger callbacks
        const callback1 = this.callbacks.get(id1);
        const callback2 = this.callbacks.get(id2);
        
        if (callback1) {
            callback1(obj1, obj2, collision);
        }
        
        if (callback2) {
            callback2(obj2, obj1, collision);
        }
        
        // Default collision response
        this.defaultCollisionResponse(obj1, obj2, collision);
    }

    defaultCollisionResponse(obj1, obj2, collision) {
        // Prevent tunnel overlap by adjusting position
        if (obj1.userData.collisionData.type === 'dynamic') {
            const pushDirection = collision.normal.clone().multiplyScalar(-collision.penetration);
            obj1.position.add(pushDirection);
        }
    }

    // Utility methods
    getCollisionPairId(obj1, obj2) {
        const id1 = obj1.userData.collisionData.id;
        const id2 = obj2.userData.collisionData.id;
        return id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
    }

    registerCollisionCallback(objectId, callback) {
        this.callbacks.set(objectId, callback);
    }

    // Tunnel overlap validation
    validateTunnelPlacement(tunnelObject, existingTunnels) {
        const results = {
            isValid: true,
            conflicts: [],
            warnings: [],
            suggestions: []
        };
        
        existingTunnels.forEach(existing => {
            const collision = this.checkCollision(tunnelObject, existing);
            
            if (collision) {
                results.isValid = false;
                results.conflicts.push({
                    object: existing,
                    collision: collision,
                    severity: this.calculateConflictSeverity(collision)
                });
            }
        });
        
        return results;
    }

    calculateConflictSeverity(collision) {
        const penetration = collision.penetration;
        
        if (penetration > 2.0) return 'critical';
        if (penetration > 1.0) return 'major';
        if (penetration > 0.5) return 'minor';
        return 'warning';
    }

    // Path intersection detection
    detectPathIntersections(path1, path2) {
        const points1 = path1.userData.pathData?.points || [];
        const points2 = path2.userData.pathData?.points || [];
        
        const intersections = [];
        
        // Check each segment of path1 against each segment of path2
        for (let i = 0; i < points1.length - 1; i++) {
            for (let j = 0; j < points2.length - 1; j++) {
                const intersection = this.lineSegmentIntersection(
                    points1[i], points1[i + 1],
                    points2[j], points2[j + 1]
                );
                
                if (intersection) {
                    intersections.push({
                        point: intersection,
                        segment1: { start: points1[i], end: points1[i + 1] },
                        segment2: { start: points2[j], end: points2[j + 1] }
                    });
                }
            }
        }
        
        return intersections;
    }

    lineSegmentIntersection(a1, a2, b1, b2) {
        // 3D line segment intersection (simplified)
        const da = a2.clone().sub(a1);
        const db = b2.clone().sub(b1);
        const dc = b1.clone().sub(a1);
        
        const cross = new THREE.Vector3().crossVectors(da, db);
        
        if (cross.length() < 0.001) {
            // Lines are parallel
            return null;
        }
        
        // Calculate intersection parameters
        const t = new THREE.Vector3().crossVectors(dc, db).dot(cross) / cross.lengthSq();
        const u = new THREE.Vector3().crossVectors(dc, da).dot(cross) / cross.lengthSq();
        
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            // Intersection point
            return a1.clone().add(da.multiplyScalar(t));
        }
        
        return null;
    }

    // Debug visualization
    setupDebugVisualization() {
        console.log('🎨 Collision debug visualization enabled');
    }

    updateDebugVisualization() {
        // Clear previous debug meshes
        this.debugMeshes.forEach(mesh => {
            this.scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
        });
        this.debugMeshes = [];
        
        // Draw bounding boxes for all collision objects
        [...this.staticObjects, ...this.dynamicObjects].forEach(object => {
            if (object.userData?.collisionData?.bounds) {
                const bounds = object.userData.collisionData.bounds;
                const helper = new THREE.Box3Helper(bounds, 0x00ff00);
                this.scene.add(helper);
                this.debugMeshes.push(helper);
            }
        });
        
        // Draw collision points
        this.collisionPairs.forEach(pairId => {
            // This would require storing collision data
            // Implementation depends on specific requirements
        });
    }

    // Cleanup
    dispose() {
        this.spatialGrid.clear();
        this.dynamicObjects.clear();
        this.staticObjects.clear();
        this.collisionPairs.clear();
        this.callbacks.clear();
        
        // Remove debug meshes
        this.debugMeshes.forEach(mesh => {
            this.scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
        });
        this.debugMeshes = [];
    }
}
