let selectedButtonId = null;
let priority = '';
let contacts = [];
let tasksNumber = '';
let taskSelection = '0';
let formHasErrorTask = true;
let assignedTo = [
  {
    contactImageBgColor: [],
    name: [],
    nameInitials: [],
  },
];
let subtasks = [
  {
    subtask: [],
    subtaskStatus: [],
  },
];

function renderToList() {
  let list = document.getElementById('contacts');
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i].name;
    list.innerHTML += renderToListHTML(i, contact);
  }
}

async function onloadContacts() {
  contacts = [];
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
  renderToList();
}

function onloadFormValue(i) {
  let inputFields = document.getElementsByClassName('my-inputs-edit');
  inputFields[0].value = tasks.title[i];
  inputFields[1].value = tasks.description[i];
  inputFields[2].value = tasks.dueDate[i];
  inputFields[3].value = tasks.categoryName[i];
  getSelectedContactsEdit(i);
  getSubtasksEdit(i);
  getProBtnClick(i);
}

function getProBtnClick(i) {
  let prio = tasks.priority[i];
  let capitalizedPrio = prio.charAt(0).toUpperCase() + prio.slice(1);
  if (prio == '') {
    return;
  } else {
    let functionName = `handle${capitalizedPrio}ClickEdit`;
    window[functionName](event);
  }
}

