$(document).ready(function() {

    function initTooltips() {
        document.querySelectorAll('.download-buttons a[title]').forEach(el => {
            el.dataset.tooltip = el.getAttribute('title');
            el.removeAttribute('title');
        });

        if (window.tippy) {
            tippy('.download-buttons a', {
                content(reference) { return reference.dataset.tooltip; },
                animation: 'shift-away',
                theme: 'dark',
                delay: [0, 0],
                duration: [300, 0],
            });
        }
    }

    async function loadBlocks(lang) {
        let files = ['about.html', 'skills.html', 'experience.html', 'portfolio.html', 'download.html'];
        const $area = $('#content-area');

        $area.css({ opacity: 0, transition: 'opacity 0.25s ease' });
        $area.empty();

        for (let file of files) {
            let html = await $.get(`blocks/${lang}/${file}`);
            let $block = $('<div class="block"></div>');
            $block.html(html);
            $area.append($block);
        }

        initAll();

        requestAnimationFrame(() => { $area.css('opacity', 1); });
    }

    function initAll() {
        initAccordion();
        initTooltips();
        if (window.initPdfLinks) initPdfLinks();
    }

    // start in Ukrainian
    loadBlocks('uk');

    $('.tab').click(function() {
        $('.tab').removeClass('active');
        $(this).addClass('active');
        let lang = $(this).data('lang');
        loadBlocks(lang);

        const scramble = document.getElementById('scrambleCanvas');
        if (scramble) {
            scramble.dataset.text = lang === 'en'
                ? 'Full-Stack Developer / Team Lead'
                : 'Full-Stack Developer / Team Lead';
        }
    });
});
