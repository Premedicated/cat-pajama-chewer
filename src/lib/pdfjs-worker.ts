// This file is needed to set up the PDF.js worker
import { GlobalWorkerOptions } from "pdfjs-dist";

// In a browser environment, we need to set the worker source
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Use CDN for the worker
  const pdfJsVersion = "3.11.174"; // Match the version in package.json
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJsVersion}/pdf.worker.min.js`;
}
