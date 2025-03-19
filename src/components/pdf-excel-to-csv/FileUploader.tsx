"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileIcon,
  UploadCloudIcon,
  FileSpreadsheetIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { processFile } from "@/lib/fileProcessing";
import "@/lib/pdfjs-worker";
import ConversionResult from "./ConversionResult";

interface FileUploaderProps {
  onFileUpload?: (file: File) => void;
  supportedFileTypes?: string[];
  maxFileSize?: number; // in MB
}

const FileUploader = ({
  onFileUpload = () => {},
  supportedFileTypes = [".pdf", ".xls", ".xlsx", ".csv"],
  maxFileSize = 10, // 10MB default
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [csvData, setCsvData] = useState<string>("");
  const [dataPreview, setDataPreview] = useState<string[][]>([]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging],
  );

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!supportedFileTypes.includes(fileExtension)) {
      setErrorMessage(
        `Unsupported file type. Please upload ${supportedFileTypes.join(", ")} files only.`,
      );
      return false;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setErrorMessage(
        `File size exceeds the maximum limit of ${maxFileSize}MB.`,
      );
      return false;
    }

    return true;
  };

  const handleFileProcessing = async (file: File) => {
    try {
      setUploadStatus("processing");
      const result = await processFile(file);
      setCsvData(result.csvData);
      setDataPreview(result.preview);
      setUploadStatus("success");
      onFileUpload(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to process the file. Please try again with a different file.",
      );
      setUploadStatus("error");
    }
  };

  const handleUpload = (file: File) => {
    if (!validateFile(file)) {
      setUploadStatus("error");
      return;
    }

    setFile(file);
    setUploadStatus("uploading");
    setErrorMessage("");

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Once upload is complete, process the file
        handleFileProcessing(file);
      }
    }, 100);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleUpload(droppedFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleUpload(selectedFile);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");
    setCsvData("");
    setDataPreview([]);
  };

  const getFileIcon = () => {
    if (!file) return null;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "pdf") {
      return <FileIcon className="h-12 w-12 text-red-500" />;
    } else if (["xls", "xlsx", "csv"].includes(fileExtension || "")) {
      return <FileSpreadsheetIcon className="h-12 w-12 text-green-500" />;
    } else {
      return <FileIcon className="h-12 w-12 text-gray-500" />;
    }
  };

  // If conversion is successful, show the conversion result component
  if (uploadStatus === "success" && csvData) {
    return (
      <ConversionResult
        fileName={file?.name || "download.csv"}
        csvData={csvData}
        preview={dataPreview}
        onReset={resetUpload}
      />
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2">
          Upload Your Dental Fee Schedule
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Drag and drop your PDF or Excel file, or click to browse. We'll
          extract ADA codes and prices.
        </p>
      </div>

      {uploadStatus === "error" && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {uploadStatus === "idle" || uploadStatus === "error" ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-600 hover:border-primary"}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept={supportedFileTypes.join(",")}
            onChange={handleFileChange}
          />
          <UploadCloudIcon className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <p className="mb-2 font-medium">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supported formats: {supportedFileTypes.join(", ")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Maximum file size: {maxFileSize}MB
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            {getFileIcon()}
            <div className="ml-4 flex-1 overflow-hidden">
              <p className="font-medium truncate">{file?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file && (file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            {uploadStatus !== "processing" && uploadStatus !== "uploading" ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500 ml-2" />
            ) : (
              <Button variant="ghost" size="sm" onClick={resetUpload}>
                <XCircleIcon className="h-5 w-5 text-gray-500" />
              </Button>
            )}
          </div>

          {uploadStatus === "uploading" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {uploadStatus === "processing" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Processing file...</span>
                <span>Please wait</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FileIcon className="h-5 w-5 mr-2 text-red-500" />
          <span>PDF files</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FileSpreadsheetIcon className="h-5 w-5 mr-2 text-green-500" />
          <span>Excel files</span>
        </div>
      </div>
    </Card>
  );
};

export default FileUploader;
