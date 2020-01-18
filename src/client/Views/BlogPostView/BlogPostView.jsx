import React, { Component } from "react";
import axios from "axios";
import { wpBaseUri } from "../../../apiKey";
import "./BlogPostView.css";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
import { stripHtml } from "../StartView/StartView.helpers";

export default class BlogPostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
      isLoading: true
    };
  }

  componentWillMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`${wpBaseUri}/wp-json/wp/v2/posts?slug=${params.slug}`)
      .then(res => {
        this.setState({ post: res.data, isLoading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { post, isLoading } = this.state;
    const {
      match: { params }
    } = this.props;

    if (isLoading && post.length === 0) {
      return (
        <div className="BlogPostView">
          <Helmet title={"Malmö Antenn best of 2019"}>
            <meta property="og:title" content={"Malmö Antenn best of 2019"} />
            <meta
              name="description"
              content={
                "Our favorites from 2019 To celebrate our new blog we present a list of our favorite releases of 2019. Local talents, friends and superstars are all represented. Have a listen, get inspired, and support these great artists! Also check out the broadcast with Olle Trens and Machine Soul Studios summarizing the list and their fav..."
              }
            />
            <meta
              name="og:description"
              content={
                "Our favorites from 2019 To celebrate our new blog we present a list of our favorite releases of 2019. Local talents, friends and superstars are all represented. Have a listen, get inspired, and support these great artists! Also check out the broadcast with Olle Trens and Machine Soul Studios summarizing the list and their fav..."
              }
            />
            <meta
              property="og:image"
              content="https://filil.se/wp/wp-content/uploads/2019/12/mabmc.jpg"
            />
            <meta
              property="og:url"
              content={`https://malmoantenn.se/${params.slug}`}
            />

            <meta name="twitter:title" content={"Malmö Antenn best of 2019"} />
            <meta
              name="twitter:description"
              content={
                "Our favorites from 2019 To celebrate our new blog we present a list of our favorite releases of 2019. Local talents, friends and superstars are all represented. Have a listen, get inspired, and support these great artists! Also check out the broadcast with Olle Trens and Machine Soul Studios summarizing the list and their fav..."
              }
            />
            <meta
              name="twitter:image"
              content="https://filil.se/wp/wp-content/uploads/2019/12/mabmc.jpg"
            />
            <meta name="twitter:card" content={"Malmö Antenn best of 2019"} />
          </Helmet>
          <Loader />
        </div>
      );
    }
    const title = post.map(post => post.title.rendered);
    const excerpt = post.map(post => stripHtml(post.excerpt.rendered));
    return (
      <div className="BlogPostView">
        <Helmet title={title}>
          <meta property="og:title" content={title} />
          <meta name="description" content={excerpt} />
          <meta name="og:description" content={excerpt} />
          <meta
            property="og:image"
            content="https://filil.se/wp/wp-content/uploads/2019/12/mabmc.jpg"
          />
          <meta
            property="og:url"
            content={`https://malmoantenn.se/${params.slug}`}
          />

          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={excerpt} />
          <meta
            name="twitter:image"
            content={post.map(post => post.acf.image.sizes.thumbnail)}
          />
          <meta name="twitter:card" content={title} />
        </Helmet>

        <h1 className="Heading-large">{title}</h1>
        <span className="Date">
          {post.map(date => date.modified.replace(/-/g, ".").slice(0, 10))}
        </span>
        <div
          className="Editorial"
          dangerouslySetInnerHTML={{
            __html: post.map(content => content.content.rendered)
          }}
        ></div>
      </div>
    );
  }
}
