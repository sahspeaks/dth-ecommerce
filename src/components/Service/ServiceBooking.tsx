import React from 'react';
import { Clock, Home } from 'lucide-react';
import { Service } from '../../types';
import { useNavigate } from 'react-router-dom';

const services: Service[] = [
    {
        id: '1',
        name: 'DTH Installation',
        description: 'Professional installation of DTH equipment',
        price: 399,
        type: 'installation',
        duration: '2-3 hours'
    },
    {
        id: '2',
        name: 'Repair Service',
        description: 'Expert repair for DTH and networking equipment',
        price: 299,
        type: 'repair',
        duration: '1-2 hours'
    },
    {
        id: '3',
        name: 'Technical Support',
        description: 'On-site technical support and troubleshooting',
        price: 199,
        type: 'support',
        duration: '1 hour'
    }
];

export default function ServiceBooking() {
    const [selectedService, setSelectedService] = React.useState<string>('');
    const [date, setDate] = React.useState<string>('');
    const [time, setTime] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ selectedService, date, time, price });
        navigate('/service-checkout', {
            state: {
                selectedService,
                date,
                time,
                price
            }
        });
    };
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center mb-6">
                <button
                    onClick={handleGoHome}
                    className="flex items-center text-gray-600 hover:text-gray-900 mr-4 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                    Book a Service
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Available Services</h3>
                    <div className="space-y-4">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedService === service.type
                                    ? 'border-indigo-600 bg-indigo-50'
                                    : 'border-gray-200 hover:border-indigo-600'
                                    }`}
                                onClick={() => {
                                    setSelectedService(service.type);
                                    setPrice(service.price);
                                }}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                    </div>
                                    <span className="text-indigo-600 font-medium">₹{service.price}</span>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {service.duration}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Schedule Service</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Preferred Date
                            </label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Preferred Time
                            </label>
                            <div className="mt-1">
                                <select
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select a time slot</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!selectedService || !date || !time}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Book Service
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}