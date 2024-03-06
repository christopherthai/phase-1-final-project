window.addEventListener('DOMContentLoaded', (event) => {
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            document.documentElement.setAttribute('data-theme', this.value);
        });
    }
});