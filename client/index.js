
const endPoint = "http://localhost:3201/car";
let tableBody = document.getElementById('table-body');
fetch(endPoint)
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
                </tr>`
    }
    tableBody.innerHTML = table;
}


const loginBtn = document.getElementById('login-btn')
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
            'Authorization': 'basic ' + btoa(params.user + ':' + params.pass)
        }
    }).then(res => {
        delete params;
        res.text().then(token => {
            window.localStorage.setItem('token', token);
        })
    })
})
