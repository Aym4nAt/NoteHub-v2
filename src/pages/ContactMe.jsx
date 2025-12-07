import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { db } from "../components/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactMe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
      });

      setName("");
      setEmail("");
      setMessage("");
      setSuccessMsg("Message sent successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#05192d] bg-gradient-to-b from-[#092037] to-[#05182b]">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Contact Me</h1>
        <p className="text-white/60 mb-10">
          Fill the form below and your message will be delivered securely.
        </p>

        {successMsg && (
          <p className="text-emerald-400 text-sm mb-4">{successMsg}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#0A2036] border border-white/10 rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="text-white/70 text-sm">Your Name</label>
            <input
              type="text"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-[#102b46] text-white border border-white/10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white/70 text-sm">Your Email</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-[#102b46] text-white border border-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white/70 text-sm">Your Message</label>
            <textarea
              className="w-full mt-2 h-40 px-4 py-3 rounded-xl bg-[#102b46] text-white border border-white/10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}
