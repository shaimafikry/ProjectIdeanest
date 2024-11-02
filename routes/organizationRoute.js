const express = require('express');
const { createOrganization , readOrganization, updateOrganization, deleteOrganization, inviteUserToOrganization, readAllOrganizations } = require('../controllers/organizationController');
const router = express.Router();
const authToken = require('../middlewares/authToken');



router.use(authToken);

router.post('/organization', createOrganization);


router.get('/organization/:organization_id', readOrganization);


router.put('/organization/:organization_id', updateOrganization);


router.delete('/organization/:organization_id', deleteOrganization);

router.post('/organization/:organization_id/invite', inviteUserToOrganization);



router.get('/organization', readAllOrganizations);



module.exports = router;
