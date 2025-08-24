import React, { useState, useEffect } from 'react';
import { projectsService, Project } from '@/lib/projects-service';

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    github_url: '',
    live_url: '',
    technologies: '',
    featured: false,
    display_order: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      image_url: '',
      github_url: '',
      live_url: '',
      technologies: '',
      featured: false,
      display_order: 0
    });
    setShowCreateForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      image_url: project.image_url || '',
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      technologies: project.technologies.join(', '),
      featured: project.featured,
      display_order: project.display_order
    });
    setShowCreateForm(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      setError('Name and description are required');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const projectData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image_url: formData.image_url.trim() || null,
        github_url: formData.github_url.trim() || null,
        live_url: formData.live_url.trim() || null,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        featured: formData.featured,
        display_order: formData.display_order
      };

      if (editingProject) {
        // Update existing project
        const response = await fetch(`http://localhost:5000/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
          },
          body: JSON.stringify(projectData)
        });

        if (!response.ok) {
          throw new Error('Failed to update project');
        }
      } else {
        // Create new project
        const response = await fetch('http://localhost:5000/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
          },
          body: JSON.stringify(projectData)
        });

        if (!response.ok) {
          throw new Error('Failed to create project');
        }
      }

      await fetchProjects();
      setShowCreateForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Failed to save project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      image_url: '',
      github_url: '',
      live_url: '',
      technologies: '',
      featured: false,
      display_order: 0
    });
  };

  if (showCreateForm) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSaveProject} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                placeholder="0"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lower numbers appear first
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Featured
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm text-muted-foreground">Show on homepage</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Technologies
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
              className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
              placeholder="React, Node.js, TypeScript (comma separated)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate technologies with commas
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-terminal-orange">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Projects Management</h2>
        <button
          onClick={handleCreateProject}
          className="px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors"
        >
          Create New Project
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No projects found</p>
          <button
            onClick={handleCreateProject}
            className="mt-4 px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border rounded-lg p-4 hover:border-terminal-orange transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.featured
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.featured ? 'Featured' : 'Regular'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Technologies: {project.technologies.join(', ')}</span>
                    {project.github_url && <span>GitHub: {project.github_url}</span>}
                    {project.live_url && <span>Live: {project.live_url}</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="px-3 py-1 bg-muted border border-border rounded hover:border-terminal-orange transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors text-sm text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;
