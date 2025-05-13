import React from "react";
import "./footer.css";
export default function Footer() {
  return (
    <footer className="text-center text-lg-start text-white py-3">
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Home</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#e3080f", height: 2 }}
              />

              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Categories
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Devices
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Pricing
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  FAQ
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Movies</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#e3080f", height: 2 }}
              />

              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Gernes
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Trending
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  New Release
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Popular
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Shows</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#e3080f", height: 2 }}
              />

              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Gernes
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Trending
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  New Release
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Popular
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Support</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#e3080f", height: 2 }}
              />

              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Contact Us
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Subscription</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#e3080f", height: 2 }}
              />
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Plans
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-white opacity-75 text-decoration-none">
                  Features
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Connect With Us</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#e3080f", height: 2 }}
              />
              <div className="d-flex social-links gap-2 justify-content-center align-items-center">
                <a
                  href="#"
                  className="text-white bg-dark py-2 px-3 rounded-3  text-decoration-none">
                  <i className="bi bi-facebook fs-4"></i>
                </a>
                <a
                  href="#"
                  className="text-white  bg-dark py-2 px-3 rounded-3  text-decoration-none">
                  <i className="bi bi-twitter fs-4"></i>
                </a>
                <a
                  href="#"
                  className="text-white bg-dark py-2 px-3 rounded-3 text-decoration-none">
                  <i className="bi bi-linkedin fs-4"></i>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="terms text-center text-md-start d-flex flex-wrap  justify-content-center justify-content-md-between align-items-center">
            <p className="opacity-75">© 2025 Movie App, All Rights Reserved.</p>
            <ul className="list-unstyled d-flex gap-2 gap-md-4 ">
              <li>
                <a
                  href="#"
                  className="text-white opacity-75 text-decoration-none">
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-75 text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-75 text-decoration-none">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}
