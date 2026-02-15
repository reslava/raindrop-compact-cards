# 🌧️ Raindrop.io Compact Cards – with Favicon & Cover Toggle

Custom CSS + JavaScript to transform [Raindrop.io](https://raindrop.io) bookmarks into a dense, icon‑like grid.  
Choose between five display modes: **Default**, **Favicon 32**, **Favicon 64**, **Cover 80**, or **Cover 120**.  
Your preference is saved automatically.

<div align="center">
  <h3>Five Display Modes</h3>
  <table style="border-collapse: collapse; border: none;">
    <tr>
      <td style="border: none; padding: 10px;" align="center">
        <img src="imgs/default.png" width="350" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <br><strong>Default</strong>
      </td>
      <td style="border: none; padding: 10px;" align="center">
        <img src="imgs/favicon32.png" width="350" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <br><strong>Favicon 32</strong>
      </td>
      <td style="border: none; padding: 10px;" align="center">
        <img src="imgs/favicon64.png" width="350" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <br><strong>Favicon 64</strong>
      </td>
    </tr>
    <tr>
      <td style="border: none; padding: 10px;" align="center">
        <img src="imgs/cover80.png" width="350" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <br><strong>Cover 80</strong>
      </td>
      <td style="border: none; padding: 10px;" align="center">
        <img src="imgs/cover120.png" width="350" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <br><strong>Cover 120</strong>
      </td>
      <td style="border: none; padding: 10px;"></td> <!-- empty cell for alignment -->
    </tr>
  </table>
</div>

## ✨ Features

- **Five display modes** – from original Raindrop to ultra‑compact favicon grids
- **Favicon support** – replace large screenshots with clean favicons (32px or 64px)
- **Cover size options** – compact card grids at 80px or 120px width
- **Live switcher** – dropdown menu to change mode instantly
- **Persistent** – your choice is saved in `localStorage`
- **Clean layout** – hides clutter (buttons, descriptions, info line) in compact modes
- **Works with infinite scroll** – new cards are automatically processed

## 📦 Installation

### 1. Install the CSS (via Stylus)

1. Install the **Stylus** browser extension:  
   - [Chrome Web Store](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)  
   - [Firefox Add‑ons](https://addons.mozilla.org/en-US/firefox/addon/styl-us/)  

2. Go to [Raindrop.io](https://raindrop.io) and open any collection.

3. Click the Stylus icon → **“Write new style”**.

4. Give it a name (e.g., “Raindrop Compact Cards”).

5. Copy the CSS code from [`compact-cards.css`](./compact-cards.css) (or the code block below) and paste it into the editor.

6. Set **“Applies to”** to **URLs on the domain** `raindrop.io`.

7. Click **Save**.

### 2. Install the JavaScript (Userscript)

You need a userscript manager like **Tampermonkey** (Chrome) or **Violentmonkey** (Firefox).

1. Install the manager for your browser:  
   - [Tampermonkey for Chrome](https://www.tampermonkey.net/)  
   - [Violentmonkey for Firefox](https://violentmonkey.github.io/)  

2. Create a new script and paste the JavaScript code from [`raindrop-size-selector.user.js`](./raindrop-size-selector.user.js) (or the code block below).

3. Save – the size selector will appear automatically on Raindrop pages.

## 🧩 CSS Code

Create a file named `compact-cards.css` with the following content:

```css
/* ===== BASE COMPACT STYLES ===== */
/* Applied only when .rdp-compact is present */
.rdp-compact .grid-OxqP {
    --grid-item-width: 120px; /* fallback, overridden by size classes */
}

.rdp-compact .wrap-Qx8h {
    height: calc(var(--grid-item-width) * 0.75) !important;
}

/* Title */
.rdp-compact .title-yyxF {
    display: block !important;      /* Change to 'none' to hide */
    font-size: 9px !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-top: 2px !important;
}

/* Tags */
.rdp-compact .tags-J0JZ {
    display: none !important;      /* Change to 'none' to hide */
    font-size: 8px !important;
    margin-top: 2px !important;
}

/* Hide description (except when it contains tags), info line, buttons, checkbox */
.rdp-compact .about-X3Q4 .description-G1ZJ:not(:has(.tags-J0JZ)),
.rdp-compact .about-X3Q4 .info-drai,
.rdp-compact .actions-wrq5,
.rdp-compact .select-BIuO {
    display: none !important;
}

/* Remove card borders/shadows */
.rdp-compact .element-DxJD {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
    padding: 2px !important;
}

/* ===== SIZE CLASSES ===== */
/* Cover 80 (small) */
.rdp-compact.card-size-small .grid-OxqP {
    --grid-item-width: 80px !important;
}
.rdp-compact.card-size-small .wrap-Qx8h {
    height: 60px !important;
}

/* Cover 120 (medium) */
.rdp-compact.card-size-medium .grid-OxqP {
    --grid-item-width: 120px !important;
}
.rdp-compact.card-size-medium .wrap-Qx8h {
    height: 90px !important;
}

/* ===== FAVICON MODE ===== */
.rdp-favicon .wrap-Qx8h.grid-ow0F {
    display: none !important; /* hide original cover */
}

.rdp-favicon .rdp-favicon-wrap {
    display: flex !important;
    align-items: center;
    justify-content: center;
    background: transparent !important;
    margin: 0 auto;
}

.rdp-favicon .rdp-favicon-img {
    object-fit: contain;
}

/* Favicon 32 */
.rdp-favicon.card-size-favicon32 .grid-OxqP {
    --grid-item-width: 48px !important;
}
.rdp-favicon.card-size-favicon32 .rdp-favicon-wrap {
    width: 100%;
    height: 100%;
}
.rdp-favicon.card-size-favicon32 .rdp-favicon-img {
    width: 32px !important;
    height: 32px !important;
    max-width: 32px;
    max-height: 32px;
}

/* Favicon 64 */
.rdp-favicon.card-size-favicon64 .grid-OxqP {
    --grid-item-width: 80px !important;
}
.rdp-favicon.card-size-favicon64 .rdp-favicon-wrap {
    width: 100%;
    height: 100%;
}
.rdp-favicon.card-size-favicon64 .rdp-favicon-img {
    width: 64px !important;
    height: 64px !important;
    max-width: 64px;
    max-height: 64px;
}
```

## 🧪 JavaScript Code (Userscript)

Create a file named `raindrop-size-selector.user.js` with:

```javascript
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

            // Create favicon picture element
            faviconWrap = document.createElement('picture');
            faviconWrap.className = 'wrap-Qx8h rdp-favicon-wrap';

            const faviconUrl = `https://rdl.ink/favicon/${domain}?mode=crop&fill=solid&width=64&ar=1:1&dpr=2`;
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
                revertFaviconMode();
                break;
            case 'cover120':
                html.classList.add('card-size-medium');
                revertFaviconMode();
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
```

## 🎯 Usage

After installing both the CSS and the userscript, reload Raindrop.io.  
You'll see a dropdown in the bottom‑right corner with these options:

- **Default** – Original Raindrop appearance (no changes)
- **Favicon 32** – 48px cards with a centered 32px favicon, title hidden
- **Favicon 64** – 80px cards with a centered 64px favicon, title hidden
- **Cover 80** – 80px cards showing the cover image (compact, with title & tags)
- **Cover 120** – 120px cards showing the cover image (medium compact, with title & tags)

Your selection is saved automatically – next time you visit, the same mode will be active.

## 🔧 Customization

### Changing the sizes
Edit the CSS rules that set `--grid-item-width` for each size class. For example, to make "Cover 80" wider, change `80px` to `100px`.

### Showing/hiding title or tags
In the CSS, find the `.rdp-compact .title-yyxF` and `.rdp-compact .tags-J0JZ` blocks. Change `display: block !important;` to `display: none !important;` to hide them.

### Adjusting favicon size
Modify the `width` and `height` properties inside the favicon‑specific rules (e.g., `.rdp-favicon.card-size-favicon32 .rdp-favicon-img`). Also update the `--grid-item-width` to match.

### Styling the dropdown
Edit the `style.cssText` in the JavaScript to change position, colors, or font.

## ❓ Troubleshooting

- **Cards not changing?**  
  Make sure you're in **Cards** view (not List, Headlines, or Moodboard).  
  Verify that both CSS and userscript are enabled.

- **Favicons not appearing?**  
  Check the browser console (`F12`) for errors. Some domains may not have a favicon – Raindrop's service returns a placeholder in that case.

- **Class names changed?**  
  Raindrop occasionally updates its CSS. If the script stops working, right‑click a card, select **Inspect**, and update the class names in the CSS (e.g., `.grid-OxqP` might change). Open an issue on GitHub so we can keep the project updated.

- **Dropdown doesn't appear?**  
  Ensure the userscript is correctly installed and matches the Raindrop URL (`https://app.raindrop.io/*`).

## 📄 License

MIT – use freely, modify, share.