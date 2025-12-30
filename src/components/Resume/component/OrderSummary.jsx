import React from 'react';
import { FaClock, FaLock, FaShieldAlt, FaGem, FaRocket, FaSync, FaHeadset, FaCalendarCheck, FaCreditCard, FaPaypal, FaGoogle, FaApple } from 'react-icons/fa';
import { useOrderSummaryLogic } from '../../../hooks/useOrderSummaryLogic';
import OrderSummaryPlans from './OrderSummaryPlans';
import OrderDetailsSection from './OrderDetailsSection';
import OrderPricingBreakdown from './OrderPricingBreakdown';

const OrderSummary = ({ selectedEditor, selectedJob, uploadedFile, analysisResult, onProceedToPayment, onEditSelection }) => {
  const {
    selectedPlan, setSelectedPlan, paymentMethod, setPaymentMethod, plans,
    serviceFee, tax, totalAmount, currentPlan
  } = useOrderSummaryLogic(selectedEditor);

  if (!selectedEditor || !selectedJob || !uploadedFile) return null;

  const features = [
    { icon: FaGem, text: 'Premium quality guaranteed', color: 'text-purple-600' },
    { icon: FaRocket, text: 'ATS optimized formatting', color: 'text-blue-600' },
    { icon: FaSync, text: 'Unlimited revisions', color: 'text-green-600' },
    { icon: FaHeadset, text: '24/7 customer support', color: 'text-orange-600' },
    { icon: FaShieldAlt, text: 'Money-back guarantee', color: 'text-red-600' },
    { icon: FaCalendarCheck, text: 'Delivery on time', color: 'text-yellow-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 font-['Outfit']">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
        <button onClick={onEditSelection} className="text-green-800 hover:text-green-700 text-sm font-medium">Edit Selection</button>
      </div>

      <div className="space-y-6">
        <OrderSummaryPlans plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
        <OrderDetailsSection selectedEditor={selectedEditor} selectedJob={selectedJob} uploadedFile={uploadedFile} analysisResult={analysisResult} />

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3"><FaClock className="text-blue-800 text-lg" /><div><p className="font-semibold text-blue-900">Expected Delivery</p><p className="text-sm text-blue-700">{selectedEditor.deliveryTime}</p></div></div>
          <div className="text-right"><p className="text-sm text-blue-600">Guaranteed</p></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f, i) => <div key={i} className="flex items-center gap-2 text-sm text-gray-600"><f.icon className={`text-lg ${f.color}`} /><span>{f.text}</span></div>)}
        </div>

        <OrderPricingBreakdown currentPlan={currentPlan} serviceFee={serviceFee} tax={tax} totalAmount={totalAmount} />

        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Payment Method</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'card', icon: FaCreditCard, color: 'text-blue-600', label: 'Card' },
              { id: 'paypal', icon: FaPaypal, color: 'text-blue-800', label: 'PayPal' },
              { id: 'google', icon: FaGoogle, color: 'text-red-600', label: 'G Pay' },
              { id: 'apple', icon: FaApple, color: 'text-gray-800', label: 'Apple Pay' }
            ].map(m => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`flex items-center justify-center gap-2 border-2 rounded-lg p-3 transition-all ${paymentMethod === m.id ? 'border-green-800 bg-green-50' : 'border-gray-200 hover:border-green-800'}`}>
                <m.icon className={`${m.color} text-xl`} /><span className="text-sm font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={onProceedToPayment} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-800 to-emerald-800 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-semibold text-lg">
          <FaLock /> Proceed to Payment - ₹{totalAmount.toFixed(0)}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;