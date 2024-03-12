import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../component/Spinner/Spinner";
import "./News.css";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null); // State to hold the error

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message); // Set the error state with the error message
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News App`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pagesize}`;
      setPage(nextPage);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles([...articles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message); // Set the error state with the error message
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Select Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/news/general">
            General
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/news/technology">
            Technology
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/news/business">
            Business
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/news/entertainment">
            Entertainment
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/news/health">
            Health
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/news/science">
            Science
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/news/sports">
            Sports
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "30px" }}
      >
        News App -- Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {error && <p>Error: {error}</p>} {/* Display error message if error state is not null */}
      {articles.length === 0 && !error ? <Spinner /> : null}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItems
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={
                      element.urlToImage ||
                      "https://cdn.ndtv.com/common/images/ogndtv.png"
                    }
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pagesize: 6, // Added default pagesize
  category: "",
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired, // Added required prop type for apikey
};

export default News;
