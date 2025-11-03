import React from "react";

function AuthCard({ children, onSubmit, styles = "" }) {
  return (
    <form
      className={`flex flex-col justify-center items-start p-2 gap-2 ${styles}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthCard;
