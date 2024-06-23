let popup = document.getElementById('dialog-container');
let taskDialog = document.querySelector('.task-dialog');
const BASE_URL = 'https://join-2024-default-rtdb.europe-west1.firebasedatabase.app/';
let tasks = [];
// module.exports = tasks;
let allDataFromFirebase = [];

function init(params) {
  renderSummary();
  loadTasksData();
  loadallDataFromFirebase();
}

function openTaskDialog() {
  popup.style.display = 'unset';
  setTimeout(function () {
    taskDialog.style.right = '0';
  }, 50);
}

function closeTaskDialog() {
  taskDialog.style.right = '-600px';
  setTimeout(function () {
    popup.style.display = 'none';
  }, 300);
}

popup.addEventListener('click', function (event) {
  if (!taskDialog.contains(event.target)) {
    closeTaskDialog();
  }
});

function loadBoardContent(params) {
  let mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';
  mainContent.innerHTML += /*html*/ `
               <main class="main-board-div">
                  <div class="search-addtask-div">
                     <div class="search-input-div">
                        <input id="searchInput" onkeyup="searchTask()" placeholder="Find Task" class="search-input" type="text" />
                        <div class="seperator-div"></div>
                        <img
                           onmouseover="this.src='./assets/img/board/search-symbol-variant2.svg'"
                           onmouseout="this.src='./assets/img/board/search-image-default.svg'"
                           src="assets/img/board/search-image-default.svg"
                           alt="" />
                     </div>
                     <button onclick="openTaskDialog()" class="add-task-button" id="">
                        Add Task
                        <img src="assets/img/board/add-task-plus-icon.svg" alt="" />
                     </button>
                  </div>

                  <div class="board">
                     <div class="tasks-column">
                        <div class="board-headline to-do-column">
                           <span>To do</span>
                           <img
                              onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                              onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                              src="./assets/img/board/add-button-default.svg"
                              alt="" />
                        </div>
                        <div id="taskStatus0" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)">
                        </div>
                     </div>
                     <div class="tasks-column">
                        <div class="board-headline">
                           <span>In Progress</span>
                           <img
                              onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                              onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                              src="./assets/img/board/add-button-default.svg"
                              alt="" />
                        </div>
                        <div id="taskStatus1" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)">
                        </div>
                     </div>
                     <div class="tasks-column">
                        <div class="board-headline">
                           <span>Await feedback</span>
                           <img
                              onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                              onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                              src="./assets/img/board/add-button-default.svg"
                              alt="" />
                        </div>
                        <div id="taskStatus2" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)">
                        </div>
                     </div>
                     <div class="tasks-column">
                        <div class="board-headline">
                           <span>Done</span>
                        </div>
                        <div id="taskStatus3" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                     </div>
                  </div>
               </main>
    `;
  renderBoardCards();
  removeButtonBackground();
  changeBoardButtonBackground();
}

function changeBoardButtonBackground(params) {
  let boardButton = document.getElementById('boardButton');
  boardButton.classList.add('menu-background');
}

function renderBoardCards() {
  clearBoardContent();
  for (let i = 0; i < tasks.taskStatus.length; i++) {
    let taskStatus = tasks.taskStatus[i];
    let title = tasks.title[i];
    let description = tasks.description[i];
    let categoryName = tasks.categoryName[i];
    document.getElementById(`taskStatus${taskStatus}`).innerHTML += /*html*/ `
                                       <div id="boardCard${i}" draggable="true" ondragstart="drag(event)" class="board-card" onclick="renderTaskOverlay(${i})">
                              <img id="categorieImg${i}" class="card-label" src="./assets/img/board/${categoryName}.svg" alt="" />
                              <span class="card-title">${title}</span>
                              <span class="task-description-board">${description}</span>
                              <div id="progressDiv${i}" class="progress-field">
                              </div>
                              <div id="priorityDivBoardCard${i}"  class="user-field">
                                 <div id="boardCardsContacts${i}" class="contacts-in-cards-div"></div>                           
                              </div>
                           </div>
         `;
    if (categoryName == 'Technical Task') {
      document.getElementById(`categorieImg${i}`).style.width = '140px';
    }
    renderPriorityinBoardCards(i);
    renderContactsInCards(i);
    renderSubtasksInBoardCards(i);
  }
  checkIfTaskIsEmpty();
}

