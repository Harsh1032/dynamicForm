import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <nav className="z-[100] h-24 inset-x-0 top-0 w-full bg-transparent transition-all">
      <MaxWidthWrapper>
        <div className="flex h-24 items-center justify-between">
          <img
            src="/Layer_1.png"
            alt="company logo"
            className="lg:w-56 w-40 lg:h-14 h-11"
          />
          <div className="h-full flex items-center lg:w-64 gap-4 w-44">
            <span className="text-[#04A118] w-auto lg:h-6 h-4">Home</span>
            <span className="text-[#04A118] w-auto lg:h-6 h-4 mr-2">Settings</span>
            <img src="/user.png" alt="user image" />
            <img src="/location.png" alt="location image" />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
