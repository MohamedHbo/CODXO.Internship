document.addEventListener('DOMContentLoaded', function() {
    // Check for existing session
    checkExistingSession();
    
    // Form submission handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }
    
    function validateLoginForm() {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('input[name="remember"]').checked;
        
        // Validate email
        if (!email) {
            showError('email-error', 'Email is required');
            return false;
        } else if (!validateEmail(email)) {
            showError('email-error', 'Please enter a valid email');
            return false;
        }
        
        // Validate password
        if (!password) {
            showError('password-error', 'Password is required');
            return false;
        } else if (password.length < 8) {
            showError('password-error', 'Password must be at least 8 characters');
            return false;
        }
        
        // Authenticate user
        authenticateUser(email, password, rememberMe);
    }
    
    function authenticateUser(email, password, rememberMe) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('infohive_users')) || [];
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Create session
            createUserSession(user, rememberMe);
            
            // Redirect based on user type
            redirectUser(user.userType);
        } else {
            showError('password-error', 'Invalid email or password');
        }
    }
    
    function createUserSession(user, rememberMe) {
        const sessionData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            loggedInAt: new Date().toISOString()
        };
        
        localStorage.setItem('infohive_current_user', JSON.stringify(sessionData));
        
        if (rememberMe) {
            localStorage.setItem('infohive_remember_me', 'true');
        } else {
            localStorage.removeItem('infohive_remember_me');
        }
    }
    
    function checkExistingSession() {
        const rememberMe = localStorage.getItem('infohive_remember_me') === 'true';
        const userData = localStorage.getItem('infohive_current_user');
        
        if (rememberMe && userData) {
            const user = JSON.parse(userData);
            redirectUser(user.userType);
        }
    }
    
    function redirectUser(userType) {
        switch(userType) {
            case 'student':
                window.location.href = 'student-dashboard.html';
                break;
            case 'teacher':
                window.location.href = 'teacher-dashboard.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});