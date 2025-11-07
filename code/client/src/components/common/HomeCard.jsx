/* ---------------------------------------------------------------------------
HomeCard.jsx
This is the card that is going to be displayed on the landing page
------------------------------------------------------------------------------ */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "./Button";

function HomeCard({ icon, heading, desc, styles = "gap-3" }) {
  return (
    <div
      className={`w-36 h-44 rounded-lg flex flex-col justify-center items-center bg-white shadow-xl ${styles}`}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ color: "oklch(37.9% 0.146 265.522)" }}
      />
      <div className="flex flex-col justify-center items-center">
        <h5 className="text-lg text-center">{heading}</h5>
        <span className="text-sm font-extralight text-center text-gray-700">
          {desc}
        </span>
      </div>
      <Link to={"/users/register"}>
        <Button
          content={"Start Tracking"}
          styles="bg-blue-900 text-[10px] w-22"
        />
      </Link>
    </div>
  );
}

export default HomeCard;
