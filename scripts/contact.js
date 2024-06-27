let contactsData = [];

function loadContactsContent() {
  fetch('/scripts/contact.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
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
                <img class="popup-header-img" src="./assets/img/contact/cancel-white.svg">
            </div>
            
        </div>

        <div class="task-edit-description">
            <div class="icon-container">
              <div id="person-icon">${contact.initials}</div>
            </div>
            <form onsubmit="saveContactEdit('${id}')" id="addContact" class="contact-description">
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
}

function saveContactEdit(id) {
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
    contactDialog.classList.add('show'); // Add class to show the dialog
  }, 50);
}

function closeContactDialog() {
  const contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

  contactDialog.classList.remove('show');
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
