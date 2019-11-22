const fs = require('fs');
let fileName = './db/test.json';


function readOne(id, callback) {
    fs.readFile(fileName, (e, d) => {
        console.log(d);
        const elements = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const correctElement = elements.filter((elem)=>{
            return elem.id == id;
        });
        console.log(elements);
        if (e) {
            callback(e);
        }
        else {
            callback(null, correctElement[0]);
        }
    })

}
function readAll(callback) {
    fs.readFile(fileName, (e, d) => {
        const allElements = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        // allElements.sort(function (a, b) {
        //     return a.id - b.id;
        // });
        // allElements.sort
        if (e) {
            callback(e);
        } else {
            callback(null, allElements);
        }
    })
}
function saveOne(addedElement, callback) {
    fs.readFile(fileName, (e, d) => {
        const allElements = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allElements.push(addedElement);
        fs.writeFile(fileName, JSON.stringify(allElements), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}
function updateOne(elementToUpdate, callback) {
    fs.readFile(fileName, (e, d) => {
        let allElements = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allElements.map((Element) => {
            if (element.id.toString() == elementToUpdate.id.toString()) {
                // element.carrier = ElementToUpdate.carrier;
                // Element.id = ElementToUpdate.id;
                // Element.imageUrl = ElementToUpdate.imageUrl;
                // Element.name = ElementToUpdate.name;
                // Element.snippet = ElementToUpdate.snippet;
            }
        })
        fs.writeFile(fileName, JSON.stringify(allElements), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null);
            }
        });
    })
}
function deleteOne(elementToDelete, callback) {
    fs.readFile(fileName, (e, d) => {
        let allElements = d && d.length > 0 ? JSON.parse(d.toString()) : [];

        allElements = allElements.filter(r => r.id !== elementToDelete);

        fs.writeFile(fileName, JSON.stringify(allElements), (e) => {
            if (e) {
                callback(e);
            } else {
                callback(null);
            }
        })
    });
}
const dalModule = (fileNameSpecific) => {
    fileName = fileNameSpecific;
    return {
        readAll: readAll,
        readOne: readOne,
        saveOne: saveOne,
        deleteOne: deleteOne,
        updateOne: updateOne
    }
}
module.exports = dalModule;