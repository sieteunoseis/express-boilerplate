// Body Load Functions
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Dom loaded
  },
  false
);

// Add any code here that would be used across all pages.

function showAlert(messageTitle, messageBody) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  toastTitle.innerHTML = messageTitle;
  toastMessage.innerHTML = messageBody;
}

function addBreadcrumbItem(name, url = null) {
  // Get the breadcrumb element
  const breadcrumb = document.querySelector(".breadcrumb");

  // Create a new breadcrumb item element
  const item = document.createElement("li");
  const a = document.createElement("a");
  item.classList.add("breadcrumb-item");
  item.classList.add("active");

  // Add the text content to the breadcrumb item
  if (url) {
    a.textContent = name;
    a.setAttribute("href", url);
    a.classList.add("text-decoration-none");
    item.appendChild(a);
  }else{
    item.textContent = name;
  }

  // Append the breadcrumb item to the breadcrumb element
  breadcrumb.appendChild(item);
}
