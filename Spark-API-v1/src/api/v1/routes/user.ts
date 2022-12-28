import { NextFunction, Request, Response, Router } from 'express';

import userModel from '../../../models/user';
const router = Router();

interface UserInfo {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    EmailAdress: string;
    Balance: number;
    Password: string;
}

/**
 * Users ROUTE
 * /users:
 *   get:
 *     summary: Display list of users
 *     description: Render all users from database
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await userModel.showAllUsers(res, next);

    return res.status(200).send({ success: true, data: allUsers });
});

/**
 * User ROUTE
 *  /user/:id:
 *   get:
 *     summary: One User
 *     description: Render User by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const oneUser = await userModel.getOneUser(userId, res, next);

    return res.status(200).send({ success: true, data: oneUser });
});

/**
 * User ROUTE
 *  /user:
 *   post:
 *     summary: Create one user
 *     description: Create user with information
 *     { firstName, lastName,phoneNumber, emailAdress, password }
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            emailAdress: req.body.emailAdress,
            password: req.body.password,
            oauth: req.body.oauth,
        };

        await userModel.createOneUser(userInfo, res, next);

        return res.status(201).send({ success: true, msg: `User has been registered` });
    } catch (error) {
        return next(error);
    }
});

/**
 * User ROUTE
 *  /user/:id:
 *   get:
 *     summary: Update One User
 *     description: Update User information { firstName, lastName,phoneNumber, emailAdress} by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
        oauth: req.body.oauth,
    };

    const _newUserInfo = {
        firstName: await userModel.updateUserFirstName(userId, userInfo.firstName, res, next),
        lastName: await userModel.updateUserLastName(userId, userInfo.lastName, res, next),
        phoneNumber: await userModel.updateUserPhoneNumber(userId, userInfo.phoneNumber, res, next),
        emailAdress: await userModel.updateUserEmailAdress(userId, userInfo.emailAdress, res, next),
        oauth: await userModel.updateUserOauth(userId, userInfo.oauth, res, next),
    };

    return res.status(201).send({ success: true, msg: `User with id ${userId} has been updated` });
});

/**
 * User ROUTE
 *  /user/balance/:id:
 *   put:
 *     summary: Update balance of one User
 *     description: Update User Balance by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/user/balance/:id', async (req: Request, res: Response, next: NextFunction) => {
    const balance = req.body.balance;
    const userID = req.params.id;

    await userModel.updateUserBalance(userID, balance, res, next);

    return res.status(201).send({ success: true, msg: `User with id ${userID} added ${balance} to its balance` });
});

/**
 * User ROUTE
 *  /user/partial_balance/:id:
 *   put:
 *     summary: Update partial balance of one User
 *     description: Update User Partial Balance by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/user/partial_balance/:id', async (req: Request, res: Response, next: NextFunction) => {
    const balance = req.body.balance;
    const userID = req.params.id;

    await userModel.updateUserPartialBalance(userID, balance, res, next);

    return res.status(201).send({ success: true, msg: `User with id ${userID} added ${balance} to its balance` });
});

/**
 * User ROUTE
 *  /user/password/:id:
 *   get:
 *     summary: Update password of one User
 *     description: Update User password by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/user/password/:id', async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    const userID = req.params.id;

    await userModel.updateUserPassword(userID, password, res, next);

    return res.status(201).send({ success: true, msg: `User with id ${userID} has updated its password` });
});

/**
 * User ROUTE
 *  /user/:id:
 *   get:
 *     summary: Delete One User
 *     description: Delete User by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Promise}
 */
router.delete('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    await userModel.deleteOneUser(userId, res, next);

    return res.status(200).send({ success: true, msg: `User with id ${userId} was deleted` });
});

module.exports = router;
