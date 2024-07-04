import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { deleteUser, fetchUser, updateUser } from '../services/Crud'
import { generateToken } from "../services/Auth";



export const ProfilePage = () => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
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
        });
    };

    // update
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
    const resetpasswordHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await generateToken(id);
            if(res.status ===200){
                // console.log(res.data);
                const token = res.data.token
                window.location.assign(`/resetpassword/${token}`);
            }
        } catch (error) {

        }
    }
    return (
        <>
            <Toaster position="top-center" />

            <div className="h-screen bg-orange-100 gap-6 p-3 overflow-y-hidden">
                <button
                    type="submit"
                    className="w-36 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg mb-3"
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
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
                                onClick={(e) => resetpasswordHandler(e)}
                            >
                                Change Password
                            </button>
                        </div>
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
