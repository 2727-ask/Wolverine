import saveAt from "../../cred.json";
const fs = require('fs');
async function deleteFile(fileName) {
    console.log(fileName);
    var path = `${saveAt.reportTemplatePath}${fileName}.doc`;
    try {
        if (fs.existsSync(path)) {
            fs.unlink(path,(err)=>{
                console.error(err);
            })
            console.log('File Deleted');
        } else {
            console.log("File does not exist.")
        }
    } catch (err) {
        console.error(err)
    }


}

export default deleteFile