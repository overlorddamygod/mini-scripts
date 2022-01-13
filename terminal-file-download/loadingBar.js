require('colors');

class LoadingBar {
  constructor(fileSize, size = 100) {
    this.size = size;
    this.fileSize = fileSize;
    this.cursor = 0;
    this.downloadedBytes = 0;
    for (let i = 0; i < this.size; i++) {
      this.write("-".blue);
    }
    this.cursorTo();
  }
  increase(chunkSize) {
    this.downloadedBytes += chunkSize;
    let percent = this.getPercent();
    let toIncrease = percent - this.cursor;
    for (let i = 0; i < toIncrease; i++) {
      this.write("+".red);
      this.cursor++;
    }
    this.cursorTo(this.size + 1);
    this.write(`${percent} %`);
    this.cursorTo(this.cursor);
  }
  cursorTo(location = 0) {
    process.stdout.cursorTo(location);
  }
  write(str) {
    process.stdout.write(str);
  }
  getPercent() {
    return ((this.downloadedBytes / this.fileSize) * 100).toFixed(2);
  }
}

module.exports = LoadingBar;
