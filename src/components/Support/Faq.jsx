import React, { useState } from "react";
import SharedBtn from "../../SharedBtn";
import "./Faq.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  const FAQS = [
    {
      id: 1,
      question: "What is StreamVibe?",
      answer:
        "StreamVibe is an online streaming platform that offers a wide selection of movies, TV shows, and exclusive content that you can watch anytime, anywhere.",
    },
    {
      id: 2,
      question: "How much does StreamVibe cost?",
      answer:
        "StreamVibe offers multiple subscription plans starting at $9.99/month. Prices vary depending on the features and number of screens you choose.",
    },
    {
      id: 3,
      question: "What content is available on StreamVibe?",
      answer:
        "You can access a diverse library of popular movies, series, documentaries, and original content produced exclusively for StreamVibe users.",
    },
    {
      id: 4,
      question: "How can I watch StreamVibe?",
      answer:
        "You can watch StreamVibe through our website, mobile apps (iOS and Android), smart TVs, and popular streaming devices like Roku, Fire Stick, and Apple TV.",
    },
    {
      id: 5,
      question: "How do I sign up for StreamVibe?",
      answer:
        "Simply visit our website, click on 'Sign Up', choose a subscription plan, and create an account using your email and payment details.",
    },
    {
      id: 6,
      question: "What is the StreamVibe free trial?",
      answer:
        "StreamVibe offers a 7-day free trial so you can explore our content and features before committing to a paid plan. Cancel anytime during the trial to avoid charges.",
    },
    {
      id: 7,
      question: "How do I contact StreamVibe customer support?",
      answer:
        "You can reach our support team via the 'Contact Us' page on our website, or email us at support@streamvibe.com. Live chat is also available 24/7.",
    },
    {
      id: 8,
      question: "What are the StreamVibe payment methods?",
      answer:
        "We accept all major credit and debit cards, PayPal, and other local payment options depending on your region.",
    },
  ];
  return (
    <>
      <main className="my-5 support">
        <div className="container">
          <div className="main__questions my-5">
            <div className="start d-flex flex-wrap justify-content-between align-items-center">
              <header>
                <h3>Frequently Asked Questions</h3>
                <p className="text-white-50">
                  Got questions? We've got answers! Check out our FAQ section to
                  find answers to the most common questions about StreamVibe.
                </p>
              </header>
            </div>
            <div className="questions__holder row">
              {FAQS.map((quse) => (
                <Question question={quse} key={quse.id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Question({ question }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <motion.article
      className="question px-5 col-lg-6 my-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="d-flex py-3 justify-content-between align-items-center">
        <span className="question__number py-2 px-3 rounded fs-5">
          {question.id}
        </span>
        <h5 className="qusetion fw-normal">{question.question}</h5>
        <span className="question__cloapse" onClick={toggle}>
          <img
            src={
              isOpen
                ? "../../../src/assets/Icon-plus.svg"
                : "../../../src/assets/Icon.svg"
            }
            alt=""
          />
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="answer-wrapper open"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-white-50 p-2">{question.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <hr />
    </motion.article>
  );
}
