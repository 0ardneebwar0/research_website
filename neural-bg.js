// Enhanced AI Neural Network Background Animation
class AIBackgroundAnimation {
    constructor() {
        this.canvas = document.getElementById('neuralCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.dataPackets = [];
        this.brainWaves = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNeuralNetwork();
        this.createBrainWaves();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNeuralNetwork() {
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 20000);
        this.nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 3 + 1,
                alpha: Math.random() * 0.4 + 0.2,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                type: Math.random() > 0.7 ? 'processing' : 'data',
                activationLevel: Math.random(),
                color: this.getAINodeColor()
            });
        }
        
        this.createConnections();
        this.createDataPackets();
    }
    
    getAINodeColor() {
        const colors = [
            'rgba(100, 149, 237, ', // Cornflower Blue - AI Processing
            'rgba(75, 0, 130, ',    // Indigo - Deep Learning
            'rgba(138, 43, 226, ',  // Blue Violet - Neural Networks
            'rgba(0, 191, 255, ',   // Deep Sky Blue - Data Flow
            'rgba(147, 112, 219, '  // Medium Purple - AI Intelligence
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createConnections() {
        this.connections = [];
        const maxDistance = 120;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = this.getDistance(this.nodes[i], this.nodes[j]);
                if (distance < maxDistance && Math.random() > 0.7) {
                    this.connections.push({
                        nodeA: this.nodes[i],
                        nodeB: this.nodes[j],
                        distance: distance,
                        maxDistance: maxDistance,
                        strength: Math.random(),
                        dataFlow: Math.random() > 0.5,
                        flowDirection: Math.random() > 0.5 ? 1 : -1
                    });
                }
            }
        }
    }
    
    createDataPackets() {
        this.dataPackets = [];
        for (let i = 0; i < 15; i++) {
            if (this.connections.length > 0) {
                const connection = this.connections[Math.floor(Math.random() * this.connections.length)];
                this.dataPackets.push({
                    connection: connection,
                    progress: Math.random(),
                    speed: Math.random() * 0.01 + 0.005,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.8 + 0.2
                });
            }
        }
    }
    
    createBrainWaves() {
        this.brainWaves = [];
        for (let i = 0; i < 3; i++) {
            this.brainWaves.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 0,
                maxRadius: Math.random() * 200 + 100,
                speed: Math.random() * 0.5 + 0.2,
                alpha: Math.random() * 0.1 + 0.05,
                frequency: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    getDistance(nodeA, nodeB) {
        return Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            // Update position with neural drift
            node.x += node.vx + Math.sin(this.time * 0.001 + node.pulse) * 0.1;
            node.y += node.vy + Math.cos(this.time * 0.001 + node.pulse) * 0.1;
            
            // Bounce off edges with neural behavior
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -0.8;
                node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -0.8;
                node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            }
            
            // Update neural pulse
            node.pulse += node.pulseSpeed;
            node.activationLevel = Math.sin(node.pulse) * 0.5 + 0.5;
            
            // Mouse interaction - AI responds to cursor
            const mouseDistance = Math.sqrt(Math.pow(node.x - this.mouseX, 2) + Math.pow(node.y - this.mouseY, 2));
            if (mouseDistance < 150) {
                const force = (150 - mouseDistance) / 150;
                node.activationLevel = Math.min(node.activationLevel + force * 0.5, 1);
                node.radius = Math.min(node.radius + force * 0.2, 5);
                
                // Create ripple effect
                if (Math.random() > 0.95) {
                    this.createRipple(node.x, node.y);
                }
            } else {
                node.radius = Math.max(node.radius - 0.01, 1);
            }
        });
    }
    
    createRipple(x, y) {
        this.brainWaves.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 80,
            speed: 2,
            alpha: 0.3,
            frequency: 0.02
        });
    }
    
    updateDataPackets() {
        this.dataPackets.forEach(packet => {
            packet.progress += packet.speed;
            if (packet.progress > 1) {
                packet.progress = 0;
                // Randomly assign new connection
                if (this.connections.length > 0) {
                    packet.connection = this.connections[Math.floor(Math.random() * this.connections.length)];
                }
            }
        });
    }
    
    updateBrainWaves() {
        this.brainWaves = this.brainWaves.filter(wave => {
            wave.radius += wave.speed;
            wave.alpha -= 0.002;
            return wave.alpha > 0 && wave.radius < wave.maxRadius;
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.save();
            
            const pulseRadius = node.radius + node.activationLevel * 2;
            const glowAlpha = node.alpha + node.activationLevel * 0.3;
            
            // Neural glow effect
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseRadius * 3);
            gradient.addColorStop(0, node.color + glowAlpha + ')');
            gradient.addColorStop(0.5, node.color + (glowAlpha * 0.3) + ')');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseRadius * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Main node
            this.ctx.fillStyle = node.color + glowAlpha + ')';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Processing indicator for AI nodes
            if (node.type === 'processing' && node.activationLevel > 0.7) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, pulseRadius + 2, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });
    }
    
    drawConnections() {
        this.connections.forEach(connection => {
            const currentDistance = this.getDistance(connection.nodeA, connection.nodeB);
            if (currentDistance < connection.maxDistance) {
                const alpha = (1 - (currentDistance / connection.maxDistance)) * 0.2 * connection.strength;
                
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(connection.nodeA.x, connection.nodeA.y);
                this.ctx.lineTo(connection.nodeB.x, connection.nodeB.y);
                
                // Dynamic neural connection
                const gradient = this.ctx.createLinearGradient(
                    connection.nodeA.x, connection.nodeA.y,
                    connection.nodeB.x, connection.nodeB.y
                );
                
                const activation = (connection.nodeA.activationLevel + connection.nodeB.activationLevel) / 2;
                gradient.addColorStop(0, connection.nodeA.color + (alpha + activation * 0.2) + ')');
                gradient.addColorStop(1, connection.nodeB.color + (alpha + activation * 0.2) + ')');
                
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 1 + activation;
                this.ctx.stroke();
                this.ctx.restore();
            }
        });
    }
    
    drawDataPackets() {
        this.dataPackets.forEach(packet => {
            const x = packet.connection.nodeA.x + (packet.connection.nodeB.x - packet.connection.nodeA.x) * packet.progress;
            const y = packet.connection.nodeA.y + (packet.connection.nodeB.y - packet.connection.nodeA.y) * packet.progress;
            
            this.ctx.save();
            
            // Data packet glow
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, packet.size * 3);
            gradient.addColorStop(0, `rgba(0, 255, 255, ${packet.alpha})`);
            gradient.addColorStop(0.5, `rgba(100, 149, 237, ${packet.alpha * 0.5})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, packet.size * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Core packet
            this.ctx.fillStyle = `rgba(255, 255, 255, ${packet.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, packet.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawBrainWaves() {
        this.brainWaves.forEach(wave => {
            this.ctx.save();
            this.ctx.strokeStyle = `rgba(138, 43, 226, ${wave.alpha})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        });
    }
    
    animate() {
        this.time++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNodes();
        this.updateDataPackets();
        this.updateBrainWaves();
        
        this.drawBrainWaves();
        this.drawConnections();
        this.drawDataPackets();
        this.drawNodes();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize the AI background animation
let aiAnimation;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('neuralCanvas')) {
        aiAnimation = new AIBackgroundAnimation();
    }
});
