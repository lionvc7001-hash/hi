/**
 * Biotechnology Intelligence & OSINT Platform
 * Frontend UI Controller
 * 
 * This script manages interactions and animations for the BioINT platform.
 * PLACEHOLDER: Backend API integration will be added here for live data.
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    animationSpeed: 300,
    scrollAnimationDuration: 2000,
    statsUpdateInterval: 3000,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Utility: Add event listener with error handling
 */
function safeAddEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

/**
 * Utility: Animate counter from 0 to target value
 */
function animateCounter(element, targetValue, duration = CONFIG.scrollAnimationDuration) {
    if (!element) return;
    
    const startValue = 0;
    const startTime = Date.now();
    const numericTarget = parseInt(targetValue, 10);
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(startValue + (numericTarget - startValue) * progress);
        
        // Format with thousands separator
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

/**
 * Utility: Format large numbers with K, M, B notation
 */
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Utility: Get element by selector safely
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * Utility: Get all elements by selector safely
 */
function getElements(selector) {
    return document.querySelectorAll(selector);
}

// ============================================
// HEADER INTERACTIONS
// ============================================

class HeaderController {
    constructor() {
        this.themeToggle = getElement('.theme-toggle');
        this.searchBtn = getElement('.search-btn');
        this.notificationBtn = getElement('.notification-btn');
        this.profileIcon = getElement('.profile-icon');
        
        this.initEventListeners();
        this.initTheme();
    }
    
    initEventListeners() {
        safeAddEventListener(this.themeToggle, 'click', () => this.toggleTheme());
        safeAddEventListener(this.searchBtn, 'click', () => this.handleSearch());
        safeAddEventListener(this.notificationBtn, 'click', () => this.handleNotifications());
        safeAddEventListener(this.profileIcon, 'click', () => this.handleProfile());
    }
    
    initTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('biotech-theme') || 'dark';
        this.setTheme(savedTheme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        localStorage.setItem('biotech-theme', newTheme);
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // PLACEHOLDER: Additional theme adjustments would go here
    }
    
    handleSearch() {
        console.log('Search functionality - PLACEHOLDER for future implementation');
        // PLACEHOLDER: Open search modal or overlay
    }
    
    handleNotifications() {
        console.log('Notifications - PLACEHOLDER for future implementation');
        // PLACEHOLDER: Show notifications panel
    }
    
    handleProfile() {
        console.log('Profile menu - PLACEHOLDER for future implementation');
        // PLACEHOLDER: Show profile dropdown
    }
}

// ============================================
// SIDEBAR INTERACTIONS
// ============================================

class SidebarController {
    constructor() {
        this.sidebarLeft = getElement('.sidebar-left');
        this.sidebarToggle = getElement('.sidebar-toggle');
        this.sidebarIcons = getElements('.sidebar-icon');
        this.isExpanded = false;
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        safeAddEventListener(this.sidebarToggle, 'click', () => this.toggleSidebar());
        
        // Handle sidebar icon clicks
        this.sidebarIcons.forEach((icon, index) => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleIconClick(icon, index);
            });
        });
    }
    
    toggleSidebar() {
        this.isExpanded = !this.isExpanded;
        if (this.sidebarLeft) {
            this.sidebarLeft.classList.toggle('expanded', this.isExpanded);
        }
    }
    
    handleIconClick(icon, index) {
        // Remove active class from all icons
        this.sidebarIcons.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked icon
        icon.classList.add('active');
        
        console.log(`Navigation to section ${index} - PLACEHOLDER for future implementation`);
        // PLACEHOLDER: Route to different sections
    }
}

// ============================================
// GLOBE INTERACTIONS
// ============================================

class GlobeController {
    constructor() {
        this.globe = getElement('.globe-svg');
        this.bioechNodes = getElements('.biotech-nodes circle');
        this.orbitRings = getElements('.orbit-ring');
        
        this.initInteractions();
    }
    
    initInteractions() {
        // Make globe interactive
        safeAddEventListener(this.globe, 'mouseenter', () => this.onGlobeEnter());
        safeAddEventListener(this.globe, 'mouseleave', () => this.onGlobeLeave());
        
        // Make biotech nodes clickable
        this.bioechNodes.forEach((node, index) => {
            node.style.cursor = 'pointer';
            node.addEventListener('mouseenter', () => this.onNodeHover(node, index));
            node.addEventListener('mouseleave', () => this.onNodeUnhover(node));
            node.addEventListener('click', () => this.onNodeClick(node, index));
        });
    }
    
    onGlobeEnter() {
        if (this.globe) {
            this.globe.style.filter = 'drop-shadow(0 0 40px rgba(255, 59, 59, 0.25))';
        }
    }
    
