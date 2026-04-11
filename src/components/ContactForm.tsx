"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, Github, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { submitViaWeb3Forms } from "@/lib/web3forms";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCompany("");
    setStatus("idle");
    setErrorMsg("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");

    if (company) {
      setStatus("success");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setStatus("error");
      setErrorMsg(
        "Contact form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local (see Web3Forms)."
      );
      return;
    }

    try {
      const result = await submitViaWeb3Forms({
        accessKey,
        name: name.trim(),
        email: email.trim(),
        subject: `[Portfolio] ${subject.trim()}`,
        message: message.trim(),
      });

      if (!result.ok) {
        setStatus("error");
        setErrorMsg(result.error);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Check your connection and try again.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--border-dim)] bg-bg/60 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  if (status === "success") {
    return (
      <div className="relative z-20 mx-auto w-full max-w-md rounded-xl border border-[var(--border-dim)] bg-bg/40 p-8 text-center card-glow">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden="true" />
        <p className="text-lg font-semibold text-text-primary">Message sent</p>
        <p className="mt-2 text-sm text-text-secondary">
          Thanks for reaching out — I&apos;ll reply to <span className="font-mono text-accent">{email}</span>{" "}
          soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-accent hover:text-accent-light underline-offset-4 hover:underline"
        >
          Send another message
        </button>
        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/NappyyCoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-text-secondary border border-border-dim hover:text-text-primary hover:border-border-glow hover:shadow-glow-violet transition-all duration-200"
          >
            <Github size={16} aria-hidden="true" />
            GitHub
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 mx-auto w-full max-w-md">
      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-[var(--border-dim)] bg-bg/40 p-6 text-left shadow-sm card-glow sm:p-8"
        noValidate
      >
        <p className="mb-6 text-center text-sm text-text-secondary">
          Fill out the form — your message is sent directly to my inbox.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Your email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
              placeholder="Project inquiry, collaboration…"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-y min-h-[120px]`}
              placeholder="Tell me what you have in mind…"
            />
          </div>
        </div>

        {/* Honeypot — leave empty */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {status === "error" && errorMsg && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold text-sm text-white shadow-glow-violet transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-accent"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #1e40af 100%)",
          }}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send message
            </>
          )}
        </button>

        <p className="mt-4 text-center font-mono text-xs text-text-muted break-all">
          Delivered to {CONTACT_EMAIL}
        </p>
      </form>

      <div className="mt-6 flex justify-center">
        <a
          href="https://github.com/NappyyCoder"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub profile in a new tab"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-text-secondary border border-border-dim hover:text-text-primary hover:border-border-glow hover:shadow-glow-violet transition-all duration-200 focus-visible:outline-violet-accent"
        >
          <Github size={16} aria-hidden="true" />
          GitHub
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
