const mongoose = require('mongoose');


const OrganizationsSchema = new mongoose.Schema({

 name:{
		type: String,
		required: true
},

 description: {
	type: String,
	required: true
 },

 organization_members: [

 ],

 }
)

const Organizations =  mongoose.model('Organizations', OrganizationsSchema);
module.exports = Organizations;
