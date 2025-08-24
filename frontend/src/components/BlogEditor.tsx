import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog-service';

interface BlogEditorProps {
  initialPost?: BlogPost;
  onSave: (postData: Omit<BlogPost, 'id' | 'slug' | 'published_at' | 'author' | 'created_at' | 'updated_at' | 'status'>) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  initialPost,
  onSave,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    read_time: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialPost) {
      setFormData({
        title: initialPost.title,
        excerpt: initialPost.excerpt,
        content: initialPost.content,
        read_time: initialPost.read_time
      });
    }
  }, [initialPost]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.read_time.trim()) {
      newErrors.read_time = 'Read time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {initialPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-2 bg-muted border rounded-md focus:outline-none text-foreground ${
              errors.title ? 'border-red-500' : 'border-border focus:border-terminal-orange'
            }`}
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Excerpt *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            rows={3}
            className={`w-full px-4 py-2 bg-muted border rounded-md focus:outline-none text-foreground ${
              errors.excerpt ? 'border-red-500' : 'border-border focus:border-terminal-orange'
            }`}
            required
          />
          {errors.excerpt && (
            <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={15}
            className={`w-full px-4 py-2 bg-muted border rounded-md focus:outline-none text-foreground font-mono text-sm ${
              errors.content ? 'border-red-500' : 'border-border focus:border-terminal-orange'
            }`}
            required
            placeholder="Write your blog post content here... You can use Markdown formatting."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Read Time *
            </label>
            <input
              type="text"
              value={formData.read_time}
              onChange={(e) => handleChange('read_time', e.target.value)}
              placeholder="e.g., 5 min read"
              className={`w-full px-4 py-2 bg-muted border rounded-md focus:outline-none text-foreground ${
                errors.read_time ? 'border-red-500' : 'border-border focus:border-terminal-orange'
              }`}
              required
            />
            {errors.read_time && (
              <p className="text-red-500 text-sm mt-1">{errors.read_time}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (initialPost ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
