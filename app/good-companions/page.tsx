"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { VoiceNavigation } from "@/components/voice-navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GoodCompanionsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Elders form state
  const [elderName, setElderName] = useState("");
  const [elderContact, setElderContact] = useState("");
  const [elderNeeds, setElderNeeds] = useState("");
  const [elderSubmitted, setElderSubmitted] = useState(false);

  // Volunteer form state
  const [volName, setVolName] = useState("");
  const [volContact, setVolContact] = useState("");
  const [volSkills, setVolSkills] = useState("");
  const [volSubmitted, setVolSubmitted] = useState(false);

  // Example available companions
  const companions = [
    {
      name: "Aarav Sharma",
      photo: "/public/memories/men1.jpeg",
      desc: "Tech-savvy student, loves chess and helping elders with smartphones.",
    },
    {
      name: "Priya Mehta",
      photo: "/public/memories/lady1.jpeg",
      desc: "Medical student, enjoys reading and friendly conversations.",
    },
    {
      name: "Rahul Verma",
      photo: "/public/memories/men2.jpeg",
      desc: "Sports enthusiast, happy to accompany elders on walks.",
    },
    {
      name: "Sneha Patel",
      photo: "/public/memories/lady2.jpeg",
      desc: "Loves music and teaching basic computer skills.",
    },
  ];

  const { toast } = useToast();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-50"}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />
      <VoiceNavigation enabled={voiceEnabled} language={language} />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <Image src="/logo.png" alt="SilverCircle Logo" width={80} height={80} className="mx-auto mb-6 rounded-full shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">Good Companions</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bridging generations: Connecting elders with compassionate youth volunteers for friendship, support, and assistance.
          </p>
          <div className="flex justify-center mt-8">
            <a href="tel:1800123456" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold shadow-lg hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-transform">
              <Phone className="w-6 h-6" /> Silver Circle Helpline
            </a>
          </div>
        </section>
        <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <Card className="shadow-xl border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-700 dark:text-purple-300">For Elders</CardTitle>
              <CardDescription>Connect with a caring youth companion for support, tech help, or a friendly chat.</CardDescription>
            </CardHeader>
            <CardContent>
              {elderSubmitted ? (
                <div className="text-green-600 font-semibold text-center py-8">Thank you! We will connect you with a Good Companion soon.</div>
              ) : (
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); setElderSubmitted(true); }}>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="elder-name">Your Name</label>
                    <input id="elder-name" type="text" className="w-full rounded-md border-gray-300 px-3 py-2" required value={elderName} onChange={e => setElderName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="elder-contact">Contact Number</label>
                    <input id="elder-contact" type="text" className="w-full rounded-md border-gray-300 px-3 py-2" required value={elderContact} onChange={e => setElderContact(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="elder-needs">How can we help?</label>
                    <textarea id="elder-needs" className="w-full rounded-md border-gray-300 px-3 py-2" rows={3} required value={elderNeeds} onChange={e => setElderNeeds(e.target.value)} />
                  </div>
                  <Button className="w-full" type="submit">Submit</Button>
                </form>
              )}
            </CardContent>
          </Card>
          <Card className="shadow-xl border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">For Youth Volunteers</CardTitle>
              <CardDescription>Sign up to become a Good Companion and make a difference in someone's life.</CardDescription>
            </CardHeader>
            <CardContent>
              {volSubmitted ? (
                <div className="text-green-600 font-semibold text-center py-8">Thank you for volunteering! We'll reach out to you soon.</div>
              ) : (
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); setVolSubmitted(true); }}>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="volunteer-name">Your Name</label>
                    <input id="volunteer-name" type="text" className="w-full rounded-md border-gray-300 px-3 py-2" required value={volName} onChange={e => setVolName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="volunteer-contact">Contact Number</label>
                    <input id="volunteer-contact" type="text" className="w-full rounded-md border-gray-300 px-3 py-2" required value={volContact} onChange={e => setVolContact(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="volunteer-skills">Skills/Interests</label>
                    <textarea id="volunteer-skills" className="w-full rounded-md border-gray-300 px-3 py-2" rows={3} required value={volSkills} onChange={e => setVolSkills(e.target.value)} />
                  </div>
                  <Button className="w-full" type="submit">Submit</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Available Good Companions</h2>
          <div className="relative overflow-x-hidden w-full">
            <div
              className="flex items-center gap-8 animate-marquee"
              style={{
                animation: 'marquee 30s linear infinite',
                minWidth: '100%',
              }}
            >
              {companions.concat(companions).map((c, i) => (
                <button
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-2xl hover:bg-purple-50 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 min-w-[260px]"
                  type="button"
                  onClick={() => toast({
                    title: `You've selected ${c.name}`,
                    description: "We'll help you connect soon!",
                    duration: 4000,
                    variant: "default"
                  })}
                  style={{ flex: '0 0 auto' }}
                >
                  <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{c.name}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-center text-sm">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>
      </main>
    </div>
  );
} 