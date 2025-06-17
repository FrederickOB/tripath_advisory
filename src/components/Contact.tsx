import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We will be in touch soon!");
    setFormData({ name: "", email: "", organization: "", message: "" });
  };

  return (
    <div id="contact" className="py-24 bg-teal-800 text-white">
      <section className="relative h-[30vh]  flex items-center justify-center">
        <div className="absolute inset-0 " />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Ready to transform challenges into sustainable opportunities? Reach
            out to schedule a consultation.{" "}
          </motion.p>
        </div>
      </section>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-teal-700 p-3 rounded-full mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Email Us</h4>
                  <p className="text-teal-100">contact@tripathadvisory.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-700 p-3 rounded-full mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Call Us</h4>
                  <p className="text-teal-100">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-700 p-3 rounded-full mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Visit Us</h4>
                  <p className="text-teal-100">
                    123 Impact Avenue, Suite 400
                    <br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-teal-700 text-white placeholder-teal-300 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-teal-700 text-white placeholder-teal-300 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block mb-2 font-medium"
                >
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-teal-700 text-white placeholder-teal-300 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your organization"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 rounded-md bg-teal-700 text-white placeholder-teal-300 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-8 py-4 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-all w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
