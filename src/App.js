import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import StartView from "../src/client/Views/StartView/StartView";
import ArchiveView from "../src/client/Views/ArchiveView/ArchiveView";
import BlogPostView from "../src/client/Views/BlogPostView/BlogPostView";

import Menu from "../src/client/components/Menu/Menu";

export default function App() {
  // const history = createBrowserHistory();
  // const dataLayer = (window.dataLayer = window.dataLayer || []);
  // history.listen(() => {
  //   dataLayer.push({
  //     event: "virtual_pageview",
  //     pageData: {
  //       location: window.location,
  //       path: window.location.pathname,
  //       title: window.location.title,
  //       hostname: window.location.hostname
  //     }
  //   });
  // });
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/" exact component={StartView} />
        <Route path="/archive" exact component={ArchiveView} />
        <Route path="/:slug" component={BlogPostView} />
      </Switch>
    </>
  );
}
