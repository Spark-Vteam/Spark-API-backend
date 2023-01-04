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
    try {
        return await userModel.showAllUsers(res, next);
    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
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
    if (userId) {
        try {
            return await userModel.getOneUser(userId, res, next);
        } catch (error) {
            // Pass the error to the error handler middleware
            next(error);
        }
    }
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
    const userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
        password: req.body.password,
        oauth: req.body.oauth,
    };

    // Check if all keys in the userInfo object have truthy values 
    // EXCEPT OAUTH
    const allKeysHaveValues = Object.values(userInfo).every(Boolean);
    if (allKeysHaveValues) {
        try {
            return await userModel.createOneUser(userInfo, res, next);
        } catch (error) {
            // Pass the error to the error handler middleware
            next(error);
        }
    } else {
        return res.status(400).json({
            errors: {
                message: 'Some information is missing, please check your form and try again.',
            },
        });
    }
});

/**
 * User ROUTE
 *  /user/login:
 *   post:
 *     summary: Login one user
 *     description: Login user with information
 *     { emailAdress, password }
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.post('/user/login', async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.body;
    try {
        return await userModel.login(userInfo, res, next);
    } catch (error) {
        next(error);
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

    try {
        const _newUserInfo = {
            firstName: await userModel.updateUserFirstName(userId, userInfo.firstName, res, next),
            lastName: await userModel.updateUserLastName(userId, userInfo.lastName, res, next),
            phoneNumber: await userModel.updateUserPhoneNumber(userId, userInfo.phoneNumber, res, next),
            emailAdress: await userModel.updateUserEmailAdress(userId, userInfo.emailAdress, res, next),
            oauth: await userModel.updateUserOauth(userId, userInfo.oauth, res, next),
        };

        return res.status(200).json({ success: true, msg: `User with id ${userId} was updated` });
    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
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

    try {
        return await userModel.updateUserBalance(userID, balance, res, next);
    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
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

    try {
        return await userModel.updateUserPartialBalance(userID, balance, res, next);
    } catch (error) {
        // Pass the error to the error handler middleware
        next(error);
    }
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

    try {
        return await userModel.updateUserPassword(userID, password, res, next);
    } catch (error) {
        next(error);
    }
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
    try {
        return await userModel.deleteOneUser(userId, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
