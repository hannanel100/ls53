const dalFunc = require('./dal');
const dal = dalFunc('./db/test.json');

function getCar(id, callback) {
    dal.readOne(id,  (e, carData) => {
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
    if (typeof addedCar.id !== 'number') {
        callback('car id should be string');
    } else {
        dal.saveOne(addedCar, (e) => {
            if (e) {
                callback(e);
            } else {
                callback(null);
            }
        })
    }
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