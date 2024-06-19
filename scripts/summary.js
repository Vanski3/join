// renderSummary()

function renderSummary() {
   const content = document.querySelector('.main-content');
   content.innerHTML = '';
   content.innerHTML += /*html*/ `
     <main class="summary-main">
      <div class="headline-wrapper"><span class="headline">Good morning,</span><span id="username">Sofia Müller</span></div>
        <div class="summary-wrapper">
            <div class="row1">
                <div class="date-urgent-task">
                    <div class="urgent-task">
                        <div class="img-amount-container">
                            <img src="./assets/img/summary/urgent-frame.svg" alt="urgent task" />
                            <span id="urgent">1</span>
                        </div>
                        <p>Tasks Urgent</p>
                    </div>
                    <div class="separator"></div>
                    <div class="date">
                        <div>
                            <span id="date">October 16, 2022</span>
                            <p>Upcoming Deadline</p>
                        </div>
                    </div>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Board.svg" alt="Task in Board" />
                        <span id="task-in-board">5</span>
                    </div>
                    <p>Task in Board</p>
                </div>
            </div>
            <div class="row2">
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/todo.svg" alt="Task To-do" />
                        <span id="todo">1</span>
                    </div>
                    <p>Task To-do</p>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/In Progress.svg" alt="Task in Progress" />
                        <span id="in-progress">2</span>
                    </div>
                    <p>Task in Progress</p>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Awaiting feedback.svg" alt="Awaiting feedback" />
                        <span id="feedback">2</span>
                    </div>
                    <p>Awaiting Feedback</p>
                </div>
                <div class="task">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Done.svg" alt="Task done">
                        <span id="done">1</span>
                    </div>
                    <p>Tasks Done</p>
                </div>
            </div>
        </div>
    </main>`;
   removeButtonBackground();
   changeSummaryButtonBackground();
}

function changeSummaryButtonBackground(params) {
   let summaryButton = document.getElementById('summaryButton');
   summaryButton.classList.add('menu-background');
}
