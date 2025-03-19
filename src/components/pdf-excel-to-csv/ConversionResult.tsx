"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Copy, Check } from "lucide-react";
import { saveCSV } from "@/lib/fileProcessing";

interface ConversionResultProps {
  fileName: string;
  csvData: string;
  preview: string[][];
  onReset: () => void;
}

const ConversionResult = ({
  fileName,
  csvData,
  preview,
  onReset,
}: ConversionResultProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleDownload = () => {
    const newFileName = fileName.split(".")[0] + ".csv";
    saveCSV(csvData, newFileName);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(csvData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2">Conversion Complete!</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Your file has been successfully converted to CSV format
        </p>
      </div>

      <div className="border rounded-lg p-4 mb-6 overflow-x-auto">
        <h4 className="font-medium mb-2">Preview:</h4>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {preview.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-r last:border-r-0 border-gray-200 dark:border-gray-700"
                  >
                    {cell || (
                      <span className="text-gray-400 dark:text-gray-600">
                        Empty
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download CSV
        </Button>

        <Button
          variant="outline"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>

        <Button variant="ghost" onClick={onReset}>
          Convert Another File
        </Button>
      </div>
    </Card>
  );
};

export default ConversionResult;
