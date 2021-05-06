import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";
import qs from "querystring";
const createClient = () => {
  return axios.create({
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0",
      cookie: `zguid=23|%24608f0477-2910-425f-9051-d44826989de0; zgsession=1|ed0c235b-a0c5-49be-861e-845d8598db89; _ga=GA1.2.1404973464.1619059983; _gid=GA1.2.237596026.1619059983; zjs_anonymous_id=%22608f0477-2910-425f-9051-d44826989de0%22; _pxvid=daed5507-a315-11eb-8601-0242ac12000f; _gcl_au=1.1.1352414788.1619059983; KruxPixel=true; DoubleClickSession=true; __pdst=6d04d6d699e0454385bc1274884a7904; _pin_unauth=dWlkPU1EbG1ZbUZrT0dVdE5UQmpaaTAwTTJKbExXSm1aV1l0TWpReFptTmxZelU0T0RNMg; utag_main=v_id:0178f77ec317001bd1a982e8f5e803068001706000bd0$_sn:1$_se:1$_ss:1$_st:1619061783128$ses_id:1619059983128%3Bexp-session$_pn:1%3Bexp-session$dcsyncran:1%3Bexp-session$tdsyncran:1%3Bexp-session$dc_visit:1$dc_event:1%3Bexp-session$dc_region:ap-northeast-1%3Bexp-session$ttd_uuid:1bf51b06-b20c-49e4-8b50-e3d94ac932fa%3Bexp-session; KruxAddition=true; _csrf=u7kcyLLZU1D88Pwp6ipd33h5; zgcus_aeut=AEUUT_f478a599-a315-11eb-8644-8aa5ee274519; zgcus_aeuut=AEUUT_f478a599-a315-11eb-8644-8aa5ee274519; optimizelyEndUserId=oeu1619060025993r0.5020142107038241; FSsampler=716864747; _cs_c=1; _cs_id=54a9fc0e-6d67-acea-bfe9-33202443a215.1619060026.1.1619060027.1619060026.1.1653224026959.Lax.0; _CT_RS_=Recording; WRUIDAWS=3260246058894334; __CT_Data=gpv=1&ckp=tld&dm=zillow.com&apv_82_www33=1&cpv_82_www33=1&rpv_82_www33=1; OptanonConsent=isIABGlobal=false&datestamp=Thu+Apr+22+2021+09%3A53%3A49+GMT%2B0700+(Indochina+Time)&version=5.11.0&landingPath=https%3A%2F%2Fwww.zillow.com%2Frental-manager%2F%3Fsource%3Dtopnav%26itc%3Dpostbutton_sitenav&groups=1%3A1%2C3%3A1%2C4%3A1; ZG_SW_REGISTERED=true; visitor_id701843=224274315; visitor_id701843-hash=f57db0963edd44dc3fc0e9895e786e60fe824bfb8eea867aa20004755f86f73fab56825f6822998a653e3bc80762e26b1ab2a6f6; swVersion=0.0.342; __stripe_mid=cf50f3fe-7158-457f-af09-1ff4dfb0cb4233d8c3; G_ENABLED_IDPS=google; zjs_user_id=%22X1-ZUsy1yzw1vh1jd_43hpa%22; userid=X|3|17f1a11e1a6864e0%7C8%7CKRDzmWYaQGO_9vEAX2mkV1H3-Rfuvgy7; loginmemento=1|5846f9a56a00c5aa366de8d30d6b2803d5de65dcdc55fdb09bd6b47614be6bd9; ZILLOW_SID=1|AAAAAVVbFRIBVVsVEg7wN5uDtdcpfjqmsRb%2FzYsv8dekGBCNhCtDyYkyd50igRStT5y%2BFd5jLleGd%2BNsLtp3GkTmQp9W; JSESSIONID=63ED96A10AD128D95B3FB775D38B3B04; _gat=1; _pxff_bsco=1; search=6|1621662382952%7Crect%3D42.34579440248775%252C-71.71351432800293%252C42.242434380934405%252C-71.90199851989746%26rid%3D14724%26disp%3Dmap%26mdm%3Dauto%26p%3D1%26sort%3Ddays%26z%3D1%26pt%3Dpmf%252Cpf%26fs%3D1%26fr%3D0%26mmm%3D1%26rs%3D0%26ah%3D0%26singlestory%3D0%26housing-connector%3D0%26abo%3D0%26garage%3D0%26pool%3D0%26ac%3D0%26waterfront%3D0%26finished%3D0%26unfinished%3D0%26cityview%3D0%26mountainview%3D0%26parkview%3D0%26waterview%3D0%26hoadata%3D1%26zillow-owned%3D0%263dhome%3D0%09%0974034%09%09%09%09%09%09; _derived_epik=dj0yJnU9amdaRV9ZaXVQY2hyTTBQcWVHdTN0S0RMaFA1cXRNR2kmbj1YUjBnZnRXZHI2UFJZeXVCOEhNR1NBJm09MSZ0PUFBQUFBR0NCRGJBJnJtPTEmcnQ9QUFBQUFHQ0JEYkE; _uetsid=db1cc400a31511eb9fb151137bb2e1c5; _uetvid=db1d0960a31511eba52bbb75af97cdca; AWSALB=0qRhbVWyoCIBW8wKcUXJJko8zCWBAlbgKsU0ouo/j5gwu9RjzkqnNl9/s/lQTWomI2AYAQjIVIFgwMBvA0Wd9rl5nFP6X8JLgxi4/gUllcCNdXOm2aQiV5qMkXJN; AWSALBCORS=0qRhbVWyoCIBW8wKcUXJJko8zCWBAlbgKsU0ouo/j5gwu9RjzkqnNl9/s/lQTWomI2AYAQjIVIFgwMBvA0Wd9rl5nFP6X8JLgxi4/gUllcCNdXOm2aQiV5qMkXJN; _px3=f4a75dd6d7b982dce12b7b0bfa1a57b9f6d8543915308b7d009820d7733b0693:wLghmAlZuU4U2DuVIIPx2hkbz2JF4wssQDOJxB6JQLpCJG3Hb5pXuHa11AqzaIJirmNbynWI6glUCrcnJ7O9Fw==:1000:9GbV7cuxN/nGqI54OLijLJ4MIaERnYPRGEdhTJQI/f1z1hMnwE6tm5oqEegIWBfwnpIDrhpn2AdlQhCYP1Xz3P7Ue/jUgEeenXKvON0oRydAPXcKNIfAzKIC/asVVFA+o6dco4IOz+uXHeYw6Zxk+CZDsPPQhW/BzrfE+r3Z8kM=`,
    },
  });
};

