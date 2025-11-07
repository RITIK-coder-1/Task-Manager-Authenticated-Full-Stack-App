/* ---------------------------------------------------------------------------
Home.jsx
This is the landing page where unauthenticated users land. It navigates to the register and login pages
------------------------------------------------------------------------------ */

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/index.components";
import { HomeCard } from "../../components/index.components";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <>
      {/* The main section */}
      <main className="w-full h-full flex flex-col justify-center items-center bg-gray-200 py-5">
        {/* The heading of the homepage */}
        <section className="flex flex-col w-full justify-center items-center text-sm gap-1 px-1">
          <h1 className="font-sans font-extrabold flex flex-col justify-center items-center text-5xl sm:text-7xl md:text-8xl xl:text-10xl">
            <span>Task & Habit</span>
            <span>Tracker</span>
          </h1>
          <h3 className="font-sans text-gray-900 font-semibold text-[13px] sm:text-lg md:text-xl">
            Simplify Your Routine
          </h3>
        </section>

        {/* The body of the homepage */}
        <section className="w-full flex flex-wrap items-center justify-center gap-5 font-semibold py-4 px-1 sm:px-3 xl:gap-10">
          {/* THE CARD COMPONENTS */}

          {/* The first card (Daily Tasks) */}
          <HomeCard
            icon={faListCheck}
            heading={"Daily Tasks"}
            desc={"Add daily tasks and goals"}
          />

          {/* The second card (Weekly Habits) */}
          <HomeCard
            icon={faCalendarWeek}
            heading={"Weekly Habits"}
            desc={"Track your weekly habits"}
            styles="py-1"
          />

          {/* The third card (Minimum Viable Productivity) */}
          <HomeCard
            icon={faThumbsUp}
            heading={"Productivity"}
            desc={"Minimal Viable Productivity"}
          />

          {/* The fourth card (Deep work sessions) */}
          <HomeCard
            icon={faDisplay}
            heading={"Deep Work"}
            desc={"Track focused work sessions"}
          />

          {/* The fifth card (Anchor habits) */}
          <HomeCard
            icon={faCheck}
            heading={"Anchor Habits"}
            desc={"Complete all the important tasks"}
            styles="py-1"
          />

          {/* The sixth card (Health and Movement) */}
          <HomeCard
            icon={faDumbbell}
            heading={"Health"}
            desc={"Monitor daily steps and water intake"}
          />
        </section>

        {/* The registeration section */}
        <section className="flex justify-center items-center w-full gap-5 p-2 xl:pt-6">
          <Link to={"/users/register"}>
            <Button
              content={"Register"}
              styles="p-5 w-40 text-lg sm:w-56 sm:text-2xl sm:p-6 md:w-64 md:p-7 md:text-3xl lg:w-72 md:p-8 md:text-4xl duration-150"
            />
          </Link>
          <Link to={"/users/login"}>
            <Button
              content={"Log in"}
              styles="p-5 w-40 text-lg sm:w-56 sm:text-2xl sm:p-6 md:w-64 md:p-7 md:text-3xl lg:w-72 md:p-8 md:text-4xl"
            />
          </Link>
        </section>
      </main>

      {/* The footer slogan */}
      <footer className="flex justify-center items-center gap-4 bg-gray-200 w-full pb-5 text-gray-700 sm:text-lg md:text-xl lg:text-2xl">
        <span>Track</span>
        <span>Achieve</span>
        <span>Repeat</span>
      </footer>
    </>
  );
}

export default Home;
