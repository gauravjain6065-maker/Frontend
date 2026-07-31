import React from 'react';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';

const SubscriptionSuccessPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-10 w-full max-w-lg text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-sm text-gray-700 mb-8">
          Congratulations! Your subscription has been confirmed and your account is now fully active.
        </p>

        <div className="rounded-lg border border-gray-100 bg-slate-50 p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Plan Details</h2>
          
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Plan</span>
            <span className="text-sm font-medium text-gray-900">Professional (Yearly)</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Amount Paid</span>
            <span className="text-sm font-medium text-gray-900">$780.00</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Next Billing Date</span>
            <span className="text-sm font-medium text-gray-900">Oct 24, 2024</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2.5 transition font-medium flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Download Invoice
          </button>
          
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 transition font-medium flex items-center justify-center gap-2">
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
