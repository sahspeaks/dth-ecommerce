import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechnicianCards from './TechnicianCards';

const technicians = [
    {
        name: "Madan Kumar",
        role: "Senior DTH Technician",
        image: "https://lh3.googleusercontent.com/p/AF1QipODfToSbWNFQkvdYbGRfD-57AnPYNs6Qq6Iktc=s1360-w1360-h1020",
        contact: "+91 939360 6147"
    },
    {
        name: "Bharath Kumar",
        role: "DTH Technician",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjU4Cr0RQwbHdZJDkaSx3wbzPFcxBAUMMa9W94m5rI1zoLHSwuY=w120-h120-p-rp-mo-br100",
        contact: "+91 970126 6950"
    }
];

export default function Hero() {
    return (
        <div className="relative bg-gray-50">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="px-6 pb-24 pt-6 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-8 xl:col-span-6">
                    {/* Technician Cards */}
                    {/* <div className="mb-8 lg:mb-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {technicians.map((tech, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                                >
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
                            ))}
                        </div>
                    </div> */}

                    <TechnicianCards technicians={technicians} />
                    {/* Main Content */}
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Your One-Stop DTH Solution
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Experience crystal-clear entertainment with our premium DTH services. From installation to maintenance, we've got you covered with top-notch equipment and expert support.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link
                                to="/products/dth"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Browse Products
                            </Link>
                            <Link to="/services" className="flex items-center text-sm font-semibold leading-6 text-gray-900">
                                Book Services <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    <img
                        className="aspect-[3/2] w-full bg-gray-50 object-contain lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                        src="https://res.cloudinary.com/dra8tbz4z/image/upload/v1731565044/jgvbl8denrk4i1g4jl6h.png"
                        alt="Modern living room with TV setup"
                    />
                </div>
            </div>
        </div>
    );
}