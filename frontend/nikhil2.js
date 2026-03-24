const API="http://localhost:5000/";
let userId=null;

// LOGIN
async function login(){
    let res=await fetch(API+"login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username:user.value,password:pass.value})
    });

    let data=await res.json();

    if(data.error){
        alert(data.error);
    } else {
        userId=data.user_id;
        authBox.style.display="none";
        app.style.display="block";
        loadTrains();
        loadBookings();
    }
}

// LOAD TRAINS
async function loadTrains(){
    let res=await fetch(API+"compartments");
    let data=await res.json();

    let map={};

    data.forEach(c=>{
        if(!map[c.train_id]){
            map[c.train_id]={
                name:c.train_name,
                source:c.source,
                destination:c.destination,
                list:[]
            };
        }
        map[c.train_id].list.push(c);
    });

    trainContainer.innerHTML="";

    for(let id in map){
        let t=map[id];

        let html=`
        <div class="card">
        <h3>🚆 ${t.name}</h3>
        <p>📍 ${t.source} → ${t.destination}</p>
        `;

        t.list.forEach(c=>{
            html+=`
            <p>
            ${c.type} | Seats: ${c.available_seats}
            <input type="number" id="s_${c.train_id}_${c.type}" placeholder="Seats">
            <button onclick="book(${c.train_id},'${c.type}')">Book</button>
            </p>`;
        });

        html+=`</div>`;
        trainContainer.innerHTML+=html;
    }
}

// BOOK
async function book(train_id,type){
    let seats=document.getElementById(`s_${train_id}_${type}`).value;

    let res=await fetch(API+"bookings",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({user_id:userId,train_id,compartment_type:type,seats:parseInt(seats)})
    });

    let data=await res.json();

    if(data.error) alert(data.error);
    else{
        alert("Booked!");
        loadTrains();
        loadBookings();
    }
}

// BOOKINGS
async function loadBookings(){
    let res=await fetch(API+"bookings");
    let data=await res.json();

    bookingTable.innerHTML="";

    data.forEach(b=>{
        if(b.user_id===userId){
            bookingTable.innerHTML+=`
            <tr>
            <td>${b.booking_id}</td>
            <td>${b.username}</td>
            <td>${b.train_name} (${b.source} → ${b.destination})</td>
            <td>${b.compartment_type}</td>
            <td>${b.seats}</td>
            <td>${b.status}</td>
            <td><button onclick="cancel(${b.booking_id})">Cancel</button></td>
            </tr>`;
        }
    });
}

// CANCEL
async function cancel(id){
    await fetch(API+"cancel/"+id,{method:"PUT"});
    loadBookings();
    loadTrains();
}