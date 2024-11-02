const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


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

// OrganizationsSchema.plugin(AutoIncrement, { inc_field: 'id' });


const Organizations =  mongoose.model('Organizations', OrganizationsSchema);
module.exports = Organizations;
