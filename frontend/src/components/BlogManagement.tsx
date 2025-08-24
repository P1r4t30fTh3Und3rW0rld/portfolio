import React, { useState, useEffect } from 'react';
import BlogEditor from './BlogEditor';
import { blogService, BlogPost } from '@/lib/blog-service';

type TabType = 'published' | 'drafts';

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
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('published');
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [postToPublish, setPostToPublish] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAllPostsForAdmin();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError('Failed to load posts. Please try again.');
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

  const handleSavePost = async (postData: Omit<BlogPost, 'id' | 'slug' | 'published_at' | 'author' | 'created_at' | 'updated_at'>) => {
    try {
      setIsSaving(true);
      setError(null);
      
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
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setError(null);
      await blogService.deletePost(postId);
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
    }
  };

  const handlePublishPost = async (post: BlogPost) => {
    try {
      setError(null);
      await blogService.updatePost(post.id, { ...post, status: 'PUBLISHED' });
      await fetchPosts();
      setShowPublishConfirm(false);
      setPostToPublish(null);
    } catch (error) {
      console.error('Error publishing post:', error);
      setError('Failed to publish post. Please try again.');
    }
  };

  const openPublishConfirm = (post: BlogPost) => {
    setPostToPublish(post);
    setShowPublishConfirm(true);
  };

  const closePublishConfirm = () => {
    setShowPublishConfirm(false);
    setPostToPublish(null);
  };

  const handleViewPost = (post: BlogPost) => {
    window.open(`/blog/${post.slug}`, '_blank');
  };

  // Filter posts based on active tab
  const publishedPosts = posts.filter(post => post.status === 'PUBLISHED');
  const draftPosts = posts.filter(post => post.status === 'DRAFT');

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

  const renderPostsList = (postsList: BlogPost[], showPublishButton: boolean = false, showViewButton: boolean = false) => {
    if (postsList.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {activeTab === 'published' ? 'No published posts found.' : 'No draft posts found.'}
          </p>
          {activeTab === 'drafts' && (
            <button
              onClick={handleCreatePost}
              className="mt-4 px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors"
            >
              Create your first draft
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {postsList.map((post) => (
          <div
            key={post.id}
            className="border border-border rounded-lg p-4 hover:border-terminal-orange transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 
                    className={`text-lg font-semibold transition-colors ${
                      showViewButton 
                        ? 'text-terminal-orange hover:text-terminal-orange/80 cursor-pointer' 
                        : 'text-foreground'
                    }`}
                    onClick={showViewButton ? () => handleViewPost(post) : undefined}
                    title={showViewButton ? 'Click to view published post' : undefined}
                  >
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
                  <span>Read time: {post.read_time}</span>
                  <span>Published: {formatDate(post.published_at)}</span>
                  <span>Author: {post.author}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {showPublishButton && (
                  <button
                    onClick={() => openPublishConfirm(post)}
                    className="px-3 py-1 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors text-sm text-green-700"
                  >
                    Publish
                  </button>
                )}
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
    );
  };

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

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('published')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'published'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Published ({publishedPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'drafts'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Drafts ({draftPosts.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'published' ? (
        renderPostsList(publishedPosts, false, true)
      ) : (
        renderPostsList(draftPosts, true, false)
      )}

      {/* Publish Confirmation Modal */}
      {showPublishConfirm && postToPublish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Publish Post
            </h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to publish "{postToPublish.title}"? This will make it visible to all visitors.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closePublishConfirm}
                className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePublishPost(postToPublish)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
