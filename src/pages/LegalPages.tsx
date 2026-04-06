import React from "react";
import { ArrowLeft, Shield, FileText, AlertCircle } from "lucide-react";
import { Card } from "../components/UI";

interface LegalLayoutProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onBack: () => void;
}

const LegalLayout = ({ title, icon, children, onBack }: LegalLayoutProps) => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to home
      </button>
      
      <Card className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-black">
            {icon}
          </div>
          <h1 className="text-3xl font-serif font-bold">{title}</h1>
        </div>
        
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          {children}
        </div>
      </Card>
    </div>
  </div>
);

export const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => (
  <LegalLayout title="Privacy Policy" icon={<Shield size={24} />} onBack={onBack}>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
      <p>We collect information you provide directly to us when you create an account, use our Chrome extension, or communicate with us. This may include your email address, prompt history, and usage data.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect Prompt Engine and our users.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Security</h2>
      <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">4. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at privacy@promptengine.ai.</p>
    </section>
  </LegalLayout>
);

export const RefundPolicy = ({ onBack }: { onBack: () => void }) => (
  <LegalLayout title="Refund Policy" icon={<FileText size={24} />} onBack={onBack}>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">1. 30-Day Money-Back Guarantee</h2>
      <p>We offer a full refund within the first 30 days of your initial subscription if you are not satisfied with Prompt Engine Pro. No questions asked.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">2. How to Request a Refund</h2>
      <p>To request a refund, please email our support team at support@promptengine.ai with your account email and reason for the request.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">3. Processing Time</h2>
      <p>Refunds are typically processed within 5-10 business days depending on your financial institution.</p>
    </section>
  </LegalLayout>
);

export const Disclaimer = ({ onBack }: { onBack: () => void }) => (
  <LegalLayout title="Disclaimer" icon={<AlertCircle size={24} />} onBack={onBack}>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">1. AI Accuracy</h2>
      <p>Prompt Engine uses artificial intelligence to optimize prompts. While we strive for high-quality results, we do not guarantee the accuracy, completeness, or usefulness of any AI-generated output.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">2. User Responsibility</h2>
      <p>Users are solely responsible for the prompts they create and the resulting AI outputs. We are not liable for any damages arising from the use of our service.</p>
    </section>
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">3. Third-Party Services</h2>
      <p>Our service integrates with third-party AI platforms (e.g., ChatGPT, Claude). We are not affiliated with these platforms and are not responsible for their availability or performance.</p>
    </section>
  </LegalLayout>
);
