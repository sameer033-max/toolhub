// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (document.getElementById('darkModeToggle')) {
            document.getElementById('darkModeToggle').checked = true;
        }
    }
    
    // Add toggle event listener if the toggle exists
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Add dark mode toggle to navbar if it doesn't exist
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav && !document.getElementById('darkModeToggle')) {
        const darkModeItem = document.createElement('li');
        darkModeItem.className = 'nav-item ms-lg-3 d-flex align-items-center';
        darkModeItem.innerHTML = `
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="darkModeToggle" ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'checked' : ''}>
                <label class="form-check-label ms-2" for="darkModeToggle">
                    <i class="fas fa-moon"></i>
                </label>
            </div>
        `;
        navbarNav.appendChild(darkModeItem);
        
        // Add event listener to the newly created toggle
        document.getElementById('darkModeToggle').addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
