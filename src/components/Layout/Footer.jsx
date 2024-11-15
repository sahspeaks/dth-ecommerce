import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <div className="space-y-3">
          <p className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            +91 939360 6147
          </p>
          <p className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            madandth@gmail.com
          </p>
          <p className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Tirupati, AP
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Our Services</h3>
        <ul className="space-y-2">
          <li>DTH Products</li>
          <li>Cable TV & Networking accessoriees</li>
          <li>DTH Installation</li>
          <li>Repair & Maintenance</li>
          <li>DTH Upgrades</li>
          <li>Technical Support</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
        <ul className="space-y-2">
          <li>Monday - Saturday</li>
          <li>9:00 AM - 8:00 PM</li>
          <li>Sunday</li>
          <li>10:00 AM - 6:00 PM</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-sm text-gray-400 text-center">
          © 2024 MY STB. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
