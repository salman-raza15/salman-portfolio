"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Message = {
  role: "bot" | "user";
  text: string;
};

const quickQuestions = [
  "About Me",
  "My Skills",
  "My Projects",
  "Experience",
  "Contact",
];

function getReply(question: string): string {
  const q = question.toLowerCase().trim();

  if (/hello|hi|hey|salam|assalam/.test(q)) {
    return "Hello! I'm Salman's portfolio assistant. Ask me about his skills, projects, experience, or contact details.";
  }

  if (/contact|email|reach|hire|connect|linkedin|github/.test(q)) {
    return "You can contact Salman at salmanshah34523@gmail.com. LinkedIn: linkedin.com/in/syed-salman-raza-b26683402/ | GitHub: github.com/salman-raza15";
  }

  if (/experience|journey|job|work|company|bootcamp|xloop/.test(q)) {
    return "Salman completed an AI & Agentic Development Bootcamp at Mari Energies (April–September 2026). Since September 2026, he has been working as a Junior Software Engineer at Xloop Digital.";
  }

  if (/project|portfolio|built|created|developed/.test(q)) {
    return "Salman's projects include AI Assignment Evaluation System, AI Voice Receptionist, AI Language Translator, AI Personal Assistant, and EstateHub. You can explore them in the Selected Work section.";
  }

  if (/skill|technology|stack|python|fastapi|react|next|agentic|automation|ai/.test(q)) {
    return "Salman's skills include Python, FastAPI, React, Next.js, PostgreSQL, AI Agents, LLMs, Azure AI, n8n, Make.com, and workflow automation.";
  }

  if (/about|who|salman|yourself|introduction/.test(q)) {
    return "Syed Salman Raza is a Software Developer focused on full-stack development, AI and Agentic AI, backend APIs, and intelligent automation.";
  }

  return "I can help you explore Salman's portfolio. Try asking about his skills, projects, experience, or contact information.";
}

export default function PortfolioChatbot() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm Salman's portfolio assistant. What would you like to know?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages, open]);

  function sendMessage(value: string) {
    const question = value.trim();
    if (!question) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
      { role: "bot", text: getReply(question) },
    ]);

    setInput("");
  }

  if (!mounted) return null;

  return createPortal(
    <div className="portfolio-chatbot">
      {open && (
        <section
          className="chatbot-panel"
          aria-label="Portfolio assistant"
        >
          <div className="chatbot-header">
            <div>
              <span className="chatbot-status" />
              <strong>PORTFOLIO ASSISTANT</strong>
              <small>SMART QUICK ANSWERS</small>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.role}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-questions">
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form
            className="chatbot-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask something..."
              aria-label="Your message"
            />
            <button type="submit" aria-label="Send message">
              ↗
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
      >
        {open ? "×" : "✳"}
      </button>
    </div>,
    document.body
  );
}
