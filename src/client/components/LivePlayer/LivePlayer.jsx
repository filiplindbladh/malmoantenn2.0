import React from "react";
import "./LivePlayer.css";

const LivePlayer = () => {
    return (
        <div className="LivePlayer">
            <iframe
                title="Listen to the Malmö Antenn broadcast"
                src="https://mixlr.com/users/5672861/embed"
                width="100%"
                height="180px"
                scrolling="no"
                frameBorder="no"
                marginHeight="0"
                marginWidth="0"
            ></iframe>
        </div>
    );
};

export default LivePlayer;
