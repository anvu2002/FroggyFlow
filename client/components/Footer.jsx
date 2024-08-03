// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { websiteName } from '@/config';
import { FaGithub } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-400 text-center">
                            {websiteName} a Study Partner platform that allow you to study with max fun!
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <ul className="text-gray-400 flex flex-col items-center">
                            <li className="mb-2">
                                <Link href="/about">
                                    <span className="cursor-pointer hover:text-white">About</span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/contact">
                                    <span className="cursor-pointer hover:text-white">Our Team</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                        <ul className="flex space-x-4 text-gray-400">
                            <li>
                                <Link href="https://github.com/anvu2002/ScholarFrog" target='_blank' passHref>
                                    <span className="cursor-pointer hover:text-white"> <FaGithub size={25} /> </span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-400 mt-8">
                    &copy; {new Date().getFullYear()} {websiteName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
