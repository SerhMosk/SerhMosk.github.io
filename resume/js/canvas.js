// Scramble-in title effect under the header (cyan-400 themed)
(function() {
    const canvas = document.getElementById('scrambleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const targetText = canvas.dataset.text || "Full-Stack Developer";
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/@#$%&";

    let frames = 0;
    let mouse = { x: -9999, y: -9999 };

    let particles = targetText.split('').map((char, index) => ({
        current: '',
        target: char,
        isDone: char === ' ',
        delay: index * 4,
        locked: char === ' ',
        x: 0,
        w: 0
    }));

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    function draw() {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        const fontSize = 16;
        ctx.font = `600 ${fontSize}px 'Segoe UI', monospace`;
        ctx.textBaseline = "middle";

        const step = Math.min(rect.width / particles.length, 13);
        let x = 0;
        const y = rect.height / 2;

        particles.forEach((p) => {
            const isSpace = p.target === ' ';
            const w = isSpace ? step * 0.5 : step;
            p.x = x; p.w = w;

            const hovered = mouse.x >= x && mouse.x <= x + w &&
                mouse.y >= y - fontSize && mouse.y <= y + fontSize;

            if (hovered && p.target !== ' ') {
                p.locked = false;
                p.isDone = false;
            }

            if (frames > p.delay && !p.locked) {
                p.current = symbols[Math.floor(Math.random() * symbols.length)];
                if (frames > p.delay + 34 && Math.random() < 0.06 && !hovered) {
                    p.current = p.target;
                    p.isDone = true;
                    p.locked = true;
                }
            } else if (!p.locked) {
                p.current = '';
            }

            ctx.fillStyle = "#22d3ee";
            ctx.fillText(p.current, x, y);
            x += w;
        });

        frames++;
        requestAnimationFrame(draw);
    }

    draw();
})();
