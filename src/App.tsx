import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, BriefcaseBusiness, FolderGit2, Award, Home as HomeIcon, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import recruiterImg from "@/images/recrutier.png";
import friendsImg from "@/images/friends.png";
import personalImg from "@/images/personal.png";
import meImg from "@/images/me.png";
// ADD to existing lucide-react import list
import { User } from "lucide-react";




// ================================
// Netflix‑Style Portfolio in one file
// Tailwind + shadcn/ui + Framer Motion
// Default tab shows professional work first (Experience)
// Replace dummy data with your real details (marked TODO)
// ================================

// 
const DATA = {
  name: "Naveen Chaitanya",
  tagline: "AI/ML Engineer • RAG, Agents, MLOps",
  // Shown as carousels/rows within tabs
  experience: [
    {
      title: "Multi‑Document RAG Chatbot",
      sub: "Python • LangChain • FastAPI • FAISS • Docker",
      badge: "Personal Project",
      desc: "Designed multi‑doc RAG with chunking, embeddings, retrieval and streaming responses. 35% latency improvement after caching + prompt optimization.",
      link: "https://github.com/NaveenKancharla28/Multi-Doctument-RAG-chatbot",
    },
    {
      title: "AI Code Reviewer",
      sub: "Python • LLM • Static Analysis • GitHub Actions",
      badge: "Personal Project",
      desc: "Automates PR reviews, flags bugs and smells, comments inline. 30% faster bug detection in test repos.",
      link: "https://github.com/NaveenKancharla28/AI-Code-Reviewer",
    },
    {
      title: "Chat Assistant For Discount Tire (DEMO)",
      sub: "JavaScript • Realtime GPT • DiscountTire • WebSocket",
      badge: "Prototype for DiscountTire",
      desc: "Created a Chat assistant that helps users find and book tires from DiscountTire based on their preferences and requirements. ",
      link: "https://github.com/NaveenKancharla28/Chat_Assistant_For_Tires",
    },
  ],
  projects: [
    {
      title: "Walmart Demand Forecasting",
      sub: "XGBoost • RandomForest • Pandas • Plotly",
      badge: "ML",
      desc: "Weekly sales forecasts with time‑aware features (lags, rolling means). MAE ≈ $929, R² ≈ 0.919.",
      link: "https://github.com/NaveenKancharla28/Demand_forecasting",
    },
    {
      title: "image-to-text-agent ",
      sub: "LangGraph • Redis • FastAPI",
      badge: "Agents",
      desc: "This is an intelligent agent that can analyze images containing text (like handwritten notes or meal plans) and extract meaningful content from them using LangChain and OpenAI.",
      link: "https://github.com/NaveenKancharla28/image-to-text-agent",
    },
    {
      title: "Chat Assistant For Discount Tire (DEMO)",
      sub: "JavaScript • Realtime GPT • DiscountTire • WebSocket",
      badge: "Prototype for DiscountTire",
      desc: "Created a Chat assistant that helps users find and book tires from DiscountTire based on their preferences and requirements. ",
      link: "https://github.com/NaveenKancharla28/Chat_Assistant_For_Tires",
    },
    {
      title: "AI Code Reviewer",
      sub: "Python • LLM • Static Analysis • GitHub Actions",
      badge: "Personal Project",
      desc: "Automates PR reviews, flags bugs and smells, comments inline. 30% faster bug detection in test repos.",
      link: "https://github.com/NaveenKancharla28/AI-Code-Reviewer",
    },
    {
      title: "Multi‑Document RAG Chatbot",
      sub: "Python • LangChain • FastAPI • FAISS • Docker",
      badge: "Personal Project",
      desc: "Designed multi‑doc RAG with chunking, embeddings, retrieval and streaming responses. 35% latency improvement after caching + prompt optimization.",
      link: "https://github.com/NaveenKancharla28/Multi-Doctument-RAG-chatbot",
    },
    {
      title: "AI-Powered Resume Builder and Applied Job Tracker",
      sub: "Python • Flask • OpenAI API",
      badge: "Personal Project",
      desc: "Generates tailored resumes based on job descriptions using GPT-4.",
      link: "https://github.com/NaveenKancharla28/AI-Powered-Resume-Tailor",
    },
    {
      title: "Sentiment Analysis on Twitter Data",
      sub: "Python • Tweepy • NLTK • Streamlit",
      badge: "Personal Project",
      desc: "Analyzed Twitter data to gauge public sentiment on various topics using NLP techniques.",
      link: "https://github.com/NaveenKancharla28/sentiment_analysis_app",
    }

  ],
  certifications: [ 
    { title: "AWS Certified AI Practitioner (AIF‑C01)", sub: "2025", link: "https://www.credly.com/badges/cc5e70ff-52bb-47ec-b707-1589b5b29940/linked_in_profile" },
    { title: "AWS Cloud Practitioner", sub: "2024", link: "#" },
  ],
  education: [
    { title: "M.S. Information Technology", sub: "St. Francis College, Brooklyn — GPA 3.84", link: "#" },
    { title: "B.Tech CSE (AI/ML)", sub: "SRM Institute — CGPA 8.75", link: "#" },
  ],
  contact: {
    email: "nvnknchrl@gmail.com",
    phone: "+1 (513) 413 7242",
    github: "https://github.com/NaveenKancharla28",
    linkedin: "https://www.linkedin.com/in/naveen-chaitanya-kancharla-358337238/",
  },
    personal: {
    focus: "Self-Adapting Language Models",
    blurb:
      "I’m exploring LLMs that learn continuously from interactions — adjusting prompts, retrieval, and lightweight adapters on the fly without full retrains.",
    prototype: [
      {
        title: "On-the-Fly Persona Adapter",
        sub: "RAG + short-term memory + LoRA slots",
        badge: "Prototype",
        desc:
          "A chat agent that watches user tone & domain terms, then auto-tunes its responses with a small adapter layer and fresh retrieval context.",
        link: "#"
      }
    ],
    hobbies: [
      "Hiking",
      "Photography",
      "Open-source Mapping (OSM)",
      "Cooking spicy mango things"
    ]
  },

  
  
};

