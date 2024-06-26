let assignedToEdit = [
  {
    contactImageBgColor: [],
    name: [],
    nameInitials: [],
  },
];
let subtasksEdit = [
  {
    subtask: [],
    subtaskStatus: [],
  },
];
let formHasErrorTaskEdit = false;

/**
 * This function is used to close the popup for editing the task
 *
 */
function closeTaskOverlayEdit() {
  const overlay = document.getElementById('taskOverlay');
  overlay.close();
  renderBoardCards();
  overlay.classList.remove('fade-in-right');
  priority = '';
  selectedButtonId = null;
}

/**
 * This function is used to save the edited task
 *
 * @param {number} i  - This is the number of the task, to save it in the correct task
 */
function editTask(i) {
  let editTask = document.getElementById('edit-task');
  editTask.innerHTML = '';
  editTask.innerHTML += editTaskHTML();
  onloadContactsEdit(i);
  onloadFormValue(i);
  onclickRender();
  addTaskValidationEdit();
  minDateEdit();
}

/**
 * This function is used to render the subtasks in the form from the inputfield
 *
 * @param {number} i - This number is the spot of the task on the API
 */
function getSubtasksEdit(i) {
  let subtaskPlaceholder = document.getElementById('subtask-placeholder-edit');
  subtaskPlaceholder.innerHTML = '';
  tasksNumber = i;
  let array = tasks.subtasksTest[i].subtask;
  for (let j = 0; j < array.length; j++) {
    const subtask = tasks.subtasksTest[i].subtask[j];
    subtaskPlaceholder.innerHTML += `
                                       <li id="subtask${j}" status="${tasks.subtasksTest[i].subtaskStatus[j]}">${subtask}</li>
                                    `;
  }
}

/**
 * This function is used to mark the contact at the dropdown menu
 *
 * @param {number} i - This is the spot of the contact
 */
function selectContactEdit(i) {
  let icon = document.getElementById(`checkbox-${i}-edit`);
  let input = document.getElementById(`contact-${i}-edit`);
  let symbol = document.getElementById(`symbol-${i}-edit`).cloneNode(true);
  let placeholder = document.getElementById('placeholder-edit');

  if (icon.src.endsWith('checkbox-checked-white.svg')) {
    input.style.background = '';
    icon.src = './assets/img/login/checkbox.svg';
    removeSymbol(i);
  } else {
    selectContactEditElse(i, icon, input, symbol, placeholder);
  }
}

/**
 * This is the helper function of selectContactEdit()
 *
 * @param {number} i - This is the spot of the contact
 * @param {element} icon - This is the icon div element
 * @param {element} input - This is the input field element
 * @param {element} symbol - This is the symbol div
 * @param {element} placeholder - This is the div where the subtasks rendered
 */
function selectContactEditElse(i, icon, input, symbol, placeholder) {
  icon.src = './assets/img/login/checkbox-checked-white.svg';
  input.style.background = '#4589FF';
  let symbolInPlaceholder = placeholder.querySelector(`#symbol-${i}-edit`);
  if (!symbolInPlaceholder) {
    symbol.onclick = function () {
      removeSymbol(i);
    };
    symbol.id = `symbol-${i}-edit`;
    placeholder.appendChild(symbol);
  }
}

/**
 * This function is used to render the contacts from the API to the dropdown menu
 *
 */
function renderToListEdit() {
  let list = document.getElementById('contacts-edit');
  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j].name;
    list.innerHTML += renderToListEditHTML(j, contact);
  }
}

/**
 * This function is used to render the selected contacts to the edit form
 *
 * @param {number} i - This is the spot of the contact
 */
