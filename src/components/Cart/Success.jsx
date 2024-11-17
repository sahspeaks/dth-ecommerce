import React from "react";
import { Home } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white shadow-lg rounded-lg px-6 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h2 className="text-2xl font-semibold text-gray-900">
            Success: #{orderId}
          </h2>
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-6">
          <p>Your order has been successfully placed.</p>
        </div>
        <div className="text-gray-700">
          <p>
            Thank you for your order. We're processing it and will send you an
            update once it's been shipped.
          </p>
        </div>
      </div>
    </div>
  );
};
