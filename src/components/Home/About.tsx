"use client";

import { 
  Compass, 
  ShieldCheck, 
  Scale, 
  Zap, 
  RefreshCw,
  Coins,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  const features = [
    {
      icon: <Compass className="h-10 w-10 text-amber-600 dark:text-amber-400" />,
      badge: "Collective Wisdom",
      title: "Community Consensus",
      description:
        "Price discovery powered by real market participants. Submit observations and let neutrality-weighted consensus determine the oracle price without centralized gatekeepers.",
      color: "from-amber-500/10 to-transparent",
      borderColor: "border-amber-500/20",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      badge: "Economic Equilibrium",
      title: "Sybil & Whale Resistant",
      description:
        "Influence scales strictly with economic neutrality — balanced Bull and Bear holdings give maximum weight. Biased whales holding one side receive zero influence.",
      color: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: <Scale className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />,
      badge: "Pure Decentralization",
      title: "100% On-Chain & Immutable",
      description:
        "No off-chain signers, no centralized keeper networks, and no admin keys. Every submission, weight calculation, and decayed price is verified directly on-chain.",
      color: "from-yellow-500/10 to-transparent",
      borderColor: "border-yellow-500/20",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Hold Balanced Exposure",
      desc: "Acquire Bull and Bear coins in the prediction pool. Balanced capital provides the economic collateral that backs your price observation.",
      icon: <Coins className="w-5 h-5 text-amber-500" />
    },
    {
      num: "02",
      title: "Submit Price Observations",
      desc: "Send your price report to the Karma contract. Your weight is computed on-chain based on your neutrality score: min(Bull, Bear).",
      icon: <Zap className="w-5 h-5 text-emerald-500" />
    },
    {
      num: "03",
      title: "Exponential Time-Decay",
      desc: "Recent observations are weighted higher than older ones, allowing the oracle to fluidly track real-time market shifts while resisting flash spikes.",
      icon: <RefreshCw className="w-5 h-5 text-yellow-500" />
    }
  ];

  return (
    <section
      id="features"
      className="py-16 pb-28 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-3">
            <span>Core Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-50 tracking-tight mb-4">
            Redefining Oracle Consensus
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
            Traditional oracles depend on trusted intermediaries. Karma aligns economic incentives so honesty is the only mathematically profitable strategy.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-white/70 dark:bg-[#121622]/80 backdrop-blur-xl border ${feature.borderColor} shadow-lg karma-glow flex flex-col justify-between`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.color} rounded-bl-full pointer-events-none`} />
              
              <div>
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 mb-5 shadow-sm">
                  {feature.icon}
                </div>
                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                  {feature.badge}
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3-Step Protocol Walkthrough */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white/60 dark:bg-[#121622]/60 border border-amber-500/20 backdrop-blur-xl mb-16 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              The Protocol Flow
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Three simple steps from position holding to on-chain price consensus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-start p-5 rounded-2xl bg-stone-50/70 dark:bg-[#0a0d14]/60 border border-stone-200/60 dark:border-stone-800/70">
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-amber-600/30 dark:text-amber-400/30">
                    {step.num}
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/submitPrice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <span>Try Submitting Price</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Meaningful Outro Statement */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base sm:text-lg italic font-medium text-stone-700 dark:text-stone-300">
            &ldquo;In a world of manipulation, Karma brings truth — empowering communities to discover fair prices through collective economic neutrality.&rdquo;
          </p>
        </div>
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
              "Karma Protocol is a permissionless on-chain oracle for decentralized prediction pools. Participants submit price observations weighted by the economic neutrality of their bull/bear holdings. Equal economic exposure gives maximum weight; one-sided holdings give zero weight. Older submissions decay exponentially so the oracle tracks fresh consensus.",
            featureList: [
              "Permissionless on-chain price oracle",
              "Neutrality-weighted price submissions",
              "Time-decayed exponential averaging",
              "Chainlink-compatible price feed interface",
              "Integration with prediction pools",
              "Sybil-resistant by economic design",
              "Community-driven decentralized price discovery",
            ],
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </section>
  );
}
