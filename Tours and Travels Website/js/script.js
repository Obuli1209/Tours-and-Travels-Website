// Search bar open and close function
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

// Search bar open and close function on webpage scrolling
window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navBar.classList.remove('active');
    loginForm.classList.remove('active');
};

// Login form open and close functions
let loginForm = document.querySelector('.login-form-container');
let loginFormClose = document.querySelector('#login-form-close');

// Register form open and close functions
let registerForm = document.querySelector('.register-form-container');
let registerFormClose = document.querySelector('#register-form-close');

// Forgot Password form open and close functions
let forgotPasswordForm = document.querySelector('.forgot-password-form-container');
let forgotPasswordFormClose = document.querySelector('#forgot-password-form-close');

// Open and close the login form
document.querySelector('#open-login-form').addEventListener('click', (event) => {
    event.preventDefault();
    registerForm.classList.remove('active');
    forgotPasswordForm.classList.remove('active');
    loginForm.classList.add('active');
    console.log('Login form opened');
});

loginFormClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
    console.log('Login form closed');
});

// Open and close the register form
document.querySelector('#open-register-form').addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.remove('active');
    forgotPasswordForm.classList.remove('active');
    registerForm.classList.add('active');
    console.log('Register form opened');
});

registerFormClose.addEventListener('click', () => {
    registerForm.classList.remove('active');
    console.log('Register form closed');
});

// Open and close the Forgot Password form
document.querySelector('#open-forgot-password').addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    forgotPasswordForm.classList.add('active');
    console.log('Forgot Password form opened');
});

// Back to Login from Forgot Password
document.querySelector('#back-to-login').addEventListener('click', (event) => {
    event.preventDefault();
    forgotPasswordForm.classList.remove('active');
    loginForm.classList.add('active'); // Show the login form
    console.log('Back to Login form');
});

// Close buttons for the forms
forgotPasswordFormClose.addEventListener('click', () => {
    forgotPasswordForm.classList.remove('active');
    console.log('Forgot Password form closed');
});

// Function to show the login form
function showLoginForm() {
    loginForm.classList.add('active'); // Show the login form
}

// Check login status on page load
window.addEventListener("load", function() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    let loginIcon = document.getElementById('login-btn');

    if (isLoggedIn === 'true') {
        // User is logged in, change the header content to "Logout"
        loginIcon.innerHTML = '<span> Logout</span>';
        loginIcon.setAttribute('onclick', 'logout()');
    } else {
        // User is not logged in, show "Login"
        loginIcon.innerHTML = '<span> Login</span>';
        loginIcon.setAttribute('onclick', 'showLoginForm()');
    }
});

//menubar open and close function in small view
let menu=document.querySelector('#menu-bar');
let navBar=document.querySelector('.navbar');
menu.addEventListener('click',()=>{
    menu.classList.toggle('fa-times');
    navBar.classList.toggle('active');
});

