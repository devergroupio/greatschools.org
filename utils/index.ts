import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";
import qs from "querystring";
import fs from "fs";
const createClient = () => {
  return axios.create({
    baseURL: "https://www.greatschools.org",
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0"
    }
  });
};

const data2Json = data => {
  fs.writeFileSync("./data.html", data);
  const $ = cheerio.load(data);

  const fields = $("[data-component-name]").toArray();
  const info = $("[type='application/ld+json']").toArray();
  const fieldsData = fields.reduce((p, f) => {
    const fieldName = $(f).attr("data-component-name");
    const filedData = JSON.parse($(f).html());
    p[fieldName] = filedData;
    return p;
  }, {});

  const infoData = info.reduce((p, f) => {
    const filedData = JSON.parse($(f).html());
    p.push(filedData);
    return p;
  }, []);
  return {
    fieldsData,
    infoData
  };
};
export const search = async (query, page = 1) => {
  const client = createClient();
  const { data } = await client.get("/search/search.page", {
    params: {
      q: query,
      page
    }
  });
  const searchResults = data.match(/(?<=gon\.search=).+(?=\}\;)}/g);
  if (searchResults) {
    const results = JSON.parse(searchResults);
    return _.pick(results, ["schools", "pageSize", "totalPages", "total"]);
  } else {
    return [];
  }
};

export const detail = async path => {
  const client = createClient();
  const { data } = await client.get(path);

  return data2Json(data);
};
