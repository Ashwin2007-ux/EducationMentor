import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0d1b2a]">

      <section className="bg-gray-700 text-lime-400 py-16 border-b border-gray-300">
        <div className="px-6 py-4">
          <h1 className="text-5xl font-bold mb-6">About EduMentor</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Revolutionizing education through AI-powered learning tools that empower students to succeed.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-gray-300">
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-lg text-amber-500 leading-relaxed mb-4">
                At EduMentor, we believe that quality education should be accessible to everyone, everywhere. Our mission is to leverage cutting-edge artificial intelligence to create personalized learning experiences that help students achieve their academic goals.
              </p>
              <p className="text-lg text-amber-500 leading-relaxed">
                We're committed to building tools that are intuitive, effective, and genuinely helpful for students of all levels.
              </p>
            </div>
            <div className="bg-blue-500 border border-gray-300 rounded p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose EduMentor?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span>AI-powered assistance available 24/7</span>
                </li>

                <li className="flex items-start gap-3">
                  <span>Personalized learning experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>Easy-to-use interface</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>Multiple learning tools in one platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>Completely free to use</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16 border-b border-gray-300">
        <div className="px-6 py-4">
          <h2 className="text-4xl font-bold text-center  text-lime-400">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-300 rounded">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from AI model development to user interface design.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-300 rounded">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Accessibility</h3>
              <p className="text-gray-600">
                Education should be accessible to all. We make our tools free and easy to use for everyone.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-300 rounded">
              <h3 className="text-2xl font-bold text-gray-900">Innovation</h3>
              <p className="text-gray-600">We continuously innovate and improve our AI models to provide the best learning experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
