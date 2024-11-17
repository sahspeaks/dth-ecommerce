import React from "react";
import { Clock, Calendar, MapPin, ChevronDown } from "lucide-react";
import { SERVER } from "../../server";

const ServiceSection = ({ customerId }) => {
  const [services, setServices] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [expandedServices, setExpandedServices] = React.useState({});
  const BASE_URL = SERVER;

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleService = (serviceId) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/services/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const result = await response.json();

        if (result?.success && result?.data) {
          const serviceArray = Array.isArray(result.data)
            ? result.data
            : [result.data];
          setServices(serviceArray);

          // Initialize expanded state for all services
          const initialExpandedState = {};
          serviceArray.forEach((service) => {
            initialExpandedState[service._id] = false;
          });
          setExpandedServices(initialExpandedState);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchServices();
    } else {
      setIsLoading(false);
      setServices([]);
    }
  }, [customerId]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Service Orders
        </h2>
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  const serviceList = Array.isArray(services) ? services : [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Service Orders
        </h2>
        {serviceList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No service orders found
          </div>
        ) : (
          <div className="space-y-4">
            {serviceList.map((service) => (
              <div
                key={service._id}
                className="border rounded-lg hover:shadow-md transition-shadow"
              >
                <div
                  onClick={() => toggleService(service._id)}
                  className="p-4 cursor-pointer flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg text-gray-900 capitalize">
                        {service?.service} Service
                      </h3>
                      <span className="text-sm text-gray-500">
                        ({service?.serviceId})
                      </span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                        service?.status
                      )}`}
                    >
                      {service?.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">
                      ₹{service?.price}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                        expandedServices[service._id] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
                    expandedServices[service._id] ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="p-4 pt-0 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {service?.date && formatDate(service.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {service?.time}
                      </div>
                      {service?.address && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          {service.address.fullName} - {service.address.doorNo},{" "}
                          {service.address.street}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSection;
