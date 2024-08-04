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
                style={{ backgroundImage: "url('/profile_bg.png')", height: '100vh', backgroundPosition: 'center bottom' }}
            >
                <div className='text-center'>
                    <motion.h1
                        className='sm:text-6xl font-extrabold text-gray-800 text-5xl'
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: '#ffff66' }}>Froggy Princess </span>
                    </motion.h1>
                    <motion.div
                        className="text-xl text-white mt-8 font-bp max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <p>
                            Your profile data here
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Page;
