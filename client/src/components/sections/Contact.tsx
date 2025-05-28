import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { apiService } from '../../services/api';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send message to API
      await apiService.submitMessage(formState);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error submitting message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 dark:bg-gray-800 py-20 transition-colors duration-300">
      <div className="container-section">
        <h2 className="section-title text-gray-900 dark:text-white animate-fade-in">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Feel free to reach out to me for any inquiries, collaboration opportunities, 
              or just to say hello. I'm always open to discussing new projects and ideas.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-md">
                  <FiMail className="text-secondary-light" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                  <a 
                    href="mailto:pfenilj@gmail.com" 
                    className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors"
                  >
                    pfenilj@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-md">
                  <FiPhone className="text-secondary-light" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
                  <a 
                    href="tel:+16305044149" 
                    className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary-light transition-colors"
                  >
                    +1 (630) 504-4149
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-md">
                  <FiMapPin className="text-secondary-light" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Naperville, IL, United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg mb-4">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Your message has been sent successfully!
                    </p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      value={formState.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      value={formState.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-100 dark:bg-red-900 p-3 rounded-md">
                      <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;