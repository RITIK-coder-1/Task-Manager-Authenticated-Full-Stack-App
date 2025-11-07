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
      <main className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-gray-100 to-gray-200 py-10 px-2 transition-all duration-300">
        {/* The heading of the homepage */}
        <section className="flex flex-col w-full justify-center items-center text-center gap-2 px-2 mb-8">
          <h1 className="font-sans font-extrabold flex flex-col justify-center items-center text-5xl sm:text-7xl md:text-8xl xl:text-9xl text-gray-900 leading-tight drop-shadow-sm">
            <span>Task & Habit</span>
            <span>Tracker</span>
          </h1>
          <h3 className="font-sans text-gray-700 font-semibold text-[13px] sm:text-lg md:text-xl tracking-wide">
            Simplify Your Routine
          </h3>
        </section>

        {/* The body of the homepage */}
        <section className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 xl:gap-12 font-semibold py-6 px-3 transition-all duration-300">
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
        <section className="flex flex-wrap justify-center items-center w-full gap-6 sm:gap-8 md:gap-10 p-4 xl:pt-10">
          <Link to={"/users/register"}>
            <Button
              content={"Register"}
              styles="p-5 w-40 text-lg sm:w-56 sm:text-2xl sm:p-6 md:w-64 md:p-7 md:text-3xl lg:w-72 lg:p-8 lg:text-4xl bg-blue-900 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            />
          </Link>
          <Link to={"/users/login"}>
            <Button
              content={"Log in"}
              styles="p-5 w-40 text-lg sm:w-56 sm:text-2xl sm:p-6 md:w-64 md:p-7 md:text-3xl lg:w-72 lg:p-8 lg:text-4xl bg-gray-700 hover:bg-gray-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            />
          </Link>
        </section>
      </main>

      {/* The footer slogan */}
      <footer className="flex justify-center items-center gap-6 bg-gray-200 w-full py-6 text-gray-700 sm:text-lg md:text-xl lg:text-2xl tracking-wide uppercase font-medium border-t border-gray-300">
        <span className="hover:text-gray-900 transition-colors duration-300">
          Track
        </span>
        <span className="hover:text-gray-900 transition-colors duration-300">
          Achieve
        </span>
        <span className="hover:text-gray-900 transition-colors duration-300">
          Repeat
        </span>
      </footer>
    </>
  );
}

export default Home;
