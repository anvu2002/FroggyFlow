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
        <div className='relative min-h-screen overflow-hidden pt-16'>
            <div 
                className='absolute inset-0 bg-cover bg-center flex justify-center items-center'
                style={{ backgroundImage: "url('/profile_bg.png')", height: '100vh', backgroundPosition: 'center bottom' }}
            >
                <div className='text-center'>
                    {/* <motion.h1
                        className='sm:text-6xl font-extrabold text-gray-800 text-5xl'
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: '#ffff66' }}>Froggy Princess</span>
                    </motion.h1> */}
                    {/* <motion.div
                        className="text-xl text-white mt-8 font-bp max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <p>
                            Your profile data here
                        </p>
                    </motion.div> */}
                </div>
            </div>

            <div className='absolute bottom-0 right-0 m-4 p-4 bg-white bg-opacity-20 shadow-lg rounded-lg' style={{ width: 'calc(50% - 50px)', height: 'calc(60% - 50px)' }}>
                <motion.img
                    ref={imageInViewRef1}
                    src="/graph.png"
                    alt="Graph"
                    className='w-full h-full object-contain'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageInView1 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className='absolute bottom-0 left-0 m-4 p-4 bg-white bg-opacity-20 shadow-lg rounded-lg' style={{ width: 'calc(50% - 50px)', height: 'calc(60% - 50px)' }}>
                <motion.img
                    ref={imageInViewRef2}
                    src="/logs.png"
                    alt="Logs"
                    className='w-full h-full object-contain'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageInView2 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className='absolute top-16 left-0 m-4 p-4 w-full h-1/4'>
                <motion.div
                    ref={imageInViewRef3}
                    className='flex flex-col items-center h-full justify-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageInView3 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src="/frog_profile.png"
                        alt="Profile Picture"
                        className='w-32 h-32 rounded-full mb-4'
                    />
                    <p className='text-xl font-bold text-yellow-200 text-5xl'>Minh Vu</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Page;
