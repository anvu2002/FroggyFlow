'use client'

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { websiteName } from '@/config';
import { useInView } from 'react-intersection-observer';

const Page = () => {
    const router = useRouter();
    const [imageInViewRef1, imageInView1] = useInView({ triggerOnce: true });
    const [imageInViewRef2, imageInView2] = useInView({ triggerOnce: true });
    const [imageInViewRef3, imageInView3] = useInView({ triggerOnce: true });

    return (
        <div className='relative min-h-screen overflow-hidden'>
            <div 
                className='absolute inset-0 bg-cover bg-center flex justify-center items-center'
                style={{ backgroundImage: "url('/frog_background.png')", height: '100vh', backgroundPosition: 'center bottom' }}
            >
                <div className='text-center'>
                    <motion.h1
                        className='sm:text-6xl font-extrabold text-gray-800 text-5xl'
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: '#ffff66' }}>About FroggyFlow </span>
                    </motion.h1>
                    <motion.div
                        className="text-xl text-white mt-8 font-bp max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <p>
                            FroggyFlow is a study buddy for you to get stuff done!
                            FroggyFlow will make sure you maintain the most ergonomic posture when studying or working and remind you to take breaks!
                            It is recommended that you take breaks every 30 minutes in order to stay productive. Make sure to move around too!
                            During your rest you can play some active games with Froggy!
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Page;
