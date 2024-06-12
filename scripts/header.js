document.addEventListener('DOMContentLoaded', function () {
   let userLogoHeader = document.getElementById('UserLogoHeader');
   let userHeaderPopup = document.getElementById('UserHeaderPopup');

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
