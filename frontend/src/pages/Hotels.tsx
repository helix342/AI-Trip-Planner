import React, { useState } from 'react';
import {
  Building2,
  Bed,
  Bath,
  Wifi,
  Coffee,
  IndianRupee,
  Star,
  ExternalLink,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import { TripDetails } from '../components/TripDetails';

const hotels = [
  {
    id: 1,
    name: "ITC Grand Chola",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.8,
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Free WiFi"],
    prices: [
      { site: "Booking.com", price: 12500, rating: 4.8 },
      { site: "MakeMyTrip", price: 12800, rating: 4.7 },
      { site: "Agoda", price: 12300, rating: 4.9 },
    ],
    reviews: [
      { text: "Luxurious stay with excellent service", rating: 5, site: "Booking.com" },
      { text: "Beautiful property, great location", rating: 4.5, site: "MakeMyTrip" },
    ],
  },
  {
    id: 2,
    name: "Taj Coromandel",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.7,
    amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
    prices: [
      { site: "Booking.com", price: 11500, rating: 4.7 },
      { site: "MakeMyTrip", price: 11200, rating: 4.8 },
      { site: "Agoda", price: 11800, rating: 4.6 },
    ],
    reviews: [
      { text: "Classic luxury hotel with great food", rating: 4.5, site: "Agoda" },
      { text: "Excellent location and service", rating: 5, site: "Booking.com" },
    ],
  },
  {
    id: 3,
    name: "Crowne Plaza Chennai",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.5,
    amenities: ["Pool", "Restaurant", "Gym", "Free WiFi"],
    prices: [
      { site: "Booking.com", price: 8500, rating: 4.5 },
      { site: "MakeMyTrip", price: 8800, rating: 4.4 },
      { site: "Agoda", price: 8300, rating: 4.6 },
    ],
    reviews: [
      { text: "Modern hotel with great amenities", rating: 4.5, site: "MakeMyTrip" },
      { text: "Professional staff and clean rooms", rating: 4, site: "Agoda" },
    ],
  },
];

function Hotels() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <TripDetails />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hotels in Chennai</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Pool", "Spa", "Restaurant", "Gym", "Free WiFi"].map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAmenities([...selectedAmenities, amenity]);
                        } else {
                          setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <SlidersHorizontal className="h-5 w-5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src={hotel.image}
                  alt={hotel.name}
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full flex items-center"
                    >
                      {amenity === "Pool" && <Bath className="h-4 w-4 mr-1" />}
                      {amenity === "Free WiFi" && <Wifi className="h-4 w-4 mr-1" />}
                      {amenity === "Restaurant" && <Coffee className="h-4 w-4 mr-1" />}
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  {hotel.prices.map((price) => (
                    <div key={price.site} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{price.site}</h4>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{price.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-4 w-4 text-gray-600" />
                          <span className="text-lg font-bold text-gray-900">{price.price}</span>
                        </div>
                        <button className="mt-1 flex items-center text-sm text-indigo-600 hover:text-indigo-700">
                          View Deal
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Recent Reviews</h4>
                  <div className="space-y-2">
                    {hotel.reviews.map((review, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{review.rating}</span>
                          <span className="text-gray-400">• {review.site}</span>
                        </div>
                        <p className="mt-1">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Hotels;