window.addEventListener('beforeunload',save);


let tbodyUsersView = document.querySelector("#tbodyUsersView");
let tbodyEditUserView=document.querySelector('#tbodyEditUserView');
//VIEWS
let views = document.querySelectorAll(".view");

//INPUTS RENT SAVE
let inputUserIDCard=document.querySelector("#inputUserIDCard");
let inputUser=document.querySelector("#inputUser");
let inputUserPhone=document.querySelector('#inputUserPhone');
let selectRoomType=document.querySelector("#selectRoomType")
let inputStartDate=document.querySelector('#inputStartDate');
let inputEndDate=document.querySelector('#inputEndDate');
// INPUT EDIT
let einputUserIDCard=document.querySelector("#einputUserIDCard");
let einputUser=document.querySelector("#einputUser");
let einputUserPhone=document.querySelector('#einputUserPhone');
let eselectRoomType=document.querySelector("#eselectRoomType")
let einputStartDate=document.querySelector('#einputStartDate');
let einputEndDate=document.querySelector('#einputEndDate');



//INPUT SEARCH
let search=document.querySelector('#inputSearch');



//BUTTONS
let usersViewBtn = document.querySelector("#usersView-btn");
let rentViewBtn=document.querySelector("#rentView-btn");
let saveRentbtn=document.querySelector("#saveRent-btn");
let editUserbtn=document.querySelector('#editUserView-btn');
let saveEditUser=document.querySelector('#editUser-btn');

let editBtn=document.querySelectorAll(".edit-btn")
//LISTENERS
window.addEventListener("hashchange", changeView);
usersViewBtn.addEventListener("click", displayUsersView);
rentViewBtn.addEventListener("click", displayRentViews);
saveRentbtn.addEventListener("click",saveRent);
editUserbtn.addEventListener("click",displayEditUserTable);
search.addEventListener("input", searchTerm);
saveEditUser.addEventListener("click",editUser)

//FUNCTIONS CALL
createUsersTable(db);



//DISPLAYS

function displayEditUserForm(){
  let id=this.getAttribute("data-id");
  saveEditUser.setAttribute("data-id",id);
  currentUser=db.find(user=>(user.id===id));
  fillEditForm(currentUser);
  location.hash="#editUserForm"
}

function displayEditUserTable(){
  let content = "";
  db.forEach((user) => {
    content += `  <tr>
    <td class="text-nowrap">${user.idCardNumber}</td>
    <td class="text-nowrap">${user.user}</td>
    <td class="text-nowrap">${user.phone}</td>
    <td class="text-nowrap">${user.room}</td>
    <td class="text-nowrap">${user.startDate}</td>
    <td class="text-nowrap">${user.endDate}</td>
    <td class="text-nowrap">
    <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-danger delete-btn mr-2" data-id="${user.id}">Delete</button> 
    <button type="button" class="btn btn-warning edit-btn" data-id="${user.id}">Edit</button>
    </div>
    </td>
  </tr>`;
  });

  tbodyEditUserView.innerHTML = content;
 

  let deleteBtns=document.querySelectorAll(".delete-btn");
  let editBtns=document.querySelectorAll('.edit-btn');

  deleteBtns.forEach((btn,index) => {
    btn.addEventListener("click",deleteUser)
    editBtns[index].addEventListener("click",displayEditUserForm)
  });


}

function displayUsersView() {
  createUsersTable(db);
}

function displayRentViews(){
    createRoomTypeSelect();
}


//FUNCTIONS

function editUser(){
  let currentUser=db.find(user=>user.id===this.getAttribute("data-id"));
  currentUser.idCardNumber=einputUserIDCard.value;
  currentUser.user=einputUser.value;
  currentUser.phone=einputUserPhone.value;
  currentUser.room=eselectRoomType.value;
  currentUser.startDate=einputStartDate.value;
  currentUser.endDate=einputEndDate.value;

  createUsersTable()
  location.hash="#usersView";
}



function createEditRoomTypeSelect(currentUser){
  let content="";
  roomType.forEach(type => {
      content+=`<option value="${type}"   ${(currentUser.room===type)? "selected":""}>${type}</option>`
    
  });

  eselectRoomType.innerHTML=content;

}

function fillEditForm(currentUser){
  einputUserIDCard.value=currentUser.idCardNumber;
  einputUser.value=currentUser.user;
  einputUserPhone.value=currentUser.phone;
  createEditRoomTypeSelect(currentUser);
  einputStartDate.value=currentUser.startDate;
  einputEndDate.value=currentUser.endDate;
}

function searchTerm(){

  let searchTerm=this.value;
  let currentDB=db.filter(el=>{
    return  el.user.indexOf(searchTerm) !== -1 ||
    el.phone.indexOf(searchTerm) !== -1 ||
     el.idCardNumber.indexOf(searchTerm) !== -1
  })


  
createUsersTable(currentDB);

}



function save(){
  localStorage.db = JSON.stringify(db);
}



function deleteUser(){
  let id=this.getAttribute("data-id");
  db=db.filter(user=>user.id!==id)
  displayEditUserTable();

}



function saveRent(){
    let saveObject= {
        id: generateUserID(),
        idCardNumber:inputUserIDCard.value,
        user:inputUser.value ,
        phone:inputUserPhone.value,
        room: selectRoomType.value,
        startDate: inputStartDate.value,
        endDate:inputEndDate.value
    }
    db.push(saveObject);
    resetForm();
    createUsersTable(db);
    location.hash="#usersView"
}

function generateUserID(){
    let random;
    let unique=false;
    while(!unique){
        unique=true;
        random=Math.floor(Math.random()*99*db.length);
        db.forEach(user =>{
            if(parseInt(user.id)===random){
                unique=false;
            }
        } );
    }

    
    return random.toString();
}


function resetForm(){

    inputUserIDCard.value="";
    inputUser.value=""; 
    inputUserPhone.value="";
    selectRoomType.value="";
    inputStartDate.value="";
    inputEndDate.value="";
}





function createRoomTypeSelect(){
    let content="";
    roomType.forEach(type => {
        content+=`<option value="${type}">${type}</option>`
      
    });

    selectRoomType.innerHTML=content;

}

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

function createUsersTable(currentDb) {
  if(!currentDb){
    currentDb=db;
  }
  let content = "";
  currentDb.forEach((user) => {
    content += `  <tr>
    <td class="text-nowrap">${user.idCardNumber}</td>
    <td class="text-nowrap">${user.user}</td>
    <td class="text-nowrap">${user.phone}</td>
    <td class="text-nowrap">${user.room}</td>
    <td class="text-nowrap">${user.startDate}</td>
    <td class="text-nowrap">${user.endDate}</td>
  </tr>`;
  });

  tbodyUsersView.innerHTML = content;
}




