import { useState } from 'react';
import { useTheme } from '../App';
import {
  Mail,
  Send,
  MessageCircle,
  CheckCircle,
  Heart,
  Leaf,
} from 'lucide-react';

export default function ContactPage() {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
            <MessageCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have questions or feedback? We'd love to hear from you. Let's work together for a sustainable future.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 sm:p-8 shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Send us a message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Message Sent!
                  </h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                        errors.name
                          ? 'border-red-500'
                          : darkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                      } focus:ring-2 focus:ring-green-500/20`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                        errors.email
                          ? 'border-red-500'
                          : darkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                      } focus:ring-2 focus:ring-green-500/20`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
                        errors.message
                          ? 'border-red-500'
                          : darkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                      } focus:ring-2 focus:ring-green-500/20`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Email Contact Card */}
            <a
              href="mailto:riyasinghantil@gmail.com"
              className={`block ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'} rounded-2xl p-6 shadow-sm transition-all duration-300`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                  <Mail className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Email Us
                  </p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    riyasinghantil@gmail.com
                  </p>
                </div>
              </div>
            </a>

            {/* Creator Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl font-bold text-white">RA</span>
                </div>
                <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Riya Antil
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Creator & Developer
                </p>
                <div className={`flex items-center justify-center space-x-1 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Made with love for the planet</span>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className={`${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-green-50 to-emerald-50'} rounded-2xl p-6`}>
              <div className="text-center">
                <Leaf className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <p className={`text-lg italic mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "We do not inherit the earth from our ancestors; we borrow it from our children."
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  — Native American Proverb
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
