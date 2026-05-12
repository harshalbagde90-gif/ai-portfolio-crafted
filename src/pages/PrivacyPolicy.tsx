import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert prose-emerald max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p>
              When you contact us through our website or use our services, we may collect personal information such as your name, email address, phone number, and details about your project or business. We only collect information that is necessary to provide our services and respond to your inquiries.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide consultation.</li>
              <li>Deliver our web development, automation, and digital marketing services.</li>
              <li>Improve our website and user experience.</li>
              <li>Communicate with you regarding your project status and updates.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Data Sharing and Security</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We implement reasonable security measures to maintain the safety of your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Third-Party Links</h2>
            <p>
              Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
            <p>
              If there are any questions regarding this privacy policy, you may contact us using the information below:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: info@webmantu.com</li>
              <li>Phone: +91 7499147597</li>
              <li>Address: Indora square, Nagpur, Maharashtra 440017</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
