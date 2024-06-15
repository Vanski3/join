let showSignup = document.getElementById('signup-dialog');
// let passwordInput = document.getElementById('password');
// let toggleIcon = document.getElementById('togglePassword');

initializeCheckboxListeners('checkbox');
initializeCheckboxListeners('checkboxSignup');

function initializeCheckboxListeners(checkboxId) {
  const checkbox = document.getElementById(checkboxId);

  checkbox.addEventListener('mouseover', () => {
    checkbox.classList.add('hovering');
  });

  checkbox.addEventListener('mouseout', () => {
    checkbox.classList.remove('hovering');
  });

  checkbox.addEventListener('click', () => {
    if (checkbox.classList.contains('checked')) {
      checkbox.classList.remove('checked');
      checkbox.src = './assets/img/login/checkbox.svg';
    } else {
      checkbox.classList.add('checked');
      checkbox.src = './assets/img/login/checkbox-checked.svg';
    }
  });
}

function showSignupPage() {
  showSignup.show();
}

function closeSignupPage() {
  showSignup.close();
}

// passwordInput.addEventListener('input', updateIcon);
// passwordInput.addEventListener('focus', updateIcon);

// toggleIcon.addEventListener('click', function () {
//   if (passwordInput.type === 'password') {
//     passwordInput.type = 'text';
//     toggleIcon.src = '../assets/img/login/visibility.svg';
//   } else {
//     passwordInput.type = 'password';
//     updateIcon();
//   }
// });

// function updateIcon() {
//   if (passwordInput.value.length > 0) {
//     toggleIcon.src = '../assets/img/login/visibility_off.svg';
//   } else {
//     toggleIcon.src = '../assets/img/login/lock.svg';
//   }
// }
