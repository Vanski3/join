let contactsData = [];
let formHasErrorEditContact = false;

function loadContactsContent() {
  fetch('/scripts/contact.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Contacts loaded:', data);
      contactsData = data; // Store contacts data
      renderContacts(contactsData);
    })
    .catch((error) => console.error('Error loading contacts:', error));
  removeBackgroundLowerSidebar();
  removeButtonBackground();
  changeContactsButtonBackground();
  removeColorSideBar();
  changeColorSidebarContacts();
}

function renderContacts(contacts) {
  const content = document.getElementById('mainContent');
  content.innerHTML = /*html*/ `
    <div class="contacts-container" id="contacts-container">
      <div class="contacts-list">
        <button class="add-contact-btn">Add new contact</button>
      </div>
      <div class="contact-detail"></div>
    </div>
    <div id=edit-popup></div>
  `;

  const contactsList = document.querySelector('.contacts-list');

  // Sortiert Kontakte nach Namen
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  let currentLetter = '';

  contacts.forEach((contact) => {
    const firstLetter = contact.name[0].toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      const groupTitle = document.createElement('div');
      groupTitle.classList.add('contact-group-title');
      groupTitle.textContent = currentLetter;
      contactsList.appendChild(groupTitle);
    }

    const contactElement = document.createElement('div');
    contactElement.classList.add('contact');
    contactElement.innerHTML = /*html*/ `
      <div class="contact-initials" style="background-color: ${contact.color};">${contact.initials}</div>
      <div class="contact-info">
        <div class="contact-name">${contact.name}</div>
        <div class="contact-email">${contact.email}</div>
      </div>
    `;

    contactElement.addEventListener('click', () => {
      renderContactDetail(contactElement, contact);
      toggleContactView();
    });

    contactsList.appendChild(contactElement);
  });

  const addContactButton = document.querySelector('.add-contact-btn');
  if (addContactButton) {
    addContactButton.addEventListener('click', openContactDialog);
  }
}

function getContact(id) {
  for (let i = 0; i < contactsData.length; i++) {
    if (contactsData[i].id === id.toString()) {
      return contactsData[i];
    }
  }
  return null;
}

function renderEditContact(id) {
  let contact = getContact(id);
  document.getElementById('edit-popup').style.display = 'unset';
  const content = document.getElementById('edit-popup');
  content.innerHTML = /*html*/ `
    <div class="dialog-edit">
        <div class="popup-header">
            <div class="logo-slogan">
                <img class="logo-white" src="../assets/img/contact/logo-white.svg">
                <h1>Edit contact</h1>
            </div>
            <div class="img-container">
                <img onclick="closeEditContainer()" class="popup-header-img" src="./assets/img/contact/cancel-white.svg">
            </div>
            
        </div>

        <div class="task-edit-description">
            <div class="icon-container">
              <div id="person-icon">${contact.initials}</div>
            </div>
            <form onsubmit="saveContactEdit('${id}')"id="edit-contact" class="contact-description">
                <div class="input-group">
                   <input type="text" id="name-edit-contact" name="name" placeholder="Name">
                   <img src="./assets/img/contact/person.svg" class="input-icon" alt="Person Icon">
                </div>
                <div class="input-group">
                   <input type="email" id="email-edit-contact" name="email" placeholder="Email">
                   <img src="./assets/img/contact/mail.svg" class="input-icon" alt="Mail Icon">
                </div>
                <div class="input-group">
                   <input type="text" id="phone-edit-contact" name="phone" placeholder="Phone">
                   <img src="./assets/img/contact/call.svg" class="input-icon" alt="Call Icon">
                </div>
                <div class="button-group">
                   <button type="button" onclick="closeEditContainer('${id}')" class="white-btn">Delete</button>
                   <button type="submit" class="blue-btn">Save<img src="./assets/img/contact/check-btn.svg" alt=""></button>
                </div>
             </form>
</div>
    </div>
  `;
  getContactToEditForm(contact);
  addTaskValidation();
}

function saveContactEdit(id) {
  let form = document.getElementById('edit-contact');
  form.querySelectorAll('*').forEach((element) => {
    if (element.classList.contains('error-edit-contact')) {
      formHasErrorEditContact = true;
    }
  });
  if (formHasErrorEditContact) {
    formHasErrorEditContact = false;
    return;
  } else {
    let index = contactsData.findIndex((contact) => contact.id === id.toString());

    if (index !== -1) {
      let newName = document.getElementById('name-edit-contact').value;
      let newMail = document.getElementById('email-edit-contact').value;
      let newPhone = document.getElementById('phone-edit-contact').value;
      contactsData[index].name = newName;
      contactsData[index].email = newMail;
      contactsData[index].phone = newPhone;
      renderContacts(contactsData);
    }
  }
}

function getContactToEditForm(contact) {
  let backgroundcolor = contact.color;
  document.getElementById('person-icon').style.backgroundColor = backgroundcolor;
  document.getElementById('name-edit-contact').value = contact.name;
  document.getElementById('email-edit-contact').value = contact.email;
  document.getElementById('phone-edit-contact').value = contact.phone;
}

