import React from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h1>
          <p className="text-sm text-gray-700">No worries, we'll send you reset instructions.</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="email" 
                className="h-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 pl-9 w-full text-sm" 
                placeholder="Enter your email" 
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 transition font-medium mt-2">
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-8">
          <a href="/login" className="text-sm text-gray-500 hover:text-gray-700 font-medium inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
