/* ---------------------------------------------------------------------------
AuthCard.jsx
This is the form for every input values
------------------------------------------------------------------------------ */

import React from "react";

function AuthCard({ children, onSubmit, styles = "" }) {
  return (
    <form
      className={` ${styles} flex flex-col justify-center items-center px-2 py-5 gap-2 shadow-2xl w-76 rounded-lg bg-white`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthCard;