function renderContactDetail(contactElement, contact) {
  document.querySelectorAll('.contact').forEach((element) => {
    element.classList.remove('selected');
  });

  contactElement.classList.add('selected');

  const contactDetail = document.querySelector('.contact-detail');
  contactDetail.innerHTML = /*html*/ `
    <div class="contact-header">
      <div class="name-initial-container">
        <div class="contact-initials-large" style="background-color: ${contact.color};">${contact.initials}</div>
        <div class="contact-name contact-name-detail">${contact.name}</div>
      </div>
      <div class="contact-actions">
        <button onclick="renderEditContact(${contact.id})" class="edit-btn">
          <img src="/assets/img/contact/edit.svg" alt="Edit" />
          Edit
        </button>
        <button class="delete-btn" onclick="deleteContact('${contact.id}')">
          <img src="/assets/img/contact/delete.svg" alt="Delete" />
          Delete
        </button>
      </div>
    </div>
    <div class="contact-detail-info">
      <h2>Contact Information</h2>
      <p><strong>Email <br></strong> <a href="mailto:${contact.email}">${contact.email}</a></p><br>
      <p><strong>Phone <br></strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
    </div>
  `;
}

function deleteContact(id) {
  const index = contactsData.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contactsData.splice(index, 1);
    renderContacts(contactsData);
    document.querySelector('.contact-detail').innerHTML = '';
  }
}

function openContactDialog() {
  const contactPopup = document.getElementById('contact-dialog-container');
  const contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

  contactPopup.style.display = 'flex'; // Use flex to enable centering
  setTimeout(() => {
    contactDialog.style.right = '0';
  }, 50);
}

function closeContactDialog() {
  const contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

  contactDialog.style.right = '-600px';
  setTimeout(() => {
    document.getElementById('contact-dialog-container').style.display = 'none';
  }, 300);
}

function closeEditContainer(id) {
  document.getElementById('edit-popup').style.display = 'none';
  deleteContact(id);
}

function toggleContactView() {
  const contactsList = document.querySelector('.contacts-list');
  const contactDetail = document.querySelector('.contact-detail');

  if (window.innerWidth <= 800) {
    contactsList.classList.toggle('hidden');
    contactDetail.classList.toggle('visible');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contact-dialog-container').addEventListener('click', (event) => {
    const contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

    if (!contactDialog.contains(event.target)) {
      closeContactDialog();
    }
  });
});

function changeColorSidebarContacts() {
  document.getElementById('sidebarImgContact').classList.add('color-img-sidebar');
  document.getElementById('fontContactsSidebar').classList.add('menu-row-font');
}

function changeContactsButtonBackground(params) {
  let contactButton = document.getElementById('contactButton');
  contactButton.classList.add('menu-background');
}

function saveContact(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const initials = name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Random color

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    initials,
    color,
  };

  contactsData.push(newContact);
  renderContacts(contactsData);
  closeContactDialog();
  document.getElementById('addContact').reset(); // Reset form
}

// function addTaskValidation() {
//   const addTaskForm = document.getElementById('edit-contact');
//   const name = document.getElementById('name-edit-contact');
//   const email = document.getElementById('email-edit-contact');
//   const phone = document.getElementById('phone-edit-contact');

//   addValidationListeners(name, 'name');
//   addValidationListeners(email, 'email');
//   addValidationListeners(phone, 'name');

//   addTaskForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     validateInput(name, 'name');
//     validateInput(email, 'email');
//     validateInput(phone, 'name');
//   });
// }

// /**
//  * This function is used for form validation
//  *
//  * @param {element} inputField - This is the input field
//  * @param {string} type - this is the type of the input field
//  * @param {element} passwordField - this is the password input field
//  * @returns
//  */
// function validateInput(inputField, type, passwordField) {
//   const value = inputField.value.trim();
//   const parentNode = inputField.parentNode;
//   const errorClass = 'error-edit-contact';
//   let errorMessage = '';

//   if (type === 'confirmPassword') {
//     validateConfirmPassword(inputField, passwordField);
//     return;
//   }

//   if (type === 'name') {
//     if (value === '') {
//       errorMessage = 'This field is required';
//     } else if (!value.includes(' ')) {
//       errorMessage = 'Please enter both first name and last name';
//     }
//   } else if (type === 'email' && !isValidEmail(value)) {
//     errorMessage = 'Please enter a valid email address';
//   } else if (type === 'password' && value.length < 8) {
//     errorMessage = 'Password must be at least 8 characters';
//   }

//   if (errorMessage) {
//     inputField.classList.add(errorClass);
//     showErrorMessage(parentNode, errorMessage);
//   } else {
//     inputField.classList.remove(errorClass);
//     hideErrorMessage(parentNode);
//   }
// }

// /**
//  * This function is used for the password validation
//  *
//  * @param {element} confirmInput - Confirm input field
//  * @param {element} passwordInput - Password input field
//  */
// function validateConfirmPassword(confirmInput, passwordInput) {
//   const confirmValue = confirmInput.value.trim();
//   const parent = confirmInput.parentNode;
//   const errorClass = 'error';
//   let errorMessage = '';

