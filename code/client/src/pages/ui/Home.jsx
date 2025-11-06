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
      <section className="w-full h-full flex justify-center items-center">
        This is the home page
      </section>
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
