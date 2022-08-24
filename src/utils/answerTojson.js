const fs = require('fs');
const path = require('path');

/**
 * It takes in a data object and a filename, and writes the data object to a file with the filename.
 * @param data - the data to be written to the file
 * @param filename - the name of the file you want to write to
 */
function answerTojson(data,filename){
    fs.writeFileSync(path.resolve(__dirname, '../answers',
        filename),
    JSON.stringify(data));
}

module.exports = answerTojson