// src/pages/TermsPage.tsx
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiDownload, FiCheck } from "react-icons/fi";

type Section = {
  id: string;
  title: string;
  content: string;
};

const SECTIONS: Section[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content:
      "Welcome to [Your Company]. These Terms & Conditions govern your use of our website and services. By using our site you agree to these terms. If you do not agree, please do not use the site.",
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content:
      "`\"Service\"` means the website, applications, and features provided by [Your Company]. `\"User\"` means any person who accesses or uses the Service.",
  },
  {
    id: "accounts",
    title: "3. Accounts, Registration & Security",
    content:
      "Users may be required to create an account. You are responsible for keeping your credentials secure. You agree to notify us immediately of any unauthorized use.",
  },
  {
    id: "payments",
    title: "4. Payments & Refunds",
    content:
      "All prices are as stated. Payment processing is handled by third-party providers. Refunds are issued under our Refund Policy. See refunds section for conditions and timelines.",
  },
  {
    id: "intellectual",
    title: "5. Intellectual Property",
    content:
      "All content, trademarks, logos, and materials are the property of [Your Company] or licensors. You may not reproduce or distribute without permission.",
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, [Your Company] will not be liable for any indirect, incidental, or consequential damages arising from use of the Service.",
  },
  {
    id: "privacy",
    title: "7. Privacy",
    content:
      "Our Privacy Policy explains how we collect and use personal information. By using the Service, you consent to the collection and use of information as described there.",
  },
  {
    id: "changes",
    title: "8. Changes to Terms",
    content:
      "We may update these Terms from time to time. Substantive changes will be notified to users. Continued use after changes constitutes acceptance.",
  },
  {
    id: "contact",
    title: "9. Contact",
    content:
      "If you have questions about these Terms, contact us at support@example.com.",
  },
];

export default function TermsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: false }), {})
  );
  const [accepted, setAccepted] = useState(false);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAccept = () => {
    // your accept logic (e.g. send to API, mark user as accepted)
    alert("Thanks — you accepted the Terms & Conditions.");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen  w-full bg-gray-50 text-gray-800  ">
      <div className="w-full mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* HEADER */}
        <header className="p-6 md:p-8 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Typography className="text-2xl md:text-3xl font-semibold">Terms & Conditions</Typography>
              <Typography className="text-sm text-gray-500 mt-1">
                Last updated: <time dateTime={new Date().toISOString().split("T")[0]}>2025-12-07</time>
              </Typography>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                aria-label="Download or Print Terms"
                className="inline-flex items-center gap-2 px-3 py-2 border cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--main-web-color)]"
              >
                <FiDownload />
                <Typography className="text-sm">Download / Print</Typography>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("toc");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--main-web-color-2)] cursor-pointer text-white rounded-md hover:bg-[var(--main-web-color)] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
              >
                <Typography>Jump to Table of Contents</Typography>
              </button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
          {/* LEFT: TOC */}
          <nav
            id="toc"
            className="md:col-span-1 bg-gray-50 p-4 rounded-lg sticky top-6 h-fit"
            aria-label="Table of contents"
          >
            <Typography className="text-sm font-semibold mb-3">Contents</Typography>
            <ol className="flex flex-col gap-2 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(s.id);
                      el?.scrollIntoView({ behavior: "smooth" });
                      setExpanded((prev) => ({ ...prev, [s.id]: true }));
                    }}
                  >
                   <Typography>{s.title}</Typography> 
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* RIGHT: CONTENT */}
          <article className="md:col-span-2 space-y-6">
            <div className="prose prose-sm md:prose lg:prose-lg max-w-none">
              <Typography className="text-sm text-gray-600">
                Please read these Terms & Conditions ("Terms", "Terms and Conditions") carefully before using the service operated by [Your Company].
              </Typography>
            </div>

            {/* Sections */}
            <div className="space-y-4">
              {SECTIONS.map((s) => (
                <section
                  id={s.id}
                  key={s.id}
                  className="bg-white border rounded-lg p-4 shadow-sm"
                  aria-labelledby={`${s.id}-title`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Typography id={`${s.id}-title`} className="font-medium text-left">
                      {s.title}
                    </Typography>

                    <button
                      aria-expanded={!!expanded[s.id]}
                      aria-controls={`${s.id}-content`}
                      onClick={() => toggle(s.id)}
                      className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      {expanded[s.id] ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>

                  <div
                    id={`${s.id}-content`}
                    className={`mt-3 text-sm text-gray-700 transition-all duration-200 overflow-hidden ${
                      expanded[s.id] ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Typography className="whitespace-pre-line">{s.content}</Typography>

                    {/* Example: nested clauses */}
                    <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                      <Typography><li>Clause A — brief explanation.</li></Typography>
                      <Typography> <li>Clause B — brief explanation.</li></Typography>
                    </ul>
                  </div>
                </section>
              ))}
            </div>

            {/* ACCEPT BOX */}
            <div className="bg-gray-50 border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--main-web-color-2)]"
                  aria-label="I agree to the Terms and Conditions"
                />
                <Typography className="text-sm text-gray-700">
                  I have read and agree to the Terms & Conditions.
                </Typography>
              </label>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => {
                    // show the full terms in print-friendly mode
                    handlePrint();
                  }}
                  className="px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--main-web-color)]"
                >
                  <FiDownload className="inline-block mr-2" />
                  <Typography className="text-sm">Print / Download</Typography>
                </button>

                <button
                  onClick={handleAccept}
                  disabled={!accepted}
                  className={`inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    accepted
                      ? "bg-[var(--main-web-color-2)] hover:bg-[var(--main-web-color)] focus:ring-[var(--main-web-color)] "
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  <FiCheck />
                  <Typography>Accept</Typography>
                </button>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="text-xs text-gray-500">
              <Typography>
                These Terms & Conditions were generated as a template. Replace placeholders (like
                [Your Company]) with your legal details. For legally binding documents consult a lawyer.
              </Typography>
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
}

// Small helper that uses the print function for accessibility
function handlePrint() {
  // open print dialog; users can save as PDF from browser
  window.print();
}
