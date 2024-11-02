
const Organizations = require('../models/organization');
const Users = require('../models/user');




async function createOrganization(req, res) {
	const newOrg = req.body;
	try{
		const newOrgAdded = await Organizations.create(newOrg);

	return res.status(200).json({organization_id: `${newOrgAdded._id}`})
 }catch(error){
	console.log('error adding organization', error);
	res.status(400).json({message: 'Error adding Organization'});
 }

};






async function readOrganization(req, res){

	const orgId = req.params.organization_id;
	
	const org  = await Organizations.findOne({_id: orgId});
	const orgReturn = {
		organization_id: org._id,
		name: org.name,
		description: org.description,
		organization_members: org.organization_members
	}
	
	res.status(200).json(orgReturn);
};




async function updateOrganization(req, res) {
	const orgId = req.params.organization_id;
	const updateOrg = req.body;

	try {

    await Organizations.updateOne({_id: orgId}, {$set : updateOrg});
		const org = await Organizations.findOne({_id: orgId});


		const orgReturn = {
			organization_id: org._id,
			name: org.name,
			description: org.description,
		}
    console.log(orgReturn);
		return res.status(200).json(orgReturn);

	}catch (error) {
		console.error("error update org", error);
		res.status(500).json({ message : 'An error occure during Organization Update'})

	}
};




async function deleteOrganization(req, res){
	const orgId = req.params.organization_id;

	try {

    await Organizations.deleteOne({_id: orgId});

		return res.status(200).json({message: 'Organization deleted succefully'});

	}catch (error) {
		console.error("error delete org", error);
		res.status(500).json({ message : 'An error occure during Organization deletion'})
	}
};



async function inviteUserToOrganization(req, res){
	const orgId = req.params.organization_id;
	const userMail = req.body.user_email;

	try {
		const user = await Users.findOne({email: userMail});
		const member = {
			name: user.name,
			email: user.email,
			access_level: 'Read'
		}

    await Organizations.updateOne({_id: orgId}, {$push : {organization_members: member}});
		const org = await Organizations.findOne({_id: orgId});
		console.log(org)

		return res.status(200).json({message: 'Invite added succefully'});

	}catch (error) {
		console.error("error update org", error);
		res.status(500).json({ message : 'An error occure during Organization Invite'})
	}
};



async function readAllOrganizations(req, res){

	try {
		const orgs = await Organizations.find();

		const orgsReturn = orgs.map(org => ({
			organization_id: org._id,
			name: org.name,
			description: org.description,
			organization_members: org.organization_members

		}));

	  res.status(200).json(orgsReturn);


  } catch (error) {

		console.error("Error fetching organizations:", error);
		res.status(500).json({ message: "Failed to retrieve organizations" });
	}

};








module.exports = { createOrganization , readOrganization, updateOrganization, deleteOrganization, inviteUserToOrganization, readAllOrganizations };
