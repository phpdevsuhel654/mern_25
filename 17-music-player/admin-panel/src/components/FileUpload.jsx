import React, { useEffect, useRef, useState } from 'react';

import { uploadImage } from '../services/uploadService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';
const BACKEND_URL = API_BASE_URL.replace('/api/v1', '');

const getFullImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  // If it's already a full URL (data URI or http/https), return as is
  if (imageUrl.startsWith('data:') || imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // If it's a relative path, prefix with backend URL
  return `${BACKEND_URL}${imageUrl}`;
};

const FileUpload = ({ onChange, value, accept = 'image/*', label = 'Upload File' }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(() => getFullImageUrl(value || ''));
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Update preview when value changes (e.g., during edit mode)
  useEffect(() => {
    if (value) {
      setPreview(getFullImageUrl(value));
    }
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    setUploadError('');

    try {
      const uploadedUrl = await uploadImage(file);
      onChange?.(uploadedUrl);
    } catch (error) {
      setUploadError(error?.response?.data?.message || 'Failed to upload image');
      setPreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setPreview('');
    setUploadError('');
    onChange?.('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file-upload">
      <div style={{ marginBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            opacity: isUploading ? 0.6 : 1
          }}
        >
          {isUploading ? 'Uploading...' : label}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={isUploading}
        style={{ display: 'none' }}
      />
      {uploadError && (
        <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.5rem' }}>{uploadError}</p>
      )}
      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '200px',
              maxHeight: '200px',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              display: 'block'
            }}
          />
          <button
            type="button"
            onClick={handleClear}
            disabled={isUploading}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              opacity: isUploading ? 0.6 : 1
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
