'use client'
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { websiteName } from '@/config';
import { useInView } from 'react-intersection-observer';

const Page = () => {
    return (
        <>
            <div className='h-full-minus-navbar mt-[66px] text-center sm:mx-32 mx-10'>
                <div className='flex justify-center items-center h-[70%]'>
                    <div className='w-full'>
                        <div className='w-full flex justify-center items-center flex-col'>
                            <motion.h1
                                className='sm:text-5xl font-extrabold text-gray-800 text-5xl'
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                About Klink
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 mt-8"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                {websiteName} is a platform created by creators for creators. {websiteName} is expanding to reach all content creators around the world!
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
