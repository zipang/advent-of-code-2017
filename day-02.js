// The spreadsheet is stored as an array of array of numbers
// inside a JSON file : data/spreadsheet-?.json
// To load the test spreadsheet use --test as an argument
var data = require("path").join(__dirname, process.argv[2] === "--test" ? "data/spreadsheet-test.json" : "data/spreadsheet-day2.json"),
    spreadsheet = require(data);

console.log("Advent of Code 2017 -- Day #2 - Part #1");
console.dir(process.argv);

/**
 *
 * @param {Array[Number]} line
 * @return the difference between the max and min values in this array
 */
function diffLine(line) {
    line.sort((a, b) => a - b);
    let min = line[0],
        max = line[line.length-1];
    console.log("Ecart inside line " + JSON.stringify(line) + " is " + (max-min))
    return (max - min);
}

/**
 * @param last accumulated sum
 * @param cur  new line difference
 */
function checksum(last, cur) {
    return (last + cur);
}

console.log(`Loaded spreadsheet : ${data}`);
console.log(JSON.stringify(spreadsheet));

let chksum = spreadsheet.map(diffLine).reduce(checksum, 0);

console.log(`Found checksum ${chksum}`);
