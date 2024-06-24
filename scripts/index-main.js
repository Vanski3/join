function removeButtonBackground(params) {
  let summaryButton = document.getElementById('summaryButton');
  summaryButton.classList.remove('menu-background');
  let addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.classList.remove('menu-background');
  let boardButton = document.getElementById('boardButton');
  boardButton.classList.remove('menu-background');
  let contactButton = document.getElementById('contactButton');
  contactButton.classList.remove('menu-background');
}

function removeColorSideBar(params) {
  let sidebarImgSummary = document.getElementById('sidebarImgSummary');
  sidebarImgSummary.classList.remove('color-img-sidebar');
  let sidebarImgAddTask = document.getElementById('sidebarImgAddTask');
  sidebarImgAddTask.classList.remove('color-img-sidebar');
  let sidebarImgBoard = document.getElementById('sidebarImgBoard');
  sidebarImgBoard.classList.remove('color-img-sidebar');
  let sidebarImgContact = document.getElementById('sidebarImgContact');
  sidebarImgContact.classList.remove('color-img-sidebar');
}
