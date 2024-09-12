// Add event listener to the login form on submit
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of username
    const username = document.getElementById("username").value;
    // Get the values of password
    const password = document.getElementById("password").value;
    // Get the values of "Remember Me" checkbox
    const rememberMe = document.getElementById("rememberMe").checked;
    const errorMessage = document.getElementById("errorMessage");
    const loadingSpinner = document.getElementById("loadingSpinner");

    // Validate the email format using a regex function
    if (!validateEmail(username)) {
        // Show error message
        errorMessage.textContent = "Please enter a valid email address."; 
        // Stop the function if validation fails
        return; 
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        errorMessage.textContent = "Password must be at least 8 characters.";
        return;
    }

    // Clear the error message and show the loading spinner
    errorMessage.textContent = "";
    loadingSpinner.classList.remove("hidden");

    // Simulate an API call with fetch
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        
        // Hide the loading spinner
        loadingSpinner.classList.add("hidden"); 
        // Show success message
        alert("Login successful!"); 
        // Log the API response
        console.log("Response from API:", data); 

        // If "Remember Me" is checked, store the username in localStorage
        if (rememberMe) {
            localStorage.setItem("username", username);
        }
    })
    .catch(error => {
        // Hide the spinner if there's an error
        loadingSpinner.classList.add("hidden"); 
        alert("Login failed. Please try again.");
        // Log the error
        console.error("Error:", error); 
    });
});

// Email validation function using regular expression
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Returns true if the email matches the regex
    return re.test(email); 
}

// Toggle password visibility based on the checkbox
document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    // Show or hide password
    passwordField.type = this.checked ? "text" : "password"; 
});

// Load saved username from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    // Get saved username
    const savedUsername = localStorage.getItem("username"); 
    if (savedUsername) {
        // Populate username field
        document.getElementById("username").value = savedUsername; 
        // Check the "Remember Me" box
        document.getElementById("rememberMe").checked = true; 
    }
});
