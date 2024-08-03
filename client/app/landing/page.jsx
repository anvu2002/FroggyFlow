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
                    <div className='w-full flex justify-center items-center flex-col'>
                        <motion.h1
                            className='sm:text-6xl font-extrabold mt-20 text-gray-800 text-5xl'
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <span style={{ color: '#023D54' }}>Hop, </span>
                            <span style={{ color: '#029588 ' }}>Hopping, </span>
                            <span style={{ color: '#94DEA5' }}>Harmonize with Your Works.</span>
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 mt-8"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {websiteName} is your Number One Work and Study Partner!
                        </motion.p>
                        <motion.button
                            onClick={() => router.push('/register')}
                            className={`bg-primary-color text-white hover:bg-opacity-90 px-8 py-3 rounded-lg mt-10 font-semibold text-xl shadow-xl flex items-center`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            Get Started&nbsp;<span className="text-sm text-gray-300"> {`- It's free`}</span>
                        </motion.button>
                    </div>
                    <div className='flex justify-center items-center mt-8 rounded-md'>
                        <motion.div
                            className='w-[1100px]'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.5 }}
                        >
                            <img src='/frog_background.png' className='rounded-xl shadow-lg' />
                        </motion.div>
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
