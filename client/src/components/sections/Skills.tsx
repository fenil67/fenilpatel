import React, { useState, useEffect } from 'react';
import { FiCode, FiLayers, FiDatabase, FiServer, FiLayout, FiTool } from 'react-icons/fi';
import { apiService, Skill } from '../../services/api';

// Icon mapping for skill categories
const getIcon = (title: string) => {
  const icons: Record<string, JSX.Element> = {
    'Frontend': <FiLayout className="text-secondary-light" size={24} />,
    'Backend': <FiServer className="text-secondary-light" size={24} />,
    'Databases': <FiDatabase className="text-secondary-light" size={24} />,
    'Programming': <FiCode className="text-secondary-light" size={24} />,
    'DevOps': <FiTool className="text-secondary-light" size={24} />,
    'Other': <FiLayers className="text-secondary-light" size={24} />
  };
  
  return icons[title] || <FiCode className="text-secondary-light" size={24} />;
};

// Fallback data in case API fails
const fallbackSkills: Skill[] = [
  {
    _id: '1',
    title: 'Frontend',
    icon: 'FiLayout',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'NextJS'],
    order: 1
  },
  {
    _id: '2',
    title: 'Backend',
    icon: 'FiServer',
    skills: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'Authentication', 'Authorization'],
    order: 2
  },
  {
    _id: '3',
    title: 'Databases',
    icon: 'FiDatabase',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Mongoose', 'TypeORM', 'SQL', 'NoSQL'],
    order: 3
  },
  {
    _id: '4',
    title: 'Programming',
    icon: 'FiCode',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'OOP', 'Functional Programming', 'Algorithms'],
    order: 4
  },
  {
    _id: '5',
    title: 'DevOps',
    icon: 'FiTool',
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD', 'AWS', 'Azure', 'Linux', 'Bash'],
    order: 5
  },
  {
    _id: '6',
    title: 'Other',
    icon: 'FiLayers',
    skills: ['UI/UX Design', 'Figma', 'RESTful APIs', 'Testing', 'Agile', 'SCRUM', 'Project Management'],
    order: 6
  }
];

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await apiService.getSkills();
        setSkills(data);
      } catch (err) {
        setError('Failed to fetch skills');
        console.error(err);
        // Use fallback data if API fails
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
      <div className="container-section">
        <h2 className="section-title text-gray-900 dark:text-white animate-fade-in">
          My Skills
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, idx) => (
              <div
                key={category._id}
                className="card p-6 hover:border-secondary-light dark:hover:border-secondary-dark border-2 border-transparent animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {getIcon(category.title)}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills; 