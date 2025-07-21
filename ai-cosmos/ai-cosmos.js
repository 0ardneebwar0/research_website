// ===== AI NEURAL COSMOS - INTERACTIVE BACKGROUND ANIMATION =====

class AINeuraCosmosAnimation {
    constructor() {
        this.canvas = document.getElementById('neuralCosmosCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixCanvas = document.getElementById('matrixCanvas');
        this.matrixCtx = this.matrixCanvas.getContext('2d');
        
        this.mouse = { x: 0, y: 0 };
        this.neurons = [];
        this.connections = [];
        this.dataPackets = [];
        this.quantumParticles = [];
        this.matrixDrops = [];
        
        this.time = 0;
        this.neuronCount = 25;
        this.maxConnections = 75;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNeurons();
        this.createMatrixDrops();
        this.createQuantumParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.matrixCanvas.width = window.innerWidth;
        this.matrixCanvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Create ripple effect at mouse position
            this.createRipple(e.clientX, e.clientY);
        });
        
        document.addEventListener('click', (e) => {
            this.createExplosion(e.clientX, e.clientY);
        });
    }
    
    createNeurons() {
        this.neurons = [];
        for (let i = 0; i < this.neuronCount; i++) {
            this.neurons.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 3 + Math.random() * 6,
                energy: Math.random(),
                pulsePhase: Math.random() * Math.PI * 2,
                type: ['input', 'hidden', 'output'][Math.floor(Math.random() * 3)],
                activation: 0,
                connections: []
            });
        }
    }
    
    createMatrixDrops() {
        this.matrixDrops = [];
        const columns = Math.floor(this.canvas.width / 20);
        
        for (let i = 0; i < columns; i++) {
            this.matrixDrops.push({
                x: i * 20,
                y: Math.random() * this.canvas.height,
                speed: 2 + Math.random() * 5,
                chars: [],
                length: 10 + Math.random() * 20
            });
        }
    }
    
    createQuantumParticles() {
        this.quantumParticles = [];
        for (let i = 0; i < 50; i++) {
            this.quantumParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 1 + Math.random() * 3,
                life: Math.random(),
                maxLife: 100 + Math.random() * 200,
                color: this.getRandomAIColor()
            });
        }
    }
    
    getRandomAIColor() {
        const colors = [
            'rgba(0, 200, 255, ',      // Light blue
            'rgba(0, 255, 200, ',      // Aqua/cyan
            'rgba(100, 200, 255, ',    // Sky blue
            'rgba(150, 220, 255, ',    // Pale blue
            'rgba(0, 180, 255, ',      // Electric blue
            'rgba(180, 100, 255, '     // Bright purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createRipple(x, y) {
        // Create a ripple effect that influences nearby neurons
        this.neurons.forEach(neuron => {
            const distance = Math.sqrt((neuron.x - x) ** 2 + (neuron.y - y) ** 2);
            if (distance < 150) {
                neuron.activation = Math.max(neuron.activation, (150 - distance) / 150);
                
                // Create data packet
                this.dataPackets.push({
                    x: neuron.x,
                    y: neuron.y,
                    targetX: x,
                    targetY: y,
                    progress: 0,
                    life: 60,
                    color: this.getRandomAIColor()
                });
            }
        });
    }
    
    createExplosion(x, y) {
        // Create an explosion of quantum particles
        for (let i = 0; i < 20; i++) {
            this.quantumParticles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: 2 + Math.random() * 4,
                life: 0,
                maxLife: 60 + Math.random() * 40,
                color: this.getRandomAIColor()
            });
        }
    }
    
    updateNeurons() {
        this.neurons.forEach(neuron => {
            // Move neurons
            neuron.x += neuron.vx;
            neuron.y += neuron.vy;
            
            // Boundary conditions
            if (neuron.x < 0 || neuron.x > this.canvas.width) neuron.vx *= -1;
            if (neuron.y < 0 || neuron.y > this.canvas.height) neuron.vy *= -1;
            
            // Update energy and pulse
            neuron.pulsePhase += 0.02;
            neuron.energy = Math.sin(neuron.pulsePhase) * 0.5 + 0.5;
            
            // Decay activation
            neuron.activation *= 0.95;
            
            // Mouse attraction
            const mouseDistance = Math.sqrt((neuron.x - this.mouse.x) ** 2 + (neuron.y - this.mouse.y) ** 2);
            if (mouseDistance < 200) {
                const force = (200 - mouseDistance) / 200 * 0.01;
                const angle = Math.atan2(this.mouse.y - neuron.y, this.mouse.x - neuron.x);
                neuron.vx += Math.cos(angle) * force;
                neuron.vy += Math.sin(angle) * force;
            }
        });
    }
    
    updateConnections() {
        this.connections = [];
        
        this.neurons.forEach((neuron1, i) => {
            this.neurons.slice(i + 1).forEach(neuron2 => {
                const distance = Math.sqrt((neuron1.x - neuron2.x) ** 2 + (neuron1.y - neuron2.y) ** 2);
                
                if (distance < 120 && this.connections.length < this.maxConnections) {
                    this.connections.push({
                        neuron1,
                        neuron2,
                        distance,
                        strength: (120 - distance) / 120,
                        dataFlow: Math.random() > 0.7 ? Math.random() : 0
                    });
                }
            });
        });
    }
    
    updateDataPackets() {
        this.dataPackets = this.dataPackets.filter(packet => {
            packet.progress += 0.05;
            packet.life--;
            
            // Move towards target
            packet.x += (packet.targetX - packet.x) * 0.1;
            packet.y += (packet.targetY - packet.y) * 0.1;
            
            return packet.life > 0 && packet.progress < 1;
        });
    }
    
    updateQuantumParticles() {
        this.quantumParticles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;
            
            // Quantum tunneling effect
            if (Math.random() > 0.99) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
            }
            
            // Apply some physics
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
        
        // Remove old particles and create new ones
        this.quantumParticles = this.quantumParticles.filter(p => p.life < p.maxLife);
        
        while (this.quantumParticles.length < 50) {
            this.quantumParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 1 + Math.random() * 3,
                life: 0,
                maxLife: 100 + Math.random() * 200,
                color: this.getRandomAIColor()
            });
        }
    }
    
    updateMatrixDrops() {
        this.matrixDrops.forEach(drop => {
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height) {
                drop.y = -drop.length * 20;
                drop.speed = 2 + Math.random() * 5;
            }
        });
    }
    
    drawNeurons() {
        this.neurons.forEach(neuron => {
            const size = neuron.radius + neuron.energy * 3 + neuron.activation * 5;
            
            // Neuron glow
            const gradient = this.ctx.createRadialGradient(
                neuron.x, neuron.y, 0,
                neuron.x, neuron.y, size * 2
            );
            
            let color;
            switch (neuron.type) {
                case 'input':
                    color = 'rgba(0, 200, 255, ';      // Light blue
                    break;
                case 'hidden':
                    color = 'rgba(0, 255, 200, ';      // Aqua/cyan
                    break;
                case 'output':
                    color = 'rgba(100, 200, 255, ';    // Sky blue
                    break;
            }
            
            gradient.addColorStop(0, `${color}${0.4 + neuron.activation * 0.3})`);
            gradient.addColorStop(0.5, `${color}${0.15 + neuron.activation * 0.2})`);
            gradient.addColorStop(1, `${color}0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Neuron core
            this.ctx.fillStyle = `${color}${0.5 + neuron.activation * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        this.connections.forEach(connection => {
            const alpha = connection.strength * 0.4; // Increased from 0.2 to 0.4
            
            this.ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
            this.ctx.lineWidth = connection.strength * 2; // Increased from 1 to 2
            this.ctx.beginPath();
            this.ctx.moveTo(connection.neuron1.x, connection.neuron1.y);
            this.ctx.lineTo(connection.neuron2.x, connection.neuron2.y);
            this.ctx.stroke();
            
            // Data flow visualization
            if (connection.dataFlow > 0) {
                const progress = (this.time * 0.05) % 1;
                const x = connection.neuron1.x + (connection.neuron2.x - connection.neuron1.x) * progress;
                const y = connection.neuron1.y + (connection.neuron2.y - connection.neuron1.y) * progress;
                
                this.ctx.fillStyle = `rgba(255, 255, 255, ${connection.dataFlow * 0.5})`; // Increased from 0.3 to 0.5
                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, Math.PI * 2); // Increased from 2 to 3
                this.ctx.fill();
            }
        });
    }
    
    drawDataPackets() {
        this.dataPackets.forEach(packet => {
            const alpha = (packet.life / 60) * 0.7; // Increased from 0.4 to 0.7
            
            this.ctx.fillStyle = `${packet.color}${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(packet.x, packet.y, 3, 0, Math.PI * 2); // Increased from 2 to 3
            this.ctx.fill();
            
            // Packet trail
            this.ctx.strokeStyle = `${packet.color}${alpha * 0.5})`; // Increased from 0.3 to 0.5
            this.ctx.lineWidth = 2; // Increased from 1 to 2
            this.ctx.beginPath();
            this.ctx.moveTo(packet.x, packet.y);
            this.ctx.lineTo(packet.x - packet.vx * 5, packet.y - packet.vy * 5); // Increased trail from 3 to 5
            this.ctx.stroke();
        });
    }
    
    drawQuantumParticles() {
        this.quantumParticles.forEach(particle => {
            const alpha = 1 - (particle.life / particle.maxLife);
            
            this.ctx.fillStyle = `${particle.color}${alpha * 0.6})`; // Increased from 0.3 to 0.6
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2); // Increased size by 1.5x
            this.ctx.fill();
        });
    }
    
    drawMatrixRain() {
        this.matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.matrixCtx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
        
        this.matrixCtx.fillStyle = 'rgba(0, 200, 255, 0.15)';
        this.matrixCtx.font = '14px monospace';
        
        this.matrixDrops.forEach(drop => {
            const chars = '01αβγδεζηθικλμνξοπρστυφχψω∑∏∆∇∂∞∈∉∀∃';
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            this.matrixCtx.fillText(char, drop.x, drop.y);
        });
    }
    
    drawMouseInfluence() {
        // Draw influence circle around mouse
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 200
        );
        gradient.addColorStop(0, 'rgba(0, 200, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 200, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    animate() {
        this.time++;
        
        // Clear main canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update all systems
        this.updateNeurons();
        this.updateConnections();
        this.updateDataPackets();
        this.updateQuantumParticles();
        this.updateMatrixDrops();
        
        // Draw all layers
        this.drawMouseInfluence();
        this.drawConnections();
        this.drawNeurons();
        this.drawDataPackets();
        this.drawQuantumParticles();
        this.drawMatrixRain();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Custom Cursor System
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.trails = [];
        this.createTrails();
        
        this.setupEvents();
    }
    
    createTrails() {
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (10 - i) / 10;
            document.body.appendChild(trail);
            this.trails.push({
                element: trail,
                x: 0,
                y: 0
            });
        }
    }
    
    setupEvents() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
        });
        
        // Animate trails
        const animateTrails = () => {
            this.trails.forEach((trail, index) => {
                trail.x += (mouseX - trail.x) * (0.1 + index * 0.01);
                trail.y += (mouseY - trail.y) * (0.1 + index * 0.01);
                
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
            });
            
            requestAnimationFrame(animateTrails);
        };
        animateTrails();
    }
}

// Enhanced Quantum Particle Generator
class QuantumParticleGenerator {
    constructor() {
        this.container = document.querySelector('.quantum-particles');
        this.particles = [];
        this.generateParticles();
        this.animate();
    }
    
    generateParticles() {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            const colors = [
                'rgba(0, 200, 255, 0.8)',      // Light blue
                'rgba(0, 255, 200, 0.8)',      // Aqua/cyan
                'rgba(100, 200, 255, 0.8)',    // Sky blue
                'rgba(150, 220, 255, 0.8)',    // Pale blue
                'rgba(0, 180, 255, 0.8)',      // Electric blue
                'rgba(180, 100, 255, 0.8)'     // Bright purple
            ];
            
            particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    animate() {
        // Add some quantum uncertainty to particle positions
        this.particles.forEach(particle => {
            if (Math.random() > 0.99) {
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = Math.random() * window.innerHeight + 'px';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AINeuraCosmosAnimation();
    new QuantumParticleGenerator();
    // Don't initialize CustomCursor - let the page handle its own cursor
});
