import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">

      <section className="py-12 border-b">
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-4">About EduMentor</h1>
          <p className="text-base text-gray-700 max-w-prose">
            Revolutionizing education through AI-powered learning tools that empower students to succeed.
          </p>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-medium mb-3 text-gray-800">Our Mission</h2>
              <p className="text-base text-gray-700 leading-relaxed mb-3">
                At EduMentor, we believe that quality education should be accessible to everyone, everywhere. Our mission is to leverage artificial intelligence to create personalized learning experiences that help students achieve their academic goals.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                We're committed to building tools that are intuitive, effective, and genuinely helpful for students of all levels.
              </p>
            </div>

            <div className="p-6 border rounded bg-slate-900 ">
              <h3 className="text-lg font-medium mb-3 text-gray-300">Why Choose EduMentor?</h3>
              <ul className="space-y-3 text-slate-100">
                <li>AI-powered assistance available 24/7</li>
                <li>Personalized learning experiences</li>
                <li>Easy-to-use interface</li>
                <li>Multiple learning tools in one platform</li>
                <li>Free to use</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="p-6">
          <h2 className="text-2xl font-medium mb-4 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded bg-white">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Excellence</h3>
              <p className="text-gray-700">We strive for excellence in everything we do.</p>
            </div>
            <div className="p-6 border rounded bg-white">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Accessibility</h3>
              <p className="text-gray-700">Education should be accessible to all.</p>
            </div>
            <div className="p-6 border rounded bg-white">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Innovation</h3>
              <p className="text-gray-700">We continuously improve our AI models and UX.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
