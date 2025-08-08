import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SecretPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use environment variable for password (Vite syntax)
    const secretPassword = import.meta.env.VITE_SECRET_PASSWORD;
    
    if (password === secretPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-terminal-orange text-2xl mb-2">
              <span className="text-terminal-orange">*</span> secret
            </h1>
            <p className="text-muted-foreground">enter password to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-4 py-2 pr-20 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground"
                autoFocus
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
              className="w-full px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors"
            >
              enter
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
      {/* Lock button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleLock}
          className="px-4 py-2 bg-terminal-orange text-background rounded-md hover:bg-terminal-orange/90 transition-colors font-mono text-sm"
        >
          lock
        </button>
      </div>
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-terminal-orange mb-6 text-2xl">
            <span className="text-terminal-orange">*</span> secret page
          </h1>
          <p className="text-muted-foreground">
            welcome to your secret area
          </p>
        </header>
        
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-foreground font-semibold text-lg mb-4">
              secret content
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              this is your private area. you can add any content here that only you can see.
            </p>
          </div>
          
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-foreground font-semibold text-lg mb-4">
              quick actions
            </h2>
            <div className="grid gap-4">
              <button className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors text-left">
                action 1
              </button>
              <button className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors text-left">
                action 2
              </button>
              <button className="px-4 py-2 bg-muted border border-border rounded-md hover:border-terminal-orange transition-colors text-left">
                action 3
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecretPage;
