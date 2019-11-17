const endPoint = "http://localhost:3201/car";
let tableBody = document.getElementById('table-body');
fetch(endPoint)
    .then((res) =>res.json()
    .then((data)=> tableBuild(data)))
    .catch(err => console.log(err));

const tableBuild = (carsArray) => {
    let table = '';
    for(let i = 0; i < carsArray.length; i++){
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

