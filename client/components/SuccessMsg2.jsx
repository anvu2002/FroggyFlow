'use client'

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const SuccessMsg2 = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // Set the div to be visible after 100ms
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // Clear the timeout and hide the div after 3 seconds
        const cleanup = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(cleanup);
        };
    }, []);
    return (
        <motion.div
            initial={{ y: -100 }} // Initial position above the viewport
            animate={{ y: isVisible ? 20 : -100 }} // Animation to move down if isVisible is true, otherwise move up
            transition={{ stiffness: 120 }} // Animation transition
            className="bg-green-500 text-white py-2 px-4 fixed top-0 left-1/2 -translate-x-1/2 transition-transform duration-500"
            style={{
                width: '100px',
                borderRadius: '5px',
                border: 'solid black',
                borderColor: 'black',
                zIndex: 30,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a shadow for better visibility
                left: '45%',
            }}
        >
            Success!
        </motion.div>
    );
};

export default SuccessMsg2;
