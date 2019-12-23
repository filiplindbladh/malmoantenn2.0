import React, { useRef } from "react";
import "./MixCard.css";
import { useIsOnScreen } from "../../hooks/useIsOnScreen";

const MixCard = ({ url, picture, name, created, tags }) => {
    const mixCard = useRef();
    const click = () => mixCard.current.click();
    const onScreen = useIsOnScreen(mixCard, "0px");
    if (!picture) {
        return null;
    }

    return (
        <div
            tabIndex={0}
            data-mixcloud-play-button={url}
            className="MixCard"
            ref={mixCard}
            onKeyDown={e => e.key === "Enter" && click()}
        >
            <div className="MixCard-wrapper">
                <div className="Card-imgWrapper">
                    <img
                        className="Card-img"
                        src={onScreen ? picture.large : picture.thumbnail}
                        alt={name}
                    ></img>
                </div>
                <div className="Card-info">
                    <span className="Date">{created.replace(/-/g, ".")}</span>
                    <h3 className="Heading-small">{name}</h3>
                    {tags && (
                        <div className="Tags-container">
                            {tags.slice(0, 2).map(tag => (
                                <span key={tag.name} className="Tag">
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MixCard;
