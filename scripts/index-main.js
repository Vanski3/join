function removeButtonBackground() {
   const buttons = ['summaryButton', 'addTaskButton', 'boardButton', 'contactButton'];
   buttons.forEach((buttonId) => {
      document.getElementById(buttonId).classList.remove('menu-background');
   });
}

function removeColorSideBar() {
   const sidebarImgIds = ['sidebarImgSummary', 'sidebarImgAddTask', 'sidebarImgBoard', 'sidebarImgContact'];
   const fontIds = ['fontContactsSidebar', 'fontBoardSidebar', 'fontAddTaskSidebar', 'fontSummarySidebar'];

   sidebarImgIds.forEach((id) => {
      document.getElementById(id).classList.remove('color-img-sidebar');
   });

   fontIds.forEach((id) => {
      document.getElementById(id).classList.remove('menu-row-font');
   });
}

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

function removeBackgroundLowerSidebar(params) {
   let legalNoticeButton = document.getElementById('legalNoticeButton');
   legalNoticeButton.classList.remove('active-link');
   let privacePoliceButton = document.getElementById('privacePoliceButton');
   privacePoliceButton.classList.remove('active-link');
}

function welcomeTextMobile(params) {
   document.getElementById('mainContent').innerHTML = /*html*/ `
   <div class="greeting-div-mobile">
      <span class="greeting-mobile">Hello !</span>
   </div>
   `;
   setTimeout(() => {
      renderSummary();
   }, 1500);
}
