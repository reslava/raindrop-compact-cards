// ==UserScript==
// @name         Raindrop.io Card Size Selector
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Switch card sizes and favicon/cover modes in Raindrop.io
// @author       You
// @match        https://app.raindrop.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Store the original cover images so we can restore them
    let coverBackup = new Map(); // card -> original picture element clone

    // Helper to extract domain from URL
    function getDomainFromUrl(url) {
        try {
            const hostname = new URL(url).hostname.replace('www.', '');
            return hostname;
        } catch {
            return '';
        }
    }

    // Apply favicon mode to all visible cards
    function applyFaviconMode() {
        document.querySelectorAll('.element-DxJD').forEach(card => {
            // Skip if already processed and still in favicon mode
            if (card.dataset.faviconProcessed === 'true') return;

            const coverWrap = card.querySelector('.wrap-Qx8h.grid-ow0F');
            if (!coverWrap) return;

            // Backup original cover (only once)
            if (!coverBackup.has(card)) {
                coverBackup.set(card, coverWrap.cloneNode(true));
            }

            // Hide original cover
            coverWrap.style.display = 'none';

            // Check if we already added a favicon container
            let faviconWrap = card.querySelector('.rdp-favicon-wrap');
            if (faviconWrap) {
                faviconWrap.style.display = 'flex';
                return;
            }

            // Get the bookmark URL
            const linkElem = card.querySelector('.permalink-Wc76');
            if (!linkElem) return;
            const url = linkElem.href;
            const domain = getDomainFromUrl(url);
            if (!domain) return;

            // Create favicon picture element (without inline styles – CSS will handle sizing)
            faviconWrap = document.createElement('picture');
            faviconWrap.className = 'wrap-Qx8h rdp-favicon-wrap';

            const faviconUrl = `https://rdl.ink/favicon/${domain}?mode=crop&fill=solid&width=64&ar=1:1&dpr=2`; // we request 64px, but CSS will scale down if needed
            const faviconImg = document.createElement('img');
            faviconImg.src = faviconUrl;
            faviconImg.alt = domain;
            faviconImg.className = 'rdp-favicon-img';

            faviconWrap.appendChild(faviconImg);
            coverWrap.parentNode.insertBefore(faviconWrap, coverWrap.nextSibling);
            card.dataset.faviconProcessed = 'true';
        });
    }

    // Revert favicon mode (show original covers)
    function revertFaviconMode() {
        document.querySelectorAll('.element-DxJD').forEach(card => {
            // Show original cover
            const coverWrap = card.querySelector('.wrap-Qx8h.grid-ow0F');
            if (coverWrap) coverWrap.style.display = '';

            // Remove favicon wrap
            const faviconWrap = card.querySelector('.rdp-favicon-wrap');
            if (faviconWrap) faviconWrap.remove();

            card.dataset.faviconProcessed = 'false';
        });
        coverBackup.clear();
    }

    // Apply size by adding/removing classes on <html>
    const applySize = (size) => {
        const html = document.documentElement;

        // Remove all possible classes
        html.classList.remove(
            'rdp-compact',
            'rdp-favicon',
            'card-size-favicon32',
            'card-size-favicon64',
            'card-size-small',
            'card-size-medium'
        );

        if (size === 'default') {
            revertFaviconMode();
            return;
        }

        // Always add rdp-compact for any modified mode
        html.classList.add('rdp-compact');

        switch (size) {
            case 'favicon32':
                html.classList.add('rdp-favicon', 'card-size-favicon32');
                applyFaviconMode();
                break;
            case 'favicon64':
                html.classList.add('rdp-favicon', 'card-size-favicon64');
                applyFaviconMode();
                break;
            case 'cover80':
                html.classList.add('card-size-small');
                revertFaviconMode(); // ensure not in favicon mode
                break;
            case 'cover120':
                html.classList.add('card-size-medium');
                revertFaviconMode(); // ensure not in favicon mode
                break;
        }
    };

    // Create the dropdown HTML
    const createSelector = () => {
        const container = document.createElement('div');
        container.id = 'rdp-size-selector';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1a1a1a;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-family: system-ui, sans-serif;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        const label = document.createElement('span');
        label.textContent = 'Card size:';

        const select = document.createElement('select');
        select.style.cssText = `
            background: #333;
            color: white;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 13px;
        `;

        const options = [
            { value: 'default', label: 'Default' },
            { value: 'favicon32', label: 'Favicon 32' },
            { value: 'favicon64', label: 'Favicon 64' },
            { value: 'cover80', label: 'Cover 80' },
            { value: 'cover120', label: 'Cover 120' }
        ];

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            select.appendChild(option);
        });

        // Load saved preference
        const saved = localStorage.getItem('raindrop-card-size') || 'default';
        select.value = saved;
        applySize(saved);

        select.addEventListener('change', (e) => {
            const size = e.target.value;
            localStorage.setItem('raindrop-card-size', size);
            applySize(size);
        });

        container.appendChild(label);
        container.appendChild(select);
        document.body.appendChild(container);
    };

    // Watch for dynamically loaded cards (infinite scroll)
    const observer = new MutationObserver((mutations) => {
        if (document.documentElement.classList.contains('rdp-favicon')) {
            applyFaviconMode();
        }
    });
    observer.observe(document.querySelector('.grid-OxqP') || document.body, { childList: true, subtree: true });

    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSelector);
    } else {
        createSelector();
    }
})();