function renderPriorityinBoardCards(i) {
  let priority = tasks.priority[i];
  if (priority == '') {
    return;
  }
  document.getElementById(`priorityDivBoardCard${i}`).innerHTML += /*html*/ `
      <img src="./assets/img/board/Priority${priority}.svg" alt="" />
   `;
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  var card = document.getElementById(data);

  // Ensure the drop target is one of the allowed task status containers
  var allowedIds = ['taskStatus0', 'taskStatus1', 'taskStatus2', 'taskStatus3'];
  var dropTarget = ev.target;

  // Traverse up the DOM to find the valid drop target
  while (dropTarget && !allowedIds.includes(dropTarget.id)) {
    dropTarget = dropTarget.parentElement;
  }

  if (dropTarget && allowedIds.includes(dropTarget.id)) {
    // Get the new task status from the drop target's ID
    var newStatus = dropTarget.id.replace('taskStatus', '');

    // Update the task's status in the tasks array
    var taskId = data.replace('boardCard', '');
    tasks.taskStatus[taskId] = newStatus;

    // Append the card to the new column if it's not already a parent
    if (!dropTarget.contains(card)) {
      dropTarget.appendChild(card);
    }

    // Re-render the board to reflect the changes
    renderBoardCards();
  }
}

// Ensure the drop target is a valid task-div and one of the allowed IDs
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (window.matchMedia('(max-width: 1400px)').matches) {
    ev.preventDefault();
  }
  ev.dataTransfer.setData('text', ev.target.id);
  ev.target.classList.add('rotate-45');
}

function dragend(ev) {
  ev.target.classList.remove('rotate-45');
}

function renderSubtasksInBoardCards(i) {
  let subtasks = tasks?.subtasksTest?.[i]?.subtask || [];
  let finishedSubtasks = 0;
  for (let j = 0; j < subtasks.length; j++) {
    if (tasks.subtasksTest[i].subtaskStatus[j] === 'closed') {
      finishedSubtasks++;
    }
  }
  let subtasksLength = subtasks.length;
  let progressDiv = document.getElementById(`progressDiv${i}`);
  if (subtasksLength === 0) {
    progressDiv.style.display = 'none';
  } else {
    progressDiv.style.display = 'flex';
    progressDiv.innerHTML += /*html*/ `
               <div class="outer-progress-bar">
                  <div class="inner-progress-bar" style="width:${
                    (finishedSubtasks * 100) / subtasksLength
                  }%;"></div>
               </div>
           <div>${finishedSubtasks}/${subtasksLength}</div>
      `;
  }
}

function checkIfTaskIsEmpty() {
  const taskContents = [
    document.getElementById('taskStatus0'),
    document.getElementById('taskStatus1'),
    document.getElementById('taskStatus2'),
    document.getElementById('taskStatus3'),
  ];

  taskContents.forEach((taskContent) => {
    if (taskContent && taskContent.innerHTML.trim() === '') {
      taskContent.innerHTML += `
            <div class="nothing-to-do-box">No Task To do</div>
         `;
    }
  });
}

