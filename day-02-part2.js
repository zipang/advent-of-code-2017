// The spreadsheet is stored as an array of array of numbers
// inside a JSON file : data/spreadsheet-?.json
// To load the test spreadsheet use --test as an argument
var fileName = `spreadsheet-${process.argv[2] || 'day2'}.json`,
	data = require("path").join(__dirname, "data", fileName),
	spreadsheet = require(data);

console.log("Advent of Code 2017 -- Day #2 - Part #2");
console.log("Processing file " + fileName);

function isInteger(n) {
	return (n == Math.trunc(n));
}
/**
 *
 * @param {Array[Number]} line
 * @return the difference between the max and min values in this array
 */
function findEvenDiff(line) {
	let found = 0, divResult, len = line.length,
		firstCandidate = 0, secondCandidate = firstCandidate+1;

	function findNextCandidates() {
		secondCandidate++;
		if (secondCandidate >= len) {
			// advance first candidate
			firstCandidate++;
			secondCandidate = firstCandidate+1;
		}
	}

	line.sort((a, b) => b - a); // this is a reverse sort : from high to low
	while (!found && firstCandidate < len) {
		divResult = line[firstCandidate] / line[secondCandidate];
		if (isInteger(divResult)) {
			found = divResult;
		} else {
			findNextCandidates();
		}
	}
	console.log("Ecart inside line " + JSON.stringify(line) + " is " + found
			+ " : " + line[firstCandidate] + " / " + line[secondCandidate]);
	return found;
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

let chksum = spreadsheet.map(findEvenDiff).reduce(checksum, 0);

console.log(`Found checksum ${chksum}`);
