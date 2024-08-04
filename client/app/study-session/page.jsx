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

    const handleButtonClick = () => {
        // Add your navigation or action logic here
        router.push('/profile');
    }

    return (
        <div className='relative min-h-screen overflow-hidden'>
            <div 
                className='absolute inset-0 bg-cover bg-center flex justify-center items-center'
                style={{ backgroundImage: "url('/frog_background.png')", height: '100vh', backgroundPosition: 'center bottom' }}
            >
                <div className='text-center'>
                    <motion.h1
                        className='sm:text-6xl font-extrabold text-gray-800 text-5xl'
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: '#ffff66' }}>INSERT TIMER HERE </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-white mt-8 font-bp"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        You'll be reminded to take breaks every 30 minutes!
                    </motion.p>
                    <motion.button
                        className="mt-8 px-6 py-3 text-lg font-semibold text-sky-950 bg-green-300 rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        onClick={handleButtonClick}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        End session
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Page;
