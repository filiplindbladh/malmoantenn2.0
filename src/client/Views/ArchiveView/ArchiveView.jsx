import React, { Component } from "react";
import MixList from "../../components/MixList/MixList";
import axios from "axios";
import { apiKey } from "../../../apiKey";

import Loader from "../../components/Loader/Loader";
import { getAllMixes } from "./helpers";
import { Helmet } from "react-helmet";

export default class ArchiveView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mixes: [],
      next: "",
      prev: "",
      isLoading: true,
      search: "",
      searchInitated: false
    };
  }

  componentWillMount() {
    axios
      .get(`https://api.mixcloud.com/malmoantenn/cloudcasts/?code=${apiKey}`)
      .then(res => {
        this.setState({
          mixes: res.data.data,
          isLoading: false,
          next: res.data.paging.next
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    if (!this.state.searchInitated && this.state.search !== "") {
      new Promise((resolve, reject) => {
        getAllMixes(
          `https://api.mixcloud.com/malmoantenn/cloudcasts/?code=${apiKey}`,
          [],
          resolve,
          reject
        );
      }).then(response => {
        this.setState({
          mixes: response,
          searchInitated: true
        });
      });
    }
  }

  paginate() {
    axios
      .get(this.state.next)
      .then(res => {
        console.log(res);
        const joined = this.state.mixes.concat(res.data.data);
        this.setState({ mixes: joined });
        this.setState({
          next: res.data.paging.next ? res.data.paging.next : ""
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <div className="Page-container">
        <Helmet title="Malmö Antenn">
          <meta property="og:title" content="Malmö Antenn Archives" />
          <meta
            name="description"
            content="Malmö Antenn is a small collective of music enthusiasts - aiming to connect music from around the globe."
          />
        </Helmet>
        <h1 className="Heading-medium">Archive</h1>
        <label className="Hidden" id="search-label" htmlFor="search-input">
          Dig into our archives
        </label>
        <input
          id="search-input"
          type="search"
          className="input"
          placeholder="Search"
          value={this.state.search}
          aria-labelledby="search-label"
          onChange={e => this.setState({ search: e.target.value })}
        />
        <MixList mixes={this.state.mixes} search={this.state.search} />
        <div className="Pagination-buttonContainer">
          {this.state.next !== "" &&
            this.state.search.length === 0 &&
            this.state.mixes.length !== 0 && (
              <button className="Button" onClick={e => this.paginate()}>
                Show more
              </button>
            )}
        </div>
      </div>
    );
  }
}
