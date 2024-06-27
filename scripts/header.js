/**
 * Sets up event listeners for user logo header interactions and document clicks.
 * Toggles the visibility of the user header popup.
 */
document.addEventListener('DOMContentLoaded', function () {
  let userLogoHeader = document.getElementById('userLogoHeader');
  let userHeaderPopup = document.getElementById('userHeaderPopup');

  userLogoHeader.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click from bubbling up to the document
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
    event.stopPropagation(); // Prevents the click from bubbling up to the document
  });
});

/**
 * Logs the user out by clearing session storage and redirecting to the index page.
 */
function logOut() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

// Initialize the user header with session storage data.
sessionStorageToHeader();

/**
 * Sets the user initials in the header logo from session storage.
 * Defaults to 'G' if no initials are found in session storage.
 */
function sessionStorageToHeader() {
  let logo = document.getElementById('logoInitials');
  let initials = sessionStorage.getItem('initials') ?? 'G';
  logo.innerHTML += `${initials}`;
}