//   if (confirmValue === '') {
//     errorMessage = 'This field is required';
//   } else if (confirmValue !== passwordInput.value.trim()) {
//     errorMessage = 'Passwords do not match';
//   }

//   if (errorMessage) {
//     confirmInput.classList.add(errorClass);
//     showErrorMessage(parent, errorMessage);
//   } else {
//     confirmInput.classList.remove(errorClass);
//     hideErrorMessage(parent);
//   }
// }

// /**
//  * This function adds the error message, when the input is not filled
//  *
//  * @param {element} checkboxInput - Input fields
//  */
// function validateCheckbox(checkboxInput) {
//   const parent = checkboxInput.parentNode.parentNode;
//   const errorClass = 'error-edit-contact';

//   if (!checkboxInput.checked) {
//     showErrorMessage(parent, 'You must accept the Privacy policy');
//   } else {
//     hideErrorMessage(parent);
//   }
// }

// /**
//  * This function shows the error message
//  *
//  * @param {element} parentNode - this is the parentnode of the element with the error-message class
//  * @param {string} message - this is the showed message
//  */
// function showErrorMessage(parentNode, message) {
//   let errorMessage = parentNode.querySelector('.error-message');
//   if (!errorMessage) {
//     errorMessage = document.createElement('div');
//     errorMessage.classList.add('error-message');
//     parentNode.appendChild(errorMessage);
//   }
//   errorMessage.textContent = message;
// }

// /**
//  * This function hides the error message
//  *
//  * @param {element} parentNode - this is the parentnode of the element with the error-message class
//  */
// function hideErrorMessage(parentNode) {
//   const errorMessage = parentNode.querySelector('.error-message');
//   if (errorMessage) {
//     errorMessage.remove();
//   }
// }

// /**
//  * This function remove the div with the error class
//  *
//  * @param {element} inputField - this is the inputfield
//  */
// function clearError(inputField) {
//   inputField.classList.remove('error');
//   hideErrorMessage(inputField.parentNode);
// }

// /**
//  * This function is used for email validation
//  *
//  * @param {element} email - this is the email input field
//  * @returns
//  */
// function isValidEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

function addTaskValidation() {
  const addTaskForm = document.getElementById('edit-contact');
  const name = document.getElementById('name-edit-contact');
  const email = document.getElementById('email-edit-contact');
  const phone = document.getElementById('phone-edit-contact');

  addValidationListeners(name, 'name');
  addValidationListeners(email, 'email');
  addValidationListeners(phone, 'phone');

  addTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validateInput(name, 'name');
    validateInput(email, 'email');
    validateInput(phone, 'phone');
  });
}

/**
 * This function is used for form validation
 *
 * @param {element} inputField - This is the input field
 * @param {string} type - this is the type of the input field
 * @param {element} passwordField - this is the password input field
 * @returns
 */
function validateInput(inputField, type, passwordField) {
  const value = inputField.value.trim();
  const parentNode = inputField.parentNode;
  const errorClass = 'error-edit-contact';
  let errorMessage = '';

  if (type === 'confirmPassword') {
    validateConfirmPassword(inputField, passwordField);
    return;
  }

  if (type === 'name') {
    if (value === '') {
      errorMessage = 'This field is required';
    } else if (!value.includes(' ')) {
      errorMessage = 'Please enter both first name and last name';
    }
  } else if (type === 'email' && !isValidEmail(value)) {
    errorMessage = 'Please enter a valid email address';
  } else if (type === 'phone' && !isValidPhone(value)) {
    errorMessage = 'Please enter a valid phone number';
  } else if (type === 'password' && value.length < 8) {
    errorMessage = 'Password must be at least 8 characters';
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
 * This function is used for the password validation
 *
 * @param {element} confirmInput - Confirm input field
 * @param {element} passwordInput - Password input field
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
 * This function adds the error message, when the input is not filled
 *
 * @param {element} checkboxInput - Input fields
 */
function validateCheckbox(checkboxInput) {
  const parent = checkboxInput.parentNode.parentNode;
  const errorClass = 'error-edit-contact';

  if (!checkboxInput.checked) {
    showErrorMessage(parent, 'You must accept the Privacy policy');
  } else {
    hideErrorMessage(parent);
  }
}

/**
 * This function shows the error message
 *
 * @param {element} parentNode - this is the parentnode of the element with the error-message class
 * @param {string} message - this is the showed message
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
 * This function hides the error message
 *
 * @param {element} parentNode - this is the parentnode of the element with the error-message class
 */
function hideErrorMessage(parentNode) {
  const errorMessage = parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

/**
 * This function remove the div with the error class
 *
 * @param {element} inputField - this is the inputfield
 */
function clearError(inputField) {
  inputField.classList.remove('error');
  hideErrorMessage(inputField.parentNode);
}

/**
 * This function is used for email validation
 *
 * @param {element} email - this is the email input field
 * @returns
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * This function is used for phone number validation
 *
 * @param {element} phone - this is the phone input field
 * @returns
 */
function isValidPhone(phone) {
  return /^\+?[0-9]{5,15}$/.test(phone);
}
