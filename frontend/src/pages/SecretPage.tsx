import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BlogManagement from "@/components/BlogManagement";

type AdminSection = 'dashboard' | 'blog-management';

const SecretPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const navigate = useNavigate();
  const { user, login, logout, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
        setPassword("");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setEmail("");
    setPassword("");
    setError("");
    setCurrentSection('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center">
        <div className="text-terminal-orange">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-terminal-orange text-2xl mb-2">
              <span className="text-terminal-orange">*</span> secret
            </h1>
            <p className="text-muted-foreground">enter credentials to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                autoFocus
                required
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-4 py-2 pr-20 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded"
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "entering..." : "enter"}
            </button>
          </form>
          
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-terminal-green transition-colors"
            >
              ← back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'blog-management':
        return <BlogManagement />;
      default:
        return (
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-foreground font-semibold text-lg mb-4">
                blog management
              </h2>
              <div className="grid gap-4">
                <button 
                  onClick={() => setCurrentSection('blog-management')}
                  className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors text-left"
                >
                  manage posts
                </button>
                <button className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors text-left">
                  create new post
                </button>
                <button className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors text-left">
                  view analytics
                </button>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-foreground font-semibold text-lg mb-4">
                quick stats
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground">
                  total posts: <span className="text-foreground">5</span>
                </div>
                <div className="text-muted-foreground">
                  published: <span className="text-foreground">5</span>
                </div>
                <div className="text-muted-foreground">
                  drafts: <span className="text-foreground">0</span>
                </div>
                <div className="text-muted-foreground">
                  role: <span className="text-terminal-green">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Header with user info, navigation, and logout */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          logged in as <span className="text-terminal-green">{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors font-mono text-sm"
        >
          logout
        </button>
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentSection('dashboard')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentSection === 'dashboard'
                ? 'bg-terminal-orange text-background'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            dashboard
          </button>
          <button
            onClick={() => setCurrentSection('blog-management')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentSection === 'blog-management'
                ? 'bg-terminal-orange text-background'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            blog
          </button>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-terminal-orange mb-6 text-2xl">
            <span className="text-terminal-orange">*</span> admin dashboard
          </h1>
          <p className="text-muted-foreground">
            welcome to your admin area, {user.email}
          </p>
        </header>
        
        {renderSection()}
      </main>
    </div>
  );
};

export default SecretPage;
