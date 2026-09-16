/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
    let objectsById = {};

    for (let i = 0; i < arr1.length; i++) {
        let item = arr1[i];
        objectsById[item.id] = { ...item };
    }

    for (let i = 0; i < arr2.length; i++) {
        let item = arr2[i];

        if (objectsById[item.id] === undefined) {
            objectsById[item.id] = { ...item };
        } else {
            objectsById[item.id] = { ...objectsById[item.id], ...item };
        }
    }

    let result = Object.values(objectsById);
    result.sort(function (a, b) {
        return a.id - b.id;
    });

    return result;
};