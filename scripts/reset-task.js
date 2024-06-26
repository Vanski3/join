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
  handleMediumClick(event);
}

function resetValidation() {
  const rows = ['first-row', 'second-row'];

  rows.forEach((rowId) => {
    let form = document.getElementById(rowId);
    form.querySelectorAll('.error').forEach((element) => {
      element.classList.remove('error');
      let nextDiv = element.nextElementSibling;
      if (nextDiv && nextDiv.tagName.toLowerCase() === 'div') {
        nextDiv.remove(); // Das <div> Element entfernen
      }
    });
  });
}

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

function deleteSubtask(element) {
  let subtaskTextElement = element.closest('li');
  subtaskTextElement.remove();
}

function removeSymbol(i) {
  let placeholder = document.getElementById('placeholder-edit');
  let symbolInPlaceholder = placeholder.querySelector(`#symbol-${i}-edit`);
  if (symbolInPlaceholder) {
    placeholder.removeChild(symbolInPlaceholder);
    document.getElementById('checkbox-' + i + '-edit').src = './assets/img/login/checkbox.svg';
    document.getElementById('contact-' + i + '-edit').style.background = '';
  }
}
