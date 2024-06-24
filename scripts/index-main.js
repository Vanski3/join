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
