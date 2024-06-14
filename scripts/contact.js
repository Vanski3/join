function loadContactsContent() {
    fetch('/scripts/contact.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Contacts loaded:', data);
            renderContacts(data);
        })
        .catch(error => console.error('Error loading contacts:', error));
}

function renderContacts(contacts) {
    const content = document.getElementById('mainContent');
    content.innerHTML = '';
    content.innerHTML += `
        <div class="contacts-container">
            <div class="contacts-list">
                <button class="add-contact-btn">Add new contact</button>
                <!-- Dynamically loaded contacts -->
            </div>
            <div class="contact-detail">
                <!-- Dynamically loaded contact details -->
            </div>
        </div>
    `;

    const contactsList = document.querySelector('.contacts-list');

    // Sort contacts by name
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    let currentLetter = '';

    contacts.forEach(contact => {
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
}

function renderContactDetail(contact) {
    const contactDetail = document.querySelector('.contact-detail');
    contactDetail.innerHTML = `
        <div class="contact-initials-large" style="background-color: ${contact.color};">${contact.initials}</div>
        <div class="contact-detail-info">
            <h2>${contact.name}</h2>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    `;
}
