function loadBoardContent(params) {
   let mainContent = document.getElementById('mainContent');
   mainContent.innerHTML = '';
   mainContent.innerHTML += /*html*/ `
                      <main class="main-board">
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
                      </div>
                   </div>
                </main>
    `;
}
