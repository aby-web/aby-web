import { useState } from 'react';
import { TEXT } from './ui';

// Questions that open and close. Every answer is in the page's HTML from the
// start (closed ones are only collapsed), so crawlers can read them all.
// `groups` is [{ category, questions: [{ q, a }] }] from src/data/faqs.js.
export default function FaqList({ groups, showCategories = true }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-12">
      {groups.map((group, g) => (
        <div key={group.category}>
          {showCategories && (
            <h2 className="text-3xl font-light text-[#1C1410] mb-6 pb-3 border-b border-[#C9B99A]">
              {group.category}
            </h2>
          )}
          <div className="space-y-4">
            {group.questions.map((faq, i) => {
              const id = `${g}-${i}`;
              const isOpen = open === id;
              return (
                <div key={faq.q} className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#EAE0CF] transition-colors"
                    >
                      <span className="text-lg text-[#1C1410] pr-4">{faq.q}</span>
                      <span
                        aria-hidden="true"
                        className={`text-2xl text-[#785E3D] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className={`px-6 pb-5 pt-2 ${TEXT.body}`}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
