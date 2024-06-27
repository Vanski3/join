/**
 * Removes the background class from the main menu buttons.
 */
function removeButtonBackground() {
  const buttons = ['summaryButton', 'addTaskButton', 'boardButton', 'contactButton'];
  buttons.forEach((buttonId) => {
    document.getElementById(buttonId).classList.remove('menu-background');
  });
}

/**
 * Removes the color and font styles from the sidebar elements.
 */
function removeColorSideBar() {
  const sidebarImgIds = [
    'sidebarImgSummary',
    'sidebarImgAddTask',
    'sidebarImgBoard',
    'sidebarImgContact',
  ];
  const fontIds = [
    'fontContactsSidebar',
    'fontBoardSidebar',
    'fontAddTaskSidebar',
    'fontSummarySidebar',
  ];

  sidebarImgIds.forEach((id) => {
    document.getElementById(id).classList.remove('color-img-sidebar');
  });

  fontIds.forEach((id) => {
    document.getElementById(id).classList.remove('menu-row-font');
  });
}

/**
 * Returns to the previously viewed content based on the active button in the sidebar.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 */
function returnToPreviousContent(params) {
  let summaryButton = document.getElementById('summaryButton');
  let addTaskButton = document.getElementById('addTaskButton');
  let boardButton = document.getElementById('boardButton');
  let contactButton = document.getElementById('contactButton');
  if (summaryButton.classList.contains('menu-background')) {
    renderSummary();
  } else if (addTaskButton.classList.contains('menu-background')) {
    loadAddTaskContent();
  } else if (boardButton.classList.contains('menu-background')) {
    loadBoardContent();
  } else if (contactButton.classList.contains('menu-background')) {
    loadContactsContent();
  }
}

/**
 * Removes the active link class from the lower sidebar buttons.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 */
function removeBackgroundLowerSidebar(params) {
  let legalNoticeButton = document.getElementById('legalNoticeButton');
  legalNoticeButton.classList.remove('active-link');
  let privacePoliceButton = document.getElementById('privacePoliceButton');
  privacePoliceButton.classList.remove('active-link');
}

/**
 * Displays a welcome text for mobile users and then renders the summary.
 *
 * @param {Object} [params] - Optional parameters (not used in the function).
 */
function welcomeTextMobile(params) {
  let mainContent = document.getElementById('mainContent');
  const name = sessionStorage.getItem('name') ?? 'Guest';
  if (window.matchMedia('(max-width: 800px)').matches) {
    mainContent.innerHTML = /*html*/ `
       <div class="greeting-div-mobile">
       <span class="greeting-mobile-daytime" id="daytimeMobile"></span>
         <span class="greeting-mobile"> ${name}!</span>
       </div>
     `;
    renderGreetingMobile();
    setTimeout(() => {
      renderSummary(true);
    }, 1500);
  } else {
    setTimeout(() => {
      renderSummary();
    }, 200);
  }
}

function renderGreetingMobile(params) {
  let daytime = document.getElementById('daytimeMobile');
  let now = new Date();
  let hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    daytime.innerHTML = 'Good Morning,';
  } else if (hour >= 12 && hour < 17) {
    daytime.innerHTML = 'Good Afternoon,';
  } else if (hour >= 17 && hour < 21) {
    daytime.innerHTML = 'Good Evening,';
  } else {
    daytime.innerHTML = 'Time for bed,';
  }
}
