/** @format */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SharedBtn from "../SharedBtn";

const AboutUs = () => {
  const features = [
    {
      icon: "🎬",
      title: "Movie Discovery",
      description:
        "Explore a vast collection of movies with detailed information, ratings, and reviews",
    },
    {
      icon: "📝",
      title: "Personal Watchlist",
      description:
        "Create and manage your personal watchlist to keep track of movies you want to see",
    },
    {
      icon: "🎯",
      title: "Movie Management",
      description: "Add, edit, and organize your movie collection with ease",
    },
    {
      icon: "💬",
      title: "User Reviews",
      description:
        "Share your thoughts and read reviews from other movie enthusiasts",
    },
    {
      icon: "🔍",
      title: "Advanced Search",
      description:
        "Find movies quickly with our powerful search and filter system",
    },
  ];

  return (
    <div className="min-vh-100 text-light">
      {/* Hero Section */}
      <div className="position-relative  overflow-hidden">
        <div className="container py-5">
          <div className="row min-vh-50 align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className="display-3 fw-bold mb-4">
                  Welcome to <span className="text-red">MovieApp</span>
                </h1>
                <p className="lead mb-4">
                  Your ultimate destination for discovering, managing, and
                  enjoying movies. We're here to make your movie experience
                  extraordinary.
                </p>
                <Link to="/movies">
                  <SharedBtn>Start Exploring</SharedBtn>
                </Link>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1179/1179120.png"
                  alt="Movie App"
                  className="img-fluid"
                  style={{ maxWidth: "400px" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <h2 className="text-center mb-5">
            Why Choose <span className="text-red">MovieApp</span>?
          </h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}>
                <div className="feature-card h-100 p-4 rounded-4 border border-danger">
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <h3 className="h4 mb-3">{feature.title}</h3>
                  <p className="mb-0 text-white-50">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mission-card p-5 rounded-4 ">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                Our <span className="text-red">Mission</span>
              </h2>
              <p className="lead mb-4">
                At MovieApp, we're passionate about bringing the world of cinema
                closer to you. Our mission is to create the most intuitive and
                comprehensive movie management platform that helps you discover,
                organize, and enjoy movies like never before.
              </p>
              <p className="mb-0">
                We believe that everyone should have access to a powerful yet
                simple tool to enhance their movie-watching experience.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                  alt="Cinema"
                  className="object-fit-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="row g-4 text-center">
          <div className="col-md-4">
            <div className="stat-card p-4 bg-dark border border-danger rounded-4  ">
              <h3 className="display-4 text-red mb-2">10K+</h3>
              <p className="mb-0">Movies in Database</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card p-4 rounded-4 bg-dark border border-danger">
              <h3 className="display-4 text-red mb-2">5K+</h3>
              <p className="mb-0">Active Users</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card p-4 rounded-4 bg-dark border border-danger">
              <h3 className="display-4 text-red mb-2">50K+</h3>
              <p className="mb-0">Reviews Posted</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="cta-card p-5 rounded-4 text-center">
          <h2 className="mb-4">Ready to Start Your Movie Journey?</h2>
          <p className="lead mb-4">
            Join thousands of movie enthusiasts who are already using MovieApp
            to enhance their movie experience.
          </p>
          <Link to="/movies&shows">
            <SharedBtn>Get Started Now</SharedBtn>
          </Link>
        </motion.div>
      </div>

      <style>{`
        .hero-gradient {
          background: linear-gradient(45deg, #000000, #1a1a1a);
          opacity: 0.95;
        }

        .feature-card {
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 2.5rem;
        }

        

        .stat-card {
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }



        * {
          font-family: "Satoshi", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
