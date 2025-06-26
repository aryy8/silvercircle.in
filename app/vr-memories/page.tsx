"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Camera,
  Eye,
  Heart,
  Share2,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Volume2,
  ArrowLeft,
  Plus,
  Calendar,
  MapPin,
  Users,
  Lock,
  Coins,
  Maximize,
  Minimize,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Dialog } from "@headlessui/react"

interface Memory {
  id: string
  title: string
  description: string
  location: string
  date: string
  imageUrl: string
  vrImageUrl?: string
  category: "childhood" | "family" | "travel" | "home" | "work" | "celebration"
  isPublic: boolean
  likes: number
  views: number
  isLiked: boolean
  uploadedBy: string
  uploadDate: string
  tags: string[]
}

interface VRSession {
  memoryId: string
  isActive: boolean
  duration: number
  startTime: Date
}

// Type for simple memory card (not full Memory interface)
interface SimpleMemoryCard {
  label: string;
  src: string;
  description: string;
}

const ReactPhotoSphereViewer = dynamic(
  () => import('react-photo-sphere-viewer').then(mod => mod.ReactPhotoSphereViewer),
  { ssr: false }
)

export default function VRMemoriesPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(true) // Set to true for demo
  const [userCoins, setUserCoins] = useState(150)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 360-degree memory images
  const memoryImages: SimpleMemoryCard[] = [
    {
      label: "Our New Home",
      src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1500&q=80", // Unsplash living room photo (reliable, home-like)
      description: "The room which we renovated.",
    },
    {
      label: "Church visit",
      src: "https://pannellum.org/images/bma-1.jpg", // Pannellum 360 demo (beach panorama, guaranteed to work)
      description: "visit to church, on our wedding day",
    },
    {
      label: "Family Vacation",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1500&q=80", // Unsplash beach panorama (works in 360 viewers)
      description: "Our family trip to the beach, full of laughter and fun.",
    },
    {
      label: "Game Night",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Nationals_Panorama_vs._Cubs.JPG", // Stadium 360 panorama (Wikimedia Commons)
      description: "A thrilling night at the stadium, cheering for our team!",
    },
  ];

  const [selectedMemory, setSelectedMemory] = useState<SimpleMemoryCard | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "VR Memory Lane",
      subtitle: "Relive your precious memories in immersive 360-degree virtual reality",
      backToFeatures: "Back to Features",
      unlockFeature: "Unlock VR Memory Lane",
      unlockDescription: "Transform your cherished photos into immersive VR experiences",
      unlockCost: "75 coins required",
      unlock: "Unlock Now",
      notEnoughCoins: "Not enough coins",
      earnMore: "Earn more coins by playing games",
      myMemories: "My Memories",
      sharedMemories: "Community Memories",
      addMemory: "Add New Memory",
      uploadPhoto: "Upload Photo",
      memoryTitle: "Memory Title",
      memoryDescription: "Description",
      memoryLocation: "Location",
      memoryDate: "Date",
      category: "Category",
      makePublic: "Share with community",
      tags: "Tags (comma separated)",
      saveMemory: "Save Memory",
      cancel: "Cancel",
      enterVR: "Enter VR",
      exitVR: "Exit VR",
      viewMemory: "View Memory",
      likeMemory: "Like",
      shareMemory: "Share",
      views: "views",
      likes: "likes",
      uploadedBy: "Uploaded by",
      categories: {
        all: "All Categories",
        childhood: "Childhood",
        family: "Family",
        travel: "Travel",
        home: "Home",
        work: "Work Life",
        celebration: "Celebrations",
      },
      vrControls: {
        play: "Play Audio",
        pause: "Pause Audio",
        reset: "Reset View",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        volume: "Volume",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit Fullscreen",
      },
      instructions: "VR Instructions",
      instructionText: "Click and drag to look around, scroll to zoom, and use controls to navigate your memory.",
      processingImage: "Processing your image for VR...",
      vrReady: "VR Experience Ready!",
      noMemories: "No memories found",
      addFirstMemory: "Add your first memory to get started",
      searchPlaceholder: "Search memories...",
      dragToLook: "Click and drag to look around",
      scrollToZoom: "Scroll to zoom in/out",
    },
    hi: {
      title: "VR मेमोरी लेन",
      subtitle: "अपनी कीमती यादों को 360-डिग्री वर्चुअल रियलिटी में फिर से जिएं",
      backToFeatures: "सुविधाओं पर वापस जाएं",
      unlockFeature: "VR मेमोरी लेन अनलॉक करें",
      unlockDescription: "अपनी प्रिय तस्वीरों को इमर्सिव VR अनुभवों में बदलें",
      unlockCost: "75 सिक्के आवश्यक",
      unlock: "अभी अनलॉक करें",
      notEnoughCoins: "पर्याप्त सिक्के नहीं",
      earnMore: "खेल खेलकर अधिक सिक्के कमाएं",
      myMemories: "मेरी यादें",
      sharedMemories: "समुदायिक यादें",
      addMemory: "नई यादें जोड़ें",
      uploadPhoto: "फोटो अपलोड करें",
      memoryTitle: "यादों का शीर्षक",
      memoryDescription: "विवरण",
      memoryLocation: "स्थान",
      memoryDate: "तारीख",
      category: "श्रेणी",
      makePublic: "समुदाय के साथ साझा करें",
      tags: "टैग (कॉमा से अलग करें)",
      saveMemory: "यादें सहेजें",
      cancel: "रद्द करें",
      enterVR: "VR में प्रवेश करें",
      exitVR: "VR से बाहर निकलें",
      viewMemory: "यादें देखें",
      likeMemory: "पसंद",
      shareMemory: "साझा करें",
      views: "दृश्य",
      likes: "पसंद",
      uploadedBy: "द्वारा अपलोड किया गया",
      categories: {
        all: "सभी श्रेणियां",
        childhood: "बचपन",
        family: "परिवार",
        travel: "यात्रा",
        home: "घर",
        work: "कार्य जीवन",
        celebration: "उत्सव",
      },
      vrControls: {
        play: "ऑडियो चलाएं",
        pause: "ऑडियो रोकें",
        reset: "दृश्य रीसेट करें",
        zoomIn: "ज़ूम इन",
        zoomOut: "ज़ूम आउट",
        volume: "आवाज़",
        fullscreen: "पूर्ण स्क्रीन",
        exitFullscreen: "पूर्ण स्क्रीन से बाहर निकलें",
      },
      instructions: "VR निर्देश",
      instructionText: "चारों ओर देखने के लिए क्लिक करें और खींचें, ज़ूम करने के लिए स्क्रॉल करें।",
      processingImage: "VR के लिए आपकी छवि को प्रोसेस कर रहे हैं...",
      vrReady: "VR अनुभव तैयार!",
      noMemories: "कोई यादें नहीं मिलीं",
      addFirstMemory: "शुरू करने के लिए अपनी पहली यादें जोड़ें",
      searchPlaceholder: "यादें खोजें...",
      dragToLook: "चारों ओर देखने के लिए क्लिक करें और खींचें",
      scrollToZoom: "ज़ूम इन/आउट करने के लिए स्क्रॉल करें",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-center text-purple-700 dark:text-purple-300">
          {t.title}
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
          {t.subtitle}
        </p>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">VR Memory Lane</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {memoryImages.map((memory, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedMemory(memory)}
              >
                <img
                  src={memory.src}
                  alt={memory.label}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{memory.label}</h2>
                  <p className="text-gray-600 text-sm">{memory.description}</p>
                </div>
              </div>
            ))}
            {/* Add new memory card */}
            <div
              className="flex flex-col items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setShowAddModal(true)}
              style={{ minHeight: 240 }}
            >
              <Plus size={48} className="text-gray-400 mb-2" />
              <span className="text-gray-500">Add New Memory</span>
            </div>
          </div>

          {/* 360 Viewer Modal */}
          <Dialog open={selectedMemory !== null} onClose={() => setSelectedMemory(null)} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
              <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl mx-auto p-4">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setSelectedMemory(null)}
                >
                  ×
                </button>
                {selectedMemory && (
                  <div className="w-full h-[60vh]">
                    <ReactPhotoSphereViewer
                      src={selectedMemory.src}
                      width="100%"
                      height="60vh"
                      littlePlanet={false}
                      navbar={['zoom', 'fullscreen']}
                      loadingImg="/placeholder.jpg"
                      onReady={() => {}}
                      containerClass="w-full h-full"
                    />
                    <div className="mt-4">
                      <h2 className="text-2xl font-bold mb-1">{selectedMemory.label}</h2>
                      <p className="text-gray-600">{selectedMemory.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Dialog>

          {/* Add Memory Modal (placeholder) */}
          <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
              <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 flex flex-col items-center">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
                <Plus size={48} className="text-gray-400 mb-4" />
                <h2 className="text-xl font-bold mb-2">Add New Memory</h2>
                <p className="text-gray-600 text-center mb-4">This feature is coming soon! You'll be able to add your own 360° memories here.</p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setShowAddModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
