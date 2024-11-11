import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="relative bg-white">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
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
                <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    <img
                        className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                        src="https://www.kindpng.com/picc/m/578-5783558_dish-tv-logo-png-transparent-png.png"
                        alt="Modern living room with TV setup"
                    />
                </div>
            </div>
        </div>
    );
}
