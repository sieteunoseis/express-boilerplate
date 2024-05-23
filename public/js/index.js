var text = `// Toast Example
const toastTrigger = document.getElementById("liveToastBtn");

if (toastTrigger) {
    showAlert("Success", "This is a success message");
  });
}`;

// Body Load Functions
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Toast Example: See showAlert function on main.js
    const toastTrigger = document.getElementById("liveToastBtn");
    if (toastTrigger) {
      toastTrigger.addEventListener("click", () => {
        showAlert("Success", "This is a success message");
      });
    }

    // https://apalfrey.github.io/select2-bootstrap-5-theme/examples/sizing/
    $(document).ready(function () {
      $("#selectState").select2({
        theme: "bootstrap-5",
        width: $(this).data("width")
          ? $(this).data("width")
          : $(this).hasClass("w-100")
          ? "100%"
          : "style",
        placeholder: $(this).data("placeholder"),
        selectionCssClass: "select2--large",
        dropdownCssClass: "select2--large",
      });
    });
    
    updateSelect2();

    const $$ = function (selector, bind) {
      var bind = bind === undefined ? document : bind;
      let nodes = bind.querySelectorAll.bind(bind)(selector);
      return nodes.length == 1 ? nodes[0] : nodes;
    };

    var editor = CodeMirror.fromTextArea(toastAlert, {
      theme: "rubyblue",
      autoRefresh: true,
      lineNumbers: false,
      smartIndent: true,
      lineWrapping: false,
      indentWithTabs: true,
      refresh: true,
    });

    editor.removeTag = CodeMirror.removeTag;
    var cm = $(".CodeMirror");
    cm.editor = editor;
    editor.save();
    editor.setOption("mode", "javascript");
    editor.setValue(text);

    $$(".copy-code-wrap").onclick = function (e) {
      if (e.which == 1) {
        // write the text to the clipboard
        navigator.clipboard.writeText(editor.getValue());

        // animate the button
        var copy = $$(".copy-code", this);
        function quickadd() {
          copy.classList.add("animate");
          setTimeout(function () {
            copy.classList.remove("animate");
          }, 200);
        }
        quickadd();
      }
    };
  },
  false
);

function updateSelect2() {
  // Get files for drop down
  fetch("/api/getstates", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((body) => {
      var options = '';
      for (let x in body) {
        options += `<option value="${x}">${body[x]}</option>`;
      }
      document.getElementById("selectState").innerHTML = options;
    })
    .catch((err) => console.log(err));
}
