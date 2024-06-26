/**
 * This function adds the validation to the add-task page
 *
 */
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

/**
 * This function is adds eventlisteners to the input fields
 *
 * @param {element} inputField - div id of the input field
 * @param {string} type - this is the type of the input field
 * @param {element} passwordField  div id of the input field
 */
function addValidationListeners(inputField, type, passwordField) {
  inputField.addEventListener('blur', () => validateInput(inputField, type, passwordField));
  inputField.addEventListener('input', () => clearError(inputField));
}

/**
 * This function is used for validate the error messages
 *
 * @param {element} inputField - div id of the input field
 * @param {string} type - this is the type of the input field
 * @param {element} passwordField  div id of the input field
 * @returns - returns the function when the password is incorrect
 */
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

/**
 * This function validates the passwords
 *
 * @param {element} confirmInput - This is the confirm password Input field
 * @param {element} passwordInput - This is the password Input field
 */
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

/**
 * This function validates the error messages
 *
 * @param {*} checkboxInput
 */
function validateCheckbox(checkboxInput) {
  const parent = checkboxInput.parentNode.parentNode;
  const errorClass = 'error';

  if (!checkboxInput.checked) {
    showErrorMessage(parent, 'You must accept the Privacy policy');
  } else {
    hideErrorMessage(parent);
  }
}

/**
 * This function shows the error messages
 *
 */
function showErrorMessage(parentNode, message) {
  let errorMessage = parentNode.querySelector('.error-message');
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    parentNode.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

/**
 * This function is used to hide error messages
 *
 * @param {element} parentNode - This is the parentNode of the div with the error-message class
 */
function hideErrorMessage(parentNode) {
  const errorMessage = parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

/**
 * This function reset the error messages
 *
 * @param {element} inputField - This is the inputfield
 */
function clearError(inputField) {
  inputField.classList.remove('error');
  hideErrorMessage(inputField.parentNode);
}

/**
 * This function validates the email input
 *
 * @param {element} email - this is the email input field
 * @returns - validate the value
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * This changes the background of the sidebar
 *
 */
function changeAddTaskButtonBackground() {
  let addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.classList.add('menu-background');
}

/**
 * This funcion adds the validation to the edit task form
 *
 */
function addTaskValidationEdit() {
  const addTaskForm = document.getElementById('addTask-edit');
  const title = document.getElementById('title-edit');
  const date = document.getElementById('custom-date-edit');
  const category = document.getElementById('category-edit');

  addValidationListenersEdit(title, 'name');
  addValidationListenersEdit(date, 'name');
  addValidationListenersEdit(category, 'name');

  addTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validateInput(title, 'name');
    validateInput(date, 'name');
    validateInput(category, 'name');
  });
}
/**
 * This function is adds eventlisteners to the input fields of the edit-task form
 *
 * @param {element} inputField - div id of the input field
 * @param {string} type - this is the type of the input field
 * @param {element} passwordField  div id of the input field
 */
function addValidationListenersEdit(inputField, type, passwordField) {
  inputField.addEventListener('blur', () => validateInputEdit(inputField, type, passwordField));
  inputField.addEventListener('input', () => clearErrorEdit(inputField));
}

/**
 * This function is used for validate the error messages of the edit-task popup
 *
 * @param {element} inputField - div id of the input field
 * @param {string} type - this is the type of the input field
 * @param {element} passwordField  div id of the input field
 * @returns - returns the function when the password is incorrect
 */
function validateInputEdit(inputField, type, passwordField) {
  const value = inputField.value.trim();
  const parentNode = inputField.parentNode;
  const errorClass = 'error';
  let errorMessage = '';

  if (type === 'confirmPassword') {
    validateConfirmPasswordEdit(inputField, passwordField);
    return;
  }

  if (type === 'name') {
    if (value === '') {
      errorMessage = 'This field is required';
    }
  }

  if (errorMessage) {
    inputField.classList.add(errorClass);
    showErrorMessageEdit(parentNode, errorMessage);
  } else {
    inputField.classList.remove(errorClass);
    hideErrorMessageEdit(parentNode);
  }
}

/**
 * This function validates the passwords
 *
 * @param {element} confirmInput - This is the confirm password Input field
 * @param {element} passwordInput - This is the password Input field
 */
function validateConfirmPasswordEdit(confirmInput, passwordInput) {
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
    showErrorMessageEdit(parent, errorMessage);
  } else {
    confirmInput.classList.remove(errorClass);
    hideErrorMessageEdit(parent);
  }
}

/**
 * This function validates the error messages of the edit-form
 *
 * @param {*} checkboxInput
 */
function validateCheckboxEdit(checkboxInput) {
  const parent = checkboxInput.parentNode.parentNode;
  const errorClass = 'error';

  if (!checkboxInput.checked) {
    showErrorMessageEdit(parent, 'You must accept the Privacy policy');
  } else {
    hideErrorMessageEdit(parent);
  }
}

/**
 * This function shows the error messages of the edit form
 *
 */
function showErrorMessageEdit(parentNode, message) {
  let errorMessage = parentNode.querySelector('.error-message');
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    parentNode.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

/**
 * This function is used to hide error messages of the edit form
 *
 * @param {element} parentNode - This is the parentNode of the div with the error-message class
 */
function hideErrorMessageEdit(parentNode) {
  const errorMessage = parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

/**
 * This function reset the error messages of the edit form
 *
 * @param {element} inputField - This is the inputfield
 */
function clearErrorEdit(inputField) {
  inputField.classList.remove('error');
  hideErrorMessageEdit(inputField.parentNode);
}

/**
 * This function validates the email input of the edit form
 *
 * @param {element} email - this is the email input field
 * @returns - validate the value
 */
function isValidEmailEdit(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
