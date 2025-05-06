import React from 'react';
import { Star, MapPin, Clock, IndianRupee, ExternalLink } from 'lucide-react';
import { TripDetails } from '../components/TripDetails';

const restaurants = [
  {
    id: 1,
    name: "Saravana Bhavan",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    cuisine: "South Indian",
    rating: 4.6,
    priceRange: "₹₹",
    location: "Anna Salai",
    timing: "6:30 AM - 11:00 PM",
    mustTry: ["Masala Dosa", "Filter Coffee", "Idli"],
    reviews: [
      { text: "Best South Indian breakfast in Chennai!", rating: 5 },
      { text: "Authentic taste and reasonable prices", rating: 4.5 }
    ]
  },
  {
    id: 2,
    name: "Murugan Idli Shop",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    cuisine: "South Indian",
    rating: 4.5,
    priceRange: "₹",
    location: "T. Nagar",
    timing: "7:00 AM - 10:30 PM",
    mustTry: ["Idli", "Podi Dosa", "Vada"],
    reviews: [
      { text: "Famous for soft idlis!", rating: 4.5 },
      { text: "Quick service and great taste", rating: 4 }
    ]
  },
  {
    id: 3,
    name: "Bombay Brasserie",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    cuisine: "North Indian, Continental",
    rating: 4.4,
    priceRange: "₹₹₹",
    location: "Phoenix Market City",
    timing: "12:00 PM - 11:00 PM",
    mustTry: ["Butter Chicken", "Biryani", "Cocktails"],
    reviews: [
      { text: "Great ambiance and food presentation", rating: 4.5 },
      { text: "Perfect for special occasions", rating: 4 }
    ]
  }
];

export default function Food() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <TripDetails />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Popular Restaurants in Chennai
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {restaurant.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{restaurant.location}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Clock className="h-4 w-4" />
                <span>{restaurant.timing}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <IndianRupee className="h-4 w-4" />
                <span>{restaurant.priceRange}</span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Must Try:</h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.mustTry.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {restaurant.reviews.map((review, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{review.rating}</span>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                <span>View Menu</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}