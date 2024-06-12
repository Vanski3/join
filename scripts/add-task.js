let selectedButtonId = null;

function handleUrgentClick() {
  console.log('Urgent button clicked');
  //   FUNCTION
}

function handleMediumClick() {
  console.log('Medium button clicked');
  //   FUNCTION
}

function handleLowClick() {
  console.log('Low button clicked');
  //   FUNCTION
}

document.getElementById('buttonUrgent').addEventListener('click', function (event) {
  event.preventDefault();
  toggleColor('buttonUrgent', '#FF3D00', 'UrgentOne', 'UrgentTwo');
  //   handleUrgentClick();
});

document.getElementById('buttonMedium').addEventListener('click', function (event) {
  event.preventDefault();
  toggleColor('buttonMedium', '#FFA800', 'MediumOne', 'MediumTwo');
  //   handleMediumClick();
});

document.getElementById('buttonLow').addEventListener('click', function (event) {
  event.preventDefault();
  toggleColor('buttonLow', '#7AE229', 'LowOne', 'LowTwo');
  //   handleLowClick();
});

function toggleColor(buttonId, color, idOne, idTwo) {
  if (selectedButtonId) {
    let prev = document.getElementById(selectedButtonId);
    prev.style = '';
    document.getElementById(prev.getAttribute('data-svg-one')).style.fill =
      prev.getAttribute('data-original-color');
    document.getElementById(prev.getAttribute('data-svg-two')).style.fill =
      prev.getAttribute('data-original-color');
  }
  if (buttonId === selectedButtonId) return (selectedButtonId = null);
  let button = document.getElementById(buttonId);
  button.style = `background-color:${color};color:#fff;border-bottom:unset`;
  document.getElementById(idOne).style.fill = document.getElementById(idTwo).style.fill = '#fff';
  button.setAttribute('data-svg-one', idOne);
  button.setAttribute('data-svg-two', idTwo);
  selectedButtonId = buttonId;
}
