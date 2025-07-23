// 3D Model Viewer with Three.js
class ModelViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.mixer = null;
        this.clock = new THREE.Clock();
        this.animations = [];
        this.currentAction = null;
        
        this.init();
        this.loadModel();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        const container = document.getElementById('container');
        const canvas = document.getElementById('canvas');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            60, // Reduced FOV for better perspective
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(4, 2, 6);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        
        // Controls setup
        this.controls = new THREE.OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 0.5;
        this.controls.maxDistance = 100; // Increased max distance
        this.controls.maxPolarAngle = Math.PI;
        
        // Lighting setup
        this.setupLighting();
        
        // Ground plane (optional)
        this.createGround();
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        this.scene.add(directionalLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x4169e1, 0.3);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0xff6b6b, 0.2);
        rimLight.position.set(0, 5, -10);
        this.scene.add(rimLight);
    }
    
    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x333333,
            transparent: true,
            opacity: 0.3
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    
    loadModel() {
        const loader = new THREE.GLTFLoader();
        const loadingElement = document.getElementById('loading');
        
        loader.load(
            '3d_models/vintage_robot_animated.glb',
            (gltf) => {
                this.model = gltf.scene;
                
                // Enable shadows for all meshes
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Enhance materials
                        if (child.material) {
                            child.material.envMapIntensity = 0.8;
                        }
                    }
                });
                
                // Scale and position the model properly
                const box = new THREE.Box3().setFromObject(this.model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                
                // Get the largest dimension to scale appropriately
                const maxDimension = Math.max(size.x, size.y, size.z);
                
                // Much more aggressive scaling to ensure model fits in view
                const targetSize = 1.5; // Smaller target size
                const scale = targetSize / maxDimension;
                this.model.scale.setScalar(scale);
                
                // Center the model properly
                this.model.position.x = -center.x * scale;
                this.model.position.y = -center.y * scale;
                this.model.position.z = -center.z * scale;
                
                // Move model up slightly so it's centered in view
                this.model.position.y += size.y * scale * 0.1;
                
                console.log(`Original model size: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`);
                console.log(`Max dimension: ${maxDimension.toFixed(2)}`);
                console.log(`Applied scale: ${scale.toFixed(4)}`);
                console.log(`Scaled size: ${(size.x * scale).toFixed(2)} x ${(size.y * scale).toFixed(2)} x ${(size.z * scale).toFixed(2)}`);
                console.log(`Final position: x=${this.model.position.x.toFixed(2)}, y=${this.model.position.y.toFixed(2)}, z=${this.model.position.z.toFixed(2)}`);
                
                this.scene.add(this.model);
                
                // Setup animations
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    this.animations = gltf.animations;
                    
                    console.log(`Found ${this.animations.length} animations:`, 
                        this.animations.map(anim => anim.name));
                    
                    // Play the first animation by default
                    if (this.animations.length > 0) {
                        this.currentAction = this.mixer.clipAction(this.animations[0]);
                        this.currentAction.play();
                    }
                    
                    // Enable animation controls
                    this.enableAnimationControls();
                } else {
                    console.log('No animations found in the model');
                    this.disableAnimationControls();
                }
                
                // Hide loading message
                loadingElement.style.display = 'none';
                
                console.log('Model loaded successfully!');
            },
            (progress) => {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                loadingElement.textContent = `Loading 3D model... ${percent}%`;
            },
            (error) => {
                console.error('Error loading model:', error);
                loadingElement.textContent = 'Error loading 3D model. Please check the file path.';
                loadingElement.style.color = '#ff6b6b';
            }
        );
    }
    
    enableAnimationControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        
        playBtn.disabled = false;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
    }
    
    disableAnimationControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        
        playBtn.disabled = true;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
    }
    
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Double click to reset view
        window.addEventListener('dblclick', () => {
            this.resetCamera();
        });
        
        // Animation controls
        document.getElementById('playBtn').addEventListener('click', () => {
            if (this.currentAction) {
                this.currentAction.play();
            }
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            if (this.currentAction) {
                this.currentAction.paused = !this.currentAction.paused;
            }
        });
        
        document.getElementById('stopBtn').addEventListener('click', () => {
            if (this.currentAction) {
                this.currentAction.stop();
            }
        });
        
        // Keyboard shortcuts
        window.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'Space':
                    event.preventDefault();
                    if (this.currentAction) {
                        this.currentAction.paused = !this.currentAction.paused;
                    }
                    break;
                case 'KeyR':
                    this.resetCamera();
                    break;
            }
        });
    }
    
    resetCamera() {
        this.camera.position.set(4, 2, 6);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        
        // Update animation mixer
        if (this.mixer) {
            this.mixer.update(delta);
        }
        
        // Update controls
        this.controls.update();
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the viewer when the page loads
window.addEventListener('load', () => {
    new ModelViewer();
});
