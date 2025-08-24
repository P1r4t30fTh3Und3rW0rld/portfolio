export interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ProjectsService {
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      return data.projects || [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const allProjects = await this.getAllProjects();
      return allProjects.filter(project => project.featured);
    } catch (error) {
      console.error('Failed to fetch featured projects:', error);
      return [];
    }
  }

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const allProjects = await this.getAllProjects();
      return allProjects.find(project => project.id === id) || null;
    } catch (error) {
      console.error('Failed to fetch project by ID:', error);
      return null;
    }
  }
}

export const projectsService = new ProjectsService();
