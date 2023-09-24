/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')!);

const App = () => {
  return <h1>Hello Andiii</h1>;
};

root.render(<App />);
