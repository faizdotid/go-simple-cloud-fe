import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showFile } from '../services/showfile';
import { downloadFile } from '../services/downloadfile';

export function FilePage() {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<{
    filename: string;
    filesize: number;
    preview: {
      name: string;
      url: string;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'File Details';
    const fetchFile = async () => {
      try {
        const data = await showFile(id!);
        setFile(data);
      } catch (error) {
        console.error('File fetch error:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        );
      }
    };

    fetchFile();
  }, [id]);
  const handleDownload = async () => {
    try {
      const blob = await downloadFile(id!);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file!.filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred during download'
      );
    }
  };
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-3xl">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center w-full">
        File Details
      </h1>
      {error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          {error}
        </div>
      ) : file ? (
        <div className="space-y-6">
          <img
            src={import.meta.env.VITE_API_URL + '/' + file.preview.url}
            alt="File preview"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="bg-gray-100 p-4 rounded-xl">
            <span className="text-lg font-semibold text-gray-700">
              Filename:
            </span>{' '}
            <span className="text-lg text-gray-600">{file.filename}</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <span className="text-lg font-semibold text-gray-700">
              Filesize:
            </span>{' '}
            <span className="text-lg text-gray-600">
              {(file.filesize / 1024).toFixed(2)} KB
            </span>
          </div>
          <button
            type="submit"
            onClick={handleDownload}
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-md text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}
    </div>
  );
}
