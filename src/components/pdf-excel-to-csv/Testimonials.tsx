import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  testimonials?: {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
  }[];
  statistics?: {
    value: string;
    label: string;
  }[];
}

const Testimonials = ({
  testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Data Analyst",
      company: "TechCorp",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      quote:
        "This converter saved me hours of manual data formatting. I can now quickly transform our PDF reports into CSV for analysis.",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Financial Advisor",
      company: "Global Finance",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      quote:
        "Converting Excel spreadsheets to CSV has never been easier. The tool maintains data integrity perfectly.",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "Brand Solutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      quote:
        "We regularly need to convert PDF reports for our analytics platform. This tool has become an essential part of our workflow.",
    },
  ],
  statistics = [
    { value: "500K+", label: "Files Converted" },
    { value: "99.8%", label: "Conversion Accuracy" },
    { value: "15M+", label: "Data Rows Processed" },
    { value: "2 mins", label: "Average Conversion Time" },
  ],
}: TestimonialProps) => {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Data Professionals
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            See what our users say about our PDF and Excel to CSV conversion
            tool
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12">
          {statistics.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm bg-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-16">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-4">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <blockquote className="text-muted-foreground italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6" />
            <CarouselNext className="-right-4 md:-right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
