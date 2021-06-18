const Router = require('express');
const router = new Router();
const userController = require('../controller/users.controller');

router.post('/user', userController.createUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.get('/usersOrganization/:id', userController.getUsersOrganization);


module.exports = router;