'use client'
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { websiteName } from '@/config';
import { useInView } from 'react-intersection-observer';

const Page = () => {
    return (
        <>
            <div 
                className='h-full-minus-navbar mt-[66px] text-center sm:mx-32 mx-10'
                style={{ backgroundImage: "url('/frog_background.png')", backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
            >
                <div className='flex justify-center items-center h-[70%]'>
                    <div className='w-full'>
                        <div className='w-full flex justify-center items-center flex-col'>
                            <motion.h1
                                className='sm:text-5xl font-extrabold text-gray-800 text-5xl'
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                Say Hello to your study bestie FroggyFlow!
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 mt-8"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                FroggyFlow is a study buddy for you to get stuff done!
                                FroggyFlow will make sure you maintain the most ergonomic posture when studying or working and remind you to take breaks!
                                It is recommended that you take breaks every 30 minutes in order to stay productive. Make sure to move around too!
                                During your rest time you can play some active games with Froggy!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page;
