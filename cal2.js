// Keyboard shortcut for portal access from calculator
if (location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '') {
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
            window.location.href = "portal.html";
        }
    });
}

// Password protection logic for password.html
if (location.pathname.endsWith('password.html')) {
    const submitBtn = document.getElementById('gateway-submit');
    const input = document.getElementById('gateway-password');
    const errorDiv = document.getElementById('gateway-error');
    submitBtn.onclick = checkPass;
    input.onkeydown = function (e) { if (e.key === "Enter") checkPass(); };
    function checkPass() {
        // Change this password to your chosen secret
        const CORRECT = "carnage";
        if (input.value === CORRECT) {
            window.location.href = "home.html";
        } else {
            errorDiv.textContent = "Incorrect password!";
            input.value = "";
            input.focus();
            setTimeout(() => errorDiv.textContent = "", 1900);
        }
    }
}

// Theme switching on all pages
function setTheme(name) {
    document.getElementById('themecss').setAttribute('href', `themes/${name}.css`);
    localStorage.setItem('carnage-theme', name);
}
window.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('carnage-theme') || "darkred";
    setTheme(theme);
    let themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = theme;
        themeSelect.onchange = e => setTheme(e.target.value);
    }
});