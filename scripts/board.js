let popup = document.getElementById('dialog-container');
let taskDialog = document.querySelector('.task-dialog');
const BASE_URL = 'https://join-2024-default-rtdb.europe-west1.firebasedatabase.app/';
let tasks = [];
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
                        <input id="searchInput" onkeyup="searchTask()" class="search-input" type="text" />
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
                        <div id="taskStatus0" class="task-div">
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
                        <div id="taskStatus1" class="task-div">
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
                        <div id="taskStatus2" class="task-div">
                        </div>
                     </div>
                     <div class="tasks-column">
                        <div class="board-headline">
                           <span>Done</span>
                           <img
                              onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                              onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                              src="./assets/img/board/add-button-default.svg"
                              alt="" />
                        </div>
                        <div id="taskStatus3" class="task-div"></div>
                     </div>
                  </div>
               </main>
               
    `;
   renderBoardCards();
}

function renderBoardCards() {
   clearBoardContent();
   for (let i = 0; i < tasks.taskStatus.length; i++) {
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
   checkIfTaskIsEmpty();
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
   let priority = tasks.priority[i];
   let categoryName = tasks.categoryName[i];
   let dueDate = tasks.dueDate[i];
   document.getElementById('taskOverlay').innerHTML += /*html*/ `
         <div class="task-overlay">
            <div class="categorie-info">
               <img class="overlay-card-label" src="./assets/img/board/${categoryName}.svg" alt="" />
               <img
                  onclick="closeTaskOverlay()"
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
            <div class="priority-field">
               <span class="task-overlay-categories">Priority:</span>
               <span>${priority}</span>
               <img src="./assets/img/board/Priority${priority}.svg" alt="" />
            </div>
            <div class="assigned-to-field">
               <span class="task-overlay-categories">Assigned To:</span>
               <div id="TaskOverlayContacts" class="contacts-task-overlay"></div>
            </div>
            <div class="subtasks-field">
               <span class="task-overlay-categories">Subtasks</span>
               <div>RENDER SUbtasks IN HERE!</div>
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
                  onmouseover="this.src='./assets/img/task-overlay/edit-variant2.svg'"
                  onmouseout="this.src='./assets/img/task-overlay/edit.svg'"
                  src="./assets/img/task-overlay/edit.svg"
                  alt="" />
            </div>
         </div>
          `;
   renderContactsInTaskOverlay(i);
   showOverlayTask();
}

function deleteCurrentTask(i) {
   if (confirm('Delete This Task?') == true) {
      tasks.taskStatus.splice(i, 1);
      tasks.title.splice(i, 1);
      tasks.description.splice(i, 1);
      tasks.priority.splice(i, 1);
      tasks.dueDate.splice(i, 1);
      tasks.categoryName.splice(i, 1);
      // tasks.categoryBgColor.splice(i, 1);
      // tasks.subtasks.splice(i, 1);
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
   document.getElementById('taskOverlay').showModal();
}

function closeTaskOverlay(params) {
   document.getElementById('taskOverlay').close();
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
   // document.getElementById('taskStatus0').style.display = 'none';
   // document.getElementById('taskStatus1').style.display = 'none';
   // document.getElementById('taskStatus2').style.display = 'none';
   // document.getElementById('taskStatus3').style.display = 'none';
   clearBoardContent();
   let searchName = document.getElementById('searchInput').value.toLowerCase();
   let searchDescription = document.getElementById('searchInput').value.toLowerCase();
   if (searchName || searchDescription === '') {
      renderBoardCards();
      return;
   }
   for (let i = 0; i < tasks.taskStatus.length; i++) {
      let title = tasks.title[i].toLowerCase();
      let taskDescription = tasks.description[i].toLowerCase();
      if ((searchName.length >= 3 && title.includes(searchName)) || taskDescription.includes(searchDescription)) {
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
      }
      // renderContactsInCards(i);
   }
   checkIfTaskIsEmpty();
}

function clearBoardContent(params) {
   document.getElementById('taskStatus0').innerHTML = '';
   document.getElementById('taskStatus1').innerHTML = '';
   document.getElementById('taskStatus2').innerHTML = '';
   document.getElementById('taskStatus3').innerHTML = '';
}
