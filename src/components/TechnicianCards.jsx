import React, { useState } from "react";
import { Phone, X } from "lucide-react"; // Replace with your icon library

const TechnicianCards = ({ technicians }) => {
  // State to track visibility of each card
  const [visibleCards, setVisibleCards] = useState(
    Array(technicians.length).fill(true)
  );

  // State to track minimized state
  const [isMinimized, setIsMinimized] = useState(false);

  // Close card
  const handleClose = (index) => {
    const updatedVisibility = [...visibleCards];
    updatedVisibility[index] = false;
    setVisibleCards(updatedVisibility);
  };

  // Minimize all cards
  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div className="mb-8 lg:mb-12">
      {/* Minimize/Maximize Button */}
      {/* <div className="mb-4 text-right">
        <button
          onClick={handleMinimize}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {isMinimized ? "Show Cards" : "Minimize Cards"}
        </button>
      </div> */}

      {!isMinimized && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {technicians.map((tech, index) =>
            visibleCards[index] ? (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => handleClose(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Technician Info */}
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="h-16 w-16 rounded-full object-cover lg:scale-125 lg:origin-center"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-500">{tech.role}</p>
                  <div className="flex items-center text-sm text-indigo-600 mt-1">
                    <Phone className="h-4 w-4 mr-1" />
                    {tech.contact}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default TechnicianCards;