async function getAllContacts(path) {
  let response = await fetch(BASE_URL + path + '.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function getSelectedContacts() {
  let placeholder = document.getElementById('placeholder').childNodes;
  for (let i = 0; i < placeholder.length; i++) {
    let initials = placeholder[i].innerHTML;
    let inlineStyle = placeholder[i].style.backgroundColor;
    let fullName = placeholder[i].getAttribute('name');
    assignedTo[0].nameInitials.push(initials);
    assignedTo[0].contactImageBgColor.push(inlineStyle);
    assignedTo[0].name.push(fullName);
  }
}

function getSelectedSubtasks() {
  let placeholder = document.getElementById('subtask-placeholder').childNodes;
  for (let i = 0; i < placeholder.length; i++) {
    let subtask = placeholder[i].innerHTML;
    let status = placeholder[i].getAttribute('status');
    subtasks[0].subtask.push(subtask);
    subtasks[0].subtaskStatus.push(status);
  }
}

function taskCategory(parameter) {
  if (parameter == null) {
    return;
  } else {
    taskSelection = parameter;
  }
}

function saveTask() {
  const rows = ['first-row', 'second-row'];

  rows.forEach((rowId) => {
    let form = document.getElementById(rowId);
    form.querySelectorAll('*').forEach((element) => {
      if (element.classList.contains('error')) {
        formHasErrorTask = true;
      }
    });
  });
  if (formHasErrorTask) {
    formHasErrorTask = false;
    return;
  } else {
    getSelectedSubtasks();
    let bgColor = document.getElementById('category');
    let selectedIndex = bgColor.selectedIndex;
    let selectedOption = (bgColor = bgColor.options[selectedIndex]);
    let result = selectedOption.getAttribute('bgColor');
    let inputFields = document.getElementsByClassName('my-inputs');
    let newTask = {
      title: inputFields[0].value,
      description: inputFields[1].value,
      assignedTo: assignedTo,
      dueDate: inputFields[2].value,
      priority: priority,
      categoryName: inputFields[3].value,
      subtasksTest: subtasks,
      taskStatus: taskSelection,
      categoryBGColor: result,
    };
    mergeObjects(tasks, newTask);
    loadBoardContent();
    closeTaskDialog();
  }
}

function mergeObjects(tasks, newTask) {
  newTask.assignedTo.forEach((item) => tasks.assignedTo.push(item));
  tasks.categoryBgColor.push(newTask.categoryBGColor);
  tasks.categoryName.push(newTask.categoryName);
  tasks.description.push(newTask.description);
  tasks.dueDate.push(newTask.dueDate);
  tasks.priority.push(newTask.priority);
  tasks.taskStatus.push(newTask.taskStatus);
  tasks.title.push(newTask.title);
  newTask.subtasksTest.forEach((item) => tasks.subtasksTest.push(item));
  clearObjects();
}

function toggleColor(buttonId, color, idOne, idTwo) {
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

function handleUrgentClick(event) {
  event.preventDefault();
  toggleColor('buttonUrgent', '#FF3D00', 'UrgentOne', 'UrgentTwo');
  if (selectedButtonId == null) {
    priority = '';
  } else {
    priority = 'urgent';
  }
}

function handleMediumClick(event) {
  event.preventDefault();
  toggleColor('buttonMedium', '#FFA800', 'MediumOne', 'MediumTwo');
  if (selectedButtonId == null) {
    priority = '';
  } else {
    priority = 'medium';
  }
}

function handleLowClick(event) {
  event.preventDefault();
  toggleColor('buttonLow', '#7AE229', 'LowOne', 'LowTwo');
  priority = 'low';
  if (selectedButtonId == null) {
    priority = '';
  } else {
    priority = 'low';
  }
}

function selectContact(i) {
  let icon = document.getElementById('checkbox-' + i);
  let input = document.getElementById('contact-' + i);
  let symbol = document.getElementById('symbol-' + i).cloneNode(true);
  let placeholder = document.getElementById('placeholder');

  function removeSymbol() {
    let symbolInPlaceholder = placeholder.querySelector(`#symbol-${i}`);
    if (symbolInPlaceholder) {
      placeholder.removeChild(symbolInPlaceholder);
      icon.src = './assets/img/login/checkbox.svg';
      input.style.background = '';
    }
  }

  if (icon.src.endsWith('checkbox-checked-white.svg')) {
    input.style.background = '';
    icon.src = './assets/img/login/checkbox.svg';

    let symbolInPlaceholder = placeholder.querySelector(`#symbol-${i}`);
    if (symbolInPlaceholder) {
      placeholder.removeChild(symbolInPlaceholder);
    }
  } else {
    icon.src = './assets/img/login/checkbox-checked-white.svg';
    input.style.background = '#4589FF';
    symbol.onclick = removeSymbol;
    document.getElementById('placeholder').appendChild(symbol);
  }
}

function addLoadedContact(i) {
  let symbol = document.getElementById('symbol-' + i + '-edit');
  if (symbol) {
    symbol.onclick = function () {
      let placeholder = document.getElementById('placeholder-edit');
      placeholder.removeChild(symbol);
    };
  }
}

function newSubtaskInput() {
  document.getElementById('cancel-button').classList.remove('d-none');
  document.getElementById('check-blue').classList.remove('d-none');
  document.getElementById('mini-seperator').style.display = 'unset';
  document.getElementById('subtasks').style.backgroundImage = 'unset';
}

function changeSubtask(element) {
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

function addSubtasks() {
  newSubtaskInput();
  let subtasks = document.getElementById('subtasks');

  let placeholder = document.getElementById('subtask-placeholder');
  if (subtasks.value.length >= 1) {
    placeholder.innerHTML += addSubtasksHTML(subtasks);
    subtasks.value = '';
    resetSubtaskInput();
  }
}

function selectCategory(category) {
  let summaryHeadline = document.getElementById('categoy-headline');
  summaryHeadline.textContent = category;
  summaryHeadline.closest('details').removeAttribute('open');
}

document.addEventListener('click', function (event) {
  let details = document.getElementById('details');

  if (!details.contains(event.target) && details.open) {
    details.open = false;
    resetSearch();
  }
});

function resetSearch() {
  document.getElementById('contact-search').value = '';
  let contactElements = document.querySelectorAll('.contactShow');

  contactElements.forEach((contact) => {
    let container = contact.parentNode;
    container.parentNode.style.display = '';
  });
}

function loadAddTaskContent(params) {
  let mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';
  mainContent.innerHTML += loadAddTaskContentHTML();
  removeBackgroundLowerSidebar();
  onloadContacts();
  removeButtonBackground();
  changeAddTaskButtonBackground();
  removeColorSideBar();
  changeColorSideAddTask();
  selectedButtonId = '';
  priority = '';
  formHasErrorTask = true;
  handleMediumClick(event);
  addTaskValidation();
}

function changeColorSideAddTask() {
  document.getElementById('sidebarImgAddTask').classList.add('color-img-sidebar');
  document.getElementById('fontAddTaskSidebar').classList.add('menu-row-font');
}

function filterContacts() {
  let input = document.getElementById('contact-search').value.toLowerCase();
  let contactElements = document.querySelectorAll('.contactShow');

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

function onclickRender() {
  let symbols = document.querySelectorAll('[id^=symbol-][id$=-edit]');
  symbols.forEach((symbol) => {
    let i = symbol.id.match(/\d+/)[0]; // Extrahiert die Nummer aus der ID
    symbol.onclick = function () {
      removeSymbol(i);
    };
  });
}
