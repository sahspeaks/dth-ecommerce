import { Home } from "lucide-react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </button>
        <h2 className="text-2xl font-semibold text-gray-900 capitalize">
          <h2></h2>Success : {orderId}
        </h2>
      </div>
    </div>
  );
};
