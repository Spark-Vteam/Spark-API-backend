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
router.post('/user/:id', async (req: Request, res: Response) => {
    const userInfo: UserInfo = {
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
 *  /user/:id:
 *   get:
 *     summary: Update balance of one User
 *     description: Update User Balance by ID
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post(
    '/user/balance/:id',
    (Promise<void> = async (req: Request, res: Response) => {
        const balance = req.body.balance;
        const userID = req.params.id;
        try {
            const newBalance = await userModel.updateUserBalance(userID, balance);

            return res.status(201).send(`User with id ${userID} added ${balance} to its balance`);
        } catch (error) {
            return res.status(404).send(error);
        }
    })
);

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
        const deletedUser = await userModel.deleteOneUser(req.params.id);

        const deletedUserData = JSON.parse(JSON.stringify(deletedUser));

        return res.status(204).send(`User with id ${deletedUserData.id} was deleted`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
