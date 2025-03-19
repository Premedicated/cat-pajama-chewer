import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SampleConversionProps {
  samples?: {
    id: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    fileType: "pdf" | "excel";
  }[];
}

const SampleConversions = ({
  samples = [
    {
      id: "pdf-sample-1",
      title: "Financial Report PDF",
      description:
        "Complex financial PDF with tables converted to clean, structured CSV data",
      beforeImage:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=500&q=80",
      fileType: "pdf",
    },
    {
      id: "excel-sample-1",
      title: "Product Inventory Excel",
      description:
        "Multi-sheet Excel inventory file simplified into a standardized CSV format",
      beforeImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=500&q=80",
      fileType: "excel",
    },
    {
      id: "pdf-sample-2",
      title: "Survey Results PDF",
      description:
        "PDF survey data with charts converted to analysis-ready CSV format",
      beforeImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=500&q=80",
      fileType: "pdf",
    },
    {
      id: "excel-sample-2",
      title: "Sales Data Excel",
      description:
        "Complex Excel sales report with formulas converted to clean CSV data",
      beforeImage:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=500&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=500&q=80",
      fileType: "excel",
    },
  ],
}: SampleConversionProps) => {
  const pdfSamples = samples.filter((sample) => sample.fileType === "pdf");
  const excelSamples = samples.filter((sample) => sample.fileType === "excel");

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 bg-white dark:bg-gray-950">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Sample Conversions
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          See how our tool transforms complex PDF and Excel files into clean,
          usable CSV data
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All Samples</TabsTrigger>
          <TabsTrigger value="pdf">PDF Samples</TabsTrigger>
          <TabsTrigger value="excel">Excel Samples</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {samples.map((sample) => (
              <SampleCard key={sample.id} sample={sample} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pdf" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pdfSamples.map((sample) => (
              <SampleCard key={sample.id} sample={sample} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="excel" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {excelSamples.map((sample) => (
              <SampleCard key={sample.id} sample={sample} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

interface SampleCardProps {
  sample: {
    id: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    fileType: "pdf" | "excel";
  };
}

const SampleCard = ({ sample }: SampleCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300 mr-2">
              {sample.fileType.toUpperCase()}
            </span>
            <h3 className="text-lg font-semibold">{sample.title}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {sample.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Before Conversion
              </p>
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={sample.beforeImage}
                  alt={`${sample.title} before conversion`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                After Conversion (CSV)
              </p>
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={sample.afterImage}
                  alt={`${sample.title} after conversion to CSV`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleConversions;
