const  mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  caseType: { type: String, required: true },
  underSection: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
  incidentDate: { type: String, required: true },
  incidentState: { type: String, required: true },
  incidentCity: { type: String, required: true },
  incidentStreet: { type: String, required: true },
}, { timestamps: true });

 module.exports =  mongoose.model('Cases', CaseSchema);