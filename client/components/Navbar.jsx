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

const Navbar = ( ) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const { user, error, isLoading } = useUser();
    const [userInfo, setUserInfo] = useState(null);


    console.log("user Auth0 = ",user);

    const pathname = usePathname(); // Call usePathname unconditionally
    const [visible, setVisible] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: '/landing' }); // Redirect to homepage after signout
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const isPrelaunch = pathname === '/prelaunch' || pathname === '/thankyou' || pathname === '/maintenance';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let data;
                if (user) {
                    console.log("NavBar User = ", user);
                    const response = await fetch(`/api/users/getUserByEmail/${user.email}`);
                    data = await response.json();
                    console.log("data = ",data);
                } 
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [user]);

    return (
        <div className={`fixed top-0 w-full px-10 navbar_md:px-52 py-3 flex items-center justify-between z-20 bg-white ${isPrelaunch && 'hidden'} shadow-md ${visible ? 'mt-12' : 'mt-0'}`}>
            <div className={`flex items-center justify-between w-full ${user ? 'sm:w-[500px]' : 'sm:w-96'}`}>
                <div className='flex cursor-pointer hover:opacity-90' onClick={() => router.push(`${session ? '/explore': '/landing'}`)}>
                    <Image src={logo} width={35} className='mr-1' alt='logo' />
                    <h1 className='font-extrabold text-3xl'>{websiteName}</h1>
                </div>
                {userInfo && (
                    <Link href="/explore" className='hover:underline sm:flex hidden'>Let's Goo!</Link>
                )}
                <div className='sm:hidden'>
                    <DropDown showMenu={showMenu} setShowMenu={setShowMenu} />
                </div>
            </div>
            {!user ? (
                <div className='sm:flex hidden items-end w-44 justify-between font-semibold'>
                    <Button onClick={() => router.push('/api/auth/login')} variant="ghost">
                        Login
                    </Button>
                </div>
            ) : (
                <div className='sm:flex hidden items-end justify-between'>
                    <Button onClick={() => router.push('/api/auth/logout')} variant="ghost">
                        Logout
                    </Button>
                    {userInfo && (
                        <div className='flex items-center ml-6'>
                            {console.log("cool userInfo = ", userInfo)}
                            <div><IoIosNotifications size={30} className='cursor-pointer hover:opacity-50' onClick={() => router.push('/pendingConnects')} /></div>
                            <img onClick={() => router.push('/profile')} className='w-10 h-[2.5rem] rounded-full object-cover ml-9 border border-black cursor-pointer hover:opacity-50' src={userInfo.profilePicture} />
                        </div>
                    )}
                </div>
            )}
            <div className='h-screen w-full absolute z-0 sm:hidden' onClick={() => setShowMenu(false)}></div>
        </div>
    )
}

export default Navbar;