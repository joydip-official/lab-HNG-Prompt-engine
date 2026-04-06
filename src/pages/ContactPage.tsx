import React from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, MapPin, ArrowLeft, Send } from "lucide-react";
import { Button, Input, Card } from "../components/UI";

export const ContactPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-4">Get in touch</h1>
              <p className="text-lg text-gray-600">
                Have questions about Prompt Engine? We're here to help. 
                Our team typically responds within 2 hours during business hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-accent shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold">Email us</p>
                  <p className="text-gray-500">support@promptengine.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-accent shadow-sm">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="font-bold">Live Chat</p>
                  <p className="text-gray-500">Available Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-accent shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold">Office</p>
                  <p className="text-gray-500">HNG AI Lab, 123 Innovation Way, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Jane" required />
                <Input label="Last Name" placeholder="Doe" required />
              </div>
              <Input label="Email Address" type="email" placeholder="jane@example.com" required />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 outline-none transition-all focus:border-black focus:ring-1 focus:ring-black min-h-[150px]"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <Button className="w-full" icon={Send}>
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
