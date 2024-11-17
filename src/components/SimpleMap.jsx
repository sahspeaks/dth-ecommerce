import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Phone, Clock, MapPin } from "lucide-react";

// Fix for the missing marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = 13.628949889941715;
  const longitude = 79.41612307278618;

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-[2000px] mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 max-w-7xl mx-auto">
          Find Us
        </h2>
        <div className="flex justify-center">
          <MapContainer
            center={[latitude, longitude]}
            zoom={17}
            ref={mapRef}
            style={{
              height: "80vh",
              width: "80vw",
              margin: "2rem auto",
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              zIndex: 0, // Ensure map stays below navbar
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup className="custom-popup">
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">
                    Madan Cable TV & DTH Service Center
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      <a
                        href="tel:+919393606147"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        +91 93936 06147
                      </a>
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      9:00 AM - 8:00 PM
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      Tirupati, Andhra Pradesh
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default SimpleMap;

// const SimpleMap = () => {
//   const mapRef = useRef(null);
//   const latitude = 13.628949889941715;
//   const longitude = 79.41612307278618;

//   return (
//     <section className="w-full bg-gray-50">
//       <div className="max-w-[2000px] mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8 max-w-7xl mx-auto">
//           Find Us
//         </h2>
//         <div className="flex justify-center">
//           <MapContainer
//             center={[latitude, longitude]}
//             zoom={17}
//             ref={mapRef}
//             style={{
//               height: "80vh",
//               width: "80vw",
//               margin: "2rem auto",
//               borderRadius: "0.5rem",
//               boxShadow:
//                 "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//             }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={[latitude, longitude]}>
//               <Popup className="custom-popup">
//                 <div className="p-2">
//                   <h3 className="font-bold text-lg mb-2">
//                     Madan Cable TV & DTH Service Center
//                   </h3>
//                   <div className="space-y-2">
//                     <p className="flex items-center">
//                       <Phone className="w-4 h-4 mr-2 text-blue-500" />
//                       <a
//                         href="tel:+919393606147"
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         +91 93936 06147
//                       </a>
//                     </p>
//                     <p className="flex items-center">
//                       <Clock className="w-4 h-4 mr-2 text-blue-500" />
//                       9:00 AM - 8:00 PM
//                     </p>
//                     <p className="flex items-center">
//                       <MapPin className="w-4 h-4 mr-2 text-blue-500" />
//                       Tirupati, Andhra Pradesh
//                     </p>
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SimpleMap;
