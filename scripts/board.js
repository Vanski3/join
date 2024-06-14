let affe = document.getElementById('dialog-container');
let taskDialog = document.querySelector('.task-dialog');

function openTaskDialog() {
   affe.style.display = 'unset';
   setTimeout(function () {
      taskDialog.style.right = '0';
   }, 50);
}

function closeTaskDialog() {
   taskDialog.style.right = '-600px';
   setTimeout(function () {
      affe.style.display = 'none';
   }, 300);
}

affe.addEventListener('click', function (event) {
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
                        <input class="search-input" type="text" />
                        <div class="seperator-div"></div>
                        <img
                           onmouseover="this.src='./assets/img/board/search-symbol-variant2.svg'"
                           onmouseout="this.src='./assets/img/board/search-image-default.svg'"
                           src="assets/img/board/search-image-default.svg"
                           alt="" />
                     </div>
                     <button class="add-task-button">
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
                        <div class="nothing-to-do-box">No Task To do</div>
                        <div id="toDoTasksDiv" class="task-div">
                           <!-- Render To-Do-Cards in Here -->
                           <div id="boardCard" class="board-card">
                              <img class="card-label" src="./assets/img/task-overlay/user-story.svg" alt="" />
                              <span class="card-title">Title</span>
                              <span class="task-description">Content in here...</span>
                              <div class="progress-field">
                                 <div class="outer-progress-bar">
                                    <div class="inner-progress-bar"></div>
                                 </div>
                                 <div class="subtasks-text">1/2 Subtasks</div>
                              </div>
                              <div class="user-field">
                                 <div>User in here...</div>
                                 <img src="./assets/img/board/Priority-low.svg" alt="" />
                              </div>
                           </div>
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
                        <div id="inProgressTasksDiv" class="task-div">
                           <!-- Render In-Progress-Cards in Here -->
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
                        <div id="awaitFeedbackTasksDiv" class="task-div">
                           <!-- Render Await-Feedback-Cards in Here -->
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
                        <div id="doneTasksDiv" class="task-div">
                           <!-- Render Done-Cards in Here -->
                        </div>
                     </div>
                  </div>
               </main>
               <dialog id="taskOverlay" class="dialog-overlay-board">
         <div class="task-overlay">
            <div class="categorie-info">
               <img class="overlay-card-label" src="./assets/img/task-overlay/user-story.svg" alt="" />
               <img
                  id="closeTaskOverlay"
                  class="close-overlay-task"
                  onmouseover="this.src='./assets/img/task-overlay/close-icon-variant2.svg'"
                  onmouseout="this.src='./assets/img/task-overlay/close-icon.svg'"
                  src="./assets/img/task-overlay/close-icon.svg"
                  alt="" />
            </div>
            <span class="title-field">Kochwelt Page & Recipe Recommender</span>
            <span class="description-field">Build start page with recipe recommendation.</span>
            <div class="due-date-field">
               <span class="task-overlay-categories">Due date:</span>
               <div>10/05/2023</div>
            </div>
            <div class="priority-field">
               <span class="task-overlay-categories">Priority</span>
               <img src="./assets/img/task-overlay/Medium-icon.svg" alt="" />
            </div>
            <div class="assigned-to-field">
               <span class="task-overlay-categories">Assigned To:</span>
               <div>RENDER CONTACTS IN HERE!</div>
            </div>
            <div class="subtasks-field">
               <span class="task-overlay-categories">Subtasks</span>
               <div>RENDER SUbtasks IN HERE!</div>
            </div>
            <div class="delete-edit-field">
               <img
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
      </dialog>
    `;
}

document.getElementById('boardCard').addEventListener('click', () => {
   document.getElementById('taskOverlay').showModal();
});

document.getElementById('closeTaskOverlay').addEventListener('click', () => {
   document.getElementById('taskOverlay').close();
});
