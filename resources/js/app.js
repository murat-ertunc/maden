import './bootstrap';

// Import Mine 3D System for global access - COMMENTED OUT FOR GOJS MIGRATION
/*
import Mine3DSystem from './mine3d/Mine3DSystem.js';

// Make it globally available
window.Mine3DSystem = Mine3DSystem;
*/

// GoJS Import - New diagram system for mine visualization
import MineGoJSSystem from './mine-gojs.js';
window.MineGoJSSystem = MineGoJSSystem;