function renderTaskOverlay(i) {
  document.getElementById('taskOverlay').innerHTML = '';
  let title = tasks.title[i];
  let description = tasks.description[i];
  let categoryName = tasks.categoryName[i];
  let dueDate = tasks.dueDate[i];
  document.getElementById('taskOverlay').innerHTML += /*html*/ `
         <div class="task-overlay" id="edit-task">
            <div class="categorie-info">
               <img class="overlay-card-label" src="./assets/img/board/${categoryName}.svg" alt="" />
               <img
                  onclick="closeTaskOverlay() "
                  id="closeTaskOverlay"
                  class="close-overlay-task"
                  onmouseover="this.src='./assets/img/task-overlay/close-icon-variant2.svg'"
                  onmouseout="this.src='./assets/img/task-overlay/close-icon.svg'"
                  src="./assets/img/task-overlay/close-icon.svg"
                  alt="" />
            </div>
            <span class="title-field">${title}</span>
            <span class="description-field">${description}</span>
            <div class="due-date-field">
               <span class="task-overlay-categories">Due date:</span>
               <div>${dueDate}</div>
            </div>
            <div id="priorityDivTaskOverlay${i}" class="priority-field">
            </div>
            <div class="assigned-to-field">
               <span class="task-overlay-categories">Assigned To:</span>
               <div id="TaskOverlayContacts" class="contacts-task-overlay"></div>
            </div>
            <div id="subtasksField${i}"  class="subtasks-field">
            <span class="task-overlay-categories">Subtasks</span>
            <div id="subtaskDiv" class="subtasks-in-Overlay-Task"></div>
               
               
            </div>
            <div class="delete-edit-field">
               <img
                  onclick="deleteCurrentTask(${i})"
                  onmouseover="this.src='./assets/img/task-overlay/delete-variant2.svg'"
                  onmouseout="this.src='./assets/img/task-overlay/Delete.svg'"
                  src="./assets/img/task-overlay/Delete.svg"
                  alt="" />
               <div class="seperator-field"></div>

               <img
                  onclick="editTask(${i})"
                  onmouseover="this.src='./assets/img/task-overlay/edit-variant2.svg'"
                  onmouseout="this.src='./assets/img/task-overlay/edit.svg'"
                  src="./assets/img/task-overlay/edit.svg"
                  alt="" />
            </div>
         </div>
          `;
  renderPriorityInTaskOverlay(i);
  renderContactsInTaskOverlay(i);
  renderSubtasksinTaskOverlay(i);
  showOverlayTask();
}

function closePopup() {
  document.getElementById('edit-task').style.display = 'none';
}

function renderPriorityInTaskOverlay(i) {
  let priority = tasks.priority[i].charAt(0).toUpperCase() + tasks.priority[i].slice(1);
  if (priority == '') {
    document.getElementById(`priorityDivTaskOverlay${i}`).style.display = 'none';
    return;
  }
  document.getElementById(`priorityDivTaskOverlay${i}`).innerHTML += /*html*/ `
               <span class="task-overlay-categories">Priority:</span>
               <span>${priority}</span>
               <img src="./assets/img/board/Priority${priority}.svg" alt="" />
   `;
}

function renderSubtasksinTaskOverlay(i) {
  let subtasks = tasks?.subtasksTest?.[i]?.subtask;
  if (subtasks.length === 0) {
    document.getElementById(`subtasksField${i}`).style.display = 'none';
    return;
  }
  document.getElementById('subtaskDiv').innerHTML = '';
  for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j];
    document.getElementById('subtaskDiv').innerHTML += /*html*/ `
         <div id="subtaskRow${j}" onclick="changeSubtaskStatus(${j}, ${i})" class="subtask-row">
         <span>${subtask}</span>
         <div id="subtaskStatusImg${j}" class="subtask-status-img"></div>
         </div>
         
      `;

    changeImgBasedOnSubtaskStatus(i, j);
  }
}

function changeSubtaskStatus(j, i) {
  if (tasks.subtasksTest[i].subtaskStatus[j] == 'open') {
    tasks.subtasksTest[i].subtaskStatus.splice(j, 1, 'closed');
  } else {
    tasks.subtasksTest[i].subtaskStatus.splice(j, 1, 'open');
  }
  changeImgBasedOnSubtaskStatus(i, j);
}

function changeImgBasedOnSubtaskStatus(i, j) {
  if (tasks.subtasksTest[i].subtaskStatus[j] == 'open') {
    document.getElementById(`subtaskStatusImg${j}`).innerHTML = /*html*/ `
         <img src="./assets/img/board/check-button-empty.svg" alt="">
      `;
  } else {
    document.getElementById(`subtaskStatusImg${j}`).innerHTML = /*html*/ `
      <img src="./assets/img/board/check-button-checked.svg" alt="">
   `;
  }
}

