import React from "react";
import { ArrowRight, Upload, Cog, Download } from "lucide-react";

interface ConversionProcessProps {
  steps?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const ConversionProcess = ({ steps }: ConversionProcessProps) => {
  const defaultSteps = [
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "Upload",
      description: "Upload your PDF or Excel file to our secure platform",
    },
    {
      icon: <Cog className="h-10 w-10 text-primary animate-spin-slow" />,
      title: "Convert",
      description: "Our system processes your file with high accuracy",
    },
    {
      icon: <Download className="h-10 w-10 text-primary" />,
      title: "Download",
      description: "Get your CSV file ready for immediate use",
    },
  ];

  const displaySteps = steps || defaultSteps;

  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Converting your PDF and Excel files to CSV format is simple and fast
            with our three-step process
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
          {displaySteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                <div className="rounded-full bg-secondary/20 p-4 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {index < displaySteps.length - 1 && (
                <div className="hidden md:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversionProcess;
