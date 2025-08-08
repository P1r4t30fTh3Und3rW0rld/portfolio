const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-terminal-gray border-t-terminal-green rounded-full animate-spin"></div>
        </div>
        <div className="text-terminal-gray text-sm font-mono">
          loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 