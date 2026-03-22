const form = document.getElementById('form');
const username = document.getElementById('iusername');
const email = document.getElementById('iemail');
const password = document.getElementById('ipassword');
const cpassword = document.getElementById('iconfirmpassword');
const divPassword = document.getElementById('divpassword');
const togglePassword = document.getElementById('togglePassword');

const errorName = document.getElementById('ename');
const errorEmail = document.getElementById('eemail');
const errorPassword = document.getElementById('epassword');
const errorCPassword = document.getElementById('ecpassword');

/**
 * Updates UI and adds a 'shake' animation if the field is invalid.
 */
const updateUI = (inputElement, errorElement, message, isValid) => {
    errorElement.style.display = isValid ? 'none' : 'block';
    errorElement.textContent = isValid ? '' : message;

    const target = (inputElement.id === 'ipassword') ? divPassword : inputElement;

    if (isValid) {
        target.style.borderColor = '#4ade80';
        target.style.boxShadow = 'none';
        target.classList.remove('shake');
    } else {
        target.style.borderColor = '#ff5e5e';
        target.style.boxShadow = '0 0 0 4px rgba(255, 94, 94, 0.1)';

        // Add shake animation
        target.classList.remove('shake');
        void target.offsetWidth; // Trigger reflow
        target.classList.add('shake');
    }
}

// --- Validation Functions ---

const validateName = () => {
    const val = username.value.trim();
    const isValid = val.length >= 3 && val.length <= 25;
    updateUI(username, errorName, "Required: 3-25 characters", isValid);
    return isValid;
};

const validateEmail = () => {
    const val = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(val);
    updateUI(email, errorEmail, "Please enter a valid email", isValid);
    return isValid;
};

const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,15}$/;
    const isValid = regex.test(password.value);
    updateUI(password, errorPassword, "8-15 chars, Upper, Lower, Num, Special", isValid);
    return isValid;
};

const validateConfirmPassword = () => {
    const isValid = cpassword.value === password.value && cpassword.value !== "";
    updateUI(cpassword, errorCPassword, "Passwords do not match", isValid);
    return isValid;
};

// --- Listeners ---

username.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
cpassword.addEventListener('input', validateConfirmPassword);

let isVisible = false;
togglePassword.addEventListener('click', () => {
    isVisible = !isVisible;
    password.type = isVisible ? 'text' : 'password';
    togglePassword.className = isVisible ? 'fas fa-eye-slash' : 'fas fa-eye';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword()
    ];

    if (results.every(status => status === true)) {
        alert(" Successfully Signed Up!");
    }
});
