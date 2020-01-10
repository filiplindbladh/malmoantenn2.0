import React from "react";
import "./BlogList.css";
import { NavLink } from "react-router-dom";

const BlogList = ({ blogposts }) => {
  if (!blogposts) {
    return null;
  }
  return (
    <div className="BlogList">
      {blogposts &&
        blogposts.map(post => {
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
  );
};

export default React.memo(BlogList);
