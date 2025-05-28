import React from 'react';
import Image from '../../assets/images/image.png';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-800 py-20 transition-colors duration-300">
      <div className="container-section">
        <h2 className="section-title text-gray-900 dark:text-white animate-fade-in">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slide-up">
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I'm a results-driven Computer Science graduate student at Illinois Institute of Technology,
                passionate about solving real-world problems through software development and data-driven
                solutions. My journey has taken me across diverse industries—from healthcare and finance
                to marketing—where I’ve developed scalable applications and delivered insightful analytics.
              </p>

              <p>
                I bring hands-on experience in full-stack development, data analysis, and machine learning.
                I’ve worked on projects involving Python, Java, React, SQL, REST APIs, Tableau, Power BI,
                and more. My foundation spans from developing RESTful APIs and data pipelines to building
                beautiful dashboards and deploying web apps that make an impact.
              </p>

              <p>
                I’ve led cross-functional teams across 3 out of 4 semesters in my master’s program,
                managing the full software development lifecycle (SDLC) of 6+ academic projects. I thrive
                in fast-paced, collaborative environments and believe in lifelong learning, clear communication,
                and building tech that matters.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Personal Information
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Name:</span> Fenil Patel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Email:</span> pfenilj@gmail.com
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Location:</span> Naperville, IL, USA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Availability:</span> Full-time
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-700 shadow-lg p-4">
              {/* You can replace this with your actual about image */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-300">
              <img 
                    src={Image} 
                    alt="Fenil Patel" 
                    className="w-full h-full object-cover"
                  />              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;