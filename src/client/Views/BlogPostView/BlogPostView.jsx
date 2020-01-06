import React, { useEffect, useState } from "react";
import axios from "axios";
import { wpBaseUri } from "../../../apiKey";
import "./BlogPostView.css";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { stripHtml } from "../StartView/StartView.helpers";

export const BlogPostView = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { slug } = useParams();
  useEffect(() => {
    axios
      .get(`${wpBaseUri}/wp-json/wp/v2/posts?slug=${slug}`)
      .then(res => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  if (!post) {
    return null;
  }
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
};

export default BlogPostView;
