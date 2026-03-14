"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItemData {
  readonly question: string;
  readonly answer: string;
}

interface FaqAccordionProps {
  title: string;
  items: readonly FaqItemData[];
}

export default function FaqAccordion({ title, items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h3 className="faq__title">{title}</h3>
      <div className="faq__list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
          >
            <button
              className="faq-item__question"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <ChevronDown className="faq-item__chevron" size={20} />
            </button>
            <div className="faq-item__answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}