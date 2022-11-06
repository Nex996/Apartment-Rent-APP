//Save users to localStorage
window.addEventListener("beforeunload", saveToLocalStorage);

//Search
let searchField = document.querySelector('[type="search"]');

//Table
let usersTable = usersView.querySelector("tbody");
let editDeleteTable = editDeleteView.querySelector("tbody");

//Views
let views = document.querySelectorAll(".view");

//Rent form inputs
let idRent = document.querySelector("#idRent");
let IDcardNumberRent = document.querySelector("#IDcardNumberRent");
let firstNameRent = document.querySelector("#firstNameRent");
let lastNameRent = document.querySelector("#lastNameRent");
let phoneNumberRent = document.querySelector("#phoneNumberRent");
let roomTypeSelectRent = document.querySelector("#roomTypeSelectRent");
let startDateRent = document.querySelector("#startDateRent");
let endDateRent = document.querySelector("#endDateRent");

//Edit form inputs
let eIDcardNumberRent = document.querySelector("#eIDcardNumberRent");
let efirstNameRent = document.querySelector("#efirstNameRent");
let elastNameRent = document.querySelector("#elastNameRent");
let ephoneNumberRent = document.querySelector("#ephoneNumberRent");
let eroomTypeSelectRent = document.querySelector("#eroomTypeSelectRent");
let estartDateRent = document.querySelector("#estartDateRent");
let eendDateRent = document.querySelector("#eendDateRent");

//Nav links
let rentNavLink = document.querySelector(".rentNavLink-js");
let usersNavLink = document.querySelector(".usersNavLink-js");
let editDeleteNavLink = document.querySelector(".editDeleteNavLink-js");

//Buttons
let saveRentBtn = document.querySelector("#saveRentBtn");
let saveEditUserBtn = document.querySelector("#saveEdit");

// Listeners
window.addEventListener("hashchange", changeView);
rentNavLink.addEventListener("click", displayRentView);
saveRentBtn.addEventListener("click", saveNewRent);
usersNavLink.addEventListener("click", displayUsers);
editDeleteNavLink.addEventListener("click", createEditDeleteTable);
saveEditUserBtn.addEventListener("click", editUser);
searchField.addEventListener("input", searchUsers);

//Search users
function searchUsers() {
  let searchTerm = this.value.toLowerCase();
  let currentUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().indexOf(searchTerm) !== -1 ||
      user.lastName.toLowerCase().indexOf(searchTerm) !== -1 ||
      user.idCardNumber.indexOf(searchTerm) !== -1 ||
      user.phoneNumber.indexOf(searchTerm) !== -1 ||
      user.startDate.indexOf(searchTerm) !== -1 ||
      user.endDate.indexOf(searchTerm) !== -1
    );
  });
  createUsersTable(currentUsers);
}
//Search users END

//Save edits
function editUser(e) {
  e.preventDefault();
  let currentUser = users.find(
    (user) => user.id === this.getAttribute("userID")
  );

  currentUser.idCardNumber = eIDcardNumberRent.value;
  currentUser.name = efirstNameRent.value;
  currentUser.lastName = elastNameRent.value;
  currentUser.phoneNumber = ephoneNumberRent.value;
  currentUser.roomType = eroomTypeSelectRent.value;
  currentUser.startDate = estartDateRent.value;
  currentUser.endDate = eendDateRent.value;

  createUsersTable();
  location.hash = "usersView";
}
//Save edits END

//Create room options for edit form
function createEditRoomTypeOptions(currentUser) {
  let content = "";
  roomTypes.forEach((type) => {
    content += `
        <option ${
          currentUser.roomType === type ? "selected" : ""
        } value="${type}">${type}</option>
        `;
  });
  eroomTypeSelectRent.innerHTML = content;
}
//Create room options for edit form END

//Fill edit form
function fillEditForm(currentUser) {
  eIDcardNumberRent.value = currentUser.idCardNumber;
  efirstNameRent.value = currentUser.name;
  elastNameRent.value = currentUser.lastName;
  ephoneNumberRent.value = currentUser.phoneNumber;
  estartDateRent.value = currentUser.startDate;
  eendDateRent.value = currentUser.endDate;
  createEditRoomTypeOptions(currentUser);
  saveEditUserBtn.setAttribute("userID", currentUser.id);
}
//Fill edit form END

