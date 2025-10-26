'use client'
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#020024_0%,#050038_40%,#07002f_100%)]">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="text-yellow-400">Amal Express</span>
          </h1>
          <p className="text-lg text-gray-300 font-semibold">
            Your trusted partner for international money transfers
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Our Story</h2>
          <div className="space-y-4 leading-relaxed text-white text-xl">
            <p className="text-gray-300 text-xl">
              Founded in Toronto, Amal Express was built on a simple mission: make sending money home easier, faster, and more transparent for everyone.
            </p>
            <p className="text-gray-300 text-xl">
              We understand that when you send money to family and friends abroad, every dollar matters. That's why we've eliminated hidden fees and complicated processes, giving you transparent rates and reliable service you can trust.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-yellow-400">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a2e] p-6 rounded-lg border-2 border-yellow-400">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-300 text-lg">
                No hidden fees. No surprises. You always know exactly what you're paying and what your recipient will receive.
              </p>
            </div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg border-2 border-yellow-400">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Speed</h3>
              <p className="text-gray-300 text-lg">
                Fast processing means your money gets where it needs to go quickly, when it matters most.
              </p>
            </div>
            <div className="bg-[#1a1a2e] p-6 rounded-lg border-2 border-yellow-400">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3">Security</h3>
              <p className="text-gray-300 text-lg">
                Your trust is our priority. We use industry-leading security to protect every transaction.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-4xl font-bold mb-8 text-yellow-400">Why Choose Amal Express?</h2>
          <div className="bg-[#1a1a2e] p-8 rounded-lg space-y-4 text-gray-white text-2xl">
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 text-xl">✓</span>
              <p className="text-white text-lg"><strong>Competitive Rates: </strong>Get more value for your money with our transparent pricing</p>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 text-xl">✓</span>
              <p className="text-white text-lg"><strong>Local Service </strong>Based in Toronto, we understand the needs of our community</p>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 text-lg">✓</span>
              <p className="text-white text-lg"><strong>Easy Process: </strong>Send money in just 3 simple steps</p>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3 text-lg">✓</span>
              <p  className="text-white text-lg"><strong>Dedicated Support: </strong>Our team is here to help whenever you need us</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}