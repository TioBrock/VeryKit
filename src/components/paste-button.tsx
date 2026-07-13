'use client';

import { useState, useCallback } from 'react';
import { Clipboard } from 'lucide-react';
import { useTranslations } from 'next-intl';

type PasteButtonProps = {
  onPaste: (text: string) => void;
  className?: string;
};

export function PasteButton({ onPaste, className }: PasteButtonProps) {
  const t = useTranslations();
  const [error, setError] = useState(false);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      onPaste(text);
      setError(false);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  }, [onPaste]);

  return (
    <div className="relative inline-flex flex-col">
      <button
        type="button"
        onClick={handlePaste}
        className={`inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${className ?? ''}`}
      >
        <Clipboard className="h-4 w-4" aria-hidden="true" />
        {t('buttons.paste')}
      </button>
      {error && (
        <span className="absolute -bottom-8 left-0 w-48 whitespace-normal text-xs text-destructive">
          Clipboard access denied. Use Ctrl+V or Cmd+V.
        </span>
      )}
    </div>
  );
}
