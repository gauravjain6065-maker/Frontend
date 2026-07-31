import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Star,
  ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  // Mock Data
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your business performance with real-time data tracking and customizable dashboards.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team across multiple time zones with built-in communication tools.'
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Lightning Fast',
      description: 'Built on modern infrastructure ensuring your application runs at peak performance 24/7.'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and advanced security protocols to keep your data safe and compliant.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Countries', value: '150+' },
    { label: 'Support', value: '24/7' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      content: 'This platform has completely transformed how our engineering team operates. The efficiency gains are remarkable.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      content: 'The intuitive interface and powerful features make it a joy to use every single day. Highly recommended.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Startup Founder',
      content: 'We scaled our business from 10 to 100 employees effortlessly, all thanks to this incredible SaaS solution.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How long does the implementation take?',
      answer: 'Most teams are up and running within 24 hours. Our onboarding team will guide you through every step of the process.'
    },
    {
      question: 'Can I integrate with my existing tools?',
      answer: 'Yes, we offer native integrations with over 100+ popular business tools including Slack, Salesforce, and Jira.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'All plans include 24/7 email support. Enterprise plans also get dedicated phone support and a success manager.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Hero Section */}
      <section className="p-6 md:p-12 lg:p-24 flex flex-col items-center text-center max-w-5xl mx-auto gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          <span>V2.0 is now live</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          The all-in-one platform for <br className="hidden md:block" />
          <span className="text-blue-600">modern teams</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mt-4">
          Streamline your workflow, boost productivity, and scale your business with our enterprise-grade SaaS platform built for the future of work.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 transition font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
          <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-6 py-3 transition font-medium w-full sm:w-auto hover:bg-gray-50">
            Book a Demo
          </button>
        </div>
        
        <div className="flex items-center gap-4 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card required
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> 14-day free trial
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto p-6 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</span>
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto p-6 md:p-12 lg:p-24 flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Powerful features to help you grow</h2>
          <p className="text-gray-600 mt-4 text-lg">Everything you need to manage your business, from analytics to team collaboration.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 border-y border-blue-100">
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-24 flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Loved by teams worldwide</h2>
            <p className="text-gray-600 mt-4">Don't just take our word for it. Here's what our customers have to say.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic flex-grow">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto p-6 md:p-12 lg:p-24 flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-4">Got questions? We've got answers.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 shadow-sm bg-white p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700 mt-4 pt-4 border-t border-gray-100">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto p-6 md:p-12 mb-24">
        <div className="rounded-2xl bg-blue-600 p-8 md:p-16 text-center text-white flex flex-col items-center gap-6 shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-blue-700 rounded-full opacity-50 blur-2xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold relative z-10">Ready to transform your workflow?</h2>
          <p className="text-blue-100 max-w-xl text-lg relative z-10">
            Join thousands of teams already using our platform to build better products, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 relative z-10 w-full sm:w-auto">
            <button className="bg-white hover:bg-gray-50 text-blue-600 rounded-lg px-8 py-3 transition font-semibold text-lg w-full sm:w-auto shadow-sm">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
