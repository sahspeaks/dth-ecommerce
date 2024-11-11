import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        // phone: user?.phone || '',
        // address: user?.address || '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
            setIsEditing(false);
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Profile Information Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isEditing ? (
                                <X className="h-5 w-5 text-gray-600" />
                            ) : (
                                <Edit2 className="h-5 w-5 text-gray-600" />
                            )}
                        </button>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <User className="h-5 w-5 text-gray-400" />
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Your name"
                                    />
                                ) : (
                                    <span className="text-gray-700">{user?.name || 'Not set'}</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-4">
                                <Mail className="h-5 w-5 text-gray-400" />
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Your email"
                                    />
                                ) : (
                                    <span className="text-gray-700">{user?.email || 'Not set'}</span>
                                )}
                            </div>

                            {/* <div className="flex items-center space-x-4">
                                <Phone className="h-5 w-5 text-gray-400" />
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Your phone number"
                                    />
                                ) : (
                                    <span className="text-gray-700">{user?.phone || 'Not set'}</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-4">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="Your address"
                                        rows={3}
                                    />
                                ) : (
                                    <span className="text-gray-700">{user?.address || 'Not set'}</span>
                                )}
                            </div>*/}
                        </div>

                        {isEditing && (
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    <Save className="h-4 w-4" />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Account Settings Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-800">Change Password</h3>
                                <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                            </div>
                            <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                Update
                            </button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-800">Email Notifications</h3>
                                <p className="text-sm text-gray-500">Manage your email notification preferences</p>
                            </div>
                            <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                Configure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;