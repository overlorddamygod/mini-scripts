const https = require('https');
const fs = require('fs');
require('colors');

const download = function(url, destFilename, cb = () => {}) {
  https.get(url, res => {

    // Not every url headers have content-disposition
    // const filename = res.headers["content-disposition"].split('filename=')[1].split(';')[0]

    let file = fs.createWriteStream(destFilename);

    console.log(`Downloading file ${destFilename} from ${url}`.green)

    const fileSize = res.headers["content-length"]
    const ld = new LoadingBar(fileSize)
    res.on("data", chunk => {
      ld.increase(chunk.length)
      file.write(chunk)
    })
    res.on("close", () => {
        file.close(cb)
    })
  })
}

class LoadingBar {
  constructor(fileSize, size=100) {
      this.size = size
      this.fileSize = fileSize
      this.cursor = 0
      this.downloadedBytes = 0;
      for (let i = 0; i < this.size; i++) {
        this.write("-".blue);
      }
      this.cursorTo();
  }
  increase(chunkSize) {
    this.downloadedBytes += chunkSize;
    let percent = this.getPercent()
    let toIncrease = percent - this.cursor
    for ( let i = 0; i< toIncrease;i++) {
      this.write("+".red);
      this.cursor++;
    }
    this.cursorTo(this.size + 1)
    this.write(`${percent} %`)
    this.cursorTo(this.cursor)
  }
  cursorTo(location=0) {
    process.stdout.cursorTo(location);
  }
  write(str) {
    process.stdout.write(str)
  }
  getPercent() {
    return ((this.downloadedBytes/this.fileSize) * 100).toFixed(2)
  }
}

const [ _, __, url, filename] = process.argv

if (!url) {
  throw Error("Url of the file to download not specified")
} else {
  if (!filename ) throw Error("Filename of the file to download not specified")
  download(url, filename)
}