import React from "react";

function ProfileCard({
  styles,
  children,
  dimensions = "w-72 h-52 sm:h-66 lg:h-70 sm:w-80 lg:w-95",
}) {
  return (
    <div
      className={`bg-white p-5 flex justify-center items-center  rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${styles} ${dimensions}`}
    >
      {children}
    </div>
  );
}

export default ProfileCard;
