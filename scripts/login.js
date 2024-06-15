let showSignup = document.getElementById('signup-dialog');
let passwordInput = document.getElementById('loginPassword');
let toggleIcon = document.getElementById('togglePassword');
const BASE_URL = 'https://join-2024-default-rtdb.europe-west1.firebasedatabase.app/';
let user = [];

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

passwordInput.addEventListener('input', updateIcon);
passwordInput.addEventListener('focus', updateIcon);

toggleIcon.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.src = '../assets/img/login/visibility.svg';
  } else {
    passwordInput.type = 'password';
    updateIcon();
  }
});

function updateIcon() {
  if (passwordInput.value.length > 0) {
    toggleIcon.src = '../assets/img/login/visibility_off.svg';
  } else {
    toggleIcon.src = '../assets/img/login/lock.svg';
  }
}

async function onloadFunc() {
  let userResponse = await getAllUser('users');

  let userKeyArray = Object.keys(userResponse.name);

  for (let i = 0; i < userKeyArray.length; i++) {
    user.push({
      id: userKeyArray[i],
      email: userResponse.email[i],
      name: userResponse.name[i],
      password: userResponse.password[i],
    });
  }
}

async function getAllUser(path) {
  let response = await fetch(BASE_URL + path + '.json');
  return (responseToJson = await response.json());
}

function loginUser() {
  let loginEmail = document.getElementById('loginEmail');
  let loginPassword = document.getElementById('loginPassword');

  let result = user.filter((user) => user.email === loginEmail.value);

  if (result.length > 0) {
    if (result[0]['email'] === loginEmail.value && result[0]['password'] === loginPassword.value) {
      alert('Login successful');
    } else {
      alert('Email or password does not match');
      loginEmail.value = '';
      loginPassword.value = '';
    }
  } else {
    alert('Email or password does not match');
    loginEmail.value = '';
    loginPassword.value = '';
  }
}

// function createUser() {
//   let signupName = document.getElementById('signupName').value;
//   let signupEmail = document.getElementById('signupEmail').value;
//   let signupPassword = document.getElementById('signupPassword').value;

//   putData((path = ''), signupName, signupEmail, signupPassword);
// }

// async function putData(
//   path = 'users',
//   data = {
//     email: signupName,
//   }
// ) {
//   let response = await fetch(BASE_URL + path + '.json', {
//     method: 'PUT',
//     header: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
// }