function deleteCurrentTask(i) {
  if (confirm('Delete This Task?') == true) {
    tasks.taskStatus.splice(i, 1);
    tasks.subtasksTest.splice(i, 1);
    tasks.title.splice(i, 1);
    tasks.description.splice(i, 1);
    tasks.priority.splice(i, 1);
    tasks.dueDate.splice(i, 1);
    tasks.categoryName.splice(i, 1);
    tasks.assignedTo.splice(i, 1);
    closeTaskOverlay();
    loadBoardContent();
  }
}

async function loadTasksData(path = '/tasks') {
  let fetchTasks = await fetch(BASE_URL + path + '.json');
  tasks = await fetchTasks.json();
  console.log(tasks);
}

async function loadallDataFromFirebase() {
  let fetchData = await fetch(BASE_URL + '.json');
  allDataFromFirebase = await fetchData.json();
  console.log(allDataFromFirebase);
}

function showOverlayTask() {
  const overlay = document.getElementById('taskOverlay');
  overlay.showModal();
  overlay.classList.add('fade-in-right');
}

function renderContactsInTaskOverlay(i) {
  for (let j = 0; j < tasks.assignedTo[i].contactImageBgColor.length; j++) {
    let imageByColor = tasks.assignedTo[i].contactImageBgColor[j];
    let initials = tasks.assignedTo[i].nameInitials[j];
    let name = tasks.assignedTo[i].name[j];
    document.getElementById('TaskOverlayContacts').innerHTML += /*html*/ `
        <div class="assigned-to-div">
            <div class="contact-initials" style="background-color: ${imageByColor};">${initials}</div>
            <span>${name}</span>
        </div>
      `;
  }
}

function renderContactsInCards(i) {
  for (let j = 0; j < tasks.assignedTo[i].contactImageBgColor.length; j++) {
    let imageByColor = tasks.assignedTo[i].contactImageBgColor[j];
    let initials = tasks.assignedTo[i].nameInitials[j];
    document.getElementById(`boardCardsContacts${i}`).innerHTML += /*html*/ `
            <div class="contacts-in-cards" style="background-color: ${imageByColor};">${initials}</div>
       
      `;
  }
}

function searchTask(params) {
  clearBoardContent();
  let searchTitle = document.getElementById('searchInput').value.toLowerCase();
  let searchDescription = document.getElementById('searchInput').value.toLowerCase();
  if (searchTitle === '') {
    renderBoardCards();
    return;
  }
  for (let i = 0; i < tasks.taskStatus.length; i++) {
    let title = tasks.title[i].toLowerCase();
    let taskDescription = tasks.description[i].toLowerCase();
    if (title.includes(searchTitle) || taskDescription.includes(searchDescription)) {
      let taskStatus = tasks.taskStatus[i];
      let title = tasks.title[i];
      let description = tasks.description[i];
      let priority = tasks.priority[i];
      let categoryName = tasks.categoryName[i];
      document.getElementById(`taskStatus${taskStatus}`).innerHTML += /*html*/ `
                                             <div id="boardCard${i}" class="board-card" onclick="renderTaskOverlay(${i})">
                                    <img class="card-label" src="./assets/img/board/${categoryName}.svg" alt="" />
                                    <span class="card-title">${title}</span>
                                    <span class="task-description-board">${description}</span>
                                    <div class="progress-field">
                                       <div class="outer-progress-bar">
                                          <div class="inner-progress-bar"></div>
                                       </div>
                                       <div class="subtasks-text">1/2 Subtasks</div>
                                    </div>
                                    <div  class="user-field">
                                       <div id="boardCardsContacts${i}" class="contacts-in-cards-div"></div>
                                       <img src="./assets/img/board/Priority${priority}.svg" alt="" />
                                    </div>
                                 </div>
               `;
      renderContactsInCards(i);
    }
  }
  checkIfTaskIsEmpty();
}

function clearBoardContent(params) {
  document.getElementById('taskStatus0').innerHTML = '';
  document.getElementById('taskStatus1').innerHTML = '';
  document.getElementById('taskStatus2').innerHTML = '';
  document.getElementById('taskStatus3').innerHTML = '';
}

function closeTaskOverlay() {
  const overlay = document.getElementById('taskOverlay');
  overlay.close();
  renderBoardCards();
  overlay.classList.remove('fade-in-right');
}
