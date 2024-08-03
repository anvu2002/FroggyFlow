'use client'

import { useState } from "react";
import { motion } from 'framer-motion';

const SuccessMsg = ({ isVisible }) => {
    const variants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="z-20 fixed top-0 left-0 right-0 p-5 bg-green-500 text-white text-center"
        >
            <p className="text-xl font-bold">Registration Successful!</p>
        </motion.div>
    );
};

export default SuccessMsg;
