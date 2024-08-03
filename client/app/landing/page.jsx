'use client'

import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { websiteName } from '@/config';
import { useInView } from 'react-intersection-observer';
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Page = () => {
    const router = useRouter();
    const [imageInViewRef1, imageInView1] = useInView({ triggerOnce: true });
    const [imageInViewRef2, imageInView2] = useInView({ triggerOnce: true });
    const [imageInViewRef3, imageInView3] = useInView({ triggerOnce: true });

    return (
        <div className='min-h-full-minus-navbar mt-[66px] text-center'>
            <div className='justify-center items-center'>
                <div className='w-full'>
                    
                    <div className='flex items-center mt-8'>
                       
                        <img src='/frog_background.png' className='shadow-lg' />
                      
                    </div>
                    <div className='mt-24'>
                        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className='text-gray-500 sm:text-lg text-xl font-bold sm:px-0 px-5'>Built by developers from around the world!</motion.div>
                        <div className='relative overflow-hidden w-[75vw] mx-auto'>
                            <div className='absolute top-0 left-0 w-10 h-[100%] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none'></div>
                            <div className='absolute top-0 right-0 w-10 h-[100%] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none'></div>
                            <Marquee className='relative z-0'>
                                <img src='/uot.png' className='w-60 mr-10'/>
                                <img src='/waterloo.png' className='w-40 mr-10'/>
                                <img src='/fanshawe.png' className='w-40 mr-10'/>
                                <img src='/ubc.png' className='w-44 mr-10'/>
                                <img src='/rbc.png' className='w-36 mr-10'/>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;
