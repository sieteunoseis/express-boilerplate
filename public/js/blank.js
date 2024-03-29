// Body Load Functions
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Dom loaded
  },
  false
);

function showAlert(messageTitle, messageBody) {
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  toastTitle.innerHTML = messageTitle;
  toastMessage.innerHTML = messageBody;
}
