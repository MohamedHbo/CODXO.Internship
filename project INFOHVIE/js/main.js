// InfoHive Website - Main JavaScript File
const InfoHive = {
    currentUser: null,
    userType: null, // 'student' or 'admin'
    currentPage: 'home',
    testData: {
        currentTest: null,
        questions: [],
        currentQuestion: 0,
        answers: {},
        timeRemaining: 0,
        timer: null
    },
    
    // Initialize the application
    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.loadPageContent();
        this.protectAdminRoutes();
    },
    
    // Protect admin routes
    protectAdminRoutes() {
        const isAdminPage = window.location.pathname.includes('admin');
        const userType = localStorage.getItem('infohive_user_type');
        
        if (isAdminPage && userType !== 'admin') {
            this.navigateTo('admin-login');
        }
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                this.navigateTo(e.target.dataset.page);
            }
            
            if (e.target.matches('[data-action]')) {
                e.preventDefault();
                this.handleAction(e.target.dataset.action, e.target);
            }
        });
        
        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
        
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    },
    
    // Authentication functions
    checkAuthStatus() {
        const user = localStorage.getItem('infohive_user');
        const userType = localStorage.getItem('infohive_user_type');
        
        if (user && userType) {
            this.currentUser = JSON.parse(user);
            this.userType = userType;
            this.updateUIForLoggedInUser();
            
            // Redirect to dashboard if trying to access login/register while logged in
            if (['login', 'register', 'admin-login'].includes(this.currentPage)) {
                this.navigateTo(`${userType}-dashboard`);
            }
        }
    },
    
    // Handle login
    handleLogin(data) {
        const { email, password, userType } = data;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('infohive_users')) || [];
        
        // Demo admin credentials (in real app, should be server-side)
        const demoAdmin = {
            email: 'admin@infohive.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            userType: 'admin'
        };
        
        // Add demo admin if not exists
        if (!users.some(u => u.email === demoAdmin.email)) {
            users.push(demoAdmin);
            localStorage.setItem('infohive_users', JSON.stringify(users));
        }
        
        // Find user
        const user = users.find(u => 
            u.email === email && 
            u.password === password && 
            u.userType === userType
        );
        
        if (user) {
            // Set user data
            this.currentUser = {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType
            };
            this.userType = user.userType;
            
            // Store in localStorage
            localStorage.setItem('infohive_user', JSON.stringify(this.currentUser));
            localStorage.setItem('infohive_user_type', user.userType);
            
            // Redirect to appropriate dashboard
            this.navigateTo(`${user.userType}-dashboard`);
            
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid credentials. Please try again.', 'error');
        }
    },
    
    // Handle registration
    handleRegister(data) {
        // Get form values
        const firstName = data.firstName.trim();
        const lastName = data.lastName.trim();
        const email = data.email.trim();
        const password = data.password;
        
        // Validate passwords match
        if (password !== data.confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('infohive_users')) || [];
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            this.showNotification('An account with this email already exists', 'error');
            return;
        }
        
        // Create new user (student)
        const newUser = {
            firstName,
            lastName,
            email,
            password, // Note: In production, hash the password
            userType: 'student',
            createdAt: new Date().toISOString()
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('infohive_users', JSON.stringify(users));
        
        // Show success and redirect to login
        this.showNotification('Registration successful! Please login.', 'success');
        this.navigateTo('login');
    },
    
    // Logout
    logout() {
        this.currentUser = null;
        this.userType = null;
        localStorage.removeItem('infohive_user');
        localStorage.removeItem('infohive_user_type');
        this.navigateTo('index');
        this.showNotification('Logged out successfully!', 'success');
    },
    
    // ... (بقية الدوال تبقى كما هي مع تعديلات بسيطة عند الحاجة)
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => InfoHive.init());