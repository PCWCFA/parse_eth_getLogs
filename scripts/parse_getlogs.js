const fs = require("fs");

function readAlchemyJson() {
	let alchemyTxHashes = [];
	let alchemyTxCounts = 0;

	const filePathsJuly22 = [
		"./data/results_diamond_17744951_17746953.json",
		"./data/results_diamond_17747954_17752101.json",
	];

	filePathsJuly22.forEach((fileName) => {
		// Sync read
		try {
			const data = fs.readFileSync(fileName, "utf8");
			console.log(`Readiing ${fileName}`);
			try {
				const parsedObject = JSON.parse(data);
				const resultArray = parsedObject.result;
				for (let i = 0; i < resultArray.length; i++) {
					if (!resultArray[i].removed) {
						alchemyTxHashes[alchemyTxCounts++] = resultArray[i].transactionHash;
					}
				}
			} catch (err) {
				console.error("Error parsing the object:", err);
			}
		} catch (err) {
			console.error("Error reading the file:", err);
		}
	});
	console.log(`Alchemy tx count: ${alchemyTxHashes.length}`);
	return alchemyTxHashes;
}

function readFSJson() {
	let fsTxHashes = [];
	let fsTxCounts = 0;

	const fsFileJuly22 = ["./data/fs_zksync_bridge_in_2023-07-22.json"];

	fsFileJuly22.forEach((fileName) => {
		// Sync read
		try {
			const data = fs.readFileSync(fileName, "utf8");
			console.log(`Readiing ${fileName}`);
			try {
				const parsedObject = JSON.parse(data);
				for (let i = 0; i < parsedObject.length; i++) {
					fsTxHashes[fsTxCounts++] = parsedObject[i].TX_HASH;
				}
			} catch (err) {
				console.error("Error parsing the object:", err);
			}
		} catch (err) {
			console.error("Error reading the file:", err);
		}
	});

	console.log(`FS tx count: ${fsTxHashes.length}`);
	return fsTxHashes;
}

function matchTxHashes(alchemyTxHashes, fsTxHashes) {
	let unmatchedAlchemyTxHashes = [];
	let unmatchedCounts = 0;
	try {
		alchemyTxHashes.forEach((alchemyTxHash) => {
			if (!fsTxHashes.includes(alchemyTxHash)) {
				console.log(alchemyTxHash);
				unmatchedAlchemyTxHashes[unmatchedCounts++] = alchemyTxHash;
			}
		});
	} catch (error) {
		console.error(`matchTxHashes: ${error.message}`);
	}
	console.log(`Unmatched Alchemy counts: ${unmatchedAlchemyTxHashes.length}`);
	return "Success";
}

function main() {
	let alchemyTxHashes, fsTxHashes;
	try {
		alchemyTxHashes = readAlchemyJson();
	} catch (error) {
		console.error(`main readAlchemJson: ${error.message}`);
	}
	try {
		fsTxHashes = readFSJson();
	} catch (error) {
		console.error(`main readFSJson: ${error.message}`);
	}
	try {
		matchTxHashes(alchemyTxHashes, fsTxHashes);
	} catch (error) {
		console.error(`main matchTxHashes ${error.message}`);
	}
}

main();
