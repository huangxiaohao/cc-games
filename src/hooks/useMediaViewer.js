import { useState } from 'react';

export function useMediaViewer() {
  const [viewer, setViewer] = useState({ visible: false, type: 'image', url: '' });
  const open = (type, url) => setViewer({ visible: true, type, url });
  const close = () => setViewer(v => ({ ...v, visible: false }));
  return { viewer, open, close };
}