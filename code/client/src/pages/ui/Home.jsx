/* ---------------------------------------------------------------------------
Home.jsx
This is the landing page where unauthenticated users land. It navigates to the register and login pages
------------------------------------------------------------------------------ */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/index.components";
import { HomeCard } from "../../components/index.components";
import { useCards } from "../../hooks/index.hooks.js";
import { MainSection } from "../../components/index.components";
import { useDispatch } from "react-redux";
import { resetAuthNav } from "../../features/authSlice.js";

function Home() {
  // for safety, I'm resetting the auth navigation status to "idle" as soon as the homepage loads so that the auth navigation success after logging out has no effect to the login and register pages. The login and register pages won't re-direct to the homepage.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAuthNav());
  }, [dispatch]);

  const homeCards = useCards(); // importing the component cards

  return (
    <>
      {/* The main section */}
      <MainSection styles="pt-10 justify-center">
        {/* The heading of the homepage */}
        <section className="flex flex-col w-full justify-center items-center text-center gap-2 px-2 ">
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
          {homeCards.map((card) => (
            <HomeCard
              icon={card.icon}
              styles={card.styles}
              heading={card.heading}
              desc={card.desc}
              key={card.heading}
            />
          ))}
        </section>

        {/* The registeration section */}
        <section className="flex flex-wrap justify-center items-center w-full gap-6 sm:gap-8 md:gap-10 p-4 xl:pt-10">
          <Link to={"/users/register"}>
            <Button content={"Register"} />
          </Link>
          <Link to={"/users/login"}>
            <Button
              content={"Log in"}
              bgColor="bg-gray-700 hover:bg-gray-800"
            />
          </Link>
        </section>
      </MainSection>

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
