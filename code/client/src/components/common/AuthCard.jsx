import React from "react";

function AuthCard({ children, onSubmit, styles = "" }) {
  return (
    <form
      className={` ${styles} flex flex-col justify-center p-2 gap-2`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthCard;
