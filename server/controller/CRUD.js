const UserSchema = require("../models/UserSchema.js");
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const formData = req.body;
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(formData.password, salt);
        // Create a new User object
        const newUser = new UserSchema
            ({
                name: formData.name,
                email: formData.email,
                password: encryptedPassword,
                age: formData.age
            });

        // Save the product to the database
        await newUser.save();

        return res.status(201).json({
            success: true,
            data: newUser,
            message: "User added successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: `Error Adding User ${error}` });
    }
};

const getUser = async (req, res) => {
    if (req.user.user_id === req.params.id) {
        try {
            // Find and delete the user by ID
            const getUser = await UserSchema.findById(req.params.id);
            if (!getUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: getUser,
                message: "User Profile successfully Fetched",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: `Error Deleting user profile: ${error.message}`
            });
        }
    }
    else {
        return res.status(401).json({
            success: false,
            error: `The token doesn't match.`
        });
    }
}

const updateUser = async (req, res) => {
    if (req.user.user_id === req.params.id) {
        try {
            const formData = req.body;
            const updateFields = {};
            // Checking if each field exists in the request body and adding it to updateFields
            if (formData.name) {
                updateFields.name = formData.name;
            }
            if (formData.email) {
                updateFields.email = formData.email;
            }
            if (formData.password) {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                updateFields.password = await bcrypt.hash(formData.password, salt);
            }
            if (formData.age) {
                updateFields.age = formData.age;
            }

            // Find and update the user by ID
            const updatedUser = await UserSchema.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: updatedUser,
                message: "User Profile Updated successfully",
            });



        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: `Error updating user profile: ${error.message}`
            });
        }

    }
    else {
        return res.status(401).json({
            success: false,
            error: `The token doesn't match.`
        });
    }
};

const deleteUser = async (req, res) => {
    if (req.user.user_id === req.params.id) {
        try {
            // Find and delete the user by ID
            const deleteUser = await UserSchema.findByIdAndDelete(req.params.id);
            if (!deleteUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: deleteUser,
                message: "User Profile Deleted successfully",
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: `Error Deleting user profile: ${error.message}`
            });
        }
    }
    else {
        return res.status(401).json({
            success: false,
            error: `The token doesn't match.`
        });
    }
}

module.exports = { createUser, getUser, updateUser, deleteUser };
