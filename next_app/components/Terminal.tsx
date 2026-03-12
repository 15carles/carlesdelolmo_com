import React from 'react';

interface TerminalProps {
  filename: string;
  children: React.ReactNode;
  variant?: 'hook' | 'default';
}

export default function Terminal({ filename, children, variant = 'default' }: TerminalProps) {
  return (
    <div className={`terminal ${variant === 'hook' ? 'terminal--hook' : ''} mb-lg`}>
      <div className="terminal__header">
        <span className="terminal__dot terminal__dot--red"></span>
        <span className="terminal__dot terminal__dot--yellow"></span>
        <span className="terminal__dot terminal__dot--green"></span>
        <span className="terminal__filename">{filename}</span>
      </div>
      <div className="terminal__code">
        {children}
      </div>
    </div>
  );
}
