/* ---------------------------------------------------------------------------
ProfilePic.jsx
This is a common profile pic component for displaying the profile pic of the user (or a dummy image if the user hasn't uploaded any profile)
------------------------------------------------------------------------------ */

import { useDispatch } from "react-redux";
import { getUser } from "../../features/index.features";
import { useEffect } from "react";
import useConditionalRendering from "../../hooks/useConditionalRendering";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

function ProfilePic({
  dummyDimensions, // width and height of the dummy image
  dummyStyles,
  profileStyles,
  title = "profile pic",
}) {
  // get the user information for fetching the profile pic
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useConditionalRendering("users");

  return (
    <>
      {/* If the pic exists, display it or display a dummy image */}
      {user?.message?.profilePic === "" ? (
        <div
          className={`flex justify-center items-center rounded-full ${dummyStyles}`}
        >
          <FontAwesomeIcon
            icon={faUserTie}
            style={{ color: "oklch(37.9% 0.146 265.522)" }}
            className={dummyDimensions}
          />
        </div>
      ) : (
        <img
          src={`${user?.message?.profilePic}`}
          alt="Profile"
          title={title}
          className={profileStyles}
        />
      )}
    </>
  );
}

export default ProfilePic;
