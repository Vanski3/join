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

document.addEventListener('DOMContentLoaded', function () {
   const currentUrl = window.location.pathname;
   const privacyLink = document.querySelector('a[href="./privacy.html"]');
   const legalNoticeLink = document.querySelector('a[href="./legal-notice.html"]');
   if (currentUrl.includes('privacy.html')) {
      privacyLink.classList.add('active-link');
   } else if (currentUrl.includes('legal-notice.html')) {
      legalNoticeLink.classList.add('active-link');
   }
});
