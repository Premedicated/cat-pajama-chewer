"use client";

import React from "react";
import HeroSection from "@/components/pdf-excel-to-csv/HeroSection";
import FileUploader from "@/components/pdf-excel-to-csv/FileUploader";
import ConversionProcess from "@/components/pdf-excel-to-csv/ConversionProcess";
import SampleConversions from "@/components/pdf-excel-to-csv/SampleConversions";
import Testimonials from "@/components/pdf-excel-to-csv/Testimonials";
import FAQ from "@/components/pdf-excel-to-csv/FAQ";

export default function PdfExcelToCsvPage() {
  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
    // This is just for logging, the actual processing happens in the FileUploader component
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        title="Convert PDF & Excel to CSV Instantly"
        subtitle="Simple, Fast, Accurate"
        description="Transform your complex PDF and Excel files into clean, structured CSV data with our powerful conversion tool. No technical skills required."
        ctaText="Start Converting Now"
      />

      {/* File Upload Section */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <FileUploader
            supportedFileTypes={[".pdf", ".xls", ".xlsx", ".csv"]}
            maxFileSize={10}
            onFileUpload={handleFileUpload}
          />
        </div>
      </section>

      {/* Conversion Process Section */}
      <ConversionProcess />

      {/* Sample Conversions Section */}
      <SampleConversions />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Convert Your Files?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start converting your PDF and Excel files to CSV format today. No
            registration required.
          </p>
          <button
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Convert Files Now
          </button>
        </div>
      </section>
    </main>
  );
}
