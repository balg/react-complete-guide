import React from "react";
import Link from "next/link";

const ErrorPage = () => (
  <div>
    <h1>Oops.</h1>
    <p>
      Try{" "}
      <Link href="/">
        <a>going back</a>
      </Link>
    </p>
  </div>
);

export default ErrorPage;
