import React, { Component } from "react";
import axios from "axios";
import { wpBaseUri } from "../../../apiKey";
import "./BlogPostView.css";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
import { stripHtml } from "../StartView/StartView.helpers";

export default class ArchiveView extends Component {
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
    return (
      <div className="BlogPostView">
        <Helmet title="Malmö Antenn">
          <meta
            property="og:title"
            content={post.map(post => post.title.rendered)}
          />
          <meta
            name="description"
            content={post.map(post => stripHtml(post.excerpt.rendered))}
          />
          <meta
            name="og:description"
            content={post.map(post => stripHtml(post.excerpt.rendered))}
          />
          <meta
            property="og:image"
            content={post.map(post => post.acf.image.sizes.thumbnail)}
          />
          <meta
            property="og:url"
            content={`https://malmoantenn.se/${params.slug}`}
          />

          <meta
            name="twitter:title"
            content={post.map(post => post.title.rendered)}
          />
          <meta
            name="twitter:description"
            content={post.map(post => stripHtml(post.excerpt.rendered))}
          />
          <meta
            name="twitter:image"
            content={post.map(post => post.acf.image.sizes.thumbnail)}
          />
          <meta
            name="twitter:card"
            content={post.map(post => post.title.rendered)}
          />
          <meta property="og:site_name" content="Malmö Antenn" />
        </Helmet>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="Heading-large">
              {post.map(title => title.title.rendered)}
            </h1>
            <span className="Date">
              {post.map(date => date.modified.replace(/-/g, ".").slice(0, 10))}
            </span>
            <div
              className="Editorial"
              dangerouslySetInnerHTML={{
                __html: post.map(content => content.content.rendered)
              }}
            ></div>
          </>
        )}
      </div>
    );
  }
}
