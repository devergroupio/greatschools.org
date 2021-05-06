const fs = require("fs");

const cheerio = require("cheerio");

const data2Json = () => {
  const data = fs.readFileSync("./detail.html", {
    encoding: "utf-8"
  });

  const $ = cheerio.load(data);

  const fields = $("[data-component-name]").toArray();
  return fields.reduce((p, f) => {
    const fieldName = $(f).attr("data-component-name");
    const filedData = JSON.parse($(f).html());
    p[fieldName] = filedData;
    return p;
  }, {});
};

const res = data2Json();
fs.writeFileSync("./detail.json", JSON.stringify(res));
