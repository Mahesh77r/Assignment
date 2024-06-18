import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { deleteUser, fetchUser, updateUser } from '../services/Crud'
import jwtDecode from 'jwt-decode';



export const ProfilePage = () => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });
    // fetch
    useEffect(() => {
        getData();
    }, []);
    const { id } = useParams();

    const getData = async () => {
        let res = await fetchUser(id);
        console.log(res)
        let resData = res.data.data
        setRegisterData({
            age: resData.age,
            email: resData.email,
            name: resData.name,
            password: resData.password
        });
    };

    // update
    const [showRPassword, setShowRPassword] = useState(false);
    const toggleRPasswordVisibility = () => {
        setShowRPassword(!showRPassword);
    };
    const handleRInputChange = (event) => {
        const { name, value } = event.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };
    const updateHandler = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Processing...");

        try {
            let res = await updateUser(id, registerData);
            if (res.status === 200) {
                toast.success("Updation Successfully");
                setTimeout(() => {
                    window.location.href = `/profile/${res.data.data._id}`;
                }, 300);
            } else if (res.status === 202) {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error during Updation:', error);
            toast.error('An error occurred during Updation');
        }

        finally {
            toast.dismiss(loadingToast);
        }
    };

    // delete
    const deleteHandler = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Processing...");

        try {
            let res = await deleteUser(id);
            if (res.status === 200) {
                // toast.success(`Deletion Successfully of ${res.data.data.name}`);
                setTimeout(() => {
                    window.location.href = `/`;
                }, 300);
            } else if (res.status === 202) {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error during Deletion:', error);
            toast.error('An error occurred during Deletion');
        }
        finally {
            toast.dismiss(loadingToast);
        }
    };
    const LogoutMsg = () => { toast.success('Logout Successfully') }

    const logoutHandler = () => {
        
        localStorage.removeItem("jwtToken");
        window.location.assign("/");
        LogoutMsg()
    };
    return (
        <>
            <Toaster position="top-center" />

            <div className="h-screen bg-orange-100 gap-6 p-3 overflow-y-hidden">
                <button
                    type="submit"
                    className="w-36 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
                    onClick={() => logoutHandler()}
                >
                    Logout
                </button>
                {/* Register */}
                <div className="m-auto p-6 bg-white rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl text-center font-semibold mb-4">Update or Delete</h2>
                    <form >
                        {/* Name */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Your Name"
                                autoComplete="name"
                                value={registerData ? registerData.name : ""}
                                onChange={handleRInputChange}
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={registerData ? registerData.email : ""}
                                placeholder="Your email"
                                autoComplete="email"
                                onChange={handleRInputChange}
                                required
                            />
                        </div>
                        {/* Age */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="age"
                            >
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Your Age"
                                value={registerData ? registerData.age : ""}
                                onChange={handleRInputChange}
                                required
                            />
                        </div>
                        {/* password */}
                        {/* <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showRPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Your password"
                                    // value={registerData ? registerData.password : ""}
                                    onChange={handleRInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2"
                                    onClick={toggleRPasswordVisibility}
                                >
                                    {showRPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 "
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div> */}
                        <div className="flex gap-3">
                            {/* update */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
                                onClick={(e) => updateHandler(e)}
                            >
                                Update
                            </button>
                            {/* delete */}
                            <button
                                type="submit"
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
                                onClick={(e) => deleteHandler(e)}

                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
