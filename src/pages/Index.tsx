/**
 * BIG THANKS TO claude.ai FOR THE CSS HAHAHAHAHAHAHAHAHAHAHAHHA
 */

import { useState } from 'react';
import { uploadFile } from '../services/uploadfile';
import { Link } from 'react-router-dom';

export function IndexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [expires, setExpires] = useState<string>('1m');
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    setIsLoading(true);
    setError(null);
    setUrl(null);
    try {
      const response = await uploadFile(file, expires);
      setUrl(`${window.location.origin}/file/${response.url}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  useState(() => {
    document.title = 'Upload your file';
  });
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-3xl">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center">
        Upload a file
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="file"
            className="block text-lg font-semibold text-gray-700 mb-3"
          >
            File
            {file && (
              <span className="ml-2 text-sm text-gray-500">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="sr-only"
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center w-full px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Choose a file
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="expires"
            className="block text-lg font-semibold text-gray-700 mb-3"
          >
            Expires
          </label>
          <select
            id="expires"
            name="expires"
            value={expires}
            onChange={(e) => setExpires(e.target.value)}
            className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all duration-300"
          >
            <option value="1m">1 minute</option>
            <option value="1h">1 hour</option>
            <option value="1d">1 day</option>
            <option value="1w">1 week</option>
            <option value="1M">1 month</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-md text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          {error}
        </div>
      )}
      {url && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl">
          <p className="font-semibold">File uploaded successfully!</p>
          <Link
            to={`/file/${url.split('/').pop()}`}
            className="text-blue-600 hover:underline break-all"
            rel="noreferrer"
          >
            {url}
          </Link>
        </div>
      )}
    </div>
  );
}
