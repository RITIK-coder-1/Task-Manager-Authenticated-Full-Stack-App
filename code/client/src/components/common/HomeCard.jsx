/* ---------------------------------------------------------------------------
HomeCard.jsx
This is the card that is going to be displayed on the landing page
------------------------------------------------------------------------------ */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "./Button";

function HomeCard({ icon, heading, desc, styles = "" }) {
  return (
    <div
      className={`rounded-lg flex flex-col justify-center items-center bg-white shadow-xl px-2 w-36 h-44 gap-3  sm:w-48 sm:h-56 sm:gap-5 md:w-56 md:h-64 md:gap-7 lg:w-66 lg:h-74 ${styles}`}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ color: "oklch(37.9% 0.146 265.522)" }}
      />
      <div className="flex flex-col justify-center items-center">
        <h5 className="text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl">
          {heading}
        </h5>
        <span className="font-extralight text-center text-gray-700 text-sm sm:text-md lg:text-lg">
          {desc}
        </span>
      </div>
      <Link to={"/users/register"}>
        <Button
          content={"Start Tracking"}
          styles="bg-blue-900 hover:bg-blue-800 text-[10px] w-22 sm:text-[14px] sm:w-36 sm:py-4 md:w-40 md:py-5 md:text-[16px] md:w-48 md:py-6 md:text-[18px]"
        />
      </Link>
    </div>
  );
}

export default HomeCard;
