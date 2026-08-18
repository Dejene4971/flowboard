import { useEffect, useCallback } from 'react';

interface ShortcutMap {
  [key: string]: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = [];
      if (e.metaKey || e.ctrlKey) key.push('mod');
      if (e.shiftKey) key.push('shift');
      if (e.altKey) key.push('alt');
      key.push(e.key.toLowerCase());
      const shortcutKey = key.join('+');

      if (shortcuts[shortcutKey]) {
        e.preventDefault();
        shortcuts[shortcutKey]();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
