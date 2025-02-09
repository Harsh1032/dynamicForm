import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { ArrowLeftIcon, Menu } from 'lucide-react';

const MenuPreConsultation = () => {
  return (
    <div className='mt-10 w-full'>
        <MaxWidthWrapper>
            <div className='flex items-center h-10 gap-8'>
                <Menu className='lg:size-10 size-6 text-[#006838] bg-white shadow-lg rounded-full p-2'/>
                <img src="/preConsultation.png" alt="pre-consultation" className='lg:w-auto w-64'/>
            </div>
            <ArrowLeftIcon className='lg:size-10 size-6 text-[#59A52C] bg-white shadow-lg rounded-full p-2 mt-16'/>
        </MaxWidthWrapper>
    </div>
  )
}

export default MenuPreConsultation