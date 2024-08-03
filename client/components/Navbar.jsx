'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import logo from '../public/frog_logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import DropDown from './DropDown';
import { signOut, useSession } from 'next-auth/react';
import { IoIosNotifications } from "react-icons/io";
import { websiteName } from '@/config';
import { Button } from './ui/button';
import {  ModeToggle } from '@/components/ModeToggle';

const Navbar = ({ isBannerVisible }) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState(null);
    const { data: session } = useSession();
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
                if (session?.user?.id) {
                    // const response = await fetch(`/api/users/getUserById/${session?.user?.id}`,{
                    //     headers: {
                    //         'Authorization': `Bearer ${session.accessToken}`
                    //     }
                    // });
                    const response = await fetch(`/api/users/getUserByEmail/${session.user?.email}`, {
                        headers: {
                            'Authorization': `Bearer ${session.accessToken}`
                        }
                    });
                    data = await response.json();
                } else if (session?.user?.email) {
                    const response = await fetch(`/api/users/getUserByEmail/${session.user?.email}`, {
                        headers: {
                            'Authorization': `Bearer ${session.accessToken}`
                        }
                    });
                    data = await response.json();
                }
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [session]);

    useEffect(() => {
        if (isBannerVisible) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [isBannerVisible]);

    return (
        <div className={`fixed top-0 w-full px-10 navbar_md:px-52 py-3 flex items-center justify-between z-20 bg-white ${isPrelaunch && 'hidden'} shadow-md ${visible ? 'mt-12' : 'mt-0'}`}>
            <div className={`flex items-center justify-between w-full ${session ? 'sm:w-[500px]' : 'sm:w-96'}`}>
                <div className='flex cursor-pointer hover:opacity-90' onClick={() => router.push(`${session ? '/explore': '/landing'}`)}>
                    <Image src={logo} width={35} className='mr-1' alt='logo' />
                    <h1 className='font-extrabold text-3xl'>{websiteName}</h1>
                </div>
                {session && (
                    <Link href="/explore" className='hover:underline sm:flex hidden'>Explore</Link>
                )}
                <Link href="/about" className='hover:underline sm:flex hidden'>About</Link>
                {user?.role !== 'admin' && (
                    <Link href="/contact" className='hover:underline sm:flex hidden'>Contact</Link>
                )}
                {user?.role === 'admin' && (
                    <Link href="manage-users" className='hover:underline'>Manage Users</Link>
                )}
                <div className='sm:hidden'>
                    <DropDown showMenu={showMenu} setShowMenu={setShowMenu} />
                </div>
                <div className='mt-[10px]'>
                    <ModeToggle />
                </div>
            </div>
            {!session ? (
                <div className='sm:flex hidden items-end w-44 justify-between font-semibold'>
                    <Button onClick={() => router.push('/login')} variant="ghost">
                        Login
                    </Button>
                    <Button onClick={() => router.push('/register')} className={`bg-primary-color hover:bg-primary-hover-color text-white`}>
                        Register
                    </Button>
                </div>
            ) : (
                <div className='sm:flex hidden items-end justify-between'>
                    <Button onClick={handleSignOut} variant="ghost">
                        Logout
                    </Button>
                    {user && (
                        <div className='flex items-center ml-6'>
                            <div><IoIosNotifications size={30} className='cursor-pointer hover:opacity-50' onClick={() => router.push('/pendingConnects')} /></div>
                            <img onClick={() => router.push('/profile')} className='w-10 h-[2.5rem] rounded-full object-cover ml-9 border border-black cursor-pointer hover:opacity-50' src={user.profilePicture} />
                        </div>
                    )}
                </div>
            )}
            <div className='h-screen w-full absolute z-0 sm:hidden' onClick={() => setShowMenu(false)}></div>
        </div>
    )
}

export default Navbar;