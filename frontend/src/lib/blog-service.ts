export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
  published_at: string | null;
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
  status: 'DRAFT' | 'PUBLISHED';
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class BlogService {
  private getAuthToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  private async makeAuthenticatedRequest(endpoint: string, options: RequestInit = {}) {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response;
  }

  async getAllPosts(search = '', page = 1, limit = 10) {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/blog?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await response.json();
  }

  async getPostBySlug(slug: string) {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch post');
    }

    const data = await response.json();
    return data.post;
  }

  async getAllPostsForAdmin() {
    const response = await this.makeAuthenticatedRequest('/admin/posts');
    const data = await response.json();
    return data.posts;
  }

  async createPost(postData: BlogPostInput) {
    const response = await this.makeAuthenticatedRequest('/admin/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    return data.post;
  }

  async updatePost(id: string, postData: Partial<BlogPostInput>) {
    const response = await this.makeAuthenticatedRequest(`/admin/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    return data.post;
  }

  async deletePost(id: string) {
    await this.makeAuthenticatedRequest(`/admin/posts/${id}`, {
      method: 'DELETE',
    });

    return true;
  }
}

export const blogService = new BlogService();
