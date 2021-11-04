//copy the $file to $dir2
const fs = require('fs');
const path = require('path');
var copyFile = async (file, dir2) => {
    console.log("Moving File ......")
    console.log('File Location is', file);
    console.log('Moving to', dir2);
    //include the fs, path modules

    try {
        var f = path.basename(file);
        var source = fs.createReadStream(file);
        var dest = fs.createWriteStream(path.resolve(dir2, f));

        source.pipe(dest);
        source.on('end', function () { console.log('Succesfully copied'); });
        source.on('error', function (err) { console.log(err); });
    } catch (error) {
        console.error(error)
    }






    //gets file name and adds it to dir2

};

export default copyFile;