export const downloadFile = async (id: string): Promise<Blob> => {
  const url = `${window.location.origin}/api/v1/file/${id}/download`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/octet-stream',
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

    return response.blob();
  } catch (error) {
    console.error('File download error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during file download');
  }
};
