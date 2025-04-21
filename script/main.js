// DOM Elements
const toolsGrid = document.querySelector('#tools-grid .row');
const searchInput = document.createElement('input');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    setupNavigation();
    renderTools();
    loadHeaderAndFooter();
});

// Setup search functionality
function setupSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'tool-search';
    
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search';
    
    searchInput.type = 'text';
    searchInput.className = 'form-control';
    searchInput.placeholder = 'Search tools...';
    searchInput.addEventListener('input', handleSearch);
    
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    
    toolsGrid.parentElement.insertBefore(searchContainer, toolsGrid);
}

// Setup navigation
function setupNavigation() {
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    
    // Add category links to navigation
    Object.entries(toolCategories).forEach(([categoryId, category]) => {
        const dropdownItem = document.createElement('li');
        dropdownItem.className = 'nav-item dropdown';
        dropdownItem.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="${category.icon} me-1"></i>${category.name}
            </a>
            <ul class="dropdown-menu">
                ${Object.entries(category.tools)
                    .map(([toolId, tool]) => `
                        <li><a class="dropdown-item" href="#${toolId}">${tool.name}</a></li>
                    `).join('')}
            </ul>
        `;
        navbarNav.appendChild(dropdownItem);
    });
}

// Render all tools
function renderTools() {
    toolsGrid.innerHTML = '';
    
    Object.entries(toolCategories).forEach(([categoryId, category]) => {
        // Add category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'col-12 mt-4 mb-3';
        categoryHeader.innerHTML = `
            <h2 class="border-bottom pb-2">
                <i class="${category.icon} me-2"></i>${category.name}
            </h2>
        `;
        toolsGrid.appendChild(categoryHeader);
        
        // Add tools in category
        Object.entries(category.tools).forEach(([toolId, tool]) => {
            const toolCard = document.createElement('div');
            toolCard.className = 'col-md-6 col-lg-4';
            toolCard.innerHTML = `
                <div class="card tool-card" id="${toolId}">
                    <div class="card-body">
                        <div class="text-center mb-3">
                            <i class="${tool.icon} category-icon"></i>
                        </div>
                        <h5 class="card-title">${tool.name}</h5>
                        <p class="card-text">${tool.description}</p>
                        <button class="btn btn-primary w-100" onclick="showTool('${toolId}')">
                            Use Tool
                        </button>
                    </div>
                </div>
            `;
            toolsGrid.appendChild(toolCard);
        });
    });
}

// Show specific tool
function showTool(toolId) {
    // Find the tool in categories
    let selectedTool = null;
    Object.values(toolCategories).forEach(category => {
        if (category.tools[toolId]) {
            selectedTool = category.tools[toolId];
        }
    });
    
    if (!selectedTool) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = `${toolId}Modal`;
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="${selectedTool.icon} me-2"></i>${selectedTool.name}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${selectedTool.template}
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.querySelector(`#${toolId}Modal`);
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body and show it
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
        const toolDescription = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
            card.parentElement.style.display = '';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
    
    // Show/hide category headers based on visible tools
    const categoryHeaders = document.querySelectorAll('.col-12.mt-4.mb-3');
    categoryHeaders.forEach(header => {
        const nextSibling = header.nextElementSibling;
        let hasVisibleTools = false;
        
        let current = nextSibling;
        while (current && !current.classList.contains('col-12')) {
            if (current.style.display !== 'none') {
                hasVisibleTools = true;
                break;
            }
            current = current.nextElementSibling;
        }
        
        header.style.display = hasVisibleTools ? '' : 'none';
    });
}

// Load header and footer components
function loadHeaderAndFooter() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', data);
        });

    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('beforeend', data);
        });
}

// Tool Utilities
const toolUtils = {
    // Show loading spinner
    showLoading: function(container) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        container.appendChild(spinner);
        return spinner;
    },

    // Hide loading spinner
    hideLoading: function(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    },

    // Show success message
    showSuccess: function(message, container) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        container.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    },

    // Show error message
    showError: function(message, container) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        container.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    },

    // Copy text to clipboard
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text)
            .then(() => toolUtils.showSuccess('Copied to clipboard!', document.querySelector('.tool-container')))
            .catch(() => toolUtils.showError('Failed to copy text', document.querySelector('.tool-container')));
    },

    // Download file
    downloadFile: function(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Validate email
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validate URL
    validateUrl: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips and popovers
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Load dark mode script
    const darkModeScript = document.createElement('script');
    darkModeScript.src = '../../js/darkmode.js';
    document.body.appendChild(darkModeScript);

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', toolUtils.debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const tools = document.querySelectorAll('.tool-card');
            
            tools.forEach(tool => {
                const title = tool.querySelector('.card-title').textContent.toLowerCase();
                const description = tool.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    tool.style.display = 'block';
                } else {
                    tool.style.display = 'none';
                }
            });
        }, 300));
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('show');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const fileName = file.name;
                const fileSize = toolUtils.formatFileSize(file.size);
                const fileInfo = document.createElement('div');
                fileInfo.className = 'file-info';
                fileInfo.innerHTML = `
                    <i class="fas fa-file me-2"></i>
                    <span class="file-name">${fileName}</span>
                    <span class="file-size">${fileSize}</span>
                `;
                this.parentNode.appendChild(fileInfo);
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                `;
            }
        });
    });

    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            if (textToCopy) {
                toolUtils.copyToClipboard(textToCopy);
            }
        });
    });

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.getAttribute('data-content');
            const filename = this.getAttribute('data-filename');
            const type = this.getAttribute('data-type');
            if (content && filename && type) {
                toolUtils.downloadFile(content, filename, type);
            }
        });
    });

    // Responsive tables
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    // Remove old dark mode toggle functionality since it's now handled by darkmode.js
    // The themeToggle button is kept for backward compatibility but will be phased out
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            
            // Also toggle the checkbox if it exists
            const darkModeCheckbox = document.getElementById('darkModeToggle');
            if (darkModeCheckbox) {
                darkModeCheckbox.checked = currentTheme === 'dark';
            }
        });
    }      // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Tool navigation
    const toolNavLinks = document.querySelectorAll('.tool-nav-link');
    toolNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 