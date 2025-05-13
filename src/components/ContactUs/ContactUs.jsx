import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import SharedBtn from "../../SharedBtn";
import "./contact-us.css";

export function ContactUs() {
  return (
    <div className="container my-5" style={{ color: "#fff" }}>
      <main className="my-5 support">
        <div className="container">
          <div className="row g-3 align-items-center">
            {/* Title + Description + Image */}
            <motion.header
              className="col-lg-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h1>Welcome to our Contact US Page!</h1>
              <p className="text-white-50">
                We're here to help you with any problems you may be having with
                our product.
              </p>
              <div className="main__image">
                <motion.img
                  className="w-100"
                  src="../../src/assets/Sub.png"
                  alt="Sub Image"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.header>

            {/* Form */}
            <motion.div
              className="form__support col-lg-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.form
                className="row g-3 shadow-sm rounded"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="col-md-6">
                  <label htmlFor="fristName" className="form-label">
                    Frist Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Frist Name"
                    className="form-control px-2 py-2 py-lg-3"
                    id="fristName"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="lastName"
                    placeholder="Enter Last Name"
                    className="form-label"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="form-control px-2 py-2 py-lg-3"
                    id="lastName"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control px-2 py-2 py-lg-3"
                    placeholder="Enter Your Email"
                    id="email"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control px-2 py-2 py-lg-3"
                    placeholder="Enter Your Message"
                    id="message"
                  ></textarea>
                </div>
                <div className="col-12 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      I agree with Terms of Use and Privacy Policy
                    </label>
                  </div>
                  <div className="">
                    <SharedBtn>Send Message</SharedBtn>
                  </div>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
