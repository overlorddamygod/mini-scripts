const transpile = (tree) => {
  // console.log("TAG", tree)

  if (typeof tree == "object" && tree.type == "data") {
    // console.log("RECHABLE 1")
    return tree.value;
  }

  if (Array.isArray(tree)) {
    // console.log("RECHABLE 8")

    const next = tree;
    const tagToBeSame = next[0].name;
    // console.log("ISARRAY")
    // console.log("arr", tagToBeSame)

    const checkSame = next.every((tag) => {
      return tag.name == tagToBeSame;
    });

    if (checkSame && next.length > 1) {
      // console.log("SAME")
      // console.log("RECHABLE 9")

      return {
        [tagToBeSame]: next.map((t) => {
          return transpile(t.next);
        }),
      };
    }
    // console.log("RECHABLE 10")

    // console.log(tagToBeSame, "here")

    return next.reduce((acc, ta) => {
      if (Object.keys(acc).includes(ta.name) && !Array.isArray(acc[ta.name])) {
        acc[ta.name] = [acc[ta.name], transpile(ta.next)];
      } else if (Object.keys(acc).includes(ta.name)) {
        acc[ta.name].push(transpile(ta.next));
      } else {
        acc[ta.name] = transpile(ta.next);
      }
      return acc;
    }, {});
  }

  // console.log("RECHABLE 11")

  return tree.reduce((acc, ta) => {
    acc[ta.name] = transpile(ta.next);
    return acc;
  }, {});
};

module.exports = transpile;
