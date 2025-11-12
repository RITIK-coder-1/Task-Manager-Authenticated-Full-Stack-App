/* ---------------------------------------------------------------------------
Profile.jsx
This is the profile section of the user. The user can delete their profile here. 
------------------------------------------------------------------------------ */

import {
  Button,
  MainSection,
  ProfileCard,
  ProfilePic,
} from "../../components/index.components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useConditionalRendering } from "../../hooks/index.hooks.js";

function Profile() {
  // As the details of the user have already been fetched by the header, I don't need to do it again
  const { user } = useConditionalRendering("users");

  const userDetails = () => {
    return (
      // The main section
      <MainSection styles="pt-20 pb-3">
        {/* Only if the user is authenticated */}
        {user ? (
          <section className="w-full h-full flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold text-blue-950 tracking-wide mb-2 sm:text-5xl sm:ml-10 md:ml-20">
              My Profile
            </h1>
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 sm:flex-row">
              {/* The profile image */}
              <ProfileCard>
                <ProfilePic
                  profileStyles={"w-36 h-36 rounded-full"}
                  dummyStyles={"w-36 h-36 border border-blue-900"}
                  dummyDimensions={"text-5xl"}
                />
                <div className="w-34 h-36 absolute flex justify-end items-end">
                  <Link
                    to={"/users/me/appearance"}
                    className="flex justify-center items-center bg-blue-900 w-8 h-8 rounded-full border border-gray-800 shadow-md absolute hover:bg-blue-950 transition-all duration-200"
                    title="update pic"
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white text-sm"
                    />
                  </Link>
                </div>
              </ProfileCard>

              {/* The details section */}
              <ProfileCard styles="flex-col gap-5">
                <div className="flex flex-col items-start justify-center text-center gap-1">
                  <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">
                    {`${user?.fullName?.firstName} ${user?.fullName?.lastName}`}
                  </h2>
                  <h5 className="text-sm text-gray-600 sm:text-md lg:text-lg">
                    {user?.email}
                  </h5>
                  <h5 className="text-xs text-gray-500 italic sm:text-sm lg:text-md">
                    @{user?.username}
                  </h5>
                </div>

                {/*  ----------------------------------------------------------------------------------
              The links to update the profile
              ---------------------------------------------------------------------------------- */}
                <div className="flex flex-col gap-3">
                  <Link to={"/users/me/details"} className="cursor-pointer">
                    <Button
                      content={"Update Details"}
                      styles="rounded-2xl text-sm p-5 font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 sm:p-6 sm:text-lg lg:text-xl lg:p-7"
                      bgColor="bg-blue-900 hover:bg-blue-950"
                      width="w-55 sm:w-66 lg:w-70"
                    />
                  </Link>
                  <Link to={"/users/me/password"} className="cursor-pointer">
                    <Button
                      content={"Change Password"}
                      styles="rounded-2xl text-sm p-5 font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 sm:p-6 sm:text-lg lg:text-xl lg:p-7"
                      bgColor="bg-blue-950 hover:bg-blue-900"
                      width="w-55 sm:w-66 lg:w-70"
                    />
                  </Link>
                </div>
              </ProfileCard>
            </div>
          </section>
        ) : (
          <span className="text-xl italic text-center sm:ml-15">
            You're unauthorized!
          </span>
        )}
      </MainSection>
    );
  };

  return <>{userDetails()}</>;
}

export default Profile;
