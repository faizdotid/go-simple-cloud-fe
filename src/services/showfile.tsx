interface FileMetadata {
  filename: string;
  filesize: number;
}

export const showFile = async (id: string): Promise<FileMetadata> => {
  const url = `${window.location.origin}/api/v1/file/${id}`;
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
      throw error;
    }
    throw new Error('An unexpected error occurred during file fetch');
  }
};

