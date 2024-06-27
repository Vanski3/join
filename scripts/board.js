let popup = document.getElementById('dialog-container');
let taskDialog = document.querySelector('.task-dialog');
const BASE_URL = 'https://join-2024-default-rtdb.europe-west1.firebasedatabase.app/';
let tasks = [];
let allDataFromFirebase = [];

function init(params) {
   loadTasksData();
   loadallDataFromFirebase();
}

function openTaskDialog(parameter = null) {
   popup.style.display = 'unset';
   setTimeout(function () {
      taskDialog.style.right = '0';
   }, 50);
   resetButtons();
   handleMediumClick(event);
   taskCategory(parameter);
   addTaskValidation();
   minDate();
}

function closeTaskDialog() {
   taskDialog.style.right = '-600px';
   setTimeout(function () {
      popup.style.display = 'none';
   }, 300);
   taskSelection = 0;
   resetValidation();
}

popup.addEventListener('click', function (event) {
   if (!taskDialog.contains(event.target)) {
      closeTaskDialog();
   }
});

async function loadallDataFromFirebase() {
   let fetchData = await fetch(BASE_URL + '.json');
   allDataFromFirebase = await fetchData.json();
   console.log(allDataFromFirebase);
}

function loadBoardContent(sectionId) {
   let mainContent = document.getElementById('mainContent');
   mainContent.innerHTML = '';
   mainContent.innerHTML += loadBoardContentHTML();
   removeBackgroundLowerSidebar();
   renderBoardCards();
   removeButtonBackground();
   changeBoardButtonBackground();
   removeColorSideBar();
   changeColorSidebarBoard();
   scrollToSection(sectionId);
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
      document.getElementById(`taskStatus${taskStatus}`).innerHTML += renderBoardCardsHTML(i, title, description, categoryName);
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
   var allowedIds = ['taskStatus0', 'taskStatus1', 'taskStatus2', 'taskStatus3'];
   var dropTarget = ev.target;
   while (dropTarget && !allowedIds.includes(dropTarget.id)) {
      dropTarget = dropTarget.parentElement;
   }

   if (dropTarget && allowedIds.includes(dropTarget.id)) {
      var newStatus = dropTarget.id.replace('taskStatus', '');
      var taskId = data.replace('boardCard', '');
      tasks.taskStatus[taskId] = newStatus;
      renderBoardCards();
   }
   unhighlight(ev);
}

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

function highlight(ev) {
   unhighlight();
   var allowedIds = ['taskStatus0', 'taskStatus1', 'taskStatus2', 'taskStatus3'];
   var target = ev.target;
   while (target && !allowedIds.includes(target.id)) {
      target = target.parentElement;
   }
   if (target && allowedIds.includes(target.id)) {
      target.classList.add('highlight');
   }
}

function unhighlight() {
   var highlightedElements = document.querySelectorAll('.highlight');
   highlightedElements.forEach(function (element) {
      element.classList.remove('highlight');
   });
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
                  <div class="inner-progress-bar" style="width:${(finishedSubtasks * 100) / subtasksLength}%;"></div>
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
   document.getElementById('taskOverlay').innerHTML += renderTaskOverlayHTML(i, title, description, categoryName, dueDate);
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
   renderSummary();
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
         document.getElementById(`taskStatus${taskStatus}`).innerHTML += searchTaskHTML(
            i,
            title,
            description,
            priority,
            categoryName
         );
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

function showMoveToPopup(event, i) {
   event.stopPropagation();
   const popup = document.getElementById(`popupBoardCard${i}`);
   if (popup.style.display === 'none' || popup.style.display === '') {
      popup.style.display = 'flex';
   } else {
      popup.style.display = 'none';
   }
}

function moveCardToToDo(event, i) {
   event.stopPropagation();
   tasks.taskStatus.splice(i, 1, '0');
   renderBoardCards();
}

function moveCardToInProgress(event, i) {
   event.stopPropagation();
   tasks.taskStatus.splice(i, 1, '1');
   renderBoardCards();
}

function moveCardToAwaitingFeedback(event, i) {
   event.stopPropagation();
   tasks.taskStatus.splice(i, 1, '2');
   renderBoardCards();
}

function moveCardToDone(event, i) {
   event.stopPropagation();
   tasks.taskStatus.splice(i, 1, '3');
   renderBoardCards();
}

function changeColorSidebarBoard() {
   document.getElementById('sidebarImgBoard').classList.add('color-img-sidebar');
   document.getElementById('fontBoardSidebar').classList.add('menu-row-font');
}

function scrollToSection(sectionId) {
   let targetElement = document.getElementById(sectionId);

   if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
}
