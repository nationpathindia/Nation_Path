"use client";

import { useState } from "react";
import {
  Mail,
  Building2,
  Megaphone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSent(false);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError(
          data.message || "Failed to send message"
        );
      }
    } catch (error) {
      console.error(
        "Contact submit error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="text-center mb-16">

        <h1>
          Contact NationPath India
        </h1>


        <p>
          For editorial inquiries, news tips, partnerships,
          advertising opportunities, corrections, feedback
          or general communication, please reach the
          NationPath India team through the official channels
          below.
        </p>


        <p>
          Our team usually responds within 24–48 hours.
        </p>

      </section>



      <section className="grid md:grid-cols-3 gap-8 mb-20">


        <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

          <Mail
            className="mx-auto text-[#0b2a6f] mb-4"
            size={32}
          />


          <h3>
            General Inquiry
          </h3>


          <p>
            Questions, feedback, editorial communication
            and general support.
          </p>


          <a
            href="mailto:info@nationpathindia.com"
          >
            info@nationpathindia.com
          </a>

        </div>




        <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

          <Megaphone
            className="mx-auto text-[#0b2a6f] mb-4"
            size={32}
          />


          <h3>
            Advertising & Partnerships
          </h3>


          <p>
            Brand partnerships, campaigns, promotions
            and business inquiries.
          </p>


          <a
            href="mailto:advertise@nationpathindia.com"
          >
            advertise@nationpathindia.com
          </a>

        </div>




        <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

          <Building2
            className="mx-auto text-[#0b2a6f] mb-4"
            size={32}
          />


          <h3>
            Organization
          </h3>


          <p>
            NationPath India
          </p>


          <p>
            Digital News & Media Platform
          </p>

        </div>


      </section>





      <section className="bg-gray-50 rounded-xl p-10">


        <h2>
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
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />



          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />



          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value,
              })
            }
            className="border p-3 rounded-lg md:col-span-2"
          />



          <textarea
            rows={6}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            className="border p-3 rounded-lg md:col-span-2"
          />



          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#0b2a6f]
              text-white
              py-3
              rounded-lg
              md:col-span-2
              hover:bg-[#081f4f]
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Sending..."
              : "Send Message"}
          </button>



          {sent && (
            <p className="text-green-600 md:col-span-2 text-center">
              Message sent successfully. Our team will contact you soon.
            </p>
          )}



          {error && (
            <p className="text-red-600 md:col-span-2 text-center">
              {error}
            </p>
          )}


        </form>


      </section>





      <section className="text-center mt-16">


        <h3>
          Follow NationPath India
        </h3>



        <div className="flex justify-center gap-5">


          <a
            href="https://x.com/nationpathindia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <Twitter size={20} />
          </a>



          <a
            href="https://www.facebook.com/profile.php?id=61587529251948"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>



          <a
            href="https://www.instagram.com/nationpathindia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>



          <a
            href="https://www.youtube.com/@NationPathIndia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </a>


        </div>


      </section>

    </>
  );
}