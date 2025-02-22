import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully commited to success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Fully commited to success company",
  },
  {
    logo: Logo3,
    heading: "Leadership",
    description: "Fully commited to success company",
  },
  {
    logo: Logo4,
    heading: "Leadership",
    description: "Fully commited to success company",
  },
];

const TimeLineSection = () => {
  return (
    <div className="md:w-9/12  flex justify-between items-center flex-col gap-12 md:gap-0 md:flex-row w-full mb-10">
      <div className=" flex flex-col gap-6 justify-center -mt-16 w-full md:w-[40%]">
        {timeLine.map((el, i) => (
          <div key={i} className="flex gap-4 font-inter items-center">
            <div className="bg-[#ebebeb] w-14 h-14 flex justify-center items-center rounded-full">
              <img src={el.logo} />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">{el.heading}</p>
              <p className="text-pure-greys-500 text-md">{el.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[60%] px-7 md:px-0  ">
        <div className="w-full">
          <img className="w-full" src={timeLineImage} />
          <div className="relative bottom-8 w-[80%]  flex flex-row bg-caribbeangreen-600 mx-auto text-white uppercase px-20 gap-5 py-10">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 pr-5">
                <p className="text-xxl font-bold hidden  md:text-3xl sm:block">10</p>
                <p className="text-caribbeangreen-300   text-[12px] hidden sm:block">Years of Experince</p>
            </div>

            <div className="flex flex-row gap-5 items-center justify-center">
                <p className="text-xl md:text-3xl font-bold">250</p>
                <p className="text-caribbeangreen-300 text-[12px]">type of Courses</p>
            </div>

          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TimeLineSection;
