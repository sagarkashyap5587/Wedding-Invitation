// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Phone, Heart, Sparkles } from "lucide-react";

export default function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2026-03-10T18:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const events = [
    {
      title: "Engagement Ceremony (Magni)",
      date: "1st October 2025",
      time: "Completed",
      icon: "💍",
      note: "Our engagement was held on this date",
    },
    {
      title: "Haldi & Mehndi Ceremony",
      date: "8th March 2026",
      time: "Evening/Daytime",
      icon: "🌼",
      location: "Home",
    },
    {
      title: "Mandap Ceremony (Tilak/Mandha)",
      date: "9th March 2026",
      time: "Daytime",
      icon: "🙏",
      location: "Home",
      mapLink: "https://maps.app.goo.gl/SrVLWyqbsFNXbDb97",
    },
    {
      title: "Wedding Ceremony (Barat)",
      date: "10th March 2026",
      time: "Night",
      icon: "💐",
      location: "Diamond Farm House, Chartwal Road",
      details: "Near Shani Dham Mandir (400 meters from petroleum pump)",
      mapLink: "https://maps.app.goo.gl/PpKasXAbc7GezJHS8",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50">
      {/* Header with Ganesh Ji */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">🕉️</div>
          <h1
            className="text-5xl font-bold mb-2"
            style={{ fontFamily: "serif" }}
          >
            ॐ श्री गणेशाय नमः
          </h1>
          <p className="text-xl opacity-90">Om Shri Ganeshaya Namah</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Couple Names */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 text-6xl">
            🌸
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-orange-200 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='40' text-anchor='middle' dominant-baseline='middle' fill='%23ff6b6b'%3E❤️%3C/text%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
              }}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-4xl">🙏</div>
                <Heart className="text-rose-500 fill-rose-500" size={32} />
                <div className="text-4xl">🙏</div>
              </div>

              <h2
                className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 bg-clip-text text-transparent"
                style={{ fontFamily: "serif" }}
              >
                Sagar ❤️ Swati
              </h2>

              <div
                className="text-3xl mb-6 text-gray-700"
                style={{ fontFamily: "serif" }}
              >
                साथ सात फेरों का
              </div>

              <p className="text-2xl text-gray-600 mb-8">
                You're Invited to Celebrate Our Wedding
              </p>

              <div className="flex items-center justify-center gap-3 text-orange-600">
                <Sparkles size={24} />
                <span className="text-xl font-semibold">
                  With the blessings of Radha Krishna
                </span>
                <Sparkles size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-2xl p-8 mb-12 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Counting Down to Our Special Day
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white rounded-xl p-4 text-center shadow"
              >
                <div className="text-3xl font-bold text-orange-600">
                  {value}
                </div>
                <div className="text-sm text-gray-600 capitalize">{unit}</div>
              </div>
            ))}
          </div>
        </div>

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
        <div className="mb-12">
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

        {/* RSVP Section */}
        <div className="bg-gradient-to-br from-orange-600 via-rose-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white text-center">
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
        <div className="text-center mt-12 pt-8 border-t-2 border-orange-200">
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
