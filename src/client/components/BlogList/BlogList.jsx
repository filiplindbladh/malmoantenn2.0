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
              <NavLink key={post.slug} to={post.slug}>
                {post.title.rendered}
              </NavLink>
            )
          );
        })}
    </div>
  );
};

export default React.memo(BlogList);