// ---------- Utilities ----------
const tabs = [
  { key: "experience", label: "Experience", icon: BriefcaseBusiness },
  { key: "projects", label: "Projects", icon: FolderGit2 },
  { key: "certs", label: "Certifications", icon: Award },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "contact", label: "Contact", icon: Mail },
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "personal", label: "Personal", icon: User },
] as const;

type TabKey = typeof tabs[number]["key"];

type ProfileKey = "recruiter" | "friends" | "personal";

const PROFILE_BLURB: Record<ProfileKey, string> = {
  recruiter: "A fast route to my experience, projects, and proof of impact.",
  friends: "Fun stuff, experiments, and side quests.",
  personal: "A full story: journey, goals, and what I'm building next.",
};
// --- URL helpers so Back/Forward buttons work ---
function getProfileFromURL(): ProfileKey | null {
  const q = new URLSearchParams(window.location.search).get("profile");
  return q === "recruiter" || q === "friends" || q === "personal" ? q : null;
}

function setProfileInURL(p: ProfileKey | null, replace = false) {
  const url = new URL(window.location.href);
  if (p) url.searchParams.set("profile", p);
  else url.searchParams.delete("profile");
  const state = { profile: p };
  replace ? window.history.replaceState(state, "", url) : window.history.pushState(state, "", url);
}


