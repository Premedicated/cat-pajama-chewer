import React from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Convert PDF & Excel to CSV Instantly",
  subtitle = "Simple, Fast, Accurate",
  description = "Transform your complex PDF and Excel files into clean, structured CSV data with our powerful conversion tool. No technical skills required.",
  ctaText = "Start Converting Now",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-primary mb-6">
          {subtitle}
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-10 text-muted-foreground">
          {description}
        </p>
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-medium"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-base">Easy to use</span>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-base">Lightning fast</span>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-base">Secure processing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
