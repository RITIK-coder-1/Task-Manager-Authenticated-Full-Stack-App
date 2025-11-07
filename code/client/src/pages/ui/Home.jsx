/* ---------------------------------------------------------------------------
Home.jsx
This is the landing page where unauthenticated users land. It navigates to the register and login pages
------------------------------------------------------------------------------ */

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/index.components";
import { HomeCard } from "../../components/index.components";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center bg-[#F7F7FA]">
        {/* The heading of the homepage */}
        <section className="flex flex-col pt-2 border w-full justify-center items-center text-sm gap-1">
          <h1 className="font-sans font-extrabold text-5xl flex flex-col justify-center items-center">
            <span>Task & Habit</span>
            <span>Tracker</span>
          </h1>
          <h3 className="text-[13px] font-sans text-gray-900 font-semibold">
            Simplify Your Routine
          </h3>
        </section>

        {/* The body of the homepage */}
        <section className="border w-full flex flex-col items-center justify-center font-semibold">
          {/* THE CARD COMPONENTS */}

          {/* The first card (Daily Tasks) */}
          <HomeCard
            icon={faDisplay}
            heading={"Daily Tasks"}
            desc={"Add daily tasks and goals"}
          />

          {/* The second card (Weekly Habits) */}
          <HomeCard
            icon={faDisplay}
            heading={"Weekly Habits"}
            desc={"Add daily tasks and goals"}
          />

          {/* The third card (Minimum Viable Productivity) */}
          <HomeCard
            icon={faDisplay}
            heading={"Min Productivity"}
            desc={"Add daily tasks and goals"}
          />

          {/* The fourth card (Deep work sessoins) */}
          <HomeCard
            icon={faDisplay}
            heading={"Deep work sessoins"}
            desc={"Add daily tasks and goals"}
          />

          {/* The fifth card (Anchor habits) */}
          <HomeCard
            icon={faDisplay}
            heading={"Anchor habits"}
            desc={"Add daily tasks and goals"}
          />

          {/* The sixth card (Health and Movement) */}
          <HomeCard
            icon={faDisplay}
            heading={"Health and Movement"}
            desc={"Add daily tasks and goals"}
          />
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
