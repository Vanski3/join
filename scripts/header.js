document.addEventListener('DOMContentLoaded', function () {
  let userLogoHeader = document.getElementById('userLogoHeader');
  let userHeaderPopup = document.getElementById('userHeaderPopup');

  userLogoHeader.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click from bubbling up to the document
    if (userHeaderPopup.style.display === 'none' || userHeaderPopup.style.display === '') {
      userHeaderPopup.style.display = 'flex';
    } else {
      userHeaderPopup.style.display = 'none';
    }
  });

  document.addEventListener('click', function () {
    userHeaderPopup.style.display = 'none';
  });

  userHeaderPopup.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click from bubbling up to the document
  });
});

function logOut() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

sessionStorageToHeader();

function sessionStorageToHeader() {
  let logo = document.getElementById('logoInitials');
  let initials = sessionStorage.getItem('initials') ?? 'G';
  logo.innerHTML += `${initials}`;
}
