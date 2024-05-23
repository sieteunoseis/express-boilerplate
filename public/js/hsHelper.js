// Body Load Functions
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Dom loaded
    addBreadcrumbItem("Handsontable Demo");
    const container = document.getElementById("handsontable");
    const data = Handsontable.helper.createSpreadsheetData(50, 25);

    const hot = new Handsontable(container, {
      data: data,
      colHeaders: true,
      rowHeaders: true,
      width: "100%",
      height: 400,
      contextMenu: true,
      manualColumnFreeze: true,
      fixedRowsTop: 3,
      fixedColumnsLeft: 3,
      manualColumnMove: true,
      manualColumnResize: true,
      manualRowResize: true,
      manualRowMove: true,
      dropdownMenu: true,
      filters: true,
      columnSorting: true,
      comments: true,
      licenseKey: "non-commercial-and-evaluation",
      renderer: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.innerHTML = `<div class="truncated">${value}</div>`;
      },
    });
  },
  false
);
