const fs = require("fs")

const dir = ( folderName=".", level = 0, barOrSpace=[], addBar = false ) => {
	const files = fs.readdirSync(folderName)

	if ( addBar ) {
		barOrSpace.push("│  ")
	}

	files.forEach((file, index) => {
		const path = folderName + "/" + file;

		console.log(`${barOrSpace.join("")}│_ ${file}`)
		
		if ( isDir(path) ) {
			if ( index == files.length - 1 ) {
				barOrSpace[level] = "   "
				dir(path, level + 1, barOrSpace, false)
			} else {
				dir(path, level + 1, barOrSpace, true)
			}
		}
	})
	barOrSpace.pop()
}

function isDir(path) {
	try {
		const stat = fs.lstatSync(path);
		return stat.isDirectory();
	} catch (e) {
		return false;
	}
}

if ( process.argv.length == 3 ) {
	dir(process.argv[2])
} else {
	dir()
}
