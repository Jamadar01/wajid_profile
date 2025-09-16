// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Quote } from "lucide-react";
// import { useState } from "react";

// const testimonials = [
//   {
//     quote: "Wajid is a highly resourceful developer who always finds elegant solutions.",
//     name: "John Doe",
//     role: "Tech Lead @ CompanyX",
//   },
//   {
//     quote: "His problem-solving and teamwork skills are top-notch.",
//     name: "Jane Smith",
//     role: "Product Manager @ StartupY",
//   },
//   {
//     quote: "A pleasure to work with, very professional and innovative.",
//     name: "Michael Lee",
//     role: "CTO @ InnovateHub",
//   },
// ];

// export default function Testimonials() {
//   const [index, setIndex] = useState(0);

//   const nextTestimonial = () => {
//     setIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="py-12 px-6 text-center">
//       <h2 className="text-3xl font-bold mb-8">✨ Testimonials</h2>

//       <Card className="max-w-xl mx-auto shadow-lg rounded-2xl">
//         <CardContent className="p-6">
//           <Quote className="mx-auto mb-4 text-gray-400" size={32} />
//           <p className="text-lg italic mb-6">
//             “{testimonials[index].quote}”
//           </p>
//           <h4 className="font-semibold">{testimonials[index].name}</h4>
//           <p className="text-sm text-gray-500">{testimonials[index].role}</p>
//         </CardContent>
//       </Card>

//       <div className="flex justify-center gap-4 mt-6">
//         <Button onClick={prevTestimonial} variant="outline">
//           ⬅️ Prev
//         </Button>
//         <Button onClick={nextTestimonial} variant="outline">
//           Next ➡️
//         </Button>
//       </div>
//     </section>
//   );
// }
// src/components/Recommendations.js
import React from "react";
import "../css/Recommendations.css"; // simple CSS file

const recommendations = [
  {
    quote: "Wajid is a highly resourceful developer who always finds elegant solutions.",
    name: "John Doe",
    role: "Tech Lead @ CompanyX",
  },
  {
    quote: "His problem-solving and teamwork skills are top-notch.",
    name: "Jane Smith",
    role: "Product Manager @ StartupY",
  },
  {
    quote: "Always delivers high-quality work on time. A great team player!",
    name: "Alex Lee",
    role: "Software Engineer @ DevHouse",
  },
];

const Recommendations = () => {
  return (
    <section className="recommendations" id="recommendations">
      <h2>Testimonials</h2>
      <div className="recommendations-container">
        {recommendations.map((rec, i) => (
          <div key={i} className="recommendation-card">
            <p className="quote">“{rec.quote}”</p>
            <h4 className="name">— {rec.name}</h4>
            <span className="role">{rec.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
