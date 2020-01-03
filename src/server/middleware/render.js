import escapeStringRegexp from "escape-string-regexp";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../../App";
import Helmet from "react-helmet";

const renderMiddleware = () => (req, res) => {
  let html = req.html;
  const context = {};
  const helmet = Helmet.renderStatic();
  const htmlContent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const title = helmet.title.toString();
  const meta = helmet.meta.toString();
  const link = helmet.link.toString();

  const htmlReplacements = {
    HTML_CONTENT: htmlContent,
    TITLE: title,
    META: meta,
    LINK: link
  };

  Object.keys(htmlReplacements).forEach(key => {
    const value = htmlReplacements[key];
    html = html.replace(
      new RegExp("__" + escapeStringRegexp(key) + "__", "g"),
      value
    );
  });

  res.send(html);
};

export default renderMiddleware;
