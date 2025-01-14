let fullName = document.getElementById("fullName");
let empCode = document.getElementById("empCode");
let salary = document.getElementById("salary");
let city = document.getElementById("city");
let span = document.getElementById("fullNameValidationError");
let table = document.getElementById("employeeList");

// FullName Validation
function validateFullName() {
    let isValid = true;
    if (fullName.value === "") {
        isValid = false;
        span.classList.remove("hide");
    } else {
        if (!span.classList.contains("hide")) {
            span.classList.add("hide");
        }
    }
    return isValid;
}

// Read data from the Form field
function readFormData() {
    let formData = {};
    formData.fullName = fullName.value;
    formData["empCode"] = empCode.value;
    formData.salary = salary.value;
    formData["city"] = city.value;

    fullName.value = "";
    empCode.value = "";
    salary.value = "";
    city.value = "";

    return formData;
}

// Submit the records
let selectedRow = null;
function onSubmitForm() {
    if (validateFullName()) {
        let formData = readFormData();
        if (selectedRow === null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
    }
}

// Insert New Record
function insertNewRecord(newUser) {
    let tbody = table.getElementsByTagName("tbody")[0];
    let newRow = tbody.insertRow();
    newRow.insertCell(0).innerHTML = newUser.fullName;
    newRow.insertCell(1).innerHTML = newUser.empCode;
    newRow.insertCell(2).innerHTML = newUser.salary;
    newRow.insertCell(3).innerHTML = newUser.city;
    newRow.insertCell(4).innerHTML = `
        <button type='button' onclick='editUser(this)'>Edit</button>
        <button type='button' onclick='deleteUser(this)'>Delete</button>`;
}

// Edit User
function editUser(element) {
    selectedRow = element.parentElement.parentElement;
    fullName.value = selectedRow.cells[0].innerHTML;
    empCode.value = selectedRow.cells[1].innerHTML;
    salary.value = selectedRow.cells[2].innerHTML;
    city.value = selectedRow.cells[3].innerHTML;
}

// Update Record
function updateRecord(updateUser) {
    selectedRow.cells[0].innerHTML = updateUser.fullName;
    selectedRow.cells[1].innerHTML = updateUser.empCode;
    selectedRow.cells[2].innerHTML = updateUser.salary;
    selectedRow.cells[3].innerHTML = updateUser.city;
    selectedRow = null;
}

// Delete Record
function deleteUser(element) {
    if (confirm("Are you sure you want to delete this record?")) {
        let row = element.parentElement.parentElement;
        // console.log(row);
        // console.log(row.row.Index);
        table.deleteRow(row.rowIndex);
    }else{
        alert("Delete Operation Failed");
    }
}
