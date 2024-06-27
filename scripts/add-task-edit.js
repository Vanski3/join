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
 * Closes the popup for editing the task.
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
 * Saves the edited task.
 *
 * @param {number} i - The index of the task to save.
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
 * Renders the subtasks in the form from the input field.
 *
 * @param {number} i - The index of the task in the API.
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
 * Marks the contact in the dropdown menu.
 *
 * @param {number} i - The index of the contact.
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
 * Helper function for selectContactEdit().
 *
 * @param {number} i - The index of the contact.
 * @param {HTMLElement} icon - The icon element.
 * @param {HTMLElement} input - The input field element.
 * @param {HTMLElement} symbol - The symbol element.
 * @param {HTMLElement} placeholder - The placeholder element where the subtasks are rendered.
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
 * Renders the contacts from the API to the dropdown menu.
 */
function renderToListEdit() {
  let list = document.getElementById('contacts-edit');
  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j].name;
    list.innerHTML += renderToListEditHTML(j, contact);
  }
}

/**
 * Renders the selected contacts to the edit form.
 *
 * @param {number} i - The index of the contact.
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
 * Marks the selected contacts in the dropdown menu.
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
 * Gets the contacts from the API.
 *
 * @param {number} j - The index of the contact.
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
 * Pushes the saved contacts into the assignedToEdit object.
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
 * Pushes the saved subtasks into the subtaskEdit object.
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
 * Saves the edited task.
 *
 * @returns {void} - Returns void if the form has errors to prevent saving.
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
 * Helper function to save the edited task.
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
 * Merges the edited task with the existing tasks object.
 *
 * @param {Object} tasks - The existing tasks object.
 * @param {Object} newTaskEdit - The new task object.
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
 * Clears the helper objects of the edited task.
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
 * Toggles the button at the add-task form.
 *
 * @param {string} buttonId - The ID of the button.
 * @param {string} color - The new background color.
 * @param {string} idOne - The ID of the first SVG path.
 * @param {string} idTwo - The ID of the second SVG path.
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
 * Helper function to toggle the button color.
 *
 * @param {string} buttonId - The ID of the button.
 * @param {string} color - The new background color.
 * @param {string} idOne - The ID of the first SVG path.
 * @param {string} idTwo - The ID of the second SVG path.
 * @returns {null|void} - Returns null if the button is not selected.
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
 * Marks the urgent button.
 *
 * @param {Event} event - The event object to prevent default behavior.
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
 * Marks the medium button.
 *
 * @param {Event} event - The event object to prevent default behavior.
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
 * Marks the low button.
 *
 * @param {Event} event - The event object to prevent default behavior.
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
 * Edits the subtasks.
 *
 * @param {HTMLElement} element - The clicked div subtask container.
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
 * Searches for contacts in the dropdown menu.
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
 * Sets the dynamic min date.
 */
function minDateEdit() {
  const today = new Date();
  const year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, '0');
  let day = today.getDate().toString().padStart(2, '0');

  const minDate = `${year}-${month}-${day}`;
  document.getElementById('custom-date-edit').setAttribute('min', minDate);
}

/**
 * This function is used to add a subtask
 *
 */
function addSubtasksEdit() {
  newSubtaskInput();
  let subtasks = document.getElementById('subtasks-edit');

  let placeholder = document.getElementById('subtask-placeholder-edit');
  if (subtasks.value.length >= 1) {
    placeholder.innerHTML += addSubtasksHTML(subtasks);
    subtasks.value = '';
    let container = document.getElementById('addTask');
    container.scrollTop = container.scrollHeight;
    resetSubtaskInput();
    if (placeholder.querySelectorAll('li').length >= 3) {
      placeholder.style.overflowY = 'scroll';
      placeholder.scrollTop = container.scrollHeight;
      resetSubtaskInput();
    }
  }
}

/**
 * This function is used to edit the subtask onclick
 *
 * @param {element} element - this is the div of the selected subtask
 */
function changeSubtaskEdit(element) {
  let imgElements = element.querySelectorAll('img');
  imgElements.forEach(function (img) {
    img.classList.remove('d-none');
  });
  let innerDivContainer = element.querySelector('div');
  if (innerDivContainer) {
    innerDivContainer.style.display = 'unset';
  }
  element.style.backgroundColor = '#E3EEFF';
}
