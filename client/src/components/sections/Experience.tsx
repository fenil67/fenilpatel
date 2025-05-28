import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { apiService, Experience as ExperienceType } from '../../services/api';

// Fallback data in case API fails
const fallbackExperiences: ExperienceType[] = [
  {
    _id: '1',
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2021 - Present',
    description: 'Led the development of a complex SaaS platform using React, Node.js, and MongoDB. Implemented CI/CD pipelines that reduced deployment time by 40%. Mentored junior developers and conducted code reviews to maintain code quality.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    order: 1
  },
  {
    _id: '2',
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    duration: 'Mar 2019 - Dec 2020',
    description: 'Developed and maintained multiple client web applications. Collaborated with UX designers to implement responsive and accessible interfaces. Integrated third-party APIs and services to enhance application functionality.',
    technologies: ['JavaScript', 'React', 'Express', 'PostgreSQL', 'Docker'],
    order: 2
  },
  {
    _id: '3',
    title: 'Frontend Developer',
    company: 'Creative Web Studio',
    duration: 'Jun 2017 - Feb 2019',
    description: 'Built interactive UI components using React and Redux. Optimized web performance resulting in a 30% improvement in load times. Implemented responsive designs that work across various devices and browsers.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux'],
    order: 3
  },
  {
    _id: '4',
    title: 'Web Development Intern',
    company: 'StartUp Vision',
    duration: 'Jan 2017 - May 2017',
    description: 'Assisted in the development of company website and client projects. Learned modern web development practices and tools in a professional environment. Contributed to frontend features that improved user engagement.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    order: 4
  }
];

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await apiService.getExperiences();
        setExperiences(data);
      } catch (err) {
        setError('Failed to fetch experiences');
        console.error(err);
        // Use fallback data if API fails
        setExperiences(fallbackExperiences);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="bg-gray-50 dark:bg-gray-800 py-20 transition-colors duration-300">
      <div className="container-section">
        <h2 className="section-title text-gray-900 dark:text-white">
          Work Experience
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 py-10">
            {error}
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <div
                  key={exp._id}
                  className="relative animate-fade-in"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -top-2 w-5 h-5 rounded-full bg-secondary-light dark:bg-secondary"></div>
                  
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-10 md:ml-auto' : 'md:pl-10'}`}>
                    <div className="card p-6 hover:border-secondary-light dark:hover:border-secondary-dark border-2 border-transparent">
                      <div className="flex items-center gap-2 text-secondary dark:text-secondary-light mb-1">
                        <FiBriefcase size={18} />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                        <FiCalendar size={16} />
                        <span>{exp.duration}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience; 