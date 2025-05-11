import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaInstagram, FaTwitter, FaTripadvisor } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or want to book a tour? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                <EnvelopeIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <a href="mailto:primavera@viennavoyages.com" className="text-indigo-600 hover:text-indigo-500">
                  primavera@viennavoyages.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                <PhoneIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <a href="tel:+43123456789" className="text-indigo-600 hover:text-indigo-500">
                  +43 1 234 567 89
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                <MapPinIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Office</h3>
                <p className="text-gray-600">
                  Vienna Voyages<br />
                  Tour Guide Services<br />
                  Schönbrunner Straße 1<br />
                  1040 Vienna, Austria
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                <ClockIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 - 18:00<br />
                  Saturday: 10:00 - 16:00<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Map */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"
                className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors">
                <FaTripadvisor className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.798382918125!2d16.37177131565121!3d48.18598097923046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da8b6f7a7a6c5%3A0x1c3c0a1a1b1b1b1b!2sSch%C3%B6nbrunner%20Stra%C3%9Fe%201%2C%201040%20Wien%2C%20Austria!5e0!3m2!1sen!2sat!4v1620000000000!5m2!1sen!2sat"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
              title="Our location on map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
