import React from 'react';
import { AlertCircle, RefreshCcw, ArrowLeft, Headset } from 'lucide-react';

const SubscriptionFailedPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-10 w-full max-w-lg text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full mx-auto flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-sm text-gray-700 mb-8">
          We couldn't process your payment. Your card may have been declined or has insufficient funds. No charges were made.
        </p>

        <div className="rounded-lg border border-red-100 bg-red-50 p-4 mb-8 text-left flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-red-800">Error Code: DECLINED_CARD</h3>
            <p className="text-xs text-red-700 mt-1">Please check your card details or try a different payment method.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition font-medium flex items-center justify-center gap-2">
            <RefreshCcw className="w-4 h-4" /> Retry Payment
          </button>
          
          <button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-3 transition font-medium">
            Change Payment Method
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <a href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition">
            <ArrowLeft className="w-4 h-4" /> Change Plan
          </a>
          <span className="text-gray-300">|</span>
          <a href="/support" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition">
            <Headset className="w-4 h-4" /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFailedPage;
