# SilverCircle

Welcome to **SilverCircle** – a modern, inclusive platform designed to foster meaningful connections and joyful experiences for seniors. Our mission is to bridge generations with love, dignity, and technology.

## Features
- **Beautiful, Accessible UI**: Clean, professional, and responsive design for all devices.
- **Personal Profiles**: Seniors can create and manage their own profiles.
- **Silvermen & Silverwomen**: Discover and connect with amazing people.
- **VR Memories**: Relive precious moments in immersive virtual reality.
- **Interest Circles**: Join hobby-based groups and nostalgia rooms.
- **Games & Brain Puzzles**: Fun, engaging activities to keep minds sharp.
- **Voice Navigation**: Optional voice-enabled navigation for accessibility.
- **Supabase Integration**: Ready for real-time data, authentication, and storage.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/aryy8/silver_circle.git
   cd silver_circle
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` (if provided) or create `.env.local`.
   - Add your [Supabase](https://supabase.com/) credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
4. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠️ Tech Stack
- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **Supabase** (database, auth, storage)
- **TypeScript**
- **Radix UI** (accessible UI components)

## Contributing
We welcome contributions! To get started:
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -m 'Add new feature' && git push origin feature/your-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

##  Acknowledgements
- [Supabase](https://supabase.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

> Made with ❤️ by aryy8 & harshi-codes