const getData = async ({ mapBounds, usersSearchTerm, regionSelection }, page) => {
  console.log(page);
  const client = createClient();
  const { data } = await client.get(`https://www.zillow.com/search/GetSearchPageState.htm`, {
    params: {
      searchQueryState: {
        pagination: {
          currentPage: page,
        },
        usersSearchTerm,
        mapBounds,
        regionSelection,
        isMapVisible: true,
        filterState: { isAllHomes: { value: true } },
        isListVisible: true,
        mapZoom: 7,
      },
      wants: {
        cat1: ["mapResults", "listResults"],
      },
    },
  });
  return data;
};

const getSearchState = (html) => {
  const userSearchTermFinder = html.match(/(?<=usersSearchTerm":")[0-9a-zA-Z]+/);
  const mapBoundsFinder = html.match(/(?<="mapBounds":).+(?=\,"regionSelection":\[{"regionId":[0-9]{1,})/);
  const regionFinder = html.match(/(?<="regionSelection":).+(?=,"isMapVisible":true)/);
  let userSearchTerm = null;
  let mapBounds = null;
  let region = null;
  if (userSearchTermFinder.length > 0) {
    userSearchTerm = userSearchTermFinder[0];
  }
  if (mapBoundsFinder.length > 0) {
    mapBounds = mapBoundsFinder[0];
  }
  if (regionFinder.length > 0) {
    region = regionFinder[0];
  }
  return {
    userSearchTerm,
    mapBounds: JSON.parse(mapBounds),
    region: JSON.parse(region),
  };
};

export const search = async (query, page = 1) => {
  const client = createClient();
  const { data } = await client.get(`https://www.zillow.com/homes/${query}_rb/`);
  const queryState: any = getSearchState(data);
  const results = await getData(queryState, page);

  return _.get(results, "cat1");
};

export const detail = async (id) => {
  const client = createClient();
  const { data } = await client.post(`https://www.zillow.com/graphql/?zpid=${id}`, {
    operationName: "ForSaleShopperPlatformFullRenderQuery",
    variables: { zpid: id },
    clientVersion: "home-details/6.0.11.0.0.hotfix-04-22-2021.eb5f2e6",
    queryId: "1a927544af9f5e89a46a8bf5795f28c4",
  });
  return data.data.property;
};
