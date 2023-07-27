var selectedRow = null; //initially no row will be selected
//value stored in formData

// on creation, insertRow is called
// on edit, a row is selected which means on the selected row, we update each field and since now selected row is not empty we call updaterecord
function onFormSubmit() {
  if (validate()) {
    var formData = readFormData(); //get the inital form data
    if (selectedRow == null) {
      //  creating
      insertNewRecord(formData);
    } else {
      // updating alreadt exisiting record
      updateRecord(formData);
    }
    // reset data after create or update
    resetForm();
  }
}

function readFormData() {
  var formData = {};
  //   retrieving values from input fields and storing in formData as key value pairs
  formData["fullName"] = document.getElementById("fullName").value;
  formData["empCode"] = document.getElementById("empCode").value;
  formData["salary"] = document.getElementById("salary").value;
  formData["city"] = document.getElementById("city").value;
  // console.log(formData);
  return formData;
}

// when insertNewRecord is called, we access table, we create a row with insertRow, and then we createCell with insertCell and populate that cell with innerHTML
function insertNewRecord(data) {
  // accessing table
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length); // Create an empty <tr> element and add it to the last position
  console.log("newrow", newRow);
  cell1 = newRow.insertCell(0); //Insert new cells
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.empCode;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

// reset all input values that we select by getElementById
function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("empCode").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("city").value = "";
  selectedRow = null;
}

// when editing we populate the input fields with the selected row's value
function onEdit(td) {
  //   console.log(td.parentElement.parentElement); accessing the row
  selectedRow = td.parentElement.parentElement;
  //   sending values from table to input form
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
  document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
  document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
//when updateRecord is called we change value at each cell with our formData
function updateRecord(formData) {
  // updating value in table to newly edited value
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.empCode;
  selectedRow.cells[2].innerHTML = formData.salary;
  selectedRow.cells[3].innerHTML = formData.city;
}
// select row and remove from table
function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
  }
}
// function to validate error message
function validate() {
  isValid = false; //by default state of our name field will be false
  if (document.getElementById("fullName").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide"); //showing error message
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide"); //removing error message
  }
  return isValid;
}
