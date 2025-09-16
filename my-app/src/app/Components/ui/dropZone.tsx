"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiFile, FiX, FiCheck } from "react-icons/fi";
import axios from "axios";

interface DropZoneProps {
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
  onUploadStart?: () => void;
  endpoint?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

const DropZone: React.FC<DropZoneProps> = ({
  onUploadSuccess,
  onUploadError,
  onUploadStart,
  endpoint = "/api/admin/activities/upload",
  acceptedFileTypes = [".csv"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploadedFile(file);
      setUploading(true);
      onUploadStart?.();

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          onUploadSuccess?.(response.data);
        } else {
          throw new Error(response.data.message || "Upload failed");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Upload failed";
        onUploadError?.(errorMessage);
        setUploadedFile(null);
      } finally {
        setUploading(false);
      }
    },
    [endpoint, onUploadSuccess, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    maxFiles: 1,
    maxSize: maxFileSize,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="dropzone-container">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""} ${isDragReject ? "reject" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <FiUpload className="dropzone-icon" />
            <div className="dropzone-text">
              <h3>Upload CSV File</h3>
              <p>
                {isDragActive
                  ? "Drop the file here..."
                  : "Drag & drop a CSV file here, or click to select"}
              </p>
              <p className="dropzone-hint">
                Supported formats: CSV • Max size: 5MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="uploaded-file">
          <div className="file-info">
            <FiFile className="file-icon" />
            <div className="file-details">
              <h4>{uploadedFile.name}</h4>
              <p>{(uploadedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <div className="file-actions">
            {uploading ? (
              <div className="uploading">
                <div className="spinner"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <FiCheck className="success-icon" />
                <button onClick={removeFile} className="remove-btn">
                  <FiX />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .dropzone-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        .dropzone {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .dropzone:hover {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .dropzone.active {
          border-color: #10b981;
          background: #ecfdf5;
        }

        .dropzone.reject {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .dropzone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .dropzone-icon {
          font-size: 3rem;
          color: #6b7280;
        }

        .dropzone.active .dropzone-icon {
          color: #10b981;
        }

        .dropzone.reject .dropzone-icon {
          color: #ef4444;
        }

        .dropzone-text h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
        }

        .dropzone-text p {
          margin: 0.5rem 0 0 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .dropzone-hint {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .uploaded-file {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #f9fafb;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-icon {
          font-size: 1.5rem;
          color: #3b82f6;
        }

        .file-details h4 {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .file-details p {
          margin: 0.25rem 0 0 0;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .file-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .uploading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #3b82f6;
          font-size: 0.875rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-icon {
          color: #10b981;
          font-size: 1.25rem;
        }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          color: #6b7280;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #f3f4f6;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default DropZone;
