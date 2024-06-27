/**
 * Resets the helper objects.
 */
function clearObjects() {
  assignedTo = [
    {
      contactImageBgColor: [],
      name: [],
      nameInitials: [],
    },
  ];
  subtasksTest = [
    {
      subtask: [],
      subtaskStatus: [],
    },
  ];
}

/**
 * Resets the search input and displays all contacts in the dropdown menu.
 */
function resetSearch() {
  document.getElementById('contact-search').value = '';
  let contactElements = document.querySelectorAll('.contactShow');

  contactElements.forEach((contact) => {
    let container = contact.parentNode;
    container.parentNode.style.display = '';
  });
}

/**
 * Resets the form and its elements.
 *
 * @param {Event} event - The event object to prevent the default submit event.
 */
function resetForm(event) {
  event.preventDefault();
  document.getElementById('addTask').reset();
  document.getElementById('placeholder').innerHTML = '';
  document.getElementById('subtask-placeholder').innerHTML = '';
  let elements = document.getElementById('placeholder');
  let details = document.getElementById('details');
  document.querySelectorAll('.change-bg').forEach(function (contact) {
    contact.style.background = '';
  });
  document.querySelectorAll('.change-src').forEach(function (img) {
    img.src = './assets/img/login/checkbox.svg';
  });
  if (elements.childNodes.length < 1) {
    details.removeAttribute('open');
  }
  resetButtons();
  resetValidation();
  loadAddTaskContent();
}

/**
 * Removes error messages from the form.
 */
function resetValidation() {
  const rows = ['first-row', 'second-row'];

  rows.forEach((rowId) => {
    let form = document.getElementById(rowId);
    form.querySelectorAll('.error').forEach((element) => {
      element.classList.remove('error');
      let nextDiv = element.nextElementSibling;
      if (nextDiv && nextDiv.tagName.toLowerCase() === 'div') {
        nextDiv.remove();
      }
    });
  });
  formHasErrorTask = true;
}

/**
 * Resets the priority buttons to their default state.
 */
function resetButtons() {
  document.getElementById('UrgentOne').style.fill = '#FF3D00';
  document.getElementById('UrgentTwo').style.fill = '#FF3D00';
  document.getElementById('buttonUrgent').style.backgroundColor = '';
  document.getElementById('buttonUrgent').style.color = '#000';
  document.getElementById('MediumOne').style.fill = '#FFA800';
  document.getElementById('MediumTwo').style.fill = '#FFA800';
  document.getElementById('buttonMedium').style.backgroundColor = '';
  document.getElementById('buttonMedium').style.color = '#000';
  document.getElementById('LowOne').style.fill = '#7AE229';
  document.getElementById('LowTwo').style.fill = '#7AE229';
  document.getElementById('buttonLow').style.backgroundColor = '';
  document.getElementById('buttonLow').style.color = '#000';
  selectedButtonId = '';
  priority = '';
}

/**
 * Resets the styles of a subtask element.
 *
 * @param {HTMLElement} element - The subtask element to reset.
 */
function resetSubtask(element) {
  element.style.backgroundColor = '';
  let editElements = element.querySelectorAll('.edit-subtask');
  let trashElements = element.querySelectorAll('.trash-subtask');
  let separatorElements = element.querySelectorAll('.mini-seperator-subtask');

  editElements.forEach(function (edit) {
    edit.classList.add('d-none');
  });
  trashElements.forEach(function (trash) {
    trash.classList.add('d-none');
  });
  separatorElements.forEach(function (separator) {
    separator.style.display = 'none';
  });
}

/**
 * Removes a subtask element when clicked.
 *
 * @param {HTMLElement} element - The subtask element to remove.
 */
function deleteSubtask(element) {
  let subtaskTextElement = element.closest('li');
  subtaskTextElement.remove();
}

/**
 * Removes a symbol from the dropdown menu.
 *
 * @param {number} i - The index of the symbol to remove.
 */
function removeSymbol(i) {
  let placeholder = document.getElementById('placeholder-edit');
  let symbolInPlaceholder = placeholder.querySelector(`#symbol-${i}-edit`);
  if (symbolInPlaceholder) {
    placeholder.removeChild(symbolInPlaceholder);
    document.getElementById('checkbox-' + i + '-edit').src = './assets/img/login/checkbox.svg';
    document.getElementById('contact-' + i + '-edit').style.background = '';
  }
}

/**
 * Resets the subtask input field to its default state.
 */
function resetSubtaskInput() {
  document.getElementById('cancel-button').classList.add('d-none');
  document.getElementById('check-blue').classList.add('d-none');
  document.getElementById('mini-seperator').style.display = 'none';
  let subtaskInput = document.getElementById('subtasks');
  subtaskInput.style.backgroundImage = 'url(../assets/img/add-task/plus.svg)';
  subtaskInput.value = '';
}
