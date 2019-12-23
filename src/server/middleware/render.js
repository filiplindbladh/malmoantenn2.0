import escapeStringRegexp from "escape-string-regexp";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../../App";

const renderMiddleware = () => (req, res) => {
  let html = req.html;
  const context = {};
  const htmlContent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const htmlReplacements = {
    HTML_CONTENT: htmlContent
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
