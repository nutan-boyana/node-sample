// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation
function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  return { valid: true, message: '' };
}

// Check if passwords match
function validatePasswordConfirm(password, passwordConfirm) {
  if (password !== passwordConfirm) {
    return { valid: false, message: 'Passwords do not match' };
  }
  return { valid: true, message: '' };
}

// Clear error messages
function clearErrors() {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

// Validate all fields
function validateForm(event) {
  event.preventDefault();

  clearErrors();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;

  // Check if all fields are filled
  if (!email || !password || !passwordConfirm) {
    showError('All fields are required');
    return false;
  }

  // Validate email
  if (!validateEmail(email)) {
    showError('Please enter a valid email address');
    return false;
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    showError(passwordValidation.message);
    return false;
  }

  // Check if passwords match
  const passwordMatchValidation = validatePasswordConfirm(password, passwordConfirm);
  if (!passwordMatchValidation.valid) {
    showError(passwordMatchValidation.message);
    return false;
  }

  // If all validations pass, submit the form
  event.target.submit();
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registerForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordConfirmInput = document.getElementById('passwordConfirm');

  if (form) {
    form.addEventListener('submit', validateForm);
  }

  // Email validation on blur
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      if (this.value.trim() && !validateEmail(this.value.trim())) {
        showError('Please enter a valid email address');
      } else {
        clearErrors();
      }
    });
  }

  // Password validation on blur
  if (passwordInput) {
    passwordInput.addEventListener('blur', function() {
      if (this.value) {
        const validation = validatePassword(this.value);
        if (!validation.valid) {
          showError(validation.message);
        } else {
          clearErrors();
        }
      }
    });
  }

  // Password confirmation on blur
  if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('blur', function() {
      if (this.value && passwordInput.value) {
        const validation = validatePasswordConfirm(passwordInput.value, this.value);
        if (!validation.valid) {
          showError(validation.message);
        } else {
          clearErrors();
        }
      }
    });
  }
});
