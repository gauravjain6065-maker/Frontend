import React from 'react';
import { Search, ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="text-center max-w-lg w-full">
        {/* Large 404 */}
        <h1 className="text-9xl font-bold text-blue-600 mb-4 opacity-20">404</h1>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 relative -mt-16 z-10">
          <div className="w-16 h-16 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-6">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h2>
          <p className="text-sm text-gray-700 mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 transition font-medium flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Back Home
            </a>
            
            <button className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2.5 transition font-medium flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
