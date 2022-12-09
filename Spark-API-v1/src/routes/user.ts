import { Request, Response, Router } from 'express';

import userModel from '../models/user';
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
router.get('/user', async (req: Request, res: Response) => {
    try {
        const allUsers = await userModel.showAllUsers();

        const allUsersData = JSON.parse(JSON.stringify(allUsers));
        if (allUsersData[0].length === 0) {
            return res.status(404).send('No users currently in the system');
        }
        return res.status(200).send(allUsers);
    } catch (error) {
        return res.status(404).send(error);
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
router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const oneUser = await userModel.getOneUser(req.params.id);

        return res.status(200).send(oneUser);
    } catch (error) {
        return res.status(404).send(error);
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
router.post('/user', async (req: Request, res: Response) => {
    try {
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            emailAdress: req.body.emailAdress,
            password: req.body.password,
        };

        const newUser = await userModel.createOneUser(
            userInfo.firstName,
            userInfo.lastName,
            userInfo.phoneNumber,
            userInfo.emailAdress,
            userInfo.password
        );

        res.status(201).send(
            `User has been created with the following information:\n
                firstName: ${userInfo.firstName},
                lastName: ${userInfo.lastName}, 
                phoneNumber: ${userInfo.phoneNumber}, 
                emailAdress: ${userInfo.emailAdress}`
        );
    } catch (error) {
        return res.status(404).send(error);
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
router.put('/user/:id', async (req: Request, res: Response) => {
    const userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
    };
    const userID = req.params.id;

    const _newUserInfo = {
        firstName: await userModel.updateUserFirstName(userID, userInfo.firstName),
        lastName: await userModel.updateUserLastName(userID, userInfo.lastName),
        phoneNumber: await userModel.updateUserPhoneNumber(userID, userInfo.phoneNumber),
        emailAdress: await userModel.updateUserEmailAdress(userID, userInfo.emailAdress),
    };

    return res.status(201).send(
        `User with id ${userID} has been updated to:\n
            firstName: ${userInfo.firstName},
            lastName: ${userInfo.lastName}, 
            phoneNumber: ${userInfo.phoneNumber}, 
            emailAdress: ${userInfo.emailAdress}`
    );
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
router.put('/user/balance/:id', async (req: Request, res: Response) => {
    const balance = req.body.balance;
    const userID = req.params.id;
    try {
        await userModel.updateUserBalance(userID, balance);

        return res.status(201).send(`User with id ${userID} added ${balance} to its balance`);
    } catch (error) {
        return res.status(404).send(error);
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
router.put('/user/partial_balance/:id', async (req: Request, res: Response) => {
    const balance = req.body.balance;
    const userID = req.params.id;
    try {
        await userModel.updateUserPartialBalance(userID, balance);

        return res.status(201).send(`User with id ${userID} added ${balance} `);
    } catch (error) {
        return res.status(404).send(error);
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
router.put('/user/password/:id', async (req: Request, res: Response) => {
    const password = req.body.password;
    const userID = req.params.id;
    try {
        await userModel.updateUserPassword(userID, password);

        return res.status(201).send(`User with id ${userID} has updated its password`);
    } catch (error) {
        return res.status(404).send(error);
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
router.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        await userModel.deleteOneUser(req.params.id);

        // 202: The request has been accepted for processing, but the processing has not been completed.
        // 204: The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.
        // 200: The request has succeeded and the request payload includes a representation of the status of the action.
        return res.status(200).send(`User with id ${req.params.id} was deleted`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
