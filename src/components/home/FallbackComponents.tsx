
import React from 'react';
import { AlertTriangle, Shield, Users, CheckCircle } from 'lucide-react';

export const HeroFallback = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <div className="container text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Secure Your Web3 Project
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            in Days, Not Months
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Connect with verified security experts for comprehensive smart contract audits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold">
            Get Security Audit
          </button>
          <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold">
            Join as Expert
          </button>
        </div>
      </div>
    </div>
  </section>
);

export const TrustFallback = () => (
  <section className="py-16 bg-gray-900">
    <div className="container text-center">
      <h2 className="text-3xl font-bold text-white mb-8">Trusted by 500+ Web3 Projects</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[Shield, Users, CheckCircle, AlertTriangle].map((Icon, i) => (
          <div key={i} className="text-center">
            <Icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold">Security First</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ProcessFallback = () => (
  <section className="py-16 bg-gray-800">
    <div className="container text-center">
      <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {['Submit', 'Match', 'Audit', 'Report'].map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
              {i + 1}
            </div>
            <h3 className="text-white font-semibold mb-2">{step}</h3>
            <p className="text-gray-400 text-sm">Step {i + 1} description</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ErrorFallback = ({ error }: { error?: Error }) => (
  <div className="min-h-[200px] flex items-center justify-center bg-gray-900 text-white">
    <div className="text-center">
      <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Content Loading Issue</h3>
      <p className="text-gray-400">This section is temporarily unavailable.</p>
      {process.env.NODE_ENV === 'development' && error && (
        <pre className="mt-4 text-xs text-left bg-gray-800 p-2 rounded">
          {error.message}
        </pre>
      )}
    </div>
  </div>
);
