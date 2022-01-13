const https = require('https');
const fs = require('fs');
const LoadingBar = require("./loadingBar");

const download = function (url, destFilename, cb = () => {}) {
  https.get(url, (res) => {
    // Not every url headers have content-disposition
    // const filename = res.headers["content-disposition"].split('filename=')[1].split(';')[0]

    let file = fs.createWriteStream(destFilename);

    console.log(`Downloading file ${destFilename} from ${url}`.green);

    const fileSize = res.headers["content-length"];
    const ld = new LoadingBar(fileSize);
    res.on("data", (chunk) => {
      ld.increase(chunk.length);
      file.write(chunk);
    });
    res.on("close", () => {
      file.close(cb);
    });
  });
};

module.exports = download;
