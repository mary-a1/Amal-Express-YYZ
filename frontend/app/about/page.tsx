'use client'
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#020024_0%,#050038_40%,#07002f_100%)]">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
         {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-yellow-400">
            About Us
          </h1>
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Who We Are</h2>
          <div className="space-y-4 leading-relaxed">
            <p className="text-gray-300 text-base sm:text-lg">
              Amal Transfers (1469280 Ontario Inc.) is a registered Canadian corporation based in Ontario, proudly serving customers for over 25 years.
            </p>
            <p className="text-gray-300 text-base sm:text-lg">
              As a licensed Money Services Business (MSB) and registered Payment Service Provider (PSP), we operate in full compliance with all federal and provincial regulations, including FINTRAC and Bank of Canada requirements. Our team maintains strict internal controls to ensure transparency, accountability, and ongoing compliance with Canadian and international standards.
            </p>
          </div>
        </section>

        {/* Our Experience */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Our Experience</h2>
          <div className="space-y-4 leading-relaxed">
            <p className="text-gray-300 text-base sm:text-lg">
              For more than two decades, we have helped individuals and businesses send and receive money across the globe with ease and confidence. Our network of payout partners spans multiple countries, allowing us to deliver fast, affordable, and reliable remittance services. Whether you visit one of our branches or use our mobile app, you can count on smooth, secure, and professional service every time.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-8 text-white">Our Values</h1>
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
        <section className='mb-16'>
          <h2 className="text-4xl font-bold mb-8 text-white">Why Choose Amal Express?</h2>
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

        {/* Legal Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400">Legal</h2>
          
          {/* Privacy & Security */}
          <div id="privacy" className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Privacy & Security</h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-base sm:text-lg">
                Protecting your information is at the core of what we do. All transactions are encrypted and processed through secure, industry-approved systems designed to safeguard your data and financial details. We apply strict know-your-customer (KYC) and anti-money-laundering (AML) measures to keep your transactions safe while ensuring full compliance with all applicable laws and best practices in financial security.
              </p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div id="terms">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Terms & Conditions</h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-base sm:text-lg">
                By using our services, you agree to comply with our terms and conditions. We reserve the right to verify your identity and decline transactions that do not meet regulatory standards. Exchange rates are subject to change and will be confirmed at the time of your transaction. Fees, if applicable, will be clearly disclosed before you complete your transfer. For full details, please contact our customer support team or visit one of our locations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}