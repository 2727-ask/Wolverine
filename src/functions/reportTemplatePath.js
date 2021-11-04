var jsonData = require('../../cred.json');
const fs = require('fs');

function configReportPath(loc) {
    jsonData.reportTemplatePath = loc;
    let data = JSON.stringify(jsonData);
    fs.writeFileSync('cred.json', data);
    console.log(jsonData)
}

export default configReportPath;