    onGlobeLeave() {
        if (this.globe) {
            this.globe.style.filter = 'drop-shadow(0 0 30px rgba(255, 59, 59, 0.15))';
        }
    }
    
    onNodeHover(node, index) {
        node.style.r = 8;
        node.style.opacity = 1;
        node.style.filter = 'drop-shadow(0 0 12px rgba(255, 59, 59, 0.8))';
    }
    
    onNodeUnhover(node) {
        node.style.r = 4;
        node.style.opacity = 0.8;
        node.style.filter = 'drop-shadow(0 0 4px rgba(255, 59, 59, 0.6))';
    }
    
    onNodeClick(node, index) {
        console.log(`Biotech node ${index} clicked - PLACEHOLDER for future implementation`);
        // PLACEHOLDER: Show detailed information about this biotech event/node
    }
}

// ============================================
// PANEL INTERACTIONS
// ============================================

class PanelController {
    constructor() {
        this.panels = getElements('.panel');
        
        this.initInteractions();
    }
    
    initInteractions() {
        this.panels.forEach((panel, index) => {
            panel.style.cursor = 'pointer';
            panel.addEventListener('click', () => this.onPanelClick(panel, index));
            panel.addEventListener('mouseenter', () => this.onPanelEnter(panel));
            panel.addEventListener('mouseleave', () => this.onPanelLeave(panel));
        });
    }
    
    onPanelClick(panel, index) {
        console.log(`Panel ${index} clicked - PLACEHOLDER for future implementation`);
        // PLACEHOLDER: Expand panel or show detail view
    }
    
    onPanelEnter(panel) {
        // Already handled by CSS :hover, but can add additional JS effects here
    }
    
    onPanelLeave(panel) {
        // Already handled by CSS :hover
    }
}

// ============================================
// ACTIVITY FEED
// ============================================

class ActivityFeedController {
    constructor() {
        this.activityItems = getElements('.activity-item');
        
        this.initInteractions();
    }
    
    initInteractions() {
        this.activityItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => this.onActivityClick(item, index));
        });
    }
    
    onActivityClick(item, index) {
        console.log(`Activity item ${index} clicked - PLACEHOLDER for future implementation`);
        // PLACEHOLDER: Show detailed activity information
    }
    
    /**
     * PLACEHOLDER: Method for adding new activity items dynamically
     * Called by backend when new biotechnology events occur
     */
    addActivityItem(data) {
        // PLACEHOLDER structure:
        // data = {
        //     time: '5 min',
        //     tag: 'breakthrough|trial|funding|threat|research',
        //     title: 'Activity title',
        //     description: 'Activity description'
        // }
        console.log('New activity received - awaiting backend integration');
    }
}

// ============================================
// STATISTICS COUNTER
// ============================================

class StatisticsController {
    constructor() {
        this.statNumbers = getElements('.stat-number');
        this.hasAnimated = false;
        
        this.initObserver();
        this.startInitialAnimation();
    }
    
    startInitialAnimation() {
        // Animate counters when page loads
        if (!this.hasAnimated) {
            this.animateAllCounters();
            this.hasAnimated = true;
        }
    }
    
    initObserver() {
        // Use Intersection Observer for viewport-based animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateAllCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const footerStats = getElement('.footer-stats');
        if (footerStats) {
            observer.observe(footerStats);
        }
    }
    
    animateAllCounters() {
        this.statNumbers.forEach((statElement) => {
            const targetValue = statElement.getAttribute('data-value');
            if (targetValue) {
                animateCounter(statElement, targetValue, CONFIG.scrollAnimationDuration);
            }
        });
    }
    
    /**
     * PLACEHOLDER: Update statistics from backend
     */
    updateStatistics(data) {
        // PLACEHOLDER structure:
        // data = {
        //     activeThreats: 1247,
        //     clinicalTrials: 3891,
        //     publications: 12456,
        //     geneSequences: 8924561,
        //     compoundsAnalyzed: 567890
        // }
        console.log('Statistics update received - awaiting backend integration');
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

class KeyboardShortcutsController {
    constructor() {
        this.initKeyboardShortcuts();
    }
    
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Cmd/Ctrl + K for search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                getElement('.search-btn')?.click();
            }
            
            // Cmd/Ctrl + Shift + T for theme toggle
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 't') {
                e.preventDefault();
                getElement('.theme-toggle')?.click();
            }
            
            // Escape to close modals (PLACEHOLDER)
            if (e.key === 'Escape') {
                console.log('Escape pressed - PLACEHOLDER for closing modals');
            }
        });
    }
}

// ============================================
// RESPONSIVE DESIGN HANDLER
// ============================================

