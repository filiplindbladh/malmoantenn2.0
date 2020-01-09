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
              <div key={post.slug} style={{ width: "25%" }}>
                <NavLink to={post.slug}>
                  <img
                    style={{ width: "100%" }}
                    src={post.acf.image.sizes.thumbnail}
                    alt={post.title.rendered}
                  ></img>
                  <p>{post.title.rendered}</p>
                </NavLink>
              </div>
            )
          );
        })}
    </div>
  );
};

export default React.memo(BlogList);
