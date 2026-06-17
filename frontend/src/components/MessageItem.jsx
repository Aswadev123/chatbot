import React, { useState } from 'react';

export default function MessageItem({ message }) {
  const { role, content } = message;

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Parses text and separates code blocks from standard paragraph blocks
  const renderContent = (text) => {
    if (!text) return null;

    const parts = [];
    // Regex matches: ```language\ncode_body\n```
    const regex = /```(\w*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add plain text leading up to the code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }

      // Add the parsed code block segment
      parts.push({
        type: 'code',
        language: match[1] || 'code',
        code: match[2].trim()
      });

      lastIndex = regex.lastIndex;
    }

    // Add remaining plain text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    // Default formatting if no code blocks were found
    if (parts.length === 0) {
      parts.push({ type: 'text', content: text });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <CodeBlock 
            key={index} 
            language={part.language} 
            code={part.code} 
            onCopy={handleCopyCode} 
          />
        );
      } else {
        return <TextBlock key={index} text={part.content} />;
      }
    });
  };

  return (
    <div className={`message-wrapper ${role}`}>
      <div className="message-bubble">
        {renderContent(content)}
      </div>
    </div>
  );
}

function CodeBlock({ language, code, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span>{language.toUpperCase()}</span>
        <button onClick={handleCopy}>
          {copied ? 'Copied ✓' : 'Copy Code'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TextBlock({ text }) {
  // Split paragraphs by standard double-newlines
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((paragraph, pIdx) => {
    // Render inline code tags (`like this`)
    const parts = [];
    const inlineRegex = /`([^`]+)`/g;
    let lastIdx = 0;
    let match;

    while ((match = inlineRegex.exec(paragraph)) !== null) {
      if (match.index > lastIdx) {
        parts.push(paragraph.slice(lastIdx, match.index));
      }
      parts.push(<code key={match.index}>{match[1]}</code>);
      lastIdx = inlineRegex.lastIndex;
    }

    if (lastIdx < paragraph.length) {
      parts.push(paragraph.slice(lastIdx));
    }

    // Fallback if no inline code tags are found
    const renderedContent = parts.length > 0 ? parts : paragraph;

    // Check for list items
    if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ')) {
      const listItems = paragraph.split(/\n/).map((line, lIdx) => {
        const cleanedLine = line.replace(/^[-*]\s+/, '');
        return <li key={lIdx}>{cleanedLine}</li>;
      });
      return <ul key={pIdx} style={{ marginLeft: '20px', marginBottom: '12px' }}>{listItems}</ul>;
    }

    // Standard paragraph element
    return (
      <p key={pIdx} style={{ marginBottom: pIdx < paragraphs.length - 1 ? '12px' : '0px' }}>
        {renderedContent}
      </p>
    );
  });
}
