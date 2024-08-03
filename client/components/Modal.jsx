import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Modal = ({ isOpen, onClose, connects }) => {
    const { data: session } = useSession();
    const [localConnects, setLocalConnects] = useState(connects);
    const pathname = usePathname();
    const path = pathname.split("/").pop();
    const isProfile = (path === 'profile');

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleRemoveConnection = async (userId) => {
        try {
            const response = await fetch(`/api/users/removeConnect/${userId}`, {
                method: 'POST',
                body: JSON.stringify({ currentUserId: session?.user?.id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Connection removed successfully');
                setLocalConnects(localConnects.filter(connect => connect.user._id !== userId));
            } else {
                console.error('Error removing connection:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing connection:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={handleBackdropClick}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative w-96 max-h-96 overflow-y-auto">
                <h2 className="text-2xl mb-2">Connects</h2>
                <hr className='mb-2'></hr>
                <ul>
                    {localConnects.map((connect, index) => (
                        <li key={index} className="flex items-center justify-between mb-3 p-2 rounded-lg">
                            <div className="flex items-center">
                                <img
                                    src={connect.user.profilePicture}
                                    alt={connect.user.name}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <p className="font-bold">{connect.user.name}</p>
                                    <p className="text-gray-600">@{connect.user.username}</p>
                                </div>
                            </div>
                            {isProfile && (
                                <button onClick={() => handleRemoveConnection(connect.user._id)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm">
                                    Remove
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;
