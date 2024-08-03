'use client'

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';


const Page = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [youtube, setYoutube] = useState('');
    const [youtubeForm, setYoutubeForm] = useState('');
    const [instagram, setInstagram] = useState('');
    const [instagramForm, setInstagramForm] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [tiktokForm, setTiktokForm] = useState('');
    const [x, setX] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [joinedOn, setJoinedOn] = useState('');
    const [username, setUsername] = useState('');
    const [tags, setTags] = useState([]);
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [youtubeChannelName, setYoutubeChannelName] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [connects, setConnects] = useState([]);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const { toast } = useToast();
    const pathname = usePathname();
    const path = pathname.split("/").pop();
    const isProfile = (path === 'profile');

    const toggleEditModal = () => {
        setIsProfileModalOpen(!isProfileModalOpen);
    }

    const handleBioChange = (e) => {
        const inputBio = e.target.value;
        if (inputBio.length <= 250) {
            setBio(inputBio);
        }
    };
    
    useEffect(() => {
        if (!session) {
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/getUserById/${session?.user?.id}`, {
                    headers: {
                        'Authorization': `Bearer ${session.accessToken}`
                    }
                });
                const data = await response.json();
                if (data.firstTime) {
                    router.push('/postRegistration');
                }
                const date = new Date(data.createdAt);
                const formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                setFullName(data.name);
                setBio(data.bio);
                setYoutube(data.youtube);
                setYoutubeForm(data.youtube);
                setInstagram(data.instagram);
                setInstagramForm(data.instagram);
                setTiktok(data.tiktok);
                setTiktokForm(data.tiktok);
                setX(data.x);
                setProfilePic(data.profilePicture);
                setJoinedOn(formattedDate);
                setUsername(data.username);
                setTags(data.tags);
                setConnects(data.connects);
                setUser(data);

                if (data.youtube !== '') {
                    try {
                        const subscriberResponse = await fetch(`/api/getYoutubeSubscribers?userId=${session?.user?.id}`, {
                            headers: {
                                'Authorization': `Bearer ${session.accessToken}`
                            }
                        });
                        if (subscriberResponse.ok) {
                            const subscriberData = await subscriberResponse.json();
                            setSubscriberCount(subscriberData.subscriberCount);
                            setYoutubeChannelName(subscriberData.channelName);
                            setIsPageLoading(false);
                        }
                    } catch (err) {
                        console.log("Error fetching youtube subscribers: ", err);
                        setYoutube("Error");
                    }
                } else {
                    setIsPageLoading(false);
                }
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, [session, router]);

    const handleSave = async () => {
        try {
            const newUserData = {
                name: fullName,
                username: username,
                profilePicture: profilePic,
                bio: bio,
                youtube: youtubeForm,
                instagram: instagramForm,
                tiktok: tiktokForm,
                x: x,
                tags: tags,
            }
            const res = await fetch(`/api/users/updateUserById/${user?._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData),
            });
            toast({
                description: "Successfully updated.",
            })
        } catch (err) {
            console.log("Error updating user in the frontend: ", err);
        }
        toggleEditModal();
    }

    const handleFileChange = (e) => {
        setProfilePicFile(e.target.files[0]);
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    };

    const handleUpload = async () => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append('file', profilePicFile);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.url;
                const newUserData = {
                    profilePicture: imageUrl,
                }
                const res = await fetch(`/api/users/updateUserById/${user?._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${session.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUserData),
                });

                if (res.ok) {
                    console.log("Profile picture uploaded successfully");
                }
                toast({
                    description: "Successfully uploaded!",
                })

            } else {
                throw new Error('Error uploading image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleRemoveConnection = async (userId) => {
        try {
            const response = await fetch(`/api/users/removeConnect/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUserId: session?.user?.id }),
            });

            if (response.ok) {
                setConnects(connects.filter(connect => connect.user._id !== userId));
            } else {
                console.error('Error removing connection:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing connection:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/users/deleteUser/${session.user.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`
                }
            });

            if (response.ok) {
                await signOut({ redirect: true, callbackUrl: '/landing' }); // Redirect to homepage after signout
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('An error occurred while deleting the account:', error);
        }
    };


    if (!user) {
        return <div className='h-screen w-full flex justify-center items-center'><Loader /></div>
    }

    return (
        <div className="flex flex-col sm:px-24 px-10 h-full-minus-navbar pt-32">
            <div className="w-full flex sm:flex-row flex-col">
                <div className="h-full flex items-center justify-center pt-10 sm:mb-16">
                    <div className="w-96 relative flex flex-col justify-center items-center">
                        <div className="overflow-hidden w-80 h-[20rem] rounded-full mb-5">
                            <img
                                src={profilePic}
                                alt="Profile Picture"
                                className="object-cover w-full h-[100%]"
                            />
                        </div>
                        <label className="cursor-pointer flex flex-col justify-center items-center">
                            <span className="hover:underline mb-3 font-bold">Upload Profile Picture</span>
                            <input type="file" accept="image/jpeg, image/jpg, image/png" className="hidden" name="profile_img" onChange={handleFileChange} />
                            {profilePicFile ? (
                                <div className="flex justify-center items-center">
                                    <button onClick={handleUpload} className="bg-white rounded-lg border border-black px-2 py-1 hover:bg-gray-200">Save Profile Picture</button>
                                </div>
                            ) : (
                                <div className="h-9"></div>
                            )}
                        </label>
                    </div>
                </div>
                <div className="sm:p-16 w-full sm:mt-14">
                    <div className="w-full">
                        <div className="flex justify-between text-center items-center sm:items-start mb-3 w-full flex-col profile_md:flex-row profile_md:items-center">
                            <div className="flex flex-col sm:items-start items-center profile_md:flex-row profile_md:items-center">
                                <h1 className="sm:text-5xl text-4xl font-bold sm:mr-6">{user.name}</h1>
                                <p className="text-gray-600 sm:mt-0 mt-2">@{user.username}</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="sm:mt-0 align-baseline mt-4 w-32">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            {`Make changes to your profile here. Click save when you're done.`}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="bio" className="text-right">
                                                Bio
                                            </Label>
                                            <Textarea
                                                id="username"
                                                value={bio}
                                                onChange={handleBioChange}

                                                className="col-span-3 max-h-[200px] resize-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="youtube" className="text-right">
                                                YouTube
                                            </Label>
                                            <Input
                                                id="youtube"
                                                value={youtubeForm}
                                                onChange={(e) => setYoutubeForm(e.target.value)}
                                                className="col-span-3"
                                                placeholder="Enter channel ID"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="instagram" className="text-right">
                                                Instagram
                                            </Label>
                                            <Input
                                                id="instagram"
                                                value={instagramForm}
                                                onChange={(e) => setInstagramForm(e.target.value)}
                                                className="col-span-3"
                                                placeholder="Enter page link"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="tiktok" className="text-right">
                                                Tiktok
                                            </Label>
                                            <Input
                                                id="tiktok"
                                                value={tiktokForm}
                                                onChange={(e) => setTiktokForm(e.target.value)}
                                                className="col-span-3"
                                                placeholder="Enter page link"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter className="flex justify-between flex-row">
                                        <DialogClose>
                                            <Button variant="destructive" onClick={() => setIsDeleteConfirmationOpen(true)} type="button">
                                                Delete Account
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button onClick={handleSave} type="button">
                                                Save changes
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Account</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete your account? This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" onClick={() => setIsDeleteConfirmationOpen(false)}>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button variant="destructive" onClick={handleDelete}>
                                            Confirm Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex my-5">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <p className="text-gray-600 hover:underline cursor-pointer">{user?.connects?.length} connects</p>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Connects</DialogTitle>
                                        <hr className='mb-2'></hr>
                                        <ul>
                                            {connects?.map((connect, index) => (
                                                <li key={index} className="flex items-center justify-between mb-3 p-2 rounded-lg">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={connect.user.profilePicture}
                                                            alt={connect.user.name}
                                                            className="w-[45px] h-[45px] rounded-full mr-4 object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-bold">{connect.user.name}</p>
                                                            <p className="text-gray-600">@{connect.user.username}</p>
                                                        </div>
                                                    </div>
                                                    {isProfile && (
                                                        <Button onClick={() => handleRemoveConnection(connect.user._id)}>
                                                            Remove
                                                        </Button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <span className="mx-3">·</span>
                            <p className="text-gray-600">Joined on {joinedOn}</p>
                        </div>
                        <div className="flex mb-3">
                            {tags?.map((tag, index) => (
                                <div key={index} className="mr-2 bg-blue-400 px-2 py-1 rounded-md">
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <div className="w-3/4 max-w-xl">
                            <p className="font-bold">Bio:</p>
                            <p className="text-gray-800 overflow-hidden overflow-ellipsis whitespace-pre-wrap break-words">{user.bio}</p>
                        </div>
                    </div>
                    <ul className="mt-10">
                        <li>
                            <div className="flex items-center">
                                {isPageLoading ? (
                                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                                ) : (
                                    <>
                                        {youtubeChannelName && (youtube !== undefined) && (
                                            <>
                                                <FaYoutube size={30} className="mr-2" />
                                                {subscriberCount && (
                                                    <span className="ml-2 font-bold mr-2">{subscriberCount} subscribers</span>
                                                )}
                                                <Link href={youtube} className='underline' target='_blank'>
                                                    {youtubeChannelName}
                                                </Link>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className='flex items-center mt-1'>
                                {instagram !== "" && (
                                    <>
                                        <FaInstagram size={25} className='mr-2'/>
                                        <Link href={instagram} className='underline' target='_blank'>
                                            Instagram
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className='flex items-center mt-1'>
                                {tiktok !== "" && (
                                    <>
                                        <FaTiktok size={25} className='mr-2'/>
                                        <Link href={tiktok} className='underline' target='_blank'>
                                            Tiktok
                                        </Link>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );

}

export default Page;
