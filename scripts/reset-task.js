/**
 * This function reset the helper objects
 *
 */
function clearObjects() {
  assignedTo = [
    {
      contactImageBgColor: [],
      name: [],
      nameInitials: [],
    },
  ];
  subtasks = [
    {
      subtask: [],
      subtaskStatus: [],
    },
  ];
}

/**
 * This function reset the search function at the dropdown menu
 *
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
 * This function is used for reset the form
 *
 * @param {event} event - Stops the default submit event
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
 * This function removes the error messages
 *
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
 * This function reset the priority buttons
 *
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
 * This function reset the subtasks
 *
 * @param {element} element - This is the id of a subtask div
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
 * This function remove onclick a subtask
 *
 * @param {element} element - This is the subtask
 */
function deleteSubtask(element) {
  let subtaskTextElement = element.closest('li');
  subtaskTextElement.remove();
}

/**
 * This function is used for remove symbols under the dropdown menu
 *
 * @param {number} i - this is the symbol number
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
 * This function is used for reset the subtask input field
 *
 */
function resetSubtaskInput() {
  document.getElementById('cancel-button').classList.add('d-none');
  document.getElementById('check-blue').classList.add('d-none');
  document.getElementById('mini-seperator').style.display = 'none';
  let subtaskInput = document.getElementById('subtasks');
  subtaskInput.style.backgroundImage = 'url(../assets/img/add-task/plus.svg)';
  subtaskInput.value = '';
}
