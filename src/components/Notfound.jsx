/** @format */

import React from "react";
import errorSvg from "../assets/404 error with a tired person-bro.svg";

export default function Notfound() {
  return (
    <main className="not-found mt-5">
      <img className="w-100" src={errorSvg} alt="404 Error - Page Not Found" />
    </main>
  );
}
