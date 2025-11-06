/* ---------------------------------------------------------------------------
Home.jsx
This is the landing page where unauthenticated users land. It navigates to the register and login pages
------------------------------------------------------------------------------ */

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/index.components";

function Home() {
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center bg-gray-200">
        {/* The heading of the homepage */}
        <section className="flex flex-col pt-2 border w-full justify-center items-center text-sm">
          <h1 className="font-sans font-extrabold text-5xl flex flex-col justify-center items-center">
            <span>Task & Habit</span>
            <span>Tracker</span>
          </h1>
          <h3 className="text-[13px]">Simplify Your Routine</h3>
        </section>

        {/* The body of the homepage */}
        <section className="border w-full flex flex-col items-center justify-center">
          <div className="border w-36 bg-white">hey</div>
        </section>
      </main>
      <Link to={"/users/register"}>
        <Button content={"Register"} />
      </Link>
      <Link to={"/users/login"}>
        <Button content={"Log in"} />
      </Link>
    </>
  );
}

export default Home;
