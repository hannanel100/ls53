const dalFunc = require('./dal');
const dal = dalFunc('./db/test.json');
const uuid = require('uuid/v1');

function getCar(id, callback) {
    dal.readOne(id, (e, carData) => {
        if (e) {
            callback(e);
        } else {
            callback(null, carData);
        }
    })

}
function getCars(callback) {
    dal.readAll((e, allcars) => {
        if (e) {
            callback(e);
        } else {
            callback(null, allcars);
        }
    })
}

function createCar(addedCar, callback) {
    addedCar.id = uuid();
    dal.saveOne(addedCar, (e, data) => {
        if (e) {
            callback(e);
        } else {
            callback(null, data);
        }
    })

}

function updateCar(carToUpdate, callback) {
    dal.updateOne(carToUpdate, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function deleteCar(carToDelete, callback) {
    dal.deleteOne(carToDelete, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

module.exports.getCar = getCar;
module.exports.getCars = getCars;
module.exports.createCar = createCar;
module.exports.deleteCar = deleteCar;
module.exports.updateCar = updateCar;