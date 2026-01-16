// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Heart,
  Sparkles,
  Music,
  Pause,
  Share2,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Mail,
  Check,
  Menu,
  Home as HomeIcon,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function WeddingInvitation() {
  const [countdowns, setCountdowns] = useState<
    Array<{
      id: string;
      title: string;
      icon: string;
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }>
  >([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rsvpData, setRsvpData] = useState({
    name: "",
    guests: "",
    message: "",
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const upcomingEvents = [
      {
        id: "haldi",
        title: "Haldi & Mehndi Ceremony",
        icon: "🌼",
        date: new Date("2026-03-08T16:00:00"), // March 8, 2026, 4:00 PM
      },
      {
        id: "mandap",
        title: "Mandap Ceremony (Tilak)",
        icon: "🙏",
        date: new Date("2026-03-09T09:00:00"), // March 9, 2026, 9:00 AM
      },
      {
        id: "wedding",
        title: "Wedding Ceremony (Barat)",
        icon: "💐",
        date: new Date("2026-03-10T18:00:00"), // March 10, 2026, 6:00 PM
      },
    ];

    const timer = setInterval(() => {
      const now = new Date().getTime();

      const activeCountdowns = upcomingEvents
        .map((event) => {
          const distance = event.date.getTime() - now;

          if (distance <= 0) {
            return null; // Event has passed, don't show
          }

          return {
            id: event.id,
            title: event.title,
            icon: event.icon,
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          };
        })
        .filter((event): event is NonNullable<typeof event> => event !== null);

      setCountdowns(activeCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "couple", "events", "gallery", "rsvp"];
      let foundSection = false;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (top is at or below 100px from top)
          if (rect.top <= 100 && rect.top >= -100) {
            setActiveSection(section);
            foundSection = true;
            break;
          }
        }
      }

      // If we're at the bottom of the page, set the last section as active
      if (!foundSection) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (windowHeight + scrollTop >= documentHeight - 100) {
          setActiveSection("rsvp");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galleryImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=800",
  ];

  const events = [
    {
      title: "Engagement Ceremony (Magni)",
      date: "1st October 2025",
      time: "Completed",
      icon: "💍",
      note: "Our engagement was held on this date",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Haldi & Mehndi Ceremony",
      date: "8th March 2026",
      time: "Evening/Daytime",
      icon: "🌼",
      location: "Home (Peerbad)",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Mandap Ceremony (Tilak/Mandha)",
      date: "9th March 2026",
      time: "Daytime",
      icon: "🙏",
      location: "Home (Peerbad)",
      mapLink: "https://maps.app.goo.gl/SrVLWyqbsFNXbDb97",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Wedding Ceremony (Barat)",
      date: "10th March 2026",
      time: "Night",
      icon: "💐",
      location: "Diamond Farm House, Chartwal Road Muzaffarnagar",
      details: "Near Shani Dham Mandir (400 meters from petroleum pump)",
      mapLink: "https://maps.app.goo.gl/PpKasXAbc7GezJHS8",
      color: "from-rose-500 to-pink-600",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navigation
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      // Immediately set the active section
      setActiveSection(sectionId);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setShowMenu(false);
    }
  };

  const shareInvitation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sagar & Swati's Wedding",
          text: "Join us in celebrating our wedding! 🎉",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpData({ name: "", guests: "", message: "" });
      setRsvpSubmitted(false);
    }, 3000);
  };

  const FloatingParticle = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [
          -100,
          typeof window !== "undefined" ? window.innerHeight + 100 : 800,
        ],
        rotate: [0, 360],
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="fixed pointer-events-none z-0 text-2xl"
      style={{
        left: `${Math.random() * 100}%`,
      }}
    >
      {["🌸", "💐", "✨", "🪔", "🌺"][Math.floor(Math.random() * 5)]}
    </motion.div>
  );

  const Navigation = () => (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg"
      >
        {showMenu ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 py-4">
            {[
              { id: "home", icon: <HomeIcon size={18} />, label: "Home" },
              { id: "couple", icon: <Heart size={18} />, label: "Couple" },
              { id: "events", icon: <Calendar size={18} />, label: "Events" },
              {
                id: "gallery",
                icon: <ImageIcon size={18} />,
                label: "Gallery",
              },
              { id: "rsvp", icon: <Mail size={18} />, label: "RSVP" },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 pt-20 px-6"
          >
            <div className="flex flex-col gap-4">
              {[
                { id: "home", icon: <HomeIcon size={20} />, label: "Home" },
                { id: "couple", icon: <Heart size={20} />, label: "Couple" },
                { id: "events", icon: <Calendar size={20} />, label: "Events" },
                {
                  id: "gallery",
                  icon: <ImageIcon size={20} />,
                  label: "Gallery",
                },
                { id: "rsvp", icon: <Mail size={20} />, label: "RSVP" },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const MusicControl = () => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-rose-500 text-white p-4 rounded-full shadow-xl"
    >
      {isPlaying ? <Pause size={24} /> : <Music size={24} />}
    </motion.button>
  );

  const ShareButton = () => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={shareInvitation}
      className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-xl"
    >
      <Share2 size={24} />
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 overflow-x-hidden">
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}

      <Navigation />
      <MusicControl />
      <ShareButton />

      {/* Hero Section with Ganesh Ji */}
      <motion.section
        id="home"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 py-16 lg:py-24 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl lg:text-8xl mb-6 inline-block"
          >
            🕉️
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-7xl font-bold mb-4"
            style={{ fontFamily: "serif" }}
          >
            ॐ श्री गणेशाय नमः
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-2xl opacity-90"
          >
            Om Shri Ganeshaya Namah
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex justify-center gap-4 text-4xl"
          >
            {["🪔", "🌸", "💕", "🌺", "🪔"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-6xl">
        {/* Couple Names */}
        <section id="couple" className="text-center mb-12 lg:mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 text-4xl lg:text-6xl"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌸
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-16 border-4 border-orange-200 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='40' text-anchor='middle' dominant-baseline='middle' fill='%23ff6b6b'%3E❤️%3C/text%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
              }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <motion.div
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl lg:text-4xl"
                >
                  🙏
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="text-rose-500 fill-rose-500" size={32} />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, -20, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl lg:text-4xl"
                >
                  🙏
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 bg-clip-text text-transparent"
                style={{ fontFamily: "serif" }}
              >
                Sagar ❤️ Swati
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl lg:text-4xl mb-6 text-gray-700"
                style={{ fontFamily: "serif" }}
              >
                साथ सात फेरों का
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg lg:text-2xl text-gray-600 mb-8"
              >
                You're Invited to Celebrate Our Wedding
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center justify-center gap-3 text-orange-600 flex-wrap"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={24} />
                </motion.div>
                <span className="text-lg lg:text-xl font-semibold">
                  With the blessings of Radha Krishna
                </span>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles size={24} />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Countdown Timers */}
        <AnimatePresence>
          {countdowns.length > 0 && (
            <div className="space-y-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  ⏰ Upcoming Ceremonies
                </h3>
                <div className="space-y-6">
                  {countdowns.map((countdown) => (
                    <motion.div
                      key={countdown.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{countdown.icon}</span>
                        <h4 className="text-xl font-bold text-gray-800">
                          {countdown.title}
                        </h4>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg p-3 text-center text-white">
                          <div className="text-3xl font-bold">
                            {countdown.days}
                          </div>
                          <div className="text-xs opacity-90">Days</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg p-3 text-center text-white">
                          <div className="text-3xl font-bold">
                            {countdown.hours}
                          </div>
                          <div className="text-xs opacity-90">Hours</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg p-3 text-center text-white">
                          <div className="text-3xl font-bold">
                            {countdown.minutes}
                          </div>
                          <div className="text-xs opacity-90">Minutes</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg p-3 text-center text-white">
                          <div className="text-3xl font-bold">
                            {countdown.seconds}
                          </div>
                          <div className="text-xs opacity-90">Seconds</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Radha Krishna Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-6xl">🪈</div>
            <div className="text-6xl">💕</div>
            <div className="text-6xl">🌺</div>
          </div>
          <p
            className="text-xl text-gray-700 italic"
            style={{ fontFamily: "serif" }}
          >
            "राधे राधे - May Radha Krishna bless our union"
          </p>
        </div>

        {/* Event Details */}
        <div id="events" className="mb-12">
          <h3
            className="text-4xl font-bold text-center mb-8 text-gray-800"
            style={{ fontFamily: "serif" }}
          >
            शुभ अवसर - Event Details
          </h3>

          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-100 hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{event.icon}</span>
                    <h4 className="text-2xl font-bold">{event.title}</h4>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar
                        className="text-orange-600 mt-1 flex-shrink-0"
                        size={24}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {event.date}
                        </p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="text-rose-600 mt-1 flex-shrink-0"
                          size={24}
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {event.location}
                          </p>
                          {event.details && (
                            <p className="text-sm text-gray-600">
                              {event.details}
                            </p>
                          )}
                          {event.mapLink && (
                            <a
                              href={event.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm underline inline-block mt-1"
                            >
                              Click here to open location
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {event.note && (
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-700 italic">
                        <span className="font-semibold">Note:</span>{" "}
                        {event.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div id="gallery" className="mb-12">
          <h3
            className="text-4xl font-bold text-center mb-8 text-gray-800"
            style={{ fontFamily: "serif" }}
          >
            📸 यादें - Our Memories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => {
                  setCurrentImageIndex(index);
                  setShowGallery(true);
                }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-white font-semibold">
                    Click to view
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RSVP Section */}
        <div
          id="rsvp"
          className="bg-gradient-to-br from-orange-600 via-rose-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white text-center mb-16 scroll-mt-20"
        >
          <h3 className="text-3xl font-bold mb-6">RSVP / Contact</h3>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Phone size={24} />
              <span className="text-xl font-semibold">Sagar</span>
            </div>
            <a
              href="tel:8126583426"
              className="text-3xl font-bold hover:underline"
            >
              8126583426
            </a>
          </div>

          <p className="text-lg opacity-90">
            We look forward to celebrating with you! 🎉
          </p>
        </div>

        {/* Footer with Blessings */}
        <div className="text-center mt-12 pt-8 pb-16 border-t-2 border-orange-200">
          <div className="flex justify-center gap-6 mb-4 text-4xl">
            <span>🙏</span>
            <span>🕉️</span>
            <span>💐</span>
            <span>🪔</span>
          </div>
          <p
            className="text-xl text-gray-700 mb-2"
            style={{ fontFamily: "serif" }}
          >
            आपका स्वागत है - Your presence is our blessing
          </p>
          <p className="text-gray-600">With Love, Sagar & Swati Families</p>
        </div>
      </div>
    </div>
  );
}
