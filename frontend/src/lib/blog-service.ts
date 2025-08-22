import blogData from '@/data/blog-posts.json';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  publishedAt: string;
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  status: 'DRAFT' | 'PUBLISHED';
}

class BlogService {
  private posts: BlogPost[] = [];

  constructor() {
    // Initialize with existing blog data
    this.posts = blogData.map((post, index) => ({
      id: post.id || `post-${index}`,
      slug: post.id || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
      publishedAt: post.date,
      author: post.author,
      status: 'PUBLISHED' as const
    }));
  }

  async getAllPosts(search = '', page = 1, limit = 10) {
    let filteredPosts = this.posts.filter(post => post.status === 'PUBLISHED');
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }

    const total = filteredPosts.length;
    const offset = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);

    return {
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getPostBySlug(slug: string) {
    const post = this.posts.find(p => p.slug === slug && p.status === 'PUBLISHED');
    return post || null;
  }

  async getAllPostsForAdmin() {
    return this.posts;
  }

  async createPost(postData: BlogPostInput) {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      readTime: postData.readTime,
      publishedAt: postData.status === 'PUBLISHED' ? new Date().toISOString() : '',
      author: 'Admin User',
      status: postData.status
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  async updatePost(id: string, postData: Partial<BlogPostInput>) {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.posts[index] = { ...this.posts[index], ...postData };
    return this.posts[index];
  }

  async deletePost(id: string) {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.posts.splice(index, 1);
    return true;
  }
}

export const blogService = new BlogService();
