function addTaskValidation() {
  const addTaskForm = document.getElementById('addTask');
  const title = document.getElementById('title-task');
  const date = document.getElementById('custom-date');
  const category = document.getElementById('category');

  addValidationListeners(title, 'name');
  addValidationListeners(date, 'name');
  addValidationListeners(category, 'name');

  addTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validateInput(title, 'name');
    validateInput(date, 'name');
    validateInput(category, 'name');
  });
}

// Helper functions
function addValidationListeners(inputField, type, passwordField) {
  inputField.addEventListener('blur', () => validateInput(inputField, type, passwordField));
  inputField.addEventListener('input', () => clearError(inputField));
}

function validateInput(inputField, type, passwordField) {
  const value = inputField.value.trim();
  const parentNode = inputField.parentNode;
  const errorClass = 'error';
  let errorMessage = '';

  if (type === 'confirmPassword') {
    validateConfirmPassword(inputField, passwordField);
    return;
  }

  if (type === 'name') {
    if (value === '') {
      errorMessage = 'This field is required';
    }
  }

  if (errorMessage) {
    inputField.classList.add(errorClass);
    showErrorMessage(parentNode, errorMessage);
  } else {
    inputField.classList.remove(errorClass);
    hideErrorMessage(parentNode);
  }
}

function validateConfirmPassword(confirmInput, passwordInput) {
  const confirmValue = confirmInput.value.trim();
  const parent = confirmInput.parentNode;
  const errorClass = 'error';
  let errorMessage = '';

  if (confirmValue === '') {
    errorMessage = 'This field is required';
  } else if (confirmValue !== passwordInput.value.trim()) {
    errorMessage = 'Passwords do not match';
  }

  if (errorMessage) {
    confirmInput.classList.add(errorClass);
    showErrorMessage(parent, errorMessage);
  } else {
    confirmInput.classList.remove(errorClass);
    hideErrorMessage(parent);
  }
}

function validateCheckbox(checkboxInput) {
  const parent = checkboxInput.parentNode.parentNode;
  const errorClass = 'error';

  if (!checkboxInput.checked) {
    showErrorMessage(parent, 'You must accept the Privacy policy');
  } else {
    hideErrorMessage(parent);
  }
}

function showErrorMessage(parentNode, message) {
  let errorMessage = parentNode.querySelector('.error-message');
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    parentNode.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

function hideErrorMessage(parentNode) {
  const errorMessage = parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function clearError(inputField) {
  inputField.classList.remove('error');
  hideErrorMessage(inputField.parentNode);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function changeAddTaskButtonBackground() {
  let addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.classList.add('menu-background');
}
