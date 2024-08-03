// pages/login.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import google from '../../public/google_icon.png';
import logo from '../../public/frog_logo.png';
import { useRouter } from 'next/navigation';
import { signIn, useSession, getProviders } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { InitialSkeleton } from '@/components/ui/skeleton';

// Dynamically import ButtonLoading component
const ButtonLoading = dynamic(() => import('@/components/ui/button').then(mod => mod.ButtonLoading), { ssr: false });

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [providers, setProviders] = useState(null);
    const { toast } = useToast();
    // Manage Loading State
    const [loading, setLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true); // State to manage page loading

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result.error,
            });
            setLoading(false);
        } else {
            router.push('/profile');
        }
    }, [email, password, router, toast]);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
            setIsPageLoading(false); // Set page loading to false after providers are fetched
        };
        setUpProviders();
    }, []);

    return (
        <div className="flex justify-center items-center h-full-minus-navbar mt-[66px] flex-col">
            <h1 className='text-6xl font-bold mb-8 text-center'>Welcome back!</h1>
            <Image src={logo} width={70} alt="Logo" />
            {isPageLoading ? (
                <InitialSkeleton />
            ) : (
                <form className="rounded px-8 pb-8 sm:w-[500px] w-full mt-8" onSubmit={handleSubmit}>
                    <div className='flex justify-center flex-col items-center mb-7'>
                        {providers && providers.google && (
                            <button
                                type="button"
                                onClick={() => signIn(providers.google.id)}
                                className="flex bg-white py-3 justify-center items-center mt-5 border border-gray-500 rounded-lg hover:ring-2 ring-gray-400 hover:ring-opacity-50 hover:ring-blur-lg w-full font-bold">
                                <Image src={google} width={30} className='mr-5' alt="Google Icon" />
                                Login with Google
                            </button>
                        )}
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="mb-3 mt-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="px-4 py-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-gray focus:border-gray w-full"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="px-4 py-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-gray focus:border-gray w-full"
                            id="password"
                            type="password"
                            placeholder="*********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        {loading ? (
                            <ButtonLoading text="Getting Ready..." />
                        ) : (
                            <Button
                                className="bg-primary-color text-white font-semibold hover:bg-primary-hover-color w-full py-3"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        )}
                    </div>
                </form>
            )}
            <p>
                {`Don't`} have an account?{' '}
                <span
                    onClick={() => router.push('/register')}
                    className='underline text-primary-color hover:text-primary-hover-color cursor-pointer font-semibold'
                >
                    Sign up here
                </span>
            </p>
        </div>
    );
};

export default Page;
