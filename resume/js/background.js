document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('shootCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    // Cyan-400 palette (replaces the original orange/green/lime mix)
    const colors = ['#22d3ee', '#67e8f9', '#a5f3fc', '#ffffff', '#0891b2'];
    const particles = [];

    const PARTICLE_DENSITY = 16000;
    let particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY);

    class Particle {
        constructor() { this.reset(); }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            if (this.alpha <= 0) this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random()-0.5) * 0.3;
            this.vy = (Math.random()-0.5) * 0.3;
            this.radius = Math.random() * 2.4 + 1.4;
            this.color = colors[Math.floor(Math.random()*colors.length)];
            this.alpha = 1;
            this.decay = Math.random()*0.0005 + 0.0002;
        }

        draw(ctx) {
            ctx.globalAlpha = this.alpha * 0.8;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initParticles(){
        particles.length = 0;
        particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY);
        for(let i=0;i<particleCount;i++){
            particles.push(new Particle());
        }
    }

    initParticles();

    function drawLines() {
        for (let i=0;i<particles.length;i++) {
            for (let j=i+1;j<particles.length;j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 110) {
                    ctx.strokeStyle = `rgba(34,211,238,${(1 - dist/110) * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    let animId;
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        drawLines();
        animId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', ()=>{
        resizeCanvas();
        initParticles();
    });
});
