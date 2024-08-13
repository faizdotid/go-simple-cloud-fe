interface FileMetadata {
  status_code: number;
  filename: string;
  filesize: number;
}

export const showFile = async (id: string): Promise<FileMetadata> => {
  const url = `${import.meta.env.VITE_API_URL}/api/v1/file/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    const data = (await response.json())['file'];

    if (!data.filename || typeof data.filesize !== 'number') {
      throw new Error('Invalid response format');
    }
    return data;
  } catch (error) {
    console.error('File fetch error:', error);
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error('File not found');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred during file fetch');
  }
};