function getSelectedContactsEdit(i) {
  let contactPlaceholder = document.getElementById('placeholder-edit');
  contactPlaceholder.innerHTML = '';
  let assignedContacts = tasks.assignedTo[i].name;

  for (let j = 0; j < assignedContacts.length; j++) {
    const contactName = assignedContacts[j];
    const contactIndex = contacts.findIndex((contact) => contact.name === contactName);

    if (contactIndex !== -1) {
      const contact = contacts[contactIndex];
      contactPlaceholder.innerHTML += `
          <div id="symbol-${contactIndex}-edit" name="${contact.name}" class="initials savedContacts" style="background-color: ${contact.contactImageBgColor}">${contact.nameInitials}</div>
        `;
    }
  }
  contacts = [];
}

/**
 * This function is used to mark the selected contacts at the dropdown menu
 *
 */
function markSelectedContacts() {
  const placeholderNames = Array.from(
    document.querySelectorAll('#placeholder-edit .initials'),
    (div) => div.getAttribute('name').trim()
  );
  document.querySelectorAll('#contacts-edit .change-bg-edit').forEach((item) => {
    const label = item.querySelector('label');
    const name = label
      ? label.textContent
          .trim()
          .split('\n')
          .map((part) => part.trim())[1] || label.textContent.trim()
      : '';
    if (placeholderNames.includes(name)) {
      item.style.backgroundColor = '#4589FF';
      const checkboxImg = item.querySelector('.checkbox-container img');
      if (checkboxImg) {
        checkboxImg.src = './assets/img/login/checkbox-checked-white.svg';
      }
    }
  });
}

/**
 * This function is used to get the contacts from the API
 *
 * @param {number} j - - This is the spot of the contact
 */
async function onloadContactsEdit(j) {
  let userResponse = await getAllContacts('contacts');
  for (let i = 0; i < userResponse.contactImageBgColor.length; i++) {
    contacts.push({
      contactImageBgColor: userResponse.contactImageBgColor[i],
      email: userResponse.email[i],
      name: userResponse.name[i],
      nameInitials: userResponse.nameInitials[i],
      phoneNumber: userResponse.phoneNumber[i],
    });
  }
  renderToListEdit(j);
}

/**
 * This function is used to push the saved contacts into the assignedToEdit Object
 *
 */
function getSavedContactsEdit() {
  const placeholderContainer = document.getElementById('placeholder-edit');
  const placeholder = placeholderContainer.querySelectorAll('div.savedContacts');
  for (let i = 0; i < placeholder.length; i++) {
    let initials = placeholder[i].innerHTML;
    let inlineStyle = placeholder[i].style.backgroundColor;
    let fullName = placeholder[i].getAttribute('name');
    assignedToEdit[0].nameInitials.push(initials);
    assignedToEdit[0].contactImageBgColor.push(inlineStyle);
    assignedToEdit[0].name.push(fullName);
  }
}

/**
 * This function is used to push the saved subtasks into the subtaskEdit Object
 *
 */
function getSavedSubtasksEdit() {
  const placeholderContainer = document.getElementById('subtask-placeholder-edit');
  const li = placeholderContainer.querySelectorAll('li');
  for (let i = 0; i < li.length; i++) {
    let subtask = li[i].innerHTML;
    let status = li[i].getAttribute('status');
    subtasksEdit[0].subtask.push(subtask);
    subtasksEdit[0].subtaskStatus.push(status);
  }
}

/**
 * This function is used to save the edited task
 *
 * @returns - This return is used to cancel the save function
 */
function saveTaskEdit() {
  const rows = ['first-row-edit', 'second-row-edit'];
  rows.forEach((rowId) => {
    let form = document.getElementById(rowId);
    form.querySelectorAll('*').forEach((element) => {
      if (element.classList.contains('error')) {
        formHasErrorTaskEdit = true;
      }
    });
  });
  if (formHasErrorTaskEdit) {
    formHasErrorTaskEdit = false;
    return;
  } else {
    saveTaskEditElse();
  }
}

/**
 * This function is used to save the edited task
 *
 */
