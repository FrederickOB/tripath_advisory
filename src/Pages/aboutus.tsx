import React, { useState } from "react";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import ProfileModal from "@/components/ProfileModal";
import { team } from "@/constants";

function AboutUs() {
  const [selectedMember, setSelectedMember] = useState<(typeof team)[0] | null>(
    null
  );

  const stats = [
    {
      number: "15+",
      label: "Years of Experience",
      description: "Delivering excellence in ESG consulting",
    },
    {
      number: "200+",
      label: "Projects Completed",
      description: "Across diverse industries and sectors",
    },
    {
      number: "50+",
      label: "Global Partners",
      description: "Building sustainable networks worldwide",
    },
    {
      number: "95%",
      label: "Client Satisfaction",
      description: "Based on our service delivery metrics",
    },
  ];

  // const advisoryBoard = [
  //   {
  //     name: "Dr. James Wilson",
  //     role: "Chairman",
  //     bio: "Former UN Climate Change Expert with 25+ years in environmental policy",
  //     image:
  //       "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg",
  //   },
  //   {
  //     name: "Dr. Maria Rodriguez",
  //     role: "Vice Chair",
  //     bio: "Sustainability expert with extensive experience in corporate governance",
  //     image:
  //       "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
  //   },
  //   {
  //     name: "Prof. David Chen",
  //     role: "Strategic Advisor",
  //     bio: "Leading researcher in sustainable development and ESG metrics",
  //     image:
  //       "https://images.pexels.com/photos/5717641/pexels-photo-5717641.jpeg",
  //   },
  // ];

  return (
    <div className="relative pb-10 antialiased text-dark">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center">
        <div className="absolute inset-0 bg-dark/30" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            About TriPath Advisory
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto font-normal"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Pioneering sustainable solutions for a better tomorrow
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Heading
            label="OUR PURPOSE"
            title="Mission & Vision"
            description="Driving sustainable transformation through innovative ESG solutions"
            // badgeColor="emerald"
          />

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={animations.fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-teal-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 font-normal">
                To empower organizations with sustainable strategies that create
                lasting positive impact while driving business growth and
                stakeholder value.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={animations.fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-teal-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 font-normal">
                To be the global leader in ESG advisory, transforming how
                organizations approach sustainability and creating a more
                equitable, sustainable future for all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Heading
            label="OUR IMPACT"
            title="By The Numbers"
            description="Making a difference through measurable results"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
                variants={animations.fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-teal-800 mb-2">
                  {stat.number}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Heading
            label="OUR TEAM"
            title="Leadership Team"
            description="Meet the experts driving our success"
            // badgeColor="amber"
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                variants={animations.fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-[30rem]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember || team[0]}
      />

      {/* Advisory Board Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Heading
            label="GUIDANCE"
            title="Advisory Board"
            description="Industry leaders shaping our strategic direction"
            badgeColor="rose"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {advisoryBoard.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                variants={animations.fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default AboutUs;
