import React from 'react';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('```')) {
          return <div key={index} className="bg-muted p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">{line.substring(3)}</div>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="text-foreground mb-4 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="prose prose-invert max-w-none">
      {renderContent(content)}
    </div>
  );
};

export default BlogContent;
