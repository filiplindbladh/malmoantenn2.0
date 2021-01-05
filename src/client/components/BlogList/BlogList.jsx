import React from "react";
import "./BlogList.css";
import { NavLink } from "react-router-dom";

const BlogList = ({ blogposts }) => {
  if (!blogposts || !blogposts.length) {
    return null;
  }
  return (
    <>
    <h2 className="Heading-medium">Blog</h2>
    <div className="BlogList">
        {blogposts.map(post => {
          return (
            post && (
              <div className="BlogList-card" key={post.slug}>
                <NavLink className="BlogList-link" to={post.slug}>
                  <img
                    className="BlogList-image"
                    src={post.acf.image.sizes.thumbnail}
                    alt={post.title.rendered}
                  ></img>
                  <span className="Date">
                    {post.date.replace(/-/g, ".").slice(0, 10)}
                  </span>
                  <p className="Heading-small">{post.title.rendered}</p>
                </NavLink>
              </div>
            )
          );
        })}
    </div>
    </>
  );
};

export default React.memo(BlogList);
