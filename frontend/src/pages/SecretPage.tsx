import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BlogManagement from "@/components/BlogManagement";
import ProjectsManagement from "@/components/ProjectsManagement";

type TabType = 'blog' | 'projects';

const SecretPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('blog');
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setEmail("");
    setPassword("");
    setError("");
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

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Header with user info and logout */}
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

      {/* Back to home button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="px-3 py-1 bg-muted text-muted-foreground hover:text-foreground transition-colors rounded text-sm"
        >
          ← home
        </button>
      </div>
      
      <main className="max-w-6xl mx-auto px-8 py-12">
        <header className="mb-8">
          <h1 className="text-terminal-orange mb-4 text-2xl">
            <span className="text-terminal-orange">*</span> admin dashboard
          </h1>
          <p className="text-muted-foreground">
            manage your content, {user.email}
          </p>
        </header>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'blog'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            blog management
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            projects management
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'blog' ? (
          <BlogManagement />
        ) : (
          <ProjectsManagement />
        )}
      </main>
    </div>
  );
};

export default SecretPage;
