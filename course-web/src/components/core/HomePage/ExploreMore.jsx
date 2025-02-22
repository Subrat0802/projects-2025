import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className="pb-9">  
      <div className="text-center">
        <p className="text-3xl font-inter font-semibold">
          Unlock the <HighLightText value={"Power of Code"} />
        </p>
        <p className="text-richblack-500 text-sm mt-2">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
      <div>
        <div className="flex mt-10 bg-richblack-800 p-1  rounded-full justify-center items-center">
          {tabsName.map((el, i) => (
            <div
              className={`text-[16px] ${
                currentTab === el
                  ? "bg-richblack-900 text-richblack-5 font-medium rounded-full "
                  : "text-richblack-200"
              } transition-all duration-200 hover:bg-richblack-900 hover:rounded-full hover:cursor-pointer hover:scale-95 px-7 py-2`}
              key={i}
              onClick={() => setMyCard(el)}
            >
              {el}
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* {
            courses.map((el, i) => {
                return 
            })
        } */}
      </div>
    </div>
  );
};

export default ExploreMore;