//video controls
let videoBtn=document.querySelectorAll('.vid-btn');
videoBtn.forEach(btn =>{
    btn.addEventListener('click',()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src=btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});
// review slide function
let swiper = new Swiper(".review-slider", {
    spaceBetween:20,
    loop:true,
    autoplay:{
        delay:2500,
        disableOnInteraction:false,
    },
    breakpoints:{
        640:{
            slidesPerView:1,
        },
        768:{
            slidesPerView:2,
        },
        1024:{
            slidesPerView:3,
        },
    },
});
// brand name moving function
let brandSwiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1024: {
            slidesPerView: 5,
        },
    },
});
/////////////////////////////////////////////////////////login functions///////////////////////////////////////////////////////
// Registration form
function validateRegistrationForm(){
    let username = document.getElementById('register-username').value.trim();
    let email = document.getElementById('register-email').value.trim();
    let password = document.getElementById('register-password').value.trim();
    let confirmPassword = document.getElementById('register-confirm-password').value.trim();
    let agree = document.getElementById('agree').checked;

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (!agree) {
        alert("You must agree to the terms and conditions.");
        return false;
    }
    // Store in localStorage
    localStorage.setItem('registeredUsername', username);
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);
    alert("Registered successfully...");
    window.location.href = "/html/index.html";
    return false; 
}
// Login form validation
function validateLoginForm() {
    let loginEmail = document.getElementById('login-email').value.trim();
    let loginPassword = document.getElementById('login-password').value.trim();
    let loginMessage = document.getElementById('login-message');
    let loginBtn = document.getElementById('login-btn').querySelector("span");

    // Clear previous messages
    loginMessage.textContent = "";
    loginMessage.style.display = "none";

    if (loginEmail === "" || loginPassword === "") {
        loginMessage.textContent = "Please fill in all fields.";
        loginMessage.style.display = "block";
        loginMessage.style.color = "red";
        return false;
    }

    // Retrieve stored email and password
    let storedEmail = localStorage.getItem('registeredEmail');
    let storedPassword = localStorage.getItem('registeredPassword');

    // Check if the login credentials match the stored credentials
    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        loginMessage.textContent = "Login successful.";
        loginMessage.style.display = "block";
        loginMessage.style.color = "green";

        // Change the login button text to "Logout"
        loginBtn.textContent = "Logout";

        // Store a flag indicating the user is logged in
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to the homepage or another page
        window.location.href = "/html/index.html";
    } else {
        loginMessage.textContent = "Invalid username or password.";
        loginMessage.style.display = "block";
        loginMessage.style.color = "red";
    }

    return false;
}

// Logout function
function logout() {
    let loginBtn = document.getElementById('login-btn').querySelector("span");
    
    // Check if the button text is "Logout"
    if (loginBtn.textContent.trim() === "Logout") {
        // Change the text back to "Login"
        loginBtn.textContent = "Login";
        
        // Clear login-related information from localStorage
        localStorage.removeItem('isLoggedIn');
        
        // Optionally, redirect to the login page or refresh the page
        window.location.href = "/html/index.html";
    }
}

// Add click event listener to the login/logout button
document.getElementById('login-btn').addEventListener('click', function() {
    let loginBtn = this.querySelector("span");
    
    if (loginBtn.textContent.trim() === "Login") {
        // If the text is "Login", validate the login form
        showLoginForm();
    } else {
        // If the text is "Logout", perform the logout
        logout();
    }
});
// Forgot password
function validateForgotPasswordForm() {
    let email = document.getElementById('forgot-password-email').value.trim();
    let newPassword = document.getElementById('new-password').value.trim();
    let confirmPassword = document.getElementById('confirm-new-password').value.trim();

    if (email === "" || newPassword === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    localStorage.setItem('registeredPassword', newPassword);
   alert("password changed successfully");
    window.location.href = "/html/index.html";
    return false;
}

//fetch date
document.getElementById('year').textContent = new Date().getFullYear();


//contact and booking details sent to email
window.onload = function () {
    emailjs.init("pRJWRdFJLTBvpePOa"); // Your Public Key

    // Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", function(event){
        event.preventDefault();

        emailjs.send("service_z7gt11y", "template_n42icuj", {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            mobile: document.getElementById("mobile").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }).then(function(response) {
            alert("Contact form submitted successfully!");
        }, function(error) {
            alert("Failed to send contact form.");
        });
    });

    // Booking Form Submission
    document.getElementById("bookingForm").addEventListener("submit", function(event){
        event.preventDefault();

        emailjs.send("service_9znbuog", "template_nktsv1f", {
            place: document.getElementById("place").value,
            guests: document.getElementById("guests").value,
            arrival: document.getElementById("arrival").value,
            leaving: document.getElementById("leaving").value
        }).then(function(response) {
            alert("Booking form submitted successfully!");
        }, function(error) {
            alert("Failed to send booking form.");
        });
    });
};

function googleSearch() {
    var query = document.getElementById("search-bar").value;
    if (query) {
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
    }
    return false; // Prevent default form submission
}

