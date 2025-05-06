import React, { useState } from 'react';
import { Upload, X, Send } from 'lucide-react';

const FileUpload = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-esg-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      console.log('Upload successful:', data);
      
      // Clear the file and notify parent
      setSelectedFile(null);
      onUploadComplete();
      
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Upload Data File</h3>
      <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center mb-6">
        <Upload className="w-12 h-12 text-green-500 mx-auto mb-4" />
        {!selectedFile ? (
          <label className="block">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
              onChange={handleFileUpload}
            />
          </label>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-700">{selectedFile.name}</span>
            <button
              onClick={handleRemoveFile}
              className="p-1 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      
      {selectedFile && (
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg
              transition-all duration-300 transform hover:scale-105 shadow-md
              hover:shadow-lg active:scale-95 active:shadow-inner
              ${isUploading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'}`}
          >
            <Send className={`w-5 h-5 ${isUploading ? 'animate-pulse' : ''}`} />
            <span>{isUploading ? 'Processing...' : 'Upload File'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;