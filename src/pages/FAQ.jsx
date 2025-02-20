import React, { useState } from "react";
import "../components/FAQ.css"; 

const faqs = [
  {
    question: " How does the online voting system work?",
    answer:
      "The online voting system allows registered users to securely cast their votes through a web-based platform. Users need to log in, verify their identity, and then vote for their preferred candidates.",
  },
  {
    question: " Can I change my vote after submitting?",
    answer: "No, once you have submitted your vote, it is final and cannot be changed.",
  },
  {
    question: " Is my vote anonymous?",
    answer:
      "Yes, the system ensures that all votes remain anonymous while maintaining transparency in the election process.",
  },
  {
    question: " How do I register for voting?",
    answer:
      "To register, click on the 'Sign Up' button, fill in your details, and verify your email. Once verified, you can log in and cast your vote.",
  },
  {
    question: " What happens if I forget my password?",
    answer:
      "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email to reset your password.",
  },
  {
    question: " Is the voting system secure?",
    answer:
      "Yes, the system uses encryption and authentication protocols to ensure that votes are securely recorded and cannot be altered.",
  },
  {
    question: " Can I vote using my mobile phone?",
    answer:
      "Yes, the system is mobile-friendly, allowing you to vote using your smartphone, tablet, or computer.",
  },
  {
    question: " How do I know my vote has been counted?",
    answer:
      "After voting, you will receive a confirmation email. You can also check your voting status on the dashboard.",
  },
  {
    question: " What should I do if I experience technical issues?",
    answer:
      "If you face any issues, try refreshing the page or clearing your browser cache. If the problem persists, contact support.",
  },
  {
    question: " Can I vote from multiple devices?",
    answer:
      "No, once you log in and cast your vote, the system prevents multiple voting attempts, even from different devices.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">📌 Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="arrow">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
