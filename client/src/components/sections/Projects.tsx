import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { apiService, Project } from '../../services/api';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="card overflow-hidden group animate-fade-in">
      {/* <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            No Image Available
          </div>
        )}
      </div> */}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        {/* <div className="flex justify-between">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary-light transition-colors"
              aria-label="View source code"
            >
              <FiGithub size={20} />
            </a>
          )}
          
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary-light transition-colors"
              aria-label="View live project"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div> */}
      </div>
    </div>
  );
};

// Fallback data in case API fails
const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    featured: true
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team workspace.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    featured: true
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current conditions and forecasts for multiple locations.',
    technologies: ['React', 'OpenWeather API', 'Chart.js'],
    featured: false
  },
  {
    _id: '4',
    title: 'Recipe Finder',
    description: 'An application that helps users find recipes based on ingredients they have on hand.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Edamam API'],
    featured: false
  },
  {
    _id: '5',
    title: 'Fitness Tracker',
    description: 'A fitness tracking application that allows users to record and analyze their workouts.',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    featured: true
  },
  {
    _id: '6',
    title: 'Movie Database',
    description: 'A movie database application that allows users to browse, search, and review movies.',
    technologies: ['React', 'TMDB API', 'CSS'],
    featured: false
  }
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
        // Use fallback data if API fails
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.featured);
  
  return (
    <section id="projects" className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
      <div className="container-section">
        <h2 className="section-title text-gray-900 dark:text-white">
          My Projects
        </h2>
        
        {/* <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'featured'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Featured
            </button>
          </div>
        </div> */}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 py-10">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 