
const endPoint = "http://localhost:3201/car";
let tableBody = document.getElementById('table-body');
fetch(endPoint, {
    headers: {
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
})
    .then((res) => res.json()
        .then((data) => tableBuild(data)))
    .catch(err => console.log(err));

const tableBuild = (carsArray) => {
    let table = '';
    for (let i = 0; i < carsArray.length; i++) {
        table += `<tr>
                    <td>${carsArray[i].id}</td>
                    <td>${carsArray[i].name}</td>
                    <td>${carsArray[i].price}</td>
                    <td>${carsArray[i].monthly}</td>
                    <td>${carsArray[i].currency}</td>
                    <td>${carsArray[i].doors}</td>
                    <td>${carsArray[i].seats}</td>
                    <td><input type="button" value="Edit" class="editBtn" id="edit-${carsArray[i].id}">
                    <input type="button" value="Delete" class="delBtn" id="del-${carsArray[i].id}">
                    </td>
                </tr>`
    }
    tableBody.innerHTML = table;
}


const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
        //GET INPUT OF USERNAME
        const params = {
            user: document.getElementById('user').value,
            pass: document.getElementById('pass').value
        };
        console.log(params);
        fetch('http://localhost:3201/auth', {
            method: 'POST',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'basic ' + btoa(params.user + ':' + params.pass)
            }
        }).then(res => {
            delete params;
            res.text().then(token => {
                window.localStorage.setItem('token', token);
            })
        })
    })


}


document.body.addEventListener('click', function (event) {
    if (event.target.className == 'editBtn' || event.target.className == 'delBtn') {
        if (event.target.className == 'editBtn') {
            //turn row to editable and send data to server
        }
        else if (event.target.className == 'delBtn') {
            let id = event.target.id.split('-')[1];
            fetch(`${endPoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'authorization': 'Bearer ' + window.localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json()
                    .then((data) => tableBuild(data)))
                .catch(err => console.log(err));

        }
    };
});

document.getElementById("add").addEventListener('click', function (event) {
    let carObj = {
        id: '',
        name: '',
        price: '',
        monthly: '',
        currency: '',
        doors: '',
        seats: ''
    }
    carObj.name = document.getElementById('add-name').value;
    carObj.price = document.getElementById('add-price').value;
    carObj.monthly = document.getElementById('add-monthly').value;
    carObj.currency = document.getElementById('add-currency').value;
    carObj.doors = document.getElementById('doors').value;
    carObj.seats = document.getElementById('seats').value;
    let id = //need to find last id and add one more to it so i can send it to server in fetch-post
        fetch(`${endPoint}/`, {
            method: 'POST',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('token'),
            }
        }).then(res => {
            delete params;
            res.text().then(token => {
                window.localStorage.setItem('token', token);
            })
        })
})