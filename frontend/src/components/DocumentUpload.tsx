import React, { useState } from 'react';
import axios from 'axios';

interface DocumentUploadProps {
  claimId: string;
  onUploadSuccess: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ claimId, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('claimId', claimId);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setFile(null);
      onUploadSuccess();
    } catch (error) {
      setError('Error uploading document. Please try again.');
      console.error('Document upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Upload Document</h4>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={!file || uploading}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;

