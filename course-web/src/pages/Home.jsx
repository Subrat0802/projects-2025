import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import BannerVideo from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import BecomeInstructor from "../components/core/HomePage/BecomeInstructor";
import ReviewsFromLearner from "../components/core/HomePage/ReviewsFromLearner";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div className="pb-32">
      {/* //sectionone */}
      <div className=" mx-auto max-w-maxContent flex flex-col w-11/12 border items-center text-white">
        <Link to={"/signup"}>
          <div className="group mt-16 mx-auto hover:scale-95 w-fit p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 ">
            <div className="flex gap-2 justify-center items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="flex text-center text-2xl font-semibold mt-7 md:text-4xl">
          Empower Your Future with
          <HighLightText value={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-4 mt-6 ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="w-11/12 mx-auto mt-12 shadow-blue-200">
          <video muted loop autoPlay src={BannerVideo} />
        </div>

        {/* code sction one  */}
        <div className="w-11/12">
          <CodeBlocks
            postion={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighLightText value={"Coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                            <html>
                            head><title>Example</title><linkrel="stylesheet"href="styles.css">
                            /head>
                            body>
                            h1><ahref="/">Header</a>
                            /h1>
                            nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                            /nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code sction two  */}
        <div className="w-11/12 ">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighLightText value={"Coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                            <html>
                            head><title>Example</title><linkrel="stylesheet"href="styles.css">
                            /head>
                            body>
                            h1><ahref="/">Header</a>
                            /h1>
                            nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                            /nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>
        <ExploreMore />
      </div>

      {/* section two  */}
      <div className="bg-pure-greys-5 flex flex-col justify-center items-center text-richblack-700">
        {/*part one  */}
        <div className="homepage_bg h-[333px] w-full flex items-center justify-center">
          <div className="flex flex-row gap-7 text-white mt-14 ">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Explore Full Calatalog
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={false} linkto={"/signup"}>
              <div className="flex items-center gap-3">Learn More</div>
            </CTAButton>
          </div>
        </div>

        {/*part two  */}
        <div className="flex justify-center items-center border w-9/12 py-[100px]">
          <div className="flex w-full gap-14 flex-col sm:flex-row">
            <div className="flex sm:w-[50%]">
              <p className="text-3xl font-inter font-semibold">
                Get the skills you need for a{" "}
                <HighLightText value={"job that is in demand."} />
              </p>
            </div>
            <div className="flex flex-col sm:w-[50%]">
              <div>
                <p className="text-lg mb-5 font-inter">
                  The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </p>
                <div className="flex">
                  <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* part three  */}
        <TimeLineSection />

        {/* part four  */}
        <LearningLanguageSection />
      </div>

      {/* section three  */}
      <div>
        <BecomeInstructor />
      </div>

      {/* reviews from learners section four  */}
      <div>
        <ReviewsFromLearner />
      </div>
      
    </div>
  );
};

export default Home;
