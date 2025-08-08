import React from 'react';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
          codeBlockContent = [];
        } else {
          // End of code block
          inCodeBlock = false;
          elements.push(
            React.createElement('pre', {
              key: `code-${i}`,
              className: "bg-muted p-4 rounded-md my-4 font-mono text-sm overflow-x-auto border border-border"
            },
              React.createElement('code', {
                className: `language-${codeLanguage}`
              }, codeBlockContent.join('\n'))
            )
          );
          codeBlockContent = [];
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headers
      if (line.startsWith('## ')) {
        elements.push(
          React.createElement('h2', {
            key: `h2-${i}`,
            className: "text-foreground font-semibold text-xl mt-8 mb-4"
          }, line.substring(3))
        );
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          React.createElement('h3', {
            key: `h3-${i}`,
            className: "text-foreground font-semibold text-lg mt-6 mb-3"
          }, line.substring(4))
        );
        continue;
      }

      // Handle tables
      if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const tableRows: string[][] = [];
        let j = i;
        
        // Collect all table rows
        while (j < lines.length && lines[j].includes('|') && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
          const row = lines[j].split('|').slice(1, -1).map(cell => cell.trim());
          tableRows.push(row);
          j++;
        }
        
        if (tableRows.length > 1) {
          const thead = React.createElement('thead', {},
            React.createElement('tr', {},
              tableRows[0].map((header, idx) =>
                React.createElement('th', {
                  key: idx,
                  className: "border border-border px-4 py-2 text-left bg-muted font-semibold"
                }, header)
              )
            )
          );

          const tbody = React.createElement('tbody', {},
            tableRows.slice(1).map((row, rowIdx) =>
              React.createElement('tr', { key: rowIdx },
                row.map((cell, cellIdx) =>
                  React.createElement('td', {
                    key: cellIdx,
                    className: "border border-border px-4 py-2"
                  }, cell)
                )
              )
            )
          );

          elements.push(
            React.createElement('div', {
              key: `table-${i}`,
              className: "overflow-x-auto my-6"
            },
              React.createElement('table', {
                className: "w-full border-collapse border border-border"
              }, thead, tbody)
            )
          );
          i = j - 1; // Skip processed rows
          continue;
        }
      }

      // Handle lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: string[] = [];
        let j = i;
        
        // Collect all list items
        while (j < lines.length && (lines[j].startsWith('- ') || lines[j].startsWith('* ') || lines[j].startsWith('  '))) {
          listItems.push(lines[j].replace(/^[-*]\s*/, '').trim());
          j++;
        }
        
        if (listItems.length > 0) {
          elements.push(
            React.createElement('ul', {
              key: `list-${i}`,
              className: "my-4 space-y-2"
            },
              listItems.map((item, idx) =>
                React.createElement('li', {
                  key: idx,
                  className: "text-muted-foreground ml-4 list-disc"
                }, item)
              )
            )
          );
          i = j - 1; // Skip processed items
          continue;
        }
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        const listItems: string[] = [];
        let j = i;
        
        // Collect all numbered list items
        while (j < lines.length && /^\d+\.\s/.test(lines[j])) {
          listItems.push(lines[j].replace(/^\d+\.\s/, '').trim());
          j++;
        }
        
        if (listItems.length > 0) {
          elements.push(
            React.createElement('ol', {
              key: `olist-${i}`,
              className: "my-4 space-y-2 list-decimal ml-4"
            },
              listItems.map((item, idx) =>
                React.createElement('li', {
                  key: idx,
                  className: "text-muted-foreground"
                }, item)
              )
            )
          );
          i = j - 1; // Skip processed items
          continue;
        }
      }

      // Handle images
      if (line.startsWith('![') && line.includes('](') && line.endsWith(')')) {
        const match = line.match(/!\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          const [, alt, src] = match;
          elements.push(
            React.createElement('div', {
              key: `img-${i}`,
              className: "my-6"
            },
              React.createElement('img', {
                src: src,
                alt: alt,
                className: "max-w-full h-auto rounded-md border border-border"
              }),
              alt && React.createElement('p', {
                className: "text-center text-sm text-muted-foreground mt-2"
              }, alt)
            )
          );
          continue;
        }
      }

      // Handle inline code
      if (line.includes('`')) {
        const formattedLine = line.replace(/`([^`]+)`/g, '<code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>');
        elements.push(
          React.createElement('p', {
            key: `p-${i}`,
            className: "text-muted-foreground leading-relaxed mb-4",
            dangerouslySetInnerHTML: { __html: formattedLine }
          })
        );
        continue;
      }

      // Handle bold and italic text
      if (line.includes('**') || line.includes('*')) {
        // Process bold text first (double asterisks)
        let formattedLine = line;
        
        // Handle bold text with **
        formattedLine = formattedLine.replace(/\*\*([^*]+?)\*\*/g, (match, content) => {
          return `<strong class="font-bold text-foreground">${content}</strong>`;
        });
        
        // Handle italic text with single * - avoid conflicts with bold
        formattedLine = formattedLine.replace(/\*([^*]+?)\*/g, (match, content) => {
          // Skip if this was already processed as bold
          if (match.includes('<strong>')) {
            return match;
          }
          return `<em class="italic">${content}</em>`;
        });
        
        if (formattedLine.trim()) {
          elements.push(
            React.createElement('p', {
              key: `p-${i}`,
              className: "text-muted-foreground leading-relaxed mb-4",
              dangerouslySetInnerHTML: { __html: formattedLine }
            })
          );
          continue;
        }
      }

      // Handle empty lines
      if (line.trim() === '') {
        elements.push(React.createElement('br', { key: `br-${i}` }));
        continue;
      }

      // Regular paragraph
      if (line.trim()) {
        elements.push(
          React.createElement('p', {
            key: `p-${i}`,
            className: "text-muted-foreground leading-relaxed mb-4"
          }, line)
        );
      }
    }

    return elements;
  };

  return (
    <div className="prose prose-invert max-w-none">
      {formatContent(content)}
    </div>
  );
};

export default BlogContent; 