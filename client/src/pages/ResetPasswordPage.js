import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../services/Auth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Use the token directly from useParams()
      const data = {
        pass : password
      }
      const response = await resetPassword(token,data);
      // Show a success message to the user
      if(response.status === 200 ){
        alert("Password reset successful! You can now log in with your new password.");
        window.location.assign("/");
      }
      
    } catch (error) {
      console.error("Error resetting password:", error.response.data.error);
      alert("Failed to reset password. Please try again later.", error.response.data.error);
      window.location.assign("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleResetPassword}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>
          <div className="mb-6 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy; Assignment {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};


export default ResetPassword;
