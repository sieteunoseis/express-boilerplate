/*
Bootstable
 @description  Javascript library to make HMTL tables editable, using Bootstrap
 @version 1.2
 @author Jeremy Worden
*/
"use strict";
//Global variables
var params = null; // Parameters
var colsEdit = null; // Editable columns
var versions = ["12.5", "14.0", "15.0"];

var newColHtml =
  '<div class="btn-group pull-left">' +
  '<button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="butRowEdit(this);">' +
  '<i class="fa-solid fa-pencil"></i>' +
  "</button>" +
  '<button id="bElim" type="button" class="btn btn-sm btn-default" onclick="butRowDelete(this);">' +
  '<i class="fa-solid fa-trash-can"></i>' +
  "</button>" +
  '<button id="bShow" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="butShowValue(this);">' +
  '<i class="fa-solid fa-eye"></i>' +
  "</button>" +
  '<button id="bAcep" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="butRowAcep(this);">' +
  '<i class="fa-solid fa-check"></i>' +
  "</button>" +
  '<button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="butRowCancel(this);">' +
  '<i class="fa-solid fa-xmark"></i>' +
  "</button>" +
  "</div>";

var colEditHtml = '<td name="buttons">' + newColHtml + "</td>";
$.fn.SetEditable = function (options) {
  var defaults = {
    editableCols: null, // Index to editable columns. If null all td editables. Ex.: "1,2,3,4,5"
    primaryKey: "ID", // Primary key
    password: false, // Password field
    onEdit: function () {}, //Called after edition
    onBeforeDelete: function () {}, //Called before deletion
    onDelete: function () {}, //Called after deletion
  };
  params = $.extend(defaults, options);
  var $currentTable = this; // Read reference to the current table.
  $currentTable.find("thead tr").append('<th name="buttons"></th>'); //Add empty column

  //Add column for buttons to all rows.
  $currentTable.find("tbody tr").append(colEditHtml);

  //Process "editableCols" parameter
  if (params.editableCols != null) {
    //Extract felds
    colsEdit = params.editableCols.split(",");
  }
};
function IterateEditFields($cols, action) {
  //Iterate through editable fields in a row
  var n = 0;
  $cols.each(function () {
    n++;
    if ($(this).attr("name") == "buttons") return; //Exclude buttons column
    if (!IsEditable(n - 1)) return; //It's not editable. Minus 1 because n is 1 based and the first column is the id column
    action($(this));
  });

  function IsEditable(idx) {
    // Indicates if the passed column is set to be editable
    if (colsEdit == null) {
      return true; // All are editable
    } else {
      for (var i = 0; i < colsEdit.length; i++) {
        if (idx == colsEdit[i]) return true;
      }
      return false; // It's not editable
    }
  }
}
function editMode($row) {
  if ($row.attr("id") == "editing") {
    return true;
  } else {
    return false;
  }
}
// Set buttons state
function SetButtonsNormal(but) {
  $(but).parent().find("#bAcep").hide();
  $(but).parent().find("#bCanc").hide();
  $(but).parent().find("#bShow").hide();
  $(but).parent().find("#bEdit").show();
  $(but).parent().find("#bElim").show();
  var $row = $(but).parents("tr");
  $row.attr("id", "");
}
function SetButtonsEdit(but) {
  $(but).parent().find("#bAcep").show();
  $(but).parent().find("#bCanc").show();
  $(but).parent().find("#bShow").show();
  $(but).parent().find("#bEdit").hide();
  $(but).parent().find("#bElim").hide();
  var $row = $(but).parents("tr");
  $row.attr("id", "editing");
}
// Events functions
function butShowValue(but) {
  var $row = $(but).parents("tr");
  var $cols = $row.find("td");
  if (!editMode($row)) return;
  IterateEditFields($cols, function ($td) {
    if (($td[0].id == "PASSWORD") & !$td[0].classList.contains("hidetext")) {
      $(but).children().removeClass("fa-eye-slash").addClass("fa-eye");
      $td.addClass("hidetext");
    } else if ($td[0].id == "PASSWORD") {
      $td.removeClass("hidetext");
      $(but).children().removeClass("fa-eye").addClass("fa-eye-slash");
    }
  });
}
function butRowAcep(but) {
  var $row = $(but).parents("tr");
  var $cols = $row.find("td");
  if (!editMode($row)) return;
  var arr = [];
  arr.push($row.find(`td[id='${params.primaryKey}']`).text());
  IterateEditFields($cols, function ($td) {
    var cont = $td.find("input").val() ? $td.find("input").val() : $td.find("select").val();
    if ($td[0].id == "PASSWORD") {
      $td.addClass("hidetext");
    }
    $td.html(cont);
    arr.push(cont);
  });
  SetButtonsNormal(but);
  params.onEdit($row, arr);
}
function butRowCancel(but) {
  var $row = $(but).parents("tr");
  var $cols = $row.find("td");
  if (!editMode($row)) return;
  IterateEditFields($cols, function ($td) {
    var cont = $td.find("div").html();
    $td.html(cont);
  });
  SetButtonsNormal(but);
}
function butRowEdit(but) {
  var $row = $(but).parents("tr");
  var $cols = $row.find("td");
  if (editMode($row)) return;
  var focused = false;
  IterateEditFields($cols, function ($td) {
    var cont = $td.html(); // Contents of the cell
    //Save previous content in a hide <div>
    var div = '<div style="display: none;">' + cont + "</div>";
    var input = '<select class="form-select" aria-label="Default select example" id="versionSave" name="version">';
    if ($td[0].id == "VERSION") {
      versions.forEach((version) => {
        if (cont == version) {
          input = input + `<option value="${version}" selected>${version}</option>`;
        } else {
          input = input + `<option value="${version}">${version}</option>`;
        }
      });
      input = input + "</select>";
    } else {
      input = '<input class="form-control input-sm" value="' + cont + '">';
    }

    $td.html(div + input); // Set new content
    // Set focus to first column
    if (!focused) {
      $td.find("input").focus();
      focused = true;
    }
  });
  SetButtonsEdit(but);
}

function butRowDelete(but) {
  var $row = $(but).parents("tr");
  params.onDelete($row, $row.find(`td[id='${params.primaryKey}']`).text());
}
