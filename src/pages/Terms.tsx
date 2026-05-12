import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">Terms & Conditions</h1>
          <div className="prose prose-invert prose-emerald max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and utilizing our services, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Services Provided</h2>
            <p>
              WebMantu provides web development, automation, and digital solutions. The specific scope, deliverables, timeline, and pricing for any project will be agreed upon in a separate written proposal or agreement before work commences.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Revisions and Maintenance</h2>
            <p>
              Project revisions are limited to the scope outlined in the initial agreement. Additional features, pages, or significant changes requested after the project scope is finalized may incur additional charges. Maintenance and support post-launch are provided under separate maintenance contracts unless otherwise stated.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              Upon final payment, the client owns the rights to the final website design and custom code produced for their specific project. WebMantu reserves the right to use the completed project in our portfolio and marketing materials unless a Non-Disclosure Agreement (NDA) is signed.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Disclaimer</h2>
            <p>
              While we strive to provide the highest quality services to improve your digital presence, WebMantu does not guarantee specific business results, sales, or search engine rankings, as these depend on various external market factors beyond our control.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
