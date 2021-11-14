
const fs = require('fs');
const mpath = require('path');
// import {dialog} from '@electron/remote'

function deleteFile(fileName) {
    console.log('FileName Recieved',fileName);
    var reportTemplatePath =  fs.readFileSync(process.cwd() + "/saveReportTemplateTo.txt").toString();
    var path = mpath.resolve(reportTemplatePath,`${fileName}.doc`);
    console.log('Report Template Path',reportTemplatePath);
    console.log('Path',path);

    // try {
    //     if (fs.existsSync(path)) {
    //         fs.unlink(path,(err)=>{
    //             console.error(err);
    //         })
    //         console.log('File Deleted');
    //     } else {
    //         dialog.showMessageBox({
    //             type:'error',
    //             message:'File Not Found'
    //         })
    //     }
    // } catch (err) {
    //     console.log(err)
    // }
}

export default deleteFile