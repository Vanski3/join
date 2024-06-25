// renderSummary()

function renderSummary() {
  const name = sessionStorage.getItem('name') ?? 'Guest';
  const content = document.querySelector('.main-content');
  content.innerHTML = '';
  content.innerHTML += /*html*/ `
     <main class="summary-main">
      <div class="headline-wrapper"><span class="headline" id="daytime">Good morning,</span><span id="username"> ${name}</span></div>
        <div class="summary-wrapper">
            <div class="row1">
                <div class="date-urgent-task" onclick="loadBoardContent()">
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
                <div class="task" onclick="loadBoardContent('mainContent')">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Board.svg" alt="Task in Board" />
                        <span id="task-in-board">5</span>
                    </div>
                    <p>Task in Board</p>
                </div>
            </div>
            <div class="row2">
                <div class="task task-todo" onclick="loadBoardContent('board-todo')">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/todo.svg" alt="Task To-do" />
                        <span id="todo">1</span>
                    </div>
                    <p>Task To-do</p>
                </div>
                <div class="task" onclick="loadBoardContent('board-progress')">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/In Progress.svg" alt="Task in Progress" />
                        <span id="in-progress">2</span>
                    </div>
                    <p>Task in Progress</p>
                </div>
                <div class="task" onclick="loadBoardContent('board-feedback')">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Awaiting feedback.svg" alt="Awaiting feedback" />
                        <span id="feedback">2</span>
                    </div>
                    <p>Awaiting Feedback</p>
                </div>
                <div class="task" onclick="loadBoardContent('board-done')">
                    <div class="img-amount-container">
                        <img src="./assets/img/summary/Done.svg" alt="Task done">
                        <span id="done">1</span>
                    </div>
                    <p>Tasks Done</p>
                </div>
            </div>
        </div>
    </main>`;
  removeBackgroundLowerSidebar();
  removeButtonBackground();
  changeSummaryButtonBackground();
  removeColorSideBar();
  changeColorSideSummary();
  renderTaskAmount();
}

function renderTaskAmount() {
  let taskNumber = document.getElementById('task-in-board');

  let taskAmount = tasks.taskStatus.length;
  taskNumber.innerHTML = `${taskAmount}`;
  renderTaskToDoAmount();
  renderTaskinProgressAmount();
  renderTaskAwaitingAmount();
  renderTaskDoneAmount();
  renderDueDate();
  renderUrgendTaskAmount();
  renderGetGreeting();
}

function renderGetGreeting() {
  let daytime = document.getElementById('daytime');
  let now = new Date();
  let hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    daytime.innerHTML = 'Good Morning,';
  } else if (hour >= 12 && hour < 17) {
    daytime.innerHTML = 'Good Afternoon,';
  } else if (hour >= 17 && hour < 21) {
    daytime.innerHTML = 'Good Evening,';
  } else {
    daytime.innerHTML = 'Good Evening,';
  }
}

function renderUrgendTaskAmount() {
  let taskNumber = document.getElementById('urgent');
  let CountThrees = tasks.priority.filter((task) => task === 'urgent').length;

  taskNumber.innerHTML = `${CountThrees}`;
}

function renderDueDate() {
  let dateContainer = document.getElementById('date');
  let earliestDate = tasks.dueDate.reduce((earliest, current) => {
    return new Date(current) < new Date(earliest) ? current : earliest;
  });
  let date = new Date(earliestDate);
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = date.toLocaleDateString('en-US', options);

  dateContainer.innerHTML = `${formattedDate}`;
}

function renderTaskDoneAmount() {
  let taskNumber = document.getElementById('done');
  let CountThrees = tasks.taskStatus.filter((task) => task === '3').length;

  taskNumber.innerHTML = `${CountThrees}`;
}

function renderTaskAwaitingAmount() {
  let taskNumber = document.getElementById('feedback');
  let countTwos = tasks.taskStatus.filter((task) => task === '2').length;

  taskNumber.innerHTML = `${countTwos}`;
}

function renderTaskinProgressAmount() {
  let taskNumber = document.getElementById('todo');
  let countZeroes = tasks.taskStatus.filter((task) => task === '0').length;

  taskNumber.innerHTML = `${countZeroes}`;
}

function renderTaskToDoAmount() {
  let taskNumber = document.getElementById('in-progress');
  let countOnes = tasks.taskStatus.filter((task) => task === '1').length;

  taskNumber.innerHTML = `${countOnes}`;
}

function changeSummaryButtonBackground(params) {
  let summaryButton = document.getElementById('summaryButton');
  summaryButton.classList.add('menu-background');
}

function changeColorSideSummary(params) {
  document.getElementById('sidebarImgSummary').classList.add('color-img-sidebar');
  document.getElementById('fontSummarySidebar').classList.add('menu-row-font');
}
