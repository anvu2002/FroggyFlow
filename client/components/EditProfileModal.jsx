import { useState } from 'react';

const EditProfileModal = ({ isOpen, onClose, fullName, setFullName, username, setUsername, bio, setBio, youtube, setYoutube, instagram, setInstagram, tiktok, setTiktok, x, setX, handleSave }) => {
    const [bioError, setBioError] = useState(false);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleBioChange = (e) => {
        const inputBio = e.target.value;
        if (inputBio.length <= 250) {
            setBio(inputBio);
            setBioError(false);
        } else {
            setBioError(true);
        }
    };

    const bioLength = bio.length;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={handleBackdropClick}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative w-1/2 max-h-[750px] overflow-y-auto">
                <h2 className="text-2xl mb-4">Edit Profile</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="full-name">Full Name</label>
                    <input type="text" id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={handleBioChange}
                        className={`w-full border ${bioError ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none h-32 resize-none`}
                    />
                    <div className="flex justify-end items-center mt-1">
                        <span className={`text-sm ${bioLength < 0 ? 'text-red-500' : 'text-gray-500'}`}>{bioLength}/250</span>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="youtube">YouTube Link</label>
                    <input type="text" id="youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="instagram">Instagram Link</label>
                    <input type="text" id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="tiktok">TikTok Link</label>
                    <input type="text" id="tiktok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="x">X Link</label>
                    <input type="text" id="x" value={x} onChange={(e) => setX(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none" />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-primary-hover-color">Save</button>
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 ml-3 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
