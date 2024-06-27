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
    <div class="contacts-container">
      <div class="contacts-list">
        <button class="add-contact-btn">Add new contact</button>
      </div>
      <div class="contact-detail"></div>
    </div>
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
        <button class="edit-btn">
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

    contactDialog.classList.remove('show'); // Remove class to hide the dialog
    setTimeout(() => {
        document.getElementById('contact-dialog-container').style.display = 'none';
    }, 300);
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
    const initials = name.split(' ').map(word => word[0].toUpperCase()).join('');
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Random color

    const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        initials,
        color
    };

    contactsData.push(newContact);
    renderContacts(contactsData);
    closeContactDialog();
    document.getElementById('addContact').reset(); // Reset form
}
