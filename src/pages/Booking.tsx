import React from 'react';
import { useBookingStore } from '../store/bookingStore';
import { Trash2, IndianRupee } from 'lucide-react';

export default function Booking() {
  const { items, totalAmount, removeItem, clearItems } = useBookingStore();

  const handleCheckout = () => {
    alert('Booking confirmed! Total amount saved: ₹' + (totalAmount * 0.1).toFixed(2));
    clearItems();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bookings</h2>

        {items.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No bookings added yet. Start by selecting transport, hotels, or restaurants!
          </p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-900">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-semibold">{item.price}</span>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <div className="flex items-center text-gray-900">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-semibold">{totalAmount}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4 text-green-600">
                <span>Savings (10%)</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-semibold">
                    {(totalAmount * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <div className="flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  <span>{(totalAmount * 0.9).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={clearItems}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}