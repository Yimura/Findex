
import AppRoot from './app.js';

const app_root = new AppRoot();
window.app_root = app_root;

document.addEventListener('DOMContentLoaded', app_root.domReady.bind(app_root));