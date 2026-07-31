import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams and startups.',
      monthlyPrice: 29,
      yearlyPrice: 24,
      features: ['Up to 5 team members', 'Basic analytics', '24/7 Email support', '10GB Storage'],
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses and agencies.',
      monthlyPrice: 79,
      yearlyPrice: 65,
      features: ['Up to 20 team members', 'Advanced analytics', 'Priority support', '100GB Storage', 'Custom domains', 'API access'],
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large-scale organizations with advanced needs.',
      monthlyPrice: 199,
      yearlyPrice: 165,
      features: ['Unlimited team members', 'Custom reporting', 'Dedicated success manager', 'Unlimited Storage', 'SSO authentication', 'SLA guarantee'],
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-sm text-gray-700 max-w-xl mx-auto">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm ${!isYearly ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm flex items-center gap-1 ${isYearly ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
              Yearly <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {plans.map((plan, idx) => (
            <div key={idx} className={`rounded-xl border ${plan.popular ? 'border-blue-500 shadow-md relative' : 'border-gray-200 shadow-sm'} bg-white p-6 flex flex-col h-full`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
              <p className="text-sm text-gray-700 mt-2 min-h-[40px]">{plan.description}</p>
              
              <div className="mt-6 mb-8">
                <span className="text-4xl font-bold text-gray-900">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-gray-500 text-sm">/mo</span>
                {isYearly && <p className="text-xs text-gray-500 mt-1">Billed annually (${plan.yearlyPrice * 12}/yr)</p>}
              </div>
              
              <button className={`w-full rounded-lg px-4 py-2 transition mb-8 font-medium ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>
                Get Started
              </button>
              
              <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-900 mb-4">What's included:</p>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