function saveTaskEditElse() {
  getSavedContactsEdit();
  getSavedSubtasksEdit();
  let bgColor = document.getElementById('category-edit');
  let selectedIndex = bgColor.selectedIndex;
  let selectedOption = (bgColor = bgColor.options[selectedIndex]);
  let result = selectedOption.getAttribute('bgColor');
  let inputFields = document.getElementsByClassName('my-inputs-edit');
  let statusNumber = tasks.taskStatus[tasksNumber];
  let newTaskEdit = {
    title: inputFields[0].value,
    description: inputFields[1].value,
    assignedTo: assignedToEdit,
    dueDate: inputFields[2].value,
    priority: priority,
    categoryName: inputFields[3].value,
    subtasksTest: subtasksEdit,
    taskStatus: statusNumber,
    categoryBGColor: result,
  };
  mergeObjectsEdit(tasks, newTaskEdit);
  loadBoardContent();
  closeTaskOverlayEdit();
}

/**
 * This function is used to merge the edited (new) task with the existing tasks object
 *
 * @param {object} tasks - This object saves all tasks
 * @param {object} newTaskEdit - This is a new task
 */
function mergeObjectsEdit(tasks, newTaskEdit) {
  tasks.assignedTo.splice(tasksNumber, 1, ...newTaskEdit.assignedTo);
  tasks.categoryBgColor.splice(tasksNumber, 1, newTaskEdit.categoryBGColor);
  tasks.categoryName.splice(tasksNumber, 1, newTaskEdit.categoryName);
  tasks.description.splice(tasksNumber, 1, newTaskEdit.description);
  tasks.dueDate.splice(tasksNumber, 1, newTaskEdit.dueDate);
  tasks.priority.splice(tasksNumber, 1, newTaskEdit.priority);
  tasks.taskStatus.splice(tasksNumber, 1, newTaskEdit.taskStatus);
  tasks.title.splice(tasksNumber, 1, newTaskEdit.title);
  tasks.subtasksTest.splice(tasksNumber, 1, ...newTaskEdit.subtasksTest);
  clearEditObjects();
}

/**
 * This function is used to clear the helper objects of the edited task
 *
 */
function clearEditObjects() {
  assignedToEdit = [
    {
      contactImageBgColor: [],
      name: [],
      nameInitials: [],
    },
  ];
  subtasksEdit = [
    {
      subtask: [],
      subtaskStatus: [],
    },
  ];
}

/**
 * This function is used to toggle the button at the add-task form
 *
 * @param {id} buttonId - This is the button id
 * @param {string} color - This is the new background color
 * @param {string} idOne - This is the svg path id
 * @param {string} idTwo - This is the second svg path id
 */
function toggleColorEdit(buttonId, color, idOne, idTwo) {
  if (selectedButtonId) {
    let prev = document.getElementById(selectedButtonId);
    if (prev) {
      prev.style = '';
      let prevSvgOne = document.getElementById(prev.getAttribute('data-svg-one'));
      let prevSvgTwo = document.getElementById(prev.getAttribute('data-svg-two'));
      if (prevSvgOne) prevSvgOne.style.fill = prev.getAttribute('data-original-color');
      if (prevSvgTwo) prevSvgTwo.style.fill = prev.getAttribute('data-original-color');
    }
  }
  toggleColorEditIf(buttonId, color, idOne, idTwo);
}

/**
 *
 * @param {id} buttonId - This is the button id
 * @param {string} color - This is the new background color
 * @param {string} idOne - This is the svg path id
 * @param {string} idTwo - This is the second svg path id
 * @returns - If the buttonId not the selectedButtonid the variable selectedButtonid is null
 */
function toggleColorEditIf(buttonId, color, idOne, idTwo) {
  if (buttonId === selectedButtonId) return (selectedButtonId = null);
  let button = document.getElementById(buttonId);
  if (button) {
    button.style = `background-color:${color};color:#fff;border-bottom:unset`;
    let svgOne = document.getElementById(idOne);
    let svgTwo = document.getElementById(idTwo);
    if (svgOne && svgTwo) {
      svgOne.style.fill = svgTwo.style.fill = '#fff';
      button.setAttribute('data-svg-one', idOne);
      button.setAttribute('data-svg-two', idTwo);
    }
    selectedButtonId = buttonId;
  }
}

