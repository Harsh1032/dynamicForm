import React, { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FormDashboard from "./FormDashboard";

const Hero = () => {
  return (
    <div className="w-full mt-5 flex flex-col">
      <MaxWidthWrapper>
        <div className="flex justify-center items-center gap-4">
          <img src="./user.png" alt="user image" className="size-12" />
          <span className="font-semibold text-2xl">John Doe</span>
        </div>
        <FormDashboard/>
      </MaxWidthWrapper>
    </div>
  );
};

export default Hero;
