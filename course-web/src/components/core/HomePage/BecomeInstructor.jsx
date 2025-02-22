import React from "react";
import instructorImg from "../../../assets/Images/Instructor.png";
import HighLightText from "./HighLightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const BecomeInstructor = () => {
  return (
    <div className="w-9/12 mx-auto sm:flex-row flex-col text-white flex pt-20">
      <div className="sm:w-[40%] ">
        <img src={instructorImg} />
      </div>
      <div className="sm:w-[60%] mt-10 sm:mt-0 flex justify-center items-center">
        <div className="w-[70%]">
          <p className="text-4xl">
            Become an <br /> <HighLightText value={"instructor"} />
          </p>{" "}
          <p className="text-pure-greys-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="flex mt-4">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex justify-center items-center gap-2">
              Start teaching Today <FaArrowRight />
            </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
