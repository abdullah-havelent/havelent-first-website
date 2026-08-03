'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({
  name: "",
  email: "",
  company: "",
  message: "",
});

  return (
    <section
  id="contact"
  className="relative overflow-hidden bg-[#000000] px-6 py-24 sm:py-32"
>
      {/* Orange Grid Background */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
  style={{
    backgroundImage: `
      linear-gradient(rgba(249,115,22,0.10) 1px, transparent 1px),
      linear-gradient(90deg, rgba(249,115,22,0.10) 1px, transparent 1px),
      radial-gradient(circle, rgba(249,115,22,0.35) 2px, transparent 2px)
    `,
    backgroundSize: "90px 90px, 90px 90px, 90px 90px",
    backgroundPosition: "0 0, 0 0, -1px -1px",
  }}
/>

{/* Full Section Orange Grid */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-0 opacity-40"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(249,115,22,0.22) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(249,115,22,0.22) 1px, transparent 1px),
      radial-gradient(
        circle,
        rgba(255,170,90,0.95) 0px,
        rgba(249,115,22,0.70) 2px,
        rgba(249,115,22,0.20) 5px,
        transparent 20px
      )
    `,
    backgroundSize: "80px 80px, 80px 80px, 80px 80px",
    backgroundPosition: "0 0, 0 0, -1px -1px",
  }}
/>


      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-3xl sm:h-[500px] sm:w-[500px]" />
</div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass w-full overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-12"
          style={{
            boxShadow:
              '0 40px 100px -30px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-orange">
                Contact Us
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-white">
                Let's build something
                <span className="text-gradient-orange"> unforgettable.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                Tell us about your vision. We respond within one business day
                with a tailored plan and next steps.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Mail, label: 'hello@havelent.studio' },
                  { icon: Phone, label: '+1 (415) 555-0142' },
                  { icon: MapPin, label: 'San Francisco · Remote worldwide' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <item.icon size={15} className="text-brand-orange" />
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <form
  onSubmit={async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);

        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });

        setTimeout(() => setSent(false), 3000);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }}
  className="flex flex-col gap-4"
>
              <div className="grid gap-4 sm:grid-cols-2">
  <input
  required
  type="text"
  placeholder="Full name"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-orange"
/>
  <input
  required
  type="email"
  placeholder="Email address"
  value={formData.email}
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-orange"
/>
 </div>
  <input
  placeholder="Company (optional)"
  value={formData.company}
  onChange={(e) =>
    setFormData({ ...formData, company: e.target.value })
  }
  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-orange"
/>
  <textarea
  required
  rows={4}
  placeholder="Tell us about your project..."
  value={formData.message}
  onChange={(e) =>
    setFormData({ ...formData, message: e.target.value })
  }
  className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-orange"
/>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                data-cursor="button"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-accent to-brand-orange px-6 py-3.5 text-sm font-semibold text-white"
                style={{ boxShadow: '0 0 30px -6px rgba(249,115,22,0.55)' }}
              >
                <span className="relative z-10">
                  {loading ? "Sending..." : sent ? "Message sent" : "Send message"}
                </span>
                {!sent && (
                  <ArrowRight
                    size={16}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
