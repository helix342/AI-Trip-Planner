import React from 'react';
import { MapPin, Calendar, Users, IndianRupee } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import { format } from 'date-fns';

export function TripDetails() {
  const tripDetails = useTripStore();

  if (!tripDetails.fromCity || !tripDetails.toCity) return null;

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="font-medium">{tripDetails.fromCity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-medium">{tripDetails.toCity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Dates</p>
            <p className="font-medium">
              {format(new Date(tripDetails.startDate), 'MMM d')} - {format(new Date(tripDetails.endDate), 'MMM d')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Travelers</p>
            <p className="font-medium">{tripDetails.travelers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}