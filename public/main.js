document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://sibidashboard.azurewebsites.net/api';

    // Register Form Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            try {
                const response = await fetch(`${apiUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                console.log(data); // Log the response data

                // Check for response status
                if (response.ok) {
                    alert(data.message);
                    registerForm.reset(); // Reset form fields after successful registration
                } else {
                    alert(data.error || 'Registration failed'); // Show error message
                }
            } catch (error) {
                console.error('Error registering user:', error);
                alert('Failed to register user');
            }
        });
    } else {
        console.error('registerForm element not found');
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch(`${apiUrl}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                console.log(data); // Log the response data

                // Check for response status
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    console.log('Token stored:', data.token); // Log the stored token
                    alert('Login successful!');
                    window.location.href = 'profile.html';
                } else {
                    alert(data.error || 'Login failed'); // Show error message
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('Failed to login');
            }
        });
    } else {
        console.error('loginForm element not found');
    }

    function logout() {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }

    // Logout Button Click Event
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    } else {
        console.error('logoutButton element not found');
    }
});