class ResponsiveHandler {
    constructor() {
        this.currentBreakpoint = this.getBreakpoint();
        this.initResizeListener();
    }
    
    getBreakpoint() {
        const width = window.innerWidth;
        if (width < 600) return 'mobile';
        if (width < 900) return 'tablet';
        if (width < 1200) return 'small-desktop';
        return 'desktop';
    }
    
    initResizeListener() {
        window.addEventListener('resize', () => {
            const newBreakpoint = this.getBreakpoint();
            if (newBreakpoint !== this.currentBreakpoint) {
                this.currentBreakpoint = newBreakpoint;
                this.handleBreakpointChange();
            }
        });
    }
    
    handleBreakpointChange() {
        console.log(`Breakpoint changed to: ${this.currentBreakpoint}`);
        // PLACEHOLDER: Any responsive adjustments needed
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.initPerformanceMonitoring();
    }
    
    initPerformanceMonitoring() {
        // Use requestAnimationFrame for smooth animations
        // All CSS animations are already optimized
        
        // Monitor DOM operations
        if (window.PerformanceObserver) {
            try {
                const observer = new PerformanceObserver((list) => {
                    // Can log performance metrics here
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
            } catch (e) {
                // PerformanceObserver not fully supported
            }
        }
    }
}

// ============================================
// APPLICATION INITIALIZATION
// ============================================

class BioTechPlatform {
    constructor() {
        this.controllers = {};
        this.initControllers();
    }
    
    initControllers() {
        // Initialize all controllers
        this.controllers.header = new HeaderController();
        this.controllers.sidebar = new SidebarController();
        this.controllers.globe = new GlobeController();
        this.controllers.panel = new PanelController();
        this.controllers.activity = new ActivityFeedController();
        this.controllers.statistics = new StatisticsController();
        this.controllers.keyboard = new KeyboardShortcutsController();
        this.controllers.responsive = new ResponsiveHandler();
        this.controllers.performance = new PerformanceOptimizer();
        
        console.log('BioTech Intelligence Platform initialized successfully');
        this.logPlatformInfo();
    }
    
    logPlatformInfo() {
        console.log('%c🧬 BioINT Platform Ready', 'color: #FF3B3B; font-size: 16px; font-weight: bold;');
        console.log('%cFuturistic Biotechnology Intelligence & OSINT Interface', 'color: #B00020; font-size: 12px;');
        console.log('%c⚙️ Controllers loaded: Header, Sidebar, Globe, Panels, Activity, Statistics, Keyboard, Responsive', 'color: #AFAFAF; font-size: 11px;');
    }
    
    /**
     * PLACEHOLDER API: Connect to backend for live data
     * Called by backend integration layer
     */
    connectBackend() {
        console.log('PLACEHOLDER: Backend connection ready');
        console.log('Waiting for WebSocket or API connection to biotechnology intelligence feeds...');
    }
    
    /**
     * PLACEHOLDER API: Receive live activity updates
     */
    receiveLiveActivity(activity) {
        if (this.controllers.activity) {
            this.controllers.activity.addActivityItem(activity);
        }
    }
    
    /**
     * PLACEHOLDER API: Update statistics
     */
    updateStats(statistics) {
        if (this.controllers.statistics) {
            this.controllers.statistics.updateStatistics(statistics);
        }
    }
}

// ============================================
// START APPLICATION
// ============================================

// Initialize platform when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.BioTechApp = new BioTechPlatform();
    });
} else {
    window.BioTechApp = new BioTechPlatform();
}

// ============================================
// PLACEHOLDER: FUTURE API INTEGRATIONS
// ============================================

/**
 * PLACEHOLDER: Real-time biotechnology event stream
 * 
 * Future implementation should connect to:
 * - Live publication feeds from PubMed, bioRxiv, medRxiv
 * - Clinical trial databases (ClinicalTrials.gov)
 * - FDA/EMA regulatory updates
 * - Genetic sequence databases
 * - Biosecurity threat monitoring
 * - Research funding announcements
 * - Synthetic biology developments
 * - CRISPR/gene therapy updates
 */

/**
 * PLACEHOLDER: Globe visualization data
 * 
 * Future implementation should:
 * - Display real biotechnology research hotspots
 * - Show clinical trial locations
 * - Visualize disease outbreak patterns
 * - Map biotech company headquarters
 * - Show pharmaceutical development centers
 * - Highlight funding hubs
 */

/**
 * PLACEHOLDER: OSINT data aggregation
 * 
 * Future implementation should:
 * - Aggregate from multiple biotechnology sources
 * - Apply threat intelligence algorithms
 * - Correlate findings across databases
 * - Identify emerging research trends
 * - Flag biosecurity concerns
 * - Track competitive intelligence
 */
