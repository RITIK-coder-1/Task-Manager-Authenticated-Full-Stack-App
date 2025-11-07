/* ---------------------------------------------------------------------------
useCards.jsx
This hook provides the details of the card components displayed on the homepage
------------------------------------------------------------------------------ */

import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

function useCards() {
  return [
    {
      icon: faListCheck,
      heading: "Daily Tasks",
      desc: "Add daily tasks and goals",
    },
    {
      icon: faCalendarWeek,
      heading: "Weekly Habits",
      desc: "Track your weekly habits",
      styles: "py-1",
    },
    {
      icon: faThumbsUp,
      heading: "Productivity",
      desc: "Minimal Viable Productivity",
    },
    {
      icon: faDisplay,
      heading: "Deep Work",
      desc: "Track focused work sessions",
    },
    {
      icon: faCheck,
      heading: "Anchor Habits",
      desc: "Complete all the important tasks",
      styles: "py-1",
    },
    {
      icon: faDumbbell,
      heading: "Health",
      desc: "Monitor daily steps and water intake",
    },
  ];
}

export default useCards;