/**
 * This function is used to mark the urgent button
 *
 * @param {event} event - stops the standard behavior of the button
 */
function handleUrgentClickEdit(event) {
  event.preventDefault();
  toggleColorEdit('buttonUrgent-edit', '#FF3D00', 'UrgentOne-edit', 'UrgentTwo-edit');
  if (selectedButtonId == null) {
    priority = '';
  } else {
    priority = 'urgent';
  }
}

/**
 * This function is used to mark the medium button
 *
 * @param {event} event - stops the standard behavior of the button
 */
function handleMediumClickEdit(event) {
  event.preventDefault();
  toggleColorEdit('buttonMedium-edit', '#FFA800', 'MediumOne-edit', 'MediumTwo-edit');
  if (selectedButtonId == null) {
    priority = '';
  } else {
    priority = 'medium';
  }
}

/**
 * This function is used to mark the low button
 *
 * @param {event} event - stops the standard behavior of the button
 */
function handleLowClickEdit(event) {
  event.preventDefault();
  toggleColorEdit('buttonLow-edit', '#7AE229', 'LowOne-edit', 'LowTwo-edit');
  priority = 'low';
  if (selectedButtonId == null) {
    priority = '';
  } else {
    priority = 'low';
  }
}

/**
 * This function is used to mark the selected contacts in the dropwdown menu and render the symbols
 *
 * @param {number} i - This is the number of the contact
 */
function selectContactEdit(i) {
  let icon = document.getElementById(`checkbox-${i}-edit`);
  let input = document.getElementById(`contact-${i}-edit`);
  let symbol = document.getElementById(`symbol-${i}-edit`).cloneNode(true);
  let placeholder = document.getElementById('placeholder-edit');

  if (icon.src.endsWith('checkbox-checked-white.svg')) {
    input.style.background = '';
    icon.src = './assets/img/login/checkbox.svg';

    removeSymbol(i);
  } else {
    icon.src = './assets/img/login/checkbox-checked-white.svg';
    input.style.background = '#4589FF';

    let symbolInPlaceholder = placeholder.querySelector(`#symbol-${i}-edit`);
    if (!symbolInPlaceholder) {
      symbol.onclick = function () {
        removeSymbol(i);
      };
      symbol.id = `symbol-${i}-edit`;
      placeholder.appendChild(symbol);
    }
  }
}

/**
 * This function is used to edit the subtasks
 *
 * @param {element} element - this is the clicked div subtask container
 */
function editSubtask(element) {
  let subtaskTextElement = element.closest('li').querySelector('.subtask-text');

  let input = document.createElement('input');
  input.type = 'text';
  input.value = subtaskTextElement.textContent;
  input.id = 'subtask-input';
  subtaskTextElement.replaceWith(input);
  input.focus();
  input.onblur = function () {
    let span = document.createElement('span');
    span.className = 'subtask-text';
    span.textContent = input.value;
    input.replaceWith(span);
  };
  input.onkeypress = function (e) {
    if (e.key === 'Enter') {
      input.blur();
    }
  };
}

/**
 * This function is used to search for contacts in the dropdown menu
 *
 */
function filterContactsEdit() {
  let input = document.getElementById('contact-search-edit').value.toLowerCase();
  let contactElements = document.querySelectorAll('.edit-contact-form');

  contactElements.forEach((contact) => {
    let name = contact.getAttribute('name');
    if (name.toLowerCase().includes(input)) {
      let container = contact.parentNode;
      container.parentNode.style.display = '';
    } else {
      let container = contact.parentNode;
      container.parentNode.style.display = 'none';
    }
  });
}

/**
 * This function is used to set the dynamic minDate
 *
 */
function minDateEdit() {
  const today = new Date();
  const year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, '0');
  let day = today.getDate().toString().padStart(2, '0');

  const minDate = `${year}-${month}-${day}`;
  document.getElementById('custom-date-edit').setAttribute('min', minDate);
}