//Display edit view
function displayEditView() {
  let id = this.getAttribute("userID");
  let currentUser = users.find((user) => user.id === id);

  fillEditForm(currentUser);
  location.hash = "editView";
}
//Display edit view END

//Create table for edit and delete users
function createEditDeleteTable() {
  let content = "";
  users.forEach((user) => {
    content += ` 
        <tr>
        <td>${user.id}</td>
        <td>${user.idCardNumber}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.roomType}</td>
        <td>${user.startDate}</td>
        <td>${user.endDate}</td>
        <td><button class="btn btn-warning editBtn-js"  userID=${user.id}>Edit</button> <button class="btn btn-danger deleteBtn-js"  userID=${user.id}>Delete</button></td>
        </tr>`.trim();
  });
  editDeleteTable.innerHTML = content;

  let deleteBtns = document.querySelectorAll(".deleteBtn-js");
  let editBtns = document.querySelectorAll(".editBtn-js");

  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", deleteUser);
    editBtns[index].addEventListener("click", displayEditView);
  });
}
//Create table for edit and delete users END

//Delete user
function deleteUser() {
  let id = this.getAttribute("userID");

  users = users.filter((user) => {
    console.log(typeof user.id);
    return user.id != id;
  });

  createUsersTable();
  location.hash = "usersView";
}
//Delete user END

//SaveToLocalStorage
function saveToLocalStorage() {
  localStorage.db = JSON.stringify(users);
}
//SaveToLocalStorage END

//Save new Rent
function saveNewRent(e) {
  e.preventDefault();
  let newRent = {
    id: idRent.value,
    idCardNumber: IDcardNumberRent.value,
    name: firstNameRent.value,
    lastName: lastNameRent.value,
    phoneNumber: phoneNumberRent.value,
    roomType: roomTypeSelectRent.value,
    startDate: startDateRent.value,
    endDate: endDateRent.value,
  };
  let checkForm = Object.values(newRent).some((value) => value === "");

  if (checkForm) {
    alert("Fill all input fields");
  } else {
    resetRentForm();
    users.push(newRent);
    createUsersTable();
    location.hash = "usersView";
  }
}
//Save new Rent END

//Reset Rent form
function resetRentForm() {
  idRent.value = "";
  IDcardNumberRent.value = "";
  firstNameRent.value = "";
  lastNameRent.value = "";
  phoneNumberRent.value = "";
  roomTypeSelectRent.value = "";
  startDateRent.value = "";
  endDateRent.value = "";
}
//Reset Rent form END

//Display users
function displayUsers() {
  createUsersTable();
}
//Display users END

//Display rent view
function displayRentView() {
  createRoomTypeOptions();
  idRent.value = generateUniqueID();
}
//Display rent view END

//Create room options
function createRoomTypeOptions() {
  let content = "";
  roomTypes.forEach((type) => {
    content += `
        <option value="${type}">${type}</option>
        `;
  });
  roomTypeSelectRent.innerHTML = content;
}
//Create room options END

//Create users table
createUsersTable();
location.hash = "usersView";

function createUsersTable(currentUsers) {
  let usersCopy = users;
  if (currentUsers) {
    usersCopy = currentUsers;
  }
  let content = "";
  usersCopy.forEach((user) => {
    content += ` 
        <tr>
        <td>${user.id}</td>
        <td>${user.idCardNumber}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.roomType}</td>
        <td>${user.startDate}</td>
        <td>${user.endDate}</td>
    </tr>`.trim();
  });

  usersTable.innerHTML = content;
}
//Create users table END

//Generate random ID
function generateUniqueID() {
  let generateId;
  let unique = false;

  while (!unique) {
    unique = true;
    generateId = Math.floor(Math.random() * 10000);
    users.forEach((user) => {
      if (parseInt(user.id) === generateId) {
        unique = false;
      }
    });
  }
  return generateId.toString();
}
//Generate random ID END

//Change view function
function changeView() {
  let hash = location.hash.substring(1);
  views.forEach((view) => {
    if (view.id === hash) {
      view.style.display = "block";
    } else {
      view.style.display = "none";
    }
  });
}
//Change view function END
