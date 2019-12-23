import React, { Component } from "react";
import Header from "../../components/Header/Header";
import MixList from "../../components/MixList/MixList";
import EventsList from "../../components/EventsList/EventsList";
import axios from "axios";
import { apiKey, wpBaseUri, mixlrApi } from "../../../apiKey";
import "./StartView.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { renderHelmet } from "./StartView.helpers";
import BlogList from "../../components/BlogList/BlogList";

export default class StartView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mixes: [],
      events: [],
      description: "",
      isLoading: true,
      isLive: false,
      blogposts: []
    };
  }

  componentWillMount() {
    axios
      .get(`https://api.mixcloud.com/malmoantenn/cloudcasts/?code=${apiKey}`)
      .then(res => {
        this.setState({ mixes: res.data.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(`${wpBaseUri}/wp-json/tribe/events/v1/events`)
      .then(res => {
        this.setState({ events: res.data.events, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(`${wpBaseUri}/wp-json/wp/v2/pages/2`)
      .then(res => {
        this.setState({ description: res.data.acf.description });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(`${wpBaseUri}/wp-json/wp/v2/posts`)
      .then(res => {
        this.setState({ blogposts: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(mixlrApi)
      .then(res => {
        this.setState({ isLive: res.data.is_live });
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
      <div className="StartView">
        {renderHelmet()}
        <Header
          description={this.state.description}
          status={this.state.status}
          isLive={this.state.isLive}
        />
        <div className="Page-container">
          <EventsList events={this.state.events} />
          <h2 className="Heading-medium">Blog</h2>
          <BlogList blogposts={this.state.blogposts} />
          <div>
            <h2 className="Heading-medium">Archive</h2>
          </div>
          <MixList mixes={this.state.mixes.slice(0, 8)} isStartPage />
          <div className="Pagination-buttonContainer">
            <Link to="/archive">
              <button className="Button">Archive</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
