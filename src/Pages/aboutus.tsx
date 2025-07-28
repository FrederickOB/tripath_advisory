import React, { useState } from "react";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import ProfileModal from "@/components/ProfileModal";
// import { team } from "@/constants";
import { AnimatedNumber } from "@/components/ImpactStats";
import Button from "@/components/ui/Button";
import { ArrowRight, Linkedin } from "lucide-react";
import { Team } from "@/types/schema";
import { useBio, useImpactStats, useTeamMembers } from "@/hooks/useSanityData";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { PortableText } from "@portabletext/react";

function AboutUs() {
  const [selectedMember, setSelectedMember] = useState<Team | null>(null);

  const { data: bioData } = useBio();
  const { data: statsData } = useImpactStats();
  const { data: TeamData } = useTeamMembers();

  console.log(bioData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

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
            className="text-3xl md:text-6xl font-bold mb-6"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            About TriPath Advisory
          </motion.h1>
          <motion.p
            className="md:text-xl max-w-2xl mx-auto font-normal"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Pioneering sustainable solutions for a better tomorrow
          </motion.p>
          {bioData && (
            <PortableText value={bioData} components={portableTextComponents} />
          )}
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
      {statsData && statsData.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <Heading
              label="OUR IMPACT"
              title="By The Numbers"
              description="Making a difference through measurable results"
            />

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              aria-label="Key statistics"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                >
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    textSize="xl"
                  />
                  <p className="mt-4 text-slate-600 font-medium">
                    {stat.statType}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Heading
            label="OUR TEAM"
            title="Leadership Team"
            description="Meet the experts driving our success"
            // badgeColor="amber"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {TeamData &&
              TeamData.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-xl flex flex-col shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                  variants={animations.fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={member.image?.url}
                      alt={member.name}
                      className="object-cover w-full h-[30rem]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      {member.linkedin_link && (
                        <a
                          href={member.linkedin_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn profile of ${member.name}`}
                          className="inline-flex cursor-pointer  bg-blue-600 rounded p-1 items-center text-white hover:bg-blue-800 transition-colors"
                        >
                          <Linkedin className="size-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-secondary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-500">{member.bio}</p>
                  </div>

                  <Button
                    onClick={() => setSelectedMember(member)}
                    variant="link"
                    className="text-primary cursor-pointer mt-auto  hover:underline justify-start items-center"
                  >
                    Read More <ArrowRight className="size-3" />
                  </Button>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember as Team}
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
