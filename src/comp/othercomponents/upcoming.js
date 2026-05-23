// Upcoming contests 
import React from 'react';


const Upcoming = ({ imageUrl, title, description }) => {
  const getStartedButtonStylesnew = 'rounded-full bg-black py-2 px-4 text-white hover:bg-green-200 focus:bg-green-200 mt-1'; 

  return (
    <div className="upcoming-container">
      <div className="upcoming-item">
        <img src={imageUrl} alt={title} className="w-full h-20 object-cover mb-4 rounded-md" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">Next is on:</p>
        <p className="text-gray-600">{description}, 8:00 PM</p>
        <button className={getStartedButtonStylesnew}>Register</button>
      </div>
    </div>
  );
};

export default Upcoming;
