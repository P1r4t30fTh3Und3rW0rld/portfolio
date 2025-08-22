import React, { useState, useEffect } from 'react';
import BlogEditor from './BlogEditor';
import { blogService, BlogPost } from '@/lib/blog-service';

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Not published';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const BlogManagement: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllPostsForAdmin();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleSavePost = async (postData: Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'author'>) => {
    try {
      setIsSaving(true);
      
      if (editingPost) {
        await blogService.updatePost(editingPost.id, postData);
      } else {
        await blogService.createPost(postData);
      }

      await fetchPosts();
      setShowEditor(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await blogService.deletePost(postId);
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (showEditor) {
    return (
      <BlogEditor
        initialPost={editingPost || undefined}
        onSave={handleSavePost}
        onCancel={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
        isLoading={isSaving}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-terminal-orange">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Blog Management</h2>
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors"
        >
          Create New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No posts found</p>
          <button
            onClick={handleCreatePost}
            className="mt-4 px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors"
          >
            Create your first post
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-border rounded-lg p-4 hover:border-terminal-orange transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Slug: {post.slug}</span>
                    <span>Read time: {post.readTime}</span>
                    <span>Published: {formatDate(post.publishedAt)}</span>
                    <span>Author: {post.author}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="px-3 py-1 bg-muted border border-border rounded hover:border-terminal-orange transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
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

export default BlogManagement;
