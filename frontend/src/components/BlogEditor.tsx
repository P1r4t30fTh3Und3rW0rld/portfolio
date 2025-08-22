import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog-service';

interface BlogEditorProps {
  initialPost?: BlogPost;
  onSave: (postData: Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'author'>) => Promise<void>;
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
    readTime: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED'
  });

  useEffect(() => {
    if (initialPost) {
      setFormData({
        title: initialPost.title,
        excerpt: initialPost.excerpt,
        content: initialPost.content,
        readTime: initialPost.readTime,
        status: initialPost.status
      });
    }
  }, [initialPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: string | 'DRAFT' | 'PUBLISHED') => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={15}
            className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground font-mono text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Read Time
            </label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => handleChange('readTime', e.target.value)}
              placeholder="e.g., 5 min read"
              className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as 'DRAFT' | 'PUBLISHED')}
              className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
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
