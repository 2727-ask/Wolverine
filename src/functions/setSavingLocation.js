
const fs = require('fs');


function setLocation(location) {
    const file = fs.readFileSync(process.cwd()+'/public/Credentials/saveReportTo.txt',{encoding:'utf8', flag:'r'});
    console.log('File',file)
    console.log('Loc',location)
    console.log('cwd',process.cwd())
    fs.writeFileSync(process.cwd()+'/public/Credentials/saveReportTo.txt',location, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}
export default setLocation;