import React, {useContext, useEffect, useState} from "react";
import {RestaurantContext} from "../../context/RestaurantContext";
import {Row, Col} from "react-bootstrap";
import RecommendList from "./RecommendList";
import {getPlaces} from "../../api/placeApi";
import Pagination from "rc-pagination";
import PageLoading from "../PageLoading/pageLoading";
import "rc-pagination/assets/index.css";
import DefaultList from "./DefaultList";

export default function RestaurantList() {
  const {
    restaurants,
    totalPage,
    loadings,
    paramsContext,
    recommendedContext,
  } = useContext(RestaurantContext);
  const [list, setList] = restaurants;
  const [total, setTotal] = totalPage;
  const [loading, setLoading] = loadings;
  const [params] = paramsContext;
  const [recommended, setRecommended] = recommendedContext;
  const [current, setCurrent] = useState(1);
  const pageSize = 8;

  const handleChangePage = (curPos) => {
    updateList(curPos);
    setCurrent(curPos);
  };

  const getRecommendedList = () => {
    setLoading(true);
    const recommendParams = {
      sortby: "rating",
    };
    getPlaces(recommendParams, 1, 30)
      .then((res) => {
        setLoading(false);
        setRecommended(res.data.data.places);
        console.log("recommend", res.data.data.places);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const updateList = (curPos) => {
    setLoading(true);
    getPlaces(params, curPos, pageSize)
      .then((res) => {
        setLoading(false);
        setList(res.data.data.places);
        setTotal(res.data.data.total);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getPlaces(params, 1, pageSize)
      .then((res) => {
        setLoading(false);
        setList(res.data.data.places);
        setTotal(res.data.data.total);
        getRecommendedList();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <PageLoading/>
      ) : (
        <div>
          <Row style={{textAlign: "center"}}>
            <h4> Nhà hàng nổi bật </h4>
          </Row>
          <Row className="recommend">
            <Col sm={12}>
              <RecommendList recommendList={recommended}/>
            </Col>
          </Row>
          <Row>
            <h4> Danh sách nhà hàng </h4>
          </Row>
          <Row className="restaurant-list">
            <DefaultList defaultList={list}/>
          </Row>
          <Pagination
            total={total}
            current={current}
            pageSize={pageSize}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}
