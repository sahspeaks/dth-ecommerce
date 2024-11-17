import React from "react";

// Generic loading card for product list
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="flex space-x-2">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

// Product list loading state
export const ProductListLoading = () => (
  <div className="bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="animate-pulse flex items-center">
          <div className="h-8 w-8 bg-gray-200 rounded-md mr-4"></div>
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-10 w-72 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// Product details loading state
export const ProductDetailsLoading = () => (
  <div className="bg-gray-50 min-h-screen py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse mb-6">
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-[400px] bg-gray-200 rounded-lg shadow-lg"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="flex space-x-2">
              <div className="h-10 bg-gray-200 rounded w-48"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
          </div>

          <div className="pt-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded w-24"></div>
                ))}
              </div>
            </div>
            <div className="py-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default { ProductListLoading, ProductDetailsLoading };
