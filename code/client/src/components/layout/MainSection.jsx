/* ---------------------------------------------------------------------------
MainSection.jsx
This reuses the main section that is used across all the pages
------------------------------------------------------------------------------ */

function MainSection({ children, styles = "" }) {
  return (
    <main
      className={`w-full min-h-screen flex flex-col items-center bg-linear-to-b from-gray-100 to-gray-200 px-2 transition-all duration-300 ${styles}`}
      id="main-container"
    >
      {children}
    </main>
  );
}

export default MainSection;
