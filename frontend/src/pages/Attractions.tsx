import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Star,
  Users,
  Heart,
  IndianRupee,
  X,
  ExternalLink,
} from 'lucide-react';
import { TripDetails } from '../components/TripDetails';

interface Attraction {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  familyFriendly: boolean;
  coupleFriendly: boolean;
  entryFee: number | null;
  timing: string;
  description: string;
  comments: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  images: string[];
}

const attractions: Attraction[] = [
  {
    id: 1,
    name: "Marina Beach",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    rating: 4.5,
    reviews: 12500,
    distance: "3.2 km",
    familyFriendly: true,
    coupleFriendly: true,
    entryFee: null,
    timing: "24/7 (Best time: 5:00 AM - 7:00 PM)",
    description: "Marina Beach is the second-longest urban beach in the world. This natural urban beach along the Bay of Bengal features a wide sandy shore, historic buildings, and various entertainment options.",
    comments: [
      {
        user: "John D.",
        rating: 5,
        comment: "Beautiful sunrise view! Must visit early morning for the best experience.",
        date: "2024-02-15"
      },
      {
        user: "Priya R.",
        rating: 4,
        comment: "Great place for evening walks. Lots of street food options available.",
        date: "2024-02-10"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1590050988465-7e2ca287a275?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1590051433133-90436e3163ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    ]
  },
  {
    id: 2,
    name: "Kapaleeshwarar Temple",
    image: "https://images.unsplash.com/photo-1604876231155-d9de8f9b8b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    rating: 4.8,
    reviews: 8900,
    distance: "5.1 km",
    familyFriendly: true,
    coupleFriendly: true,
    entryFee: null,
    timing: "5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM",
    description: "A historic temple dedicated to Lord Shiva, featuring stunning Dravidian architecture. The temple is known for its colorful gopuram and religious significance.",
    comments: [
      {
        user: "Sarah M.",
        rating: 5,
        comment: "Incredible architecture and peaceful atmosphere. A must-visit for cultural enthusiasts.",
        date: "2024-02-18"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1604876231155-d9de8f9b8b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1604876231630-b226d0166e06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1604876231929-9208a6d7b7b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    ]
  },
  {
    id: 3,
    name: "Government Museum",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    rating: 4.3,
    reviews: 5600,
    distance: "4.8 km",
    familyFriendly: true,
    coupleFriendly: true,
    entryFee: 15,
    timing: "9:30 AM - 5:00 PM (Closed on Fridays)",
    description: "One of the oldest museums in India, featuring archaeological and numismatic collections, bronze gallery, and various artifacts from the ancient Tamil civilization.",
    comments: [
      {
        user: "Mike R.",
        rating: 4,
        comment: "Fascinating collection of artifacts. Great for history buffs.",
        date: "2024-02-12"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1544889609-c66eca0c0c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    ]
  }
];

function Attractions() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <TripDetails />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tourist Attractions in Chennai</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{attraction.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{attraction.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{attraction.distance} from hotel</span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                {attraction.familyFriendly && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Family Friendly</span>
                  </div>
                )}
                {attraction.coupleFriendly && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Couple Friendly</span>
                  </div>
                )}
              </div>

              {attraction.entryFee && (
                <div className="flex items-center space-x-1 text-gray-600 mb-4">
                  <IndianRupee className="h-4 w-4" />
                  <span>Entry Fee: ₹{attraction.entryFee}</span>
                </div>
              )}

              <button
                onClick={() => setSelectedAttraction(attraction)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedAttraction.name}</h2>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="relative h-80 mb-6">
                <img
                  src={selectedAttraction.images[activeImageIndex]}
                  alt={selectedAttraction.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {selectedAttraction.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        activeImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedAttraction.timing}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedAttraction.distance} from hotel</span>
                    </div>
                    {selectedAttraction.entryFee && (
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-4 w-4" />
                        <span>Entry Fee: ₹{selectedAttraction.entryFee}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedAttraction.description}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Reviews</h3>
                <div className="space-y-4">
                  {selectedAttraction.comments.map((comment, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{comment.user}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{comment.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-1">{comment.comment}</p>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    selectedAttraction.name + ' Chennai'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-indigo-600 hover:text-indigo-700"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Attractions;