// ---------- Profile Gate ----------
function ProfileGate({ onPick }: { onPick: (p: ProfileKey) => void }) {
  const profiles: { id: ProfileKey; label: string; color: string; image: string }[] = [
    { id: "recruiter", label: "Recruiter", color: "from-fuchsia-500 to-violet-600", image: recruiterImg },
    { id: "friends", label: "Friends", color: "from-sky-500 to-cyan-500", image: friendsImg },
    { id: "personal", label: "Personal", color: "from-emerald-500 to-lime-500", image: personalImg },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
      >
        Who's watching?
      </motion.h1>
      <p className="text-neutral-400 mb-8">Choose a profile to enter the portfolio of Naveen Chaitanya Kancharla</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => onPick(p.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${p.color} p-1`}
          
          >
            
            <div className="rounded-2xl bg-neutral-950 p-6 h-full relative overflow-hidden">
              {/* soft background on hover */}
              <img
                src={p.image}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0
               group-hover:opacity-20 transition duration-300"
              />

              <div className="relative z-10 flex items-center gap-4">
                {/* avatar/thumbnail */}
                <img
                  src={p.image}
                  alt={`${p.label} thumbnail`}
                  className="size-14 rounded-xl object-cover"
                />
                <div className="text-left">
                  <div className="text-lg font-semibold">{p.label}</div>
                  <div className="text-neutral-400 text-sm">{PROFILE_BLURB[p.id]}</div>
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <div className="text-xs uppercase tracking-wider text-neutral-400">Hover</div>
                <div className="mt-2 h-10 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-10 text-xs text-neutral-500">Netflix‑style UI • Built with React, Tailwind, shadcn/ui, Framer Motion</div>
    </div>
  );
}

// ---------- Top Nav (Netflix‑like) ----------
// ---------- Top Nav (Netflix-like) ----------
function TopNav({
  active,
  setActive,
  onExit,
  profile,                 // 👈 new prop
}: {
  active: TabKey;
  setActive: (k: TabKey) => void;
  onExit: () => void;
  profile: ProfileKey;     // 👈 new prop type
}) {
  return (
    <div className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-sm bg-red-600" />
          <span className="font-semibold tracking-tight">NAVEENFLIX</span>
        </div>

        <nav className="ml-6 hidden sm:flex items-center gap-1">
          {tabs
            .filter(t => t.key !== "personal" || profile === "personal") // 👈 hide Personal unless profile=personal
            .map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant="ghost"
                className={`relative px-3 text-sm text-neutral-300 hover:text-white transition ${active === key ? "text-white" : ""}`}
                onMouseEnter={() => setActive(key)}
                onClick={() => setActive(key)}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
                <span
                  className={`absolute left-2 right-2 -bottom-1 h-0.5 rounded bg-red-500 transition-transform ${
                    active === key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Button>
            ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href={DATA.contact.github} target="_blank" className="p-2 text-neutral-300 hover:text-white">
            <Github className="h-5 w-5" />
          </a>
          <a href={DATA.contact.linkedin} target="_blank" className="p-2 text-neutral-300 hover:text-white">
            <Linkedin className="h-5 w-5" />
          </a>
          <Button variant="ghost" className="text-neutral-300 hover:text-white" onClick={onExit}>
            <LogOut className="h-4 w-4 mr-2" /> Switch Profile
          </Button>
        </div>
      </div>
    </div>
  );
}


// ---------- Row (Netflix carousel‑like) ----------
function Row({ title, items }: { title: string; items: { title: string; sub?: string; badge?: string; desc?: string; link?: string }[] }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin pb-2">
        {items.map((it, i) => (
          <motion.a
            key={it.title + i}
            href={it.link || "#"}
            target="_blank"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group min-w-[300px]"
          >
            <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="h-36 bg-gradient-to-br from-neutral-800 to-neutral-900" />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{it.title}</div>
                    {it.badge && (
                      <span className="text-[10px] rounded bg-white/10 px-2 py-0.5">{it.badge}</span>
                    )}
                  </div>
                  {it.sub && <div className="text-xs text-neutral-400 mt-1">{it.sub}</div>}
                  {it.desc && <div className="text-xs text-neutral-300 mt-2 line-clamp-3">{it.desc}</div>}
                  <div className="mt-3 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition">Open ↗</div>
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
// ---------- Helpers ----------
function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="text-xs bg-white/10 border border-white/10 px-2.5 py-1 rounded-full"
        >
          {t}
        </span>
      ))}
    </div>
  );
}




// ---------- Tab Panels ----------

function ExperienceTab() {
  return (
    <div>
      <Row title="Highlights" items={DATA.experience} />
      {/* TODO: Add more rows like Impact, Tech Stack, Talks */}
    </div>
  );
}
function PersonalTab() {
  const P = DATA.personal;
  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      {/* Left: self-adapting LM focus */}
      <Card className="bg-white/5 border-white/10 lg:col-span-2">
        <CardContent className="p-6">
          <div className="text-sm uppercase tracking-wider text-neutral-400">Focus</div>
          <h3 className="mt-1 text-2xl font-semibold">{P.focus}</h3>
          <p className="text-sm text-neutral-300 mt-3">{P.blurb}</p>

          {/* Prototype row */}
          <div className="mt-6">
            <Row title="Prototype" items={P.prototype} />
          </div>
        </CardContent>
      </Card>

      {/* Right: hobbies + video */}
      <div className="space-y-4">
        {/* Hobbies card */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="text-sm uppercase tracking-wider text-neutral-400">Hobbies</div>
            <h4 className="mt-1 text-lg font-semibold">Outside the keyboard</h4>
            <div className="mt-3">
              <Chips items={P.hobbies} />
            </div>
          </CardContent>
        </Card>

        {/* Video below hobbies */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <video
            src="/hobbies.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}




function ProjectsTab() {
  return (
    <div>
      <Row title="Featured Projects" items={DATA.projects} />
    </div>
  );
}

function CertsTab() {
  const items = DATA.certifications.map((c) => ({ ...c, desc: "Click to view credential" }));
  return (
    <div>
      <Row title="Certifications" items={items} />
    </div>
  );
}

function EducationTab() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {DATA.education.map((e) => (
        <Card key={e.title} className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="font-semibold">{e.title}</div>
            <div className="text-sm text-neutral-400 mt-1">{e.sub}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
function ContactTab() {
  const C = DATA.contact;
  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Left side: contact info cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-sm">Email</div>
            <a
              className="text-lg font-semibold hover:underline"
              href={`mailto:${C.email}`}
            >
              {C.email}
            </a>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-sm">Phone</div>
            <a
              className="text-lg font-semibold"
              href={`tel:${C.phone}`}
            >
              {C.phone}
            </a>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 sm:col-span-2">
          <CardContent className="p-6">
            <div className="text-base mb-2">GitHub</div>
            <a
              className="text-xl font-semibold hover:underline break-all"
              href={C.github}
              target="_blank"
            >
              {C.github}
            </a>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 sm:col-span-2">
          <CardContent className="p-6">
            <div className="text-base mb-2">LinkedIn</div>
            <a
              className="text-xl font-semibold hover:underline break-all"
              href={C.linkedin}
              target="_blank"
            >
              {C.linkedin}
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Right side: profile image */}
      <div className="flex items-center justify-center">
        <img
          src={meImg}
          alt="Naveen Chaitanya"
          className="rounded-2xl object-cover shadow-lg w-80 h-96"
        />
      </div>
    </div>
  );
}




function HomeTab() {
  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <Card className="bg-white/5 border-white/10 lg:col-span-2">
        <CardContent className="p-6">
          <div className="text-2xl font-semibold">{DATA.name}</div>
          <div className="text-neutral-400 mt-2">{DATA.tagline}</div>
          <p className="text-sm text-neutral-300 mt-4">
            {/* TODO: Replace with your short bio */}
            I build AI systems end‑to‑end: RAG, agent workflows, and MLOps. I focus on shipping
            reliable, secure experiences with measurable impact.
          </p>
          <div className="mt-4 flex gap-2">
            <a href={DATA.contact.github} target="_blank"><Button>View GitHub</Button></a>
            <a href={DATA.contact.linkedin} target="_blank"><Button variant="secondary">Connect on LinkedIn</Button></a>
            <a href="#contact"><Button variant="ghost">Contact</Button></a>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="text-sm uppercase tracking-wider text-neutral-400">Now Playing</div>
          <div className="mt-3 text-lg font-semibold">Latest Work</div>
          <ul className="mt-2 text-sm list-disc list-inside text-neutral-300">
            <li>Agentic chatbot with tool use</li>
            <li>Demand forecasting dashboard</li>
            <li>Voice hotel assistant (realtime)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------- Main Shell ----------
function Shell({ onExit, profile }: { onExit: () => void; profile: ProfileKey }) {
  // Default to professional work first
  const [active, setActive] = useState<TabKey>(
  profile === "personal" ? "personal" : "experience"
);


  const Panel = useMemo(() => {
  switch (active) {
    case "personal":
      return <PersonalTab />;
    case "experience":
      return <ExperienceTab />;
    case "projects":
      return <ProjectsTab />;
    case "certs":
      return <CertsTab />;
    case "education":
      return <EducationTab />;
    case "contact":
      return <ContactTab />;
    case "home":
      return <HomeTab />;
    default:
      return <ExperienceTab />;
  }
}, [active]);


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <TopNav active={active} setActive={setActive} onExit={onExit} profile={profile} />


      {/* Hero Banner */}
      <div className="relative">
        <div className="h-44 sm:h-56 bg-gradient-to-b from-red-900/30 via-neutral-900 to-neutral-950" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 pb-4">
            <div className="text-xs text-neutral-400">Profile: <span className="capitalize">{profile}</span></div>
            <h2 className="text-2xl sm:text-3xl font-bold">Discover {profile === "recruiter" ? "Impact" : profile === "friends" ? "Cool Stuff" : "The Journey"}</h2>
            <p className="text-neutral-300 text-sm max-w-2xl mt-2">{PROFILE_BLURB[profile]}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6" id={active === "contact" ? "contact" : undefined}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {Panel}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {DATA.name}. Built by Naveen Chaitanya Kancharla with ❤️ in React, Tailwind, shadcn/ui.
      </footer>
    </div>
  );
}

export default function App() {
  // Initialize from URL (?profile=recruiter|friends|personal)
  const [profile, setProfile] = useState<ProfileKey | null>(getProfileFromURL());

  // Keep state in sync when user presses browser Back/Forward
  useEffect(() => {
    const onPop = () => setProfile(getProfileFromURL());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // When a profile is picked, push it into the URL
  const handlePick = (p: ProfileKey) => {
    setProfile(p);
    setProfileInURL(p); // adds ?profile=...
  };

  // When switching profiles, clear the URL so Back works
  const handleExit = () => {
    setProfile(null);
    setProfileInURL(null); // removes ?profile
  };

  return (
    <AnimatePresence mode="wait">
      {profile ? (
        <motion.div key="shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Shell profile={profile} onExit={handleExit} />
        </motion.div>
      ) : (
        <motion.div key="gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ProfileGate onPick={handlePick} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}



