import React from "react";
import { Helmet } from "react-helmet";

export const renderHelmet = () => {
  return (
    <>
      <Helmet title="Malmö Antenn - A web based radio from Sweden">
        <meta
          property="og:title"
          content="Malmö Antenn - A web based radio from Sweden"
        />
        <meta
          name="og:description"
          content="Malmö Antenn is a small collective of music enthusiasts - aiming to connect music from around the globe."
        />
        <meta
          name="description"
          content="Malmö Antenn is a small collective of music enthusiasts - aiming to connect music from around the globe."
        />
        <meta
          property="og:image"
          content="https://malmoantenn.se/MalmoAntenn.jpg"
        />
        <meta property="og:url" content="https://malmoantenn.se/" />

        <meta
          name="twitter:title"
          content="Malmö Antenn - A web based radio from Sweden"
        />
        <meta
          name="twitter:description"
          content="Malmö Antenn is a small collective of music enthusiasts - aiming to connect music from around the globe."
        />
        <meta
          name="twitter:image"
          content="https://malmoantenn.se/MalmoAntenn.png"
        />
        <meta name="twitter:card" content="Malmö Antenn Logo" />
        <meta property="og:site_name" content="Malmö Antenn" />
      </Helmet>
    </>
  );
};

export const stripHtml = html => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
