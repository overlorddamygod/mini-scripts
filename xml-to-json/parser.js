const {
  char,
  str,
  digit,
  choice,
  sequenceOf,
  regex,
  skip,
  optionalWhitespace,
  whitespace,
  between,
  anyChar,
  takeLeft,
  many,
  decide,
  anythingExcept,
  letters,
  recursiveParser,
  many1,
  endOfInput,
} = require("arcsecond");

const openTag = sequenceOf([
  char("<"),
  takeLeft(regex(/^[a-zA-Z][a-zA-z0-9 ]*/))(char(">")),
]).map((res) => {
  return {
    kind: "opentag",
    name: res[1],
  };
});

const getClosingTagParser = (tag) => {
  return [str("</"), str(tag), char(">")];
};

const whiteSpaceOrNewLine = choice([optionalWhitespace, char("\n")]);
const optionalSpaceN = skip(whiteSpaceOrNewLine);

var line = sequenceOf([
  optionalSpaceN,
  openTag,
  optionalSpaceN,
  decide((tag) => {
    const { name } = tag;
    return sequenceOf([
      choice([regex(/^[a-zA-z0-9 ]+/), many1(line)]),
      optionalSpaceN,
      ...getClosingTagParser(name),
      optionalSpaceN,
    ]);
  }),
]).map((res) => {
  const r = {
    type: "tag",
    name: res[1].name,
  };
  const next = res[3][0];

  if (typeof next == "string") {
    r["next"] = {
      type: "data",
      value: next,
    };
  } else {
    r["next"] = next;
  }
  return r;
});

const parser = many1(line);

module.exports = parser;
