import React from 'react';
import { FiDownload } from 'react-icons/fi';
import env from '../../config/env';
import profileImage from '../../assets/images/profileImage.png';

const Hero: React.FC = () => {
  // Base API URL from environment
  const apiBaseUrl = env.API_URL.replace('/api', '');
  
  return (
    <section id="hero" className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              <span className="text-secondary dark:text-secondary-light">Hello, I'm</span>
              <br />
              Fenil Patel
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              Computer Science Graduate | Data Analyst
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl">
              Turning data into insightful decisions. I build scalable applications and beautiful dashboards using tools like <strong>Python</strong>, <strong>SQL</strong>, <strong>PostgreSQL</strong>, <strong>Tableau</strong>, and <strong>Power BI</strong>. Passionate about full-stack development, clean code, and visual storytelling with data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn btn-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                Get in Touch
              </a>
              <a
                href={`${apiBaseUrl}/download-resume`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                download="Resume_Fenil_Patel.pdf"
              >
                <FiDownload size={18} />
                Download Resume
              </a>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-[32rem]">
              <div className="absolute w-96 h-96 bg-secondary-light/20 dark:bg-secondary-dark/20 rounded-full top-0 right-0"></div>
              <div className="absolute w-80 h-80 bg-primary-light/20 dark:bg-primary-dark/20 rounded-full bottom-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                  <img 
                    src={profileImage} 
                    alt="Fenil Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;