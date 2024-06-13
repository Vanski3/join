let dialogContainer = document.getElementById('dialog-container');
let taskDialog = document.querySelector('.task-dialog');

function openTaskDialog() {
  dialogContainer.style.display = 'unset';
  setTimeout(function () {
    taskDialog.style.right = '0';
  }, 50);
}

function closeTaskDialog() {
  taskDialog.style.right = '-600px';
  setTimeout(function () {
    dialogContainer.style.display = 'none';
  }, 300);
}

dialogContainer.addEventListener('click', function (event) {
  if (!taskDialog.contains(event.target)) {
    closeTaskDialog();
  }
});
