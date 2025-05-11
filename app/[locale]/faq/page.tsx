"use client";

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const faqItems = [
  {
    question: 'How do I book a tour?',
    answer: 'You can book a tour directly through our website by selecting your preferred date and time from the calendar. After selecting, you\'ll be guided through a simple booking process.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'You can cancel your booking up to 24 hours before the scheduled tour for a full refund. Cancellations made less than 24 hours in advance are non-refundable.'
  },
  {
    question: 'Are your tours suitable for children?',
    answer: 'Yes, our tours are family-friendly and suitable for all ages. However, please note that some walking is involved, so comfortable shoes are recommended.'
  },
  {
    question: 'What should I bring on the tour?',
    answer: 'We recommend bringing comfortable walking shoes, weather-appropriate clothing, a bottle of water, and a camera to capture the beautiful sights of Vienna.'
  },
  {
    question: 'Do you offer private tours?',
    answer: 'Yes, we offer private tours for individuals and groups. Please contact us directly to arrange a personalized tour experience.'
  },
  {
    question: 'What languages are the tours conducted in?',
    answer: 'Our standard tours are conducted in English, but we can arrange tours in German and Spanish upon request. Please let us know your language preference when booking.'
  },
  {
    question: 'Are the tours wheelchair accessible?',
    answer: 'Most of our tours are wheelchair accessible, but some historical sites may have limited accessibility. Please contact us in advance so we can accommodate your specific needs.'
  },
  {
    question: 'How long do the tours typically last?',
    answer: 'Our standard tours last approximately 2-3 hours, but we also offer extended tours that can last up to 4 hours. The duration will be specified in the tour details when booking.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our tours and services.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-lg font-medium text-gray-900">{item.question}</span>
              {openIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 bg-gray-50">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Can't find the answer you're looking for?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
