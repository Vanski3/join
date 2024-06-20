let selectedButtonId = null;
let priority = '';
let tasksAddTask = [];
let contacts = [];
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
    list.innerHTML += `          <li class="change-bg" id="contact-${i}" onclick="selectContact(${i})">
                                 <label for="${contact}"> 
                                    <div id="symbol-${i}" name="${contact}" class="initials" style="background-color: ${contacts[i].contactImageBgColor}">${contacts[i].nameInitials}</div>
                                    ${contact}
                                 </label>
                                 <div class="checkbox-container">
                                    <img class="change-src" id="checkbox-${i}" src="./assets/img/login/checkbox.svg" alt="">
                                 </div>                              
                              </li>`;
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

function saveTask(event) {
  event.preventDefault();
  getSelectedContacts();
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
    taskStatus: '0',
    categoryBGColor: result,
  };
  mergeObjects(tasks, newTask);
  loadBoardContent();
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
}

function toggleColor(buttonId, color, idOne, idTwo) {
  if (selectedButtonId) {
    let prev = document.getElementById(selectedButtonId);
    prev.style = '';
    document.getElementById(prev.getAttribute('data-svg-one')).style.fill =
      prev.getAttribute('data-original-color');
    document.getElementById(prev.getAttribute('data-svg-two')).style.fill =
      prev.getAttribute('data-original-color');
  }
  if (buttonId === selectedButtonId) return (selectedButtonId = null);
  let button = document.getElementById(buttonId);
  button.style = `background-color:${color};color:#fff;border-bottom:unset`;
  document.getElementById(idOne).style.fill = document.getElementById(idTwo).style.fill = '#fff';
  button.setAttribute('data-svg-one', idOne);
  button.setAttribute('data-svg-two', idTwo);
  selectedButtonId = buttonId;
}

function handleUrgentClick(event) {
  event.preventDefault();
  toggleColor('buttonUrgent', '#FF3D00', 'UrgentOne', 'UrgentTwo');
  priority = 'urgent';
}

function handleMediumClick(event) {
  event.preventDefault();
  toggleColor('buttonMedium', '#FFA800', 'MediumOne', 'MediumTwo');
  priority = 'medium';
}

function handleLowClick(event) {
  event.preventDefault();
  toggleColor('buttonLow', '#7AE229', 'LowOne', 'LowTwo');
  priority = 'low';
}

function resetForm(event) {
  event.preventDefault();
  document.getElementById('addTask').reset();
  document.getElementById('placeholder').innerHTML = '';
  document.getElementById('subtask-placeholder').innerHTML = '';
  document.querySelectorAll('.change-bg').forEach(function (contact) {
    contact.style.background = '';
  });
  document.querySelectorAll('.change-src').forEach(function (img) {
    img.src = './assets/img/login/checkbox.svg';
  });
  if (selectedButtonId != null) {
    document.getElementById(selectedButtonId).click();
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

function addSubtasks() {
  let subtasks = document.getElementById('subtasks');
  let placeholder = document.getElementById('subtask-placeholder');

  if (subtasks.value.length > 2) {
    placeholder.innerHTML += `<li status="open">${subtasks.value}</li>`;
    subtasks.value = '';
  }
}

// let dropdownMenu = document.getElementById('addTask');
// let summary = document.getElementById('contact-summary');

// dropdownMenu.addEventListener('click', function (event) {
//   if (!summary.contains(event.target)) {
//     closeDropdown();
//   }
// });

// function closeDropdown() {
//   summary.click();
// }

function loadAddTaskContent(params) {
  let mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';
  mainContent.innerHTML += /*html*/ `
       <div class="add-task-main-content">
      <main>
         <form onsubmit="saveTask(event)" id="addTask" class="task-description">
            <div class="first-row">
               <div>
                  <span>Title<span class="red-star">*</span></span>
                  <input class="my-inputs" required placeholder="Enter a title" type="text">
               </div>
               <div>
                  Description
                  <textarea class="my-inputs" placeholder="Enter a Description" name="description" id="description"></textarea>
               </div>

               <div>
                  <div>
                     Assigned to
                     <details>
                        <summary id="contact-summary"><div class="summary-headline">Select contacts to assign</div></summary>
                           <fieldset>
                           <ul id="contacts">
                           </ul>
                           </fieldset>
                     </details>
                     <div id="placeholder"></div>
                  </div>
               </div>
            </div>

            <div class="seperator"></div>

            <div class="second-row">
               <div>
                  <span>Due Date<span class="red-star">*</span></span>
                  <input class="my-inputs" required type="date">
               </div>

               <div class="prio-container">
                  Prio
                  <div id="button-container">
                     <button onclick="handleUrgentClick(event)" id="buttonUrgent">Urgent <svg width="21" height="16" viewBox="0 0 21 16" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path id="UrgentOne"
                              d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
                              fill="#FF3D00" />
                           <path id="UrgentTwo"
                              d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                              fill="#FF3D00" />
                        </svg>
                     </button>
                     <button onclick="handleMediumClick(event)" id="buttonMedium">Medium <svg width="21" height="8" viewBox="0 0 21 8" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <g clip-path="url(#clip0_187336_4295)">
                              <path id="MediumOne"
                                 d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                                 fill="#FFA800" />
                              <path id="MediumTwo"
                                 d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                                 fill="#FFA800" />
                           </g>
                           <defs>
                              <clipPath id="clip0_187336_4295">
                                 <rect width="20" height="7.45098" fill="white"
                                    transform="translate(0.248535 0.274414)" />
                              </clipPath>
                           </defs>
                        </svg>

                     </button>
                     <button onclick="handleLowClick(event)" id="buttonLow">Low <svg width="21" height="16" viewBox="0 0 21 16" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path id="LowOne"
                              d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                              fill="#7AE229" />
                           <path id="LowTwo"
                              d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                              fill="#7AE229" />
                        </svg>
                     </button>
                  </div>
               </div>

               <div>
                  <span>Category<span class="red-star">*</span></span>
                  <select class="my-inputs" required name="task-list" id="category">
                     <option value="">Select task category</option>
                     <option bgColor="#0038FF" value="Technical Task">Technical Task</option>
                     <option bgColor="#FF7A00" value="User Story">User Story</option>
                  </select>
               </div>

               <div class="substasks">
                  Subtasks
                  <input onclick="addSubtasks()" class="my-inputs" placeholder="Add new subtask" name="subtasks" id="subtasks">
                  <div id="subtask-placeholder"></div>
               </div>

            </div>

            <div class="buttons">
               <button onclick="resetForm(event); return false" class="white-btn">Clear <img src="./assets/img/add-task/cancel.svg"
                     alt=""></button>
               <button type=submit class="blue-btn">Create Task <img src="./assets/img/add-task/check.svg" alt=""></button>
            </div>

         </form>
   </div>
   <div class="required-container">
      <span class="red-star">*</span><span>This field is required</span>
   </div>
   </main>
   </div>
   </div>
  `;
  onloadContacts();
  removeButtonBackground();
}
