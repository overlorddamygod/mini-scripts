const download = require("./download");

const [ _, __, url, filename] = process.argv

if (!url) {
  throw Error("Url of the file to download not specified")
} else {
  if (!filename ) throw Error("Filename of the file to download not specified")
  download(url, filename)
}

module.exports = download;