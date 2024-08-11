import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './router/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center min-h-screen p-4 relative">
      <RouterProvider router={routes} />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        <div className="text-gray-500 text-sm">
          <a
            href="https://github.com/faizdotid"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            @faizdotid
          </a>{' '}
          | {new Date().getFullYear()}
        </div>
      </div>
    </div>
  </React.StrictMode>
);
