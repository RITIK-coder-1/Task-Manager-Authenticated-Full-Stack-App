/* ---------------------------------------------------------------------------
MainSection.jsx
This reuses the main section that is used across all the pages
------------------------------------------------------------------------------ */

import React from "react";

function MainSection({ children }) {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-gray-100 to-gray-200 pt-10 px-2 transition-all duration-300">
      {children}
    </main>
  );
}

export default MainSection;
