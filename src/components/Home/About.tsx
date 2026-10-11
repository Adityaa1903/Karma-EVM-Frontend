"use client";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Compass,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const features = [
    {
      icon: (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2 }}
        >
          <Compass className="h-12 w-12 text-black dark:text-white" />
        </motion.div>
      ),
      title: "Community Consensus",
      description:
        "Price discovery powered by community wisdom. Submit observations and let neutrality-weighted consensus determine the oracle price.",
    },
    {
      icon: (
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4 }}>
          <ShieldCheck className="h-12 w-12 text-black dark:text-white" />
        </motion.div>
      ),
      title: "Sybil Resistant",
      description:
        "Your influence scales with your economic neutrality — balanced bull/bear holdings give maximum weight. No one can dominate the oracle.",
    },
    {
      icon: (
        <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 2 }}>
          <Scale className="h-12 w-12 text-black dark:text-white" />
        </motion.div>
      ),
      title: "Fully On-Chain",
      description:
        "Permissionless and immutable. Every submission, weight calculation, and price average is verifiable on-chain — no off-chain dependencies.",
    },
  ];

  return (
    <section
      id="features"
      className="cursor-auto py-10 pb-32 bg-white dark:bg-black relative overflow-hidden"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-300 dark:from-black dark:via-gray-900 dark:to-gray-800 opacity-60 blur-2xl pointer-events-none" />

      <div className="container mx-auto px-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white tracking-widest">
          Redefining Oracle Consensus
        </h2>

        <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md border border-white dark:border-gray-700 rounded-xl p-2 md:p-6 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex justify-center">{feature.icon}</div>
                <CardTitle className="text-black dark:text-white text-xl font-bold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-800 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </motion.div>
          ))}
        </div>

        {/* Meaningful Outro Statement */}
        <div className="mt-20 text-center text-black dark:text-white text-md md:text-lg">
          <p>
            *In a world of manipulation, Karma brings truth — empowering communities to
            discover fair prices through collective neutrality.*
          </p>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Karma Protocol",
              applicationCategory: "FinanceApplication",
              description:
                "Karma Protocol is a permissionless on-chain oracle for Fate prediction pools. Participants submit price observations weighted by the economic neutrality of their bull/bear holdings. Equal economic exposure gives maximum weight; one-sided holdings give zero weight. Older submissions decay exponentially so the oracle tracks fresh consensus.",
              featureList: [
                "Permissionless on-chain price oracle",
                "Neutrality-weighted price submissions",
                "Time-decayed exponential averaging",
                "Chainlink-compatible price feed interface",
                "Integration with Fate prediction pools",
                "Sybil-resistant by economic design",
                "Community-driven decentralized price discovery",
              ],
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              url: "https://evm.karma.stability.nexus",
            }),
          }}
        />
      </div>
    </section>
  );
}
