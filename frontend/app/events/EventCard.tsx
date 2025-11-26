import React from "react";
import "./EventCard.css";


type EventCardProps = {
 monthLabel: string;
 weekday: string;
 day: string;
 meta: string;
 title: string;
 description: string;
 posterSrc?: string;
 posterAlt?: string;
};


const EventCard: React.FC<EventCardProps> = ({
 monthLabel,
 weekday,
 day,
 meta,
 title,
 description,
 posterSrc,
 posterAlt,
}) => {
 return (
 <div className="event-card">
   {/* Top month header */}
   <div className="event-card__header">
     <span className="event-card__month-label">{monthLabel}</span>
     <div className="event-card__divider" />
   </div>


   {/* Main content row */}
   <div className="event-card__body">
     {/* Left date column */}
     <div className="event-card__date-col">
       <span className="event-card__weekday">{weekday}</span>
       <span className="event-card__day">{day}</span>
     </div>


     {/* Text content */}
     <div className="event-card__content">
       <p className="event-card__meta">{meta}</p>
       <p className="event-card__title">{title}</p>
       <p className="event-card__description">{description}</p>
     </div>


     {/* Poster on the right (optional) */}
     {posterSrc && (
       <div className="event-card__poster">
         <img src={posterSrc} alt={posterAlt || "Event poster"} />
       </div>
     )}
   </div>
 </div>
);


};


export default EventCard;
