// Body Load Functions
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Dom loaded
    addBreadcrumbItem("Save Account");
    displayForm();

    const saveForm = document.getElementById("saveForm");
    saveForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target).entries());
      const responseData = await fetch("/credentials/data", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseText = await responseData.text();
      showAlert("Success", "Successfully saved credentials.");
      $('#savedCreds').html(responseText)
      saveForm.reset();
      displayForm();
    });
  },
  false
);

const displayForm = () => {
  $("#credTable").SetEditable({
    editableCols: "1,2,3,4", // Index to editable columns. If null all td editables. Ex.: "1,2,3,4,5"
    password: true,
    onEdit: async function(row, data) {
      json = {
        hostname: data[1],
        username: data[2],
        password: data[3],
        version: data[4]
      }
      const responseData = await fetch(`/credentials/data/${data[0]}`, {
        method: "PUT",
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
        },
      });
      showAlert("Success", "Successfully updated credentials.");
      $('#savedCreds').html(await responseData.text())
      displayForm();
    },
    onDelete: async function(row, data) {
      const responseData = await fetch(`/credentials/data/${data}`, {
        method: "DELETE"
      });
      showAlert("Success", "Successfully deleted credentials.");
      $('#savedCreds').html(await responseData.text())
      displayForm();
    },
  });
}