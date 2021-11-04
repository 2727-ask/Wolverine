const saveTo = require('../../cred.json');
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');


var fs = require('fs');
var path = require('path');

const monthMap = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "June",
    6: "July",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

class GenerateReport {
    replaceErrors(key, value) {
        if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                error[key] = value[key];
                return error;
            }, {});
        }
        return value;
    }
    errorHandler(error) {
        console.log(JSON.stringify({ error: error }, this.replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
        }
        throw error;
    }

    generator(facName, patientName, age, date, ReferedBy) {
        console.log('Generating Report');
        const now = new Date();
        const year = now.getFullYear();
        const month = monthMap[now.getMonth()];

        const yearSetupDir = `${saveTo.saveAt}/${year}`;
        if (!fs.existsSync(yearSetupDir)) {
            fs.mkdirSync(yearSetupDir);
        } else {
            console.log(false)
        }

        const monthSetupDir = `${saveTo.saveAt}/${year}/${month}`;
        if (fs.existsSync(yearSetupDir) && !fs.existsSync(monthSetupDir)) {
            fs.mkdirSync(monthSetupDir);
        }
        

        //var content = fs.readFileSync(path.resolve('/Users/ashutoshkumbhar/Desktop/hptl_dr_f1/hptl/src/Report/ReportsTemplates/demoReportWord.docx'), 'binary');
        var content = fs.readFileSync(path.resolve(`${saveTo.reportTemplatePath}${facName}.doc`), 'binary');
        var zip = new PizZip(content);
        var doc;
        try {
            doc = new Docxtemplater(zip);
        } catch (error) {
            this.errorHandler(error);
        }

        doc.setData({
            patientName: patientName,
            age: age,
            date: date,
            ReferedBy: ReferedBy
        });

        try {
            doc.render()
        }
        catch (error) {
            this.errorHandler(error);
        }

        var buf = doc.getZip()
            .generate({ type: 'nodebuffer' });
        ///Users/ashutoshkumbhar/Desktop/hptl_dr_f1/hptl/src/Report/generated/ 
        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        const tnow = new Date();
        const timeStamp = tnow.getTime();
        
        fs.writeFileSync(path.resolve(`${monthSetupDir}/${patientName}${timeStamp}.docx`), buf);
    }


}
export default GenerateReport;