const CasesSchema = require("../models/Cases");

const addCases = async (req, res) => {
    try {
        const formData = req.body;

        const newCases = await  CasesSchema.create({
            name: formData.name,
            caseType: formData.caseType,
            underSection: formData.underSection,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            state: formData.state,
            city: formData.city,
            street: formData.street,
            zipCode: formData.zipCode,
            incidentDate: formData.incidentDate,
            incidentState: formData.incidentState,
            incidentCity: formData.incidentCity,
            incidentStreet: formData.incidentCity,
        })
        
        
        return res.status(200).json({
            success: true,
            data: newCases,
            message: "Case added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Adding User: ${error.message}`
        });
    }
};

const getCases = async(req,res) =>{
    try {
        if(req.params.id){
            const isExists = await CasesSchema.findById(req.params.id);
            if(!isExists){
                return res.status(404).json({
                    success: false,
                    message:"Case Not Found"
                });
            }
            return res.status(200).json({
                success: true,
                data: isExists,
            });
        }
        else{

            const Cases = await CasesSchema.find();
            return res.status(200).json({
                success: true,
                data: Cases,
            });
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Adding User: ${error.message}`
        });
    }
}

module.exports={
    addCases,
    getCases
}