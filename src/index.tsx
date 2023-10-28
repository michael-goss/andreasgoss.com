/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { createRoot } from 'react-dom/client';
import { Canvas } from './Canvas';
const root = createRoot(document.getElementById('root')!);

const App = () => {
  return <Canvas />;
};

root.render(<App />);
