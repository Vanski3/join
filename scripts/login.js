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
  try {
    let userResponse = await getAllUser('users');
    if (Array.isArray(userResponse)) {
      for (let i = 0; i < userResponse.length; i++) {
        user.push({
          id: userResponse[i].id,
          email: userResponse[i].email,
          name: userResponse[i].name,
          password: userResponse[i].password,
        });
      }
    } else {
      console.error('userResponse is not in the expected array format');
    }
  } catch (error) {
    console.error('Failed to load users:', error);
  }
}

async function getAllUser(path) {
  let response = await fetch(BASE_URL + path + '.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
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

async function createUser() {
  let signupName = document.getElementById('signupName').value;
  let signupEmail = document.getElementById('signupEmail').value;
  let signupPassword = document.getElementById('signupPassword').value;
  let newId = user.length.toString();
  let newUser = {
    id: newId,
    email: signupEmail,
    name: signupName,
    password: signupPassword,
  };
  user.push(newUser);
  await putData('/users', user);
}

async function putData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
