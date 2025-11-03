import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/index.components";

function Home() {
  return (
    <>
      <section className="w-full h-full flex justify-center items-center">
        This is the home page
      </section>
      <Button content={"Register"} />
      <Button content={"Log in"} />
    </>
  );
}

export default Home;
