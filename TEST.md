# Raindrop Customization Assets

This repository contains assets used to customize Raindrop.io with CSS and JavaScript (via Tampermonkey/Stylus).

## 🌞 Light / 🌙 Dark Mode Toggle

Use the toggle below to switch between light and dark themes. The layout will adapt accordingly.

<div id="theme-toggle" style="position: absolute; top: 20px; right: 20px; background: #f0f0f0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: background-color 0.3s ease;">
  <span style="font-size: 20px;">🌙</span>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', sans-serif; background: #f5f7fa; border-radius: 10px; transition: background-color 0.3s ease;">

  <div style="background: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
    <img src="imgs/default.png" alt="Default" style="width: 100%; height: 200px; object-fit: cover; display: block;">
    <div style="padding: 10px; text-align: center; font-size: 14px; color: #2c3e50; background: #f8f9fa; border-top: 1px solid #eee;">Default</div>
  </div>

  <div style="background: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
    <img src="imgs/favicon32.png" alt="Favicon 32" style="width: 100%; height: 200px; object-fit: cover; display: block;">
    <div style="padding: 10px; text-align: center; font-size: 14px; color: #2c3e50; background: #f8f9fa; border-top: 1px solid #eee;">Favicon 32</div>
  </div>

  <div style="background: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
    <img src="imgs/favicon64.png" alt="Favicon 64" style="width: 100%; height: 200px; object-fit: cover; display: block;">
    <div style="padding: 10px; text-align: center; font-size: 14px; color: #2c3e50; background: #f8f9fa; border-top: 1px solid #eee;">Favicon 64</div>
  </div>

  <div style="background: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
    <img src="imgs/cover80.png" alt="Cover 80" style="width: 100%; height: 200px; object-fit: cover; display: block;">
    <div style="padding: 10px; text-align: center; font-size: 14px; color: #2c3e50; background: #f8f9fa; border-top: 1px solid #eee;">Cover 80</div>
  </div>

  <div style="background: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
    <img src="imgs/cover120.png" alt="Cover 120" style="width: 100%; height: 200px; object-fit: cover; display: block;">
    <div style="padding: 10px; text-align: center; font-size: 14px; color: #2c3e50; background: #f8f9fa; border-top: 1px solid #eee;">Cover 120</div>
  </div>

</div>

<script>
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const gallery = document.querySelector('div[style*="grid-template-columns"]');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';

  if (savedTheme === 'dark') {
    body.style.background = '#121212';
    body.style.color = '#f0f0f0';
    gallery.style.background = '#1e1e1e';
    themeToggle.innerHTML = '<span style="font-size: 20px;">🌞</span>';
  } else {
    body.style.background = '#f5f7fa';
    body.style.color = '#333';
    gallery.style.background = '#f5f7fa';
    themeToggle.innerHTML = '<span style="font-size: 20px;">🌙</span>';
  }

  themeToggle.addEventListener('click', () => {
    if (body.style.background === '#121212') {
      body.style.background = '#f5f7fa';
      body.style.color = '#333';
      gallery.style.background = '#f5f7fa';
      themeToggle.innerHTML = '<span style="font-size: 20px;">🌙</span>';
      localStorage.setItem('theme', 'light');
    } else {
      body.style.background = '#121212';
      body.style.color = '#f0f0f0';
      gallery.style.background = '#1e1e1e';
      themeToggle.innerHTML = '<span style="font-size: 20px;">🌞</span>';
      localStorage.setItem('theme', 'dark');
    }
  });
</script>

> **Note:** This Markdown file includes embedded CSS/JS for light/dark mode. It works best in Markdown viewers that support HTML/CSS (e.g., GitHub, VS Code, MkDocs). The toggle saves your preference in `localStorage`.