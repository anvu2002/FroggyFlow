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
    router.push('/study-session')
  }

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: "url('/frog_background.png')", height: '100vh', backgroundPosition: 'center bottom' }}
      >
        <div className='text-center'>
          <iframe width="640" height="480" src="http://localhost:8000/video_feed"></iframe>
          <motion.button
            className="mt-8 px-6 py-3 text-lg font-semibold text-sky-950 bg-green-300 rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleButtonClick}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Resume Studies
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Page;
