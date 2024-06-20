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
}

function renderContacts(contacts) {
   const content = document.getElementById('mainContent');
   content.innerHTML = '';
   content.innerHTML += `
       <div class="contacts-container">
           <div class="contacts-list">
               <button class="add-contact-btn">Add new contact</button>
               <!-- Dynamisch geladene Kontakte -->
           </div>
           <div class="contact-detail">
               <!-- Dynamisch geladene Kontaktdetails -->
           </div>
       </div>
   `;

   const contactsList = document.querySelector('.contacts-list');

   // Sortiere Kontakte nach Namen
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

       const contactGroup = document.createElement('div');
       contactGroup.classList.add('contact-group');

       const contactElement = document.createElement('div');
       contactElement.classList.add('contact');
       contactElement.innerHTML = `
           <div class="contact-initials" style="background-color: ${contact.color};">${contact.initials}</div>
           <div class="contact-info">
               <div class="contact-name">${contact.name}</div>
               <div class="contact-email">${contact.email}</div>
           </div>
       `;

       contactElement.addEventListener('click', () => {
           renderContactDetail(contact);
       });

       contactGroup.appendChild(contactElement);
       contactsList.appendChild(contactGroup);
   });
   removeButtonBackground();
   changeContactsButtonBackground();

   // Add the event listener for the add-contact-btn after rendering the content
   let addContactButton = document.querySelector('.add-contact-btn');
   if (addContactButton) {
       addContactButton.addEventListener('click', openContactDialog);
   }
}

function changeContactsButtonBackground(params) {
   let contactButton = document.getElementById('contactButton');
   contactButton.classList.add('menu-background');
}

function renderContactDetail(contact) {
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
                <button class="delete-btn" onclick="deleteContact(${contact.id})">
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
   const index = contactsData.findIndex(contact => contact.id === id);
   if (index !== -1) {
      contactsData.splice(index, 1);
      renderContacts(contactsData);
      document.querySelector('.contact-detail').innerHTML = '';
   }
}

function openContactDialog() {
    let contactPopup = document.getElementById('contact-dialog-container');
    let contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

    contactPopup.style.display = 'unset';
    setTimeout(function () {
        contactDialog.style.right = '0';
    }, 50);
}

function closeContactDialog() {
    let contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

    contactDialog.style.right = '-600px';
    setTimeout(function () {
        document.getElementById('contact-dialog-container').style.display = 'none';
    }, 300);
}

document.addEventListener('DOMContentLoaded', function() {
    let addContactButton = document.querySelector('.add-contact-btn');

    if (addContactButton) {
        addContactButton.addEventListener('click', openContactDialog);
    }

    document.getElementById('contact-dialog-container').addEventListener('click', function (event) {
        let contactDialog = document.querySelector('#contact-dialog-container .task-dialog');

        if (!contactDialog.contains(event.target)) {
            closeContactDialog();
        }
    });
});
