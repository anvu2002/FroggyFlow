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
                    
                    Insert Jumping Jacks Game
                </div>
            </div>
        </div>
    )
}

export default Page;
