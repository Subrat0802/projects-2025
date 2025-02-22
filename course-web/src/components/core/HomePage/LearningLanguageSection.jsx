import React from 'react'
import HighLightText from './HighLightText'
import cal1 from"../../../assets/Images/Know_your_progress.png"
import cal2 from"../../../assets/Images/Compare_with_others.png"
import cal3 from"../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='w-9/12  p-5 flex flex-col justify-center items-center py-10'>
        <div className='text-center sm:w-[58%]'>
            <p className='text-3xl font-inter mb-2 font-bold'>Your swiss knife for <HighLightText value={"learning any language"}/></p>
            <p className='text-pure-greys-300 text-sm'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
        <div className='flex mt-14'>
            <img className='absolute left-44' src={cal1}/>
            <img className='absolute right-[120px]' src={cal3}/>
            <img  src={cal2}/>
        </div>
        <div className='mt-9'>
            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection