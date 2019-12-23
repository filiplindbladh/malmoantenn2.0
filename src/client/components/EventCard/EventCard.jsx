import React from "react";
import "./EventCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";

const EventCard = ({
    picture,
    title,
    startDate,
    startTime,
    endTime,
    description,
}) => {
    return (
        <div className="EventCard">
            {picture && (
                <img
                    className="EventCard-image"
                    src={picture}
                    alt={title}
                ></img>
            )}
            <div className="EventCard-info">
                <p className="EventCard-date ">
                    <span>
                        <FontAwesomeIcon size="1x" icon={faCalendar} />
                        {startDate.slice(0, 10).replace(/-/g, ".")}
                    </span>
                    &nbsp;
                    <span className="EventCard-time">
                        <FontAwesomeIcon size="1x" icon={faClock} />
                        {startTime}
                        &nbsp;-&nbsp;
                        {endTime}
                    </span>
                </p>
                <h3 className="Heading-small">{title}</h3>
                {description && (
                    <p>{description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                )}
            </div>
        </div>
    );
};
export default EventCard;
