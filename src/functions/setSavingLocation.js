
var jsonData = require('../../cred.json');
const fs = require('fs');


function setLocation(location) {
    jsonData.saveAt = location;
    let data = JSON.stringify(jsonData);
    fs.writeFileSync('cred.json', data);
    console.log(jsonData)
}

export default setLocation;