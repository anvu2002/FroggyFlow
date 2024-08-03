import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';


const DropDown = ({ showMenu, setShowMenu }) => {
    const router = useRouter();
    const { user, error, isLoading } = useUser();

    const links = [
        {
            id: 1,
            name: 'Home',
            url: '/explore'
        }, {
            id: 2,
            name: "About",
            url: "/about"
        }, {
            id: 3,
            name: "Contact",
            url: "/contact"
        }
    ];

    const handleClick = (url) => {
        router.push(`${url}`);
        setShowMenu(false);
    }

    return (
        <div className="relative flex flex-col items-center z-10">
            <button onClick={() => setShowMenu(!showMenu)} className="text-black font-normal  w-full flex items-center justify-between text-base rounded-lg px-4 py-2 border border-black">
                Menu
                {!showMenu ? (
                    <IoIosArrowDown />
                ) : (
                    <IoIosArrowUp />
                )}
            </button>
            {showMenu && (
                <div>
                    <div className="absolute z-10 text-black top-14 right-0 flex flex-col items-start rounded-lg w-48 r shadow-lg bg-primary-color">
                        <div className="relative w-full px-2 py-2 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-top justify-start">
                        {links.map((link, index) => (
                                <div onClick={() => handleClick(link.url)} className="font-normal text-base justify-between hover:bg-gray-100 cursor-pointer rounded-lg p-2 m-0" key={index}>
                                    <h3 className="">{link.name}</h3>
                                </div>
                            ))}
                            {user ? (
                                <>
                                    <div onClick={() => handleClick('/login')} className="font-normal text-base justify-between hover:bg-gray-100 cursor-pointer rounded-lg p-2 m-0">
                                        <h3 className="">Login</h3>
                                    </div>
                                    <div onClick={() => handleClick('/register')} className="font-normal text-base justify-between hover:bg-gray-100 cursor-pointer rounded-lg p-2 m-0">
                                        <h3 className="">Register</h3>
                                    </div>
                                </>
                            ) : (
                                <>
                                <div onClick={() => { handleClick('/profile'); setShowMenu(false); }} className="font-normal text-base justify-between hover:bg-gray-100 cursor-pointer rounded-lg p-2 m-0">
                                    <h3 className="">Profile</h3>
                                </div>
                                <div onClick={() => { signOut(); setShowMenu(false); }} className="font-normal text-base justify-between hover:bg-gray-100 cursor-pointer rounded-lg p-2 m-0">
                                    <h3 className="">Logout</h3>
                                </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default DropDown;