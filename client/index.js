const TOKEN_LOCAL_STORAGE_KEY = 'token';

const links = document.querySelectorAll("nav li [data-href]");
const methods = {
    POST: "POST",
    GET: "GET"
}
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault();
        navigate(this.dataset.href)
    })
}

const navigate = (url) => {
    const main = document.getElementById("main");
    switch (url) {

        case 'login':

            main.innerHTML = '';
            const p = buildLoginHtml();
            main.appendChild(p);
            break;
        case 'admin':
            ajaxCall('cars', methods.GET, null, function (data) {
                data = JSON.parse(data);
                const adminHtml = buildAdminHtml(data);
                main.appendChild(adminHtml);
            });
            break;
        case 'client':
            ajaxCall('cars', methods.GET, null, (data) => {
                data = JSON.parse(data);
                let table = buildCarTable(data);
                main.appendChild(table);
            });
            break;
        default:
            break;
    }
}
const buildLoginHtml = () => {
    const parent = document.createElement('div');
    const nameInput = document.createElement('input');
    nameInput.name = "user-name";
    nameInput.id = "user";
    nameInput.type = 'text';
    nameInput.placeholder = "Username";
    const passInput = document.createElement('input');
    passInput.name = "password";
    passInput.id = "pass";
    passInput.type = 'password';
    passInput.placeholder = "Password";
    const loginInput = document.createElement('input');
    loginInput.value = "Admin Login";
    loginInput.id = "login-btn";
    loginInput.type = 'button';
    loginInput.addEventListener('click', () => {
        ajaxCall('login', methods.POST, {
            name: document.querySelector("input[name='user-name']").value,
            pass: document.querySelector("input[name='password']").value
        }, (token) => window.localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token))
    })
    parent.appendChild(nameInput);
    parent.appendChild(passInput);
    parent.appendChild(loginInput);

    return parent;
}

const ajaxCall = (endPoint, verb, data, callback) => {
    const serverBaseUrl = "http://localhost:3201/"
    const headers = {
        'Content-Type': 'application/json'
    }
    if (window.localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
        headers['authorization'] = 'bearer ' + window.localStorage.getItem('token');
    }
    else if (endPoint === "login") {
        headers['authorization'] = 'basic ' + btoa(data.name + ':' + data.pass);
    }
    const fetchOptions = {
        method: verb,
        headers: headers
    }
    if (verb === methods.POST && data) {
        fetchOptions['body'] = JSON.stringify(data);
    }
    fetch(serverBaseUrl + endPoint, fetchOptions)
        .then(res => {
            res.text()
                .then(data => {
                    callback(data);
                })
        })
}
const buildCarTable = (data) => {
    let table = document.createElement("table");
    console.log(data)
    generateTable(table, data);
    generateTableHead(table, Object.keys(data[0]));


    return table;
}
const generateTableHead = (table, data) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
const generateTable = (table, data) => {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
const buildAdminHtml = (data) => {


    const parent = document.createElement('div');
    let add = generateAddCarHtml(data);
    const buttonsDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.name = "edit";
    const delBtn = document.createElement('button');
    delBtn.name = "delete";
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(delBtn);
    const tableCarsArray = data.map(v => ({ ...v, buttons: buttonsDiv }))
    const table = buildCarTable(tableCarsArray);
    parent.appendChild(table);
    return parent;
}
const generateAddCarHtml = (data) => {

    let parent = document.createElement('div');

    return parent;

}
    // const endPoint = "http://localhost:3201/car";
    //     let tableBody = document.getElementById('table-body');
    //     fetch(endPoint, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'authorization': 'Bearer ' + window.localStorage.getItem('token'),
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((res) => res.json()
    //             .then((data) => tableBuild(data)))
    //         .catch(err => console.log(err));

    //     const loginBtn = document.getElementById('login-btn');
    //     if (loginBtn) {
    //         loginBtn.addEventListener("click", function (e) {

    //             const params = {
    //                 user: document.getElementById('user').value,
    //                 pass: document.getElementById('pass').value
    //             };
    //             console.log(params);
    //             fetch('http://localhost:3201/auth', {
    //                 method: 'POST',
    //                 body: JSON.stringify(),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'authorization': 'basic ' + btoa(params.user + ':' + params.pass)
    //                 }
    //             }).then(res => {
    //                 delete params;
    //                 res.text().then(token => {
    //                     window.localStorage.setItem('token', token);
    //                 })
    //             })
    //         })


    //     }


    //     document.body.addEventListener('click', function (event) {
    //         if (event.target.className == 'editBtn' || event.target.className == 'delBtn') {
    //             if (event.target.className == 'editBtn') {
    //                 //turn row to editable and send data to server
    //             }
    //             else if (event.target.className == 'delBtn') {
    //                 let id = event.target.id.split('-')[1];
    //                 fetch(`${endPoint}/${id}`, {
    //                     method: 'DELETE',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'authorization': 'Bearer ' + window.localStorage.getItem('token'),
    //                         'Content-Type': 'application/json'
    //                     },

    //                 })
    //                     .then((res) => res.json()
    //                         .then((data) => tableBuild(data)))
    //                     .catch(err => console.log(err));

    //             }
    //         };
    //     });

    //     document.getElementById("add").addEventListener('click', function (event) {
    //         //add car model = function consructur for obj
    //         let carObj = {
    //             id: '',
    //             name: '',
    //             price: '',
    //             monthly: '',
    //             currency: '',
    //             doors: '',
    //             seats: ''
    //         }
    //         carObj.name = document.getElementById('add-name').value;
    //         carObj.price = document.getElementById('add-price').value;
    //         carObj.monthly = document.getElementById('add-monthly').value;
    //         carObj.currency = document.getElementById('add-currency').value;
    //         carObj.doors = document.getElementById('doors').value;
    //         carObj.seats = document.getElementById('seats').value;
    //         fetch(`${endPoint}`, {
    //             method: 'POST',
    //             body: JSON.stringify(),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authorization': 'Bearer ' + window.localStorage.getItem('token'),
    //             },
    //             body: JSON.stringify({ car: carObj }),
    //         }).then(res => {
    //             delete params;
    //             res.text().then(token => {
    //                 window.localStorage.setItem('token', token);
    //             })
    //         })
    //     })
    // }
