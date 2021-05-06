import React, { useEffect, useMemo, useState } from "react";
import "./App.scss";
import { Helmet } from "react-helmet";
import { API$search, API$detail } from "./api";

import { Input, Button, Spin, List, Image, Modal } from "antd";

const Head = () => {
  return (
    <Helmet>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.15.2/antd.min.js" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.15.2/antd.min.css" />
    </Helmet>
  );
};

const Item = ({ data, onDetail }) => {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <p>{data.name}</p>

      <p>
        {data.address["street1"]} {data.address["street2"]} {data.address["zip"]} {data.address["city"]}
      </p>
      <p>
        {data.schoolType} {data.gradeLevels}
      </p>
      <p>{data.rating}/10</p>
      <p>{data.enrollment} students</p>
      <a href={`/api/detail?path=${data.links.profile}`} target="_blank">
        Detail JSON
      </a>
    </div>
  );
};

export default () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalDetail, setModalDetail] = useState(null);
  useEffect(() => {
    if (selectedId) {
      API$detail(selectedId).then(d => setModalDetail(d));
    }
  }, [selectedId]);
  const search = async () => {
    setIsLoading(true);
    const data = await API$search(query, page);
    setData(data);
    setIsLoading(false);
  };

  return (
    <>
      <Head />
      <Spin spinning={isLoading}>
        <div className="search_box">
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Zipcode, State, City,..." />
          <Button type="primary" onClick={search}>
            Search
          </Button>
        </div>
      </Spin>

      <div className="result_wrapper">
        {data && data["results"] && (
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data.results}
            renderItem={(r: any) => (
              <Item
                data={r}
                onDetail={() => {
                  setSelectedId(r.zpid);
                  setIsShowDetail(true);
                }}
              />
            )}
          />
        )}
      </div>
      <Modal closable={true} visible={isShowDetail} onCancel={() => setIsShowDetail(false)}>
        {selectedId}
        {modalDetail && (
          <>
            <p>{modalDetail.description}</p>
            {modalDetail.photos.map(p => (
              <Image src={p.mixedSources.jpeg[0].url} />
            ))}
          </>
        )}
      </Modal>
    </>
  );
};
