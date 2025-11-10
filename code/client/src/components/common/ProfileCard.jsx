import React from "react";

function ProfileCard({ styles, children }) {
  return (
    <div
      className={`bg-white p-5 flex justify-center items-center w-72 h-52 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 sm:h-66 lg:h-70 sm:w-80 lg:w-95 ${styles}`}
    >
      {children}
    </div>
  );
}

export default ProfileCard;
