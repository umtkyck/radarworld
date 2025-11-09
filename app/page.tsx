import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Advanced Radar Systems for Commercial & Industrial Applications
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Cutting-edge radar technology for detection, tracking, and monitoring solutions
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="#features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose RadarWorld?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-4">Precision Detection</h3>
              <p className="text-gray-600">
                Advanced signal processing algorithms for accurate object detection and tracking in challenging environments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold mb-4">Real-Time Processing</h3>
              <p className="text-gray-600">
                High-speed data processing with minimal latency for time-critical applications and instant decision-making.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-semibold mb-4">Industrial Grade</h3>
              <p className="text-gray-600">
                Ruggedized systems designed for harsh industrial environments with proven reliability and durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold mb-2">Industrial Automation</h3>
              <p className="text-gray-600">Process monitoring and control</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚢</div>
              <h3 className="text-xl font-semibold mb-2">Maritime</h3>
              <p className="text-gray-600">Navigation and collision avoidance</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-2">Construction</h3>
              <p className="text-gray-600">Site monitoring and safety</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-600">Perimeter protection and intrusion detection</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore our range of commercial and industrial radar systems
          </p>
          <Link
            href="/shop"
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
