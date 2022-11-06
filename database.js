let users=[
    {
        id:123,
        idCardNumber: "00657854" ,
        name:"Nemanja",
        lastName:"Novakovic",
        phoneNumber: "0644833003",
        roomType:"1 solo bed",
        startDate: "20-05-2022",
        endDate:"24-05-2022"

    },
    { 
        id:54645,
        idCardNumber: "009668096" ,
        name:"Emilia",
        lastName:"Smith",
        phoneNumber: "0655257957",
        roomType:"King size bed",
        startDate: "02-11-2022",
        endDate:"14-10-2022"
    }

];




let roomTypes= ["1 solo bed", "2 solo beds", "King size bed"]


if(localStorage.db.length>1){
    users=JSON.parse(localStorage.db)
  
}