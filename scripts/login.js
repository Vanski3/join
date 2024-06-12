let showSignup = document.getElementById('signup-dialog');

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
