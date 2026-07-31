import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-10 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Check your email</h1>
        
        <p className="text-sm text-gray-700 mb-8 leading-relaxed">
          We've sent a verification link to <span className="font-semibold text-gray-900">john@company.com</span>. 
          Please check your inbox and click the link to verify your account.
        </p>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 transition font-medium flex items-center justify-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
          
          <button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2.5 transition font-medium">
            Resend Email
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
