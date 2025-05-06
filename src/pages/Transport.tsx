import React, { useState } from 'react';
import { TripDetails } from '../components/TripDetails';
import {
  Plane,
  Train,
  Bus,
  Car,
  Clock,
  IndianRupee,
  Star,
  AlertCircle,
} from 'lucide-react';

function Transport() {
  const [activeTab, setActiveTab] = useState('flights');

  const transportOptions = {
    flights: [
      { id: 1, provider: 'IndiGo', departure: '06:00', arrival: '07:45', price: 3200, rating: 4.5 },
      { id: 2, provider: 'Air India', departure: '08:30', arrival: '10:15', price: 3800, rating: 4.2 },
      { id: 3, provider: 'SpiceJet', departure: '14:15', arrival: '16:00', price: 2900, rating: 4.0 },
    ],
    trains: [
      { id: 1, provider: 'Chennai Express', departure: '07:00', arrival: '22:30', price: 1200, rating: 4.3 },
      { id: 2, provider: 'Tamil Nadu Express', departure: '16:45', arrival: '08:15', price: 1500, rating: 4.4 },
      { id: 3, provider: 'Chennai Mail', departure: '23:00', arrival: '14:30', price: 900, rating: 4.1 },
    ],
    buses: [
      { id: 1, provider: 'RedBus Premium', departure: '20:00', arrival: '10:30', price: 800, rating: 4.2 },
      { id: 2, provider: 'Orange Travels', departure: '21:30', arrival: '12:00', price: 1000, rating: 4.5 },
      { id: 3, provider: 'KPN Travels', departure: '19:00', arrival: '09:30', price: 750, rating: 4.0 },
    ],
    cars: [
      { id: 1, provider: 'Ola Outstation', type: 'Sedan', duration: '14-15 hrs', price: 4500, rating: 4.4 },
      { id: 2, provider: 'Uber Intercity', type: 'SUV', duration: '14-15 hrs', price: 5500, rating: 4.6 },
      { id: 3, provider: 'Zoomcar', type: 'Hatchback', duration: '14-15 hrs', price: 4000, rating: 4.3 },
    ],
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <TripDetails />
      {/* Transport Tabs */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <TabButton
              active={activeTab === 'flights'}
              onClick={() => setActiveTab('flights')}
              icon={<Plane />}
              text="Flights"
            />
            <TabButton
              active={activeTab === 'trains'}
              onClick={() => setActiveTab('trains')}
              icon={<Train />}
              text="Trains"
            />
            <TabButton
              active={activeTab === 'buses'}
              onClick={() => setActiveTab('buses')}
              icon={<Bus />}
              text="Buses"
            />
            <TabButton
              active={activeTab === 'cars'}
              onClick={() => setActiveTab('cars')}
              icon={<Car />}
              text="Cars"
            />
          </nav>
        </div>

        {/* Transport Options List */}
        <div className="p-6">
          <div className="space-y-4">
            {transportOptions[activeTab].map((option) => (
              <TransportCard
                key={option.id}
                option={option}
                type={activeTab}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function TabButton({ active, onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center py-4 px-1 text-center border-b-2 font-medium text-sm
        ${active
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
      {React.cloneElement(icon, { className: "h-5 w-5 mr-2" })}
      {text}
    </button>
  );
}

function TransportCard({ option, type }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {type === 'flights' && <Plane className="h-8 w-8 text-indigo-600" />}
            {type === 'trains' && <Train className="h-8 w-8 text-indigo-600" />}
            {type === 'buses' && <Bus className="h-8 w-8 text-indigo-600" />}
            {type === 'cars' && <Car className="h-8 w-8 text-indigo-600" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{option.provider}</h3>
            {type === 'cars' ? (
              <p className="text-sm text-gray-500">{option.type}</p>
            ) : (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span>{option.departure}</span>
                <span>→</span>
                <span>{option.arrival}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1">
            <IndianRupee className="h-4 w-4 text-gray-600" />
            <span className="text-lg font-bold text-gray-900">{option.price}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{option.rating}</span>
          </div>
        </div>
      </div>
      
      {type !== 'cars' && (
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Duration: {type === 'flights' ? '1h 45m' : type === 'trains' ? '15h 30m' : '14h 30m'}</span>
          {type === 'flights' && (
            <>
              <AlertCircle className="h-4 w-4 ml-2" />
              <span>Non-stop</span>
            </>
          )}
        </div>
      )}
      
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
        Book Now
      </button>
    </div>
  );
}

export default Transport;