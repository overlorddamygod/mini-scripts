const parser = require("./parser.js");
const transpiler = require("./transpiler.js");
const fs = require("fs");

const xmlToJSON = (xmlString) => {
  const { isError, error, result: ast } = parser.run(xmlString);

  if (isError) {
    throw new Error(error);
  }

  return JSON.stringify(transpiler(ast), null, 2);
};

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node index.js <xml_file_path>\n");
  console.log("Options:");
  console.log("  -o, --output  specify output file path or name");
  console.log("");
  process.exit(1);
}

const xmlFilePath = args.shift();

fs.readFile(xmlFilePath, "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  let outputFilePath = xmlFilePath + ".json";

  if (args.length > 0) {
    const flag = args.shift();

    if (flag == "-o" || flag == "--output") {
      if (args.length > 0) {
        outputFilePath = args.shift();
      } else {
        throw new Error("Output file path is not specified");
      }
    }
  }
  // write json to file
  const json = xmlToJSON(data);
  fs.writeFileSync(outputFilePath, json);
});
