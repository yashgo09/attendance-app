import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <Header />
      <main className="error-page">
        <h1>Something Went Wrong!</h1>
        <i>{error.statusText || error.message}</i>
      </main>
    </>
  );
}

export default ErrorPage;
