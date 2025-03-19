import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  faqItems?: FAQItem[];
}

const FAQ = ({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our PDF and Excel to CSV conversion tool.",
  faqItems = [
    {
      question: "What file formats can I convert to CSV?",
      answer:
        "Our tool supports conversion from PDF files (.pdf) and various Excel formats (.xlsx, .xls, .xlsm) to CSV format. We're constantly working to expand our supported file types.",
    },
    {
      question: "How accurate is the conversion from PDF to CSV?",
      answer:
        "Our PDF to CSV conversion uses advanced OCR technology to extract tabular data with high accuracy. However, complex layouts or poor quality scans may affect results. For best results, use PDFs with clear, well-structured tables.",
    },
    {
      question: "Is there a file size limit for uploads?",
      answer:
        "Yes, the maximum file size for uploads is 25MB. If you need to convert larger files, please contact our support team for assistance with custom solutions.",
    },
    {
      question: "How is my data handled during conversion?",
      answer:
        "We take data privacy seriously. All uploaded files are processed securely and deleted from our servers within 24 hours of conversion. We do not store or access the content of your files beyond what's necessary for conversion.",
    },
    {
      question: "Why is my Excel file not converting correctly?",
      answer:
        "This could be due to complex formatting, merged cells, or formulas in your Excel file. Try simplifying your spreadsheet before conversion, or use our 'Advanced Options' to customize how formulas and formatting are handled.",
    },
    {
      question: "Can I convert multiple files at once?",
      answer:
        "Yes, our tool supports batch conversion. You can upload multiple files (up to 10 at once) and convert them in a single operation. Each file will be converted to a separate CSV.",
    },
  ],
}: FAQProps) => {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
