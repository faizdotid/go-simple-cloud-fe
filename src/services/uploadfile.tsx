export interface UploadResponse {
  file: {
    url: string;
    expiresAt: string;
  };
}

export const uploadFile = async (
  file: File,
  expires: string
): Promise<UploadResponse['file']> => {
  if (!file) {
    throw new Error('No file provided');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('expires_in', expires);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/files`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData.error as string).charAt(0).toUpperCase() +
          (errorData.error as string).slice(1) ||
          `Request failed with status ${response.status}`
      );
    }

    const json: UploadResponse = await response.json();

    if (!json.file || !json.file.url) {
      throw new Error('Invalid response format');
    }

    return json.file;
  } catch (error) {
    console.error('File upload error:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred during file upload');
  }
};
