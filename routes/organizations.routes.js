const Router = require('express');
const router = new Router();
const organizationController = require('../controller/organizations.controller');

router.post('/organization', organizationController.createOrganization);
router.put('/organization', organizationController.updateOrganization);
router.delete('/organization/:id', organizationController.deleteOrganization);
router.get('/organization', organizationController.getOrganization);
router.get('/organization/:id', organizationController.getOneOrganization);
router.get('/organizationUser/:id', organizationController.getOrganizationUser);


module.exports = router;