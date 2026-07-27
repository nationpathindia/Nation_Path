"use client";

import { useState } from "react";
import { Mail, Building2, Megaphone } from "lucide-react";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } else {
      alert("Failed to send message");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">

      {/* HEADER */}

      <section className="text-center mb-16">

        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Contact Nation Path
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto">
          For inquiries, partnerships, or advertising opportunities,
          please reach the Nation Path team through the following channels.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Our team usually responds within 24–48 hours.
        </p>

      </section>


      {/* CONTACT CARDS */}

      <section className="grid md:grid-cols-3 gap-8 mb-20">

        {/* GENERAL INQUIRY */}

        <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

          <Mail className="mx-auto text-[#0b2a6f] mb-4" size={32} />

          <h3 className="font-semibold text-lg mb-2">
            General Inquiry
          </h3>

          <p className="text-gray-600 text-sm mb-3">
            Questions, feedback or general communication
          </p>

          <a
            href="mailto:info@nationpathindia.com"
            className="text-[#0b2a6f] text-sm break-all hover:underline"
          >
            info@nationpathindia.com
          </a>

        </div>


        {/* ADVERTISING */}

        <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

          <Megaphone className="mx-auto text-[#0b2a6f] mb-4" size={32} />

          <h3 className="font-semibold text-lg mb-2">
            Advertising
          </h3>

          <p className="text-gray-600 text-sm mb-3">
            Campaigns, brand partnerships and promotions
          </p>

          <a
            href="mailto:advertise@nationpathindia.com"
            className="text-[#0b2a6f] text-sm break-all hover:underline"
          >
            advertise@nationpathindia.com
          </a>

        </div>


        {/* ORGANIZATION */}

        <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

          <Building2 className="mx-auto text-[#0b2a6f] mb-4" size={32} />

          <h3 className="font-semibold text-lg mb-2">
            Organization
          </h3>

          <p className="text-gray-600 text-sm">
            SuryaPath Media<br />
            India
          </p>

        </div>

      </section>


      {/* CONTACT FORM */}

      <section className="bg-gray-50 rounded-xl p-10">

        <h2 className="text-2xl font-serif mb-8 text-center">
          Send Us a Message
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            rows={6}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0b2a6f] text-white py-3 rounded-lg md:col-span-2 hover:bg-[#081f4f] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {sent && (
            <p className="text-green-600 md:col-span-2 text-center">
              Message sent successfully. Our team will contact you soon.
            </p>
          )}

        </form>

      </section>


      {/* SOCIAL LINKS */}

      <section className="text-center mt-16">

        <h3 className="font-semibold mb-4">
          Follow Nation Path
        </h3>

        <div className="flex justify-center gap-6 text-gray-600 text-sm">

          <a href="#" className="hover:text-[#0b2a6f]">
            Twitter
          </a>

          <a href="#" className="hover:text-[#0b2a6f]">
            Facebook
          </a>

          <a href="#" className="hover:text-[#0b2a6f]">
            YouTube
          </a>

          <a href="#" className="hover:text-[#0b2a6f]">
            LinkedIn
          </a>

        </div>

      </section>

    </main>
  );
}