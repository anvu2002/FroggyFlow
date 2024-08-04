'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import logo from '../public/frog_logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import DropDown from './DropDown';
import { IoIosNotifications } from "react-icons/io";
import { websiteName } from '@/config';
import { Button } from './ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const { user, error, isLoading } = useUser();
    const [userInfo, setUserInfo] = useState(null);

    const pathname = usePathname(); // Call usePathname unconditionally
    const [visible, setVisible] = useState(false);

    const isPrelaunch = pathname === '/prelaunch' || pathname === '/thankyou' || pathname === '/maintenance';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user) {
                    console.log("NavBar User = ", user);

                    const newUserData = {
                        name: user.name,
                        username: user.nickname,
                        email: user.email
                    }

                    await fetch(`/api/register`, {
                        method: 'POST',
                        body: JSON.stringify(newUserData),
                    });
                } 
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [user]);

    return (
        <div className={`fixed top-0 w-full px-10 navbar_md:px-52 py-3 flex items-center justify-between z-20 bg-white bg-opacity-20 shadow-md ${visible ? 'mt-12' : 'mt-0'}`}>
            <div className='flex items-center'>
                <div className='flex cursor-pointer hover:opacity-90' onClick={() => router.push('/landing')}>
                    <Image src={logo} width={35} className='mr-1' alt='logo' />
                    <h1 className='font-extrabold text-3xl'>{websiteName}</h1>
                </div>
                <Link href="/about" className='ml-14 text-2xl font-extrabold text-grey hover:text-green-300'>About</Link> {/* Increased margin-left to 14 */}
            </div>
            <div className={`flex items-center justify-between ${user ? 'sm:w-[500px]' : 'sm:w-96'}`}>
                <div className='sm:hidden'>
                    <DropDown showMenu={showMenu} setShowMenu={setShowMenu} />
                </div>
            </div>
            <div className='sm:flex hidden items-end w-44 justify-between font-semibold'>
                {user && (
                    <>
                        <Button onClick={() => router.push('/api/auth/logout')} variant="ghost">
                            Logout
                        </Button>
                        <div className='flex items-center ml-6'>
                            {console.log("MongoDB userInfo = ", userInfo)}
                            <div><IoIosNotifications size={30} className='cursor-pointer hover:opacity-50' onClick={() => router.push('/pendingConnects')} /></div>
                            <img onClick={() => router.push('/profile')} className='w-10 h-[2.5rem] rounded-full object-cover ml-9 border border-black cursor-pointer hover:opacity-50' src={user.picture} />
                        </div>
                    </>
                )}
            </div>
            <div className='h-screen w-full absolute z-0 sm:hidden' onClick={() => setShowMenu(false)}></div>
        </div>
    )
}

export default Navbar;
