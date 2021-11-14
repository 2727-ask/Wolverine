const fs = require("fs");

class FileOperations {
    deleteFile(loc) {
        try {
            if (fs.existsSync(loc)) {
                try {
                    fs.unlinkSync(loc, (err) => {
                        console.log(err);
                        return true;
                    })
                    return true;
                } catch (error) {
                    console.log(error);
                }
            } else {
                return true;
            }
        } catch (err) {
            console.error(err)
        }
    }
    renameFile(prev, latest) {
        console.log("Attempting to Renaming File");
        console.log("Prev", prev);
        console.log("Latest", latest);
        if (fs.existsSync(prev)) {
            console.log('File Exists')
            try {
                fs.rename(prev, latest, (err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default FileOperations;