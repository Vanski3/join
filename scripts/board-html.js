function loadBoardContentHTML() {
   return /*html*/ `
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
                <span id="board-todo">To do</span>
                <img
                onclick="openTaskDialog('0')"
                   onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                   onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                   src="./assets/img/board/add-button-default.svg"
                   alt="" />
             </div>
             <div id="taskStatus0" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)" ondragenter="highlight(event)">
             </div>
          </div>
          <div class="tasks-column">
             <div class="board-headline">
                <span id="board-progress">In Progress</span>
                <img onclick="openTaskDialog('1')"
                   onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                   onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                   src="./assets/img/board/add-button-default.svg"
                   alt="" />
             </div>
             <div id="taskStatus1" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)" ondragenter="highlight(event)">
             </div>
          </div>
          <div class="tasks-column">
             <div class="board-headline">
                <span id="board-feedback">Await feedback</span>
                <img onclick="openTaskDialog('2')"
                   onmouseover="this.src='./assets/img/board/add-button-variant2.svg'"
                   onmouseout="this.src='./assets/img/board/add-button-default.svg'"
                   src="./assets/img/board/add-button-default.svg"
                   alt="" />
             </div>
             <div id="taskStatus2" class="task-div" ondrop="drop(event)" ondragover="allowDrop(event)" ondragenter="highlight(event)">
             </div>
          </div>
          <div class="tasks-column">
             <div class="board-headline">
                <span id="board-done">Done</span>
             </div>
             <div id="taskStatus3" class="task-div" ondrop="drop(event, 'taskStatus3')" ondragover="allowDrop(event)" ondragenter="highlight(event)"></div>
          </div>
       </div>
    </main>
`;
}

function renderBoardCardsHTML(i, title, description, categoryName) {
   return /*html*/ `
    <div id="boardCard${i}" draggable="true" ondragstart="drag(event)" class="board-card no-drag" onclick="renderTaskOverlay(${i})">
      <div class="header-row-board-card" id="headerRowBoardCard${i}">
        <img id="categorieImg${i}" class="card-label" src="./assets/img/board/${categoryName}.svg" alt="" />
        <img onclick="showMoveToPopup(event, ${i})" class="move-to-img" src="./assets/img/board/Move-to.svg" alt="">
        <div id="popupBoardCard${i}" class="popup-board-card">
            <span class="move-to-header">Move to:</span>
            <span onclick="moveCardToToDo(event, ${i})" href="">To Do</span>
            <span onclick="moveCardToInProgress(event, ${i})" href="">In Progress</span>
            <span onclick="moveCardToAwaitingFeedback(event, ${i})" href="">Awaiting Feedback</span>
            <span onclick="moveCardToDone(event, ${i})" href="">Done</span>
         </div>
      </div>
      <span class="card-title">${title}</span>
      <span class="task-description-board">${description}</span>
      <div id="progressDiv${i}" class="progress-field">
      </div>
      <div id="priorityDivBoardCard${i}"  class="user-field">
         <div id="boardCardsContacts${i}" class="contacts-in-cards-div"></div>                           
      </div>
   </div>
`;
}

function renderTaskOverlayHTML(i, title, description, categoryName, dueDate) {
   return /*html*/ `
    <div class="task-overlay" id="edit-task">
       <div class="categorie-info">
          <img class="overlay-card-label" src="./assets/img/board/${categoryName}.svg" alt="" />
          <img
             onclick="closeTaskOverlay(0) "
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
}

function searchTaskHTML(i, title, description, priority, categoryName) {
   return /*html*/ `
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
