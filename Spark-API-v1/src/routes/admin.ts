import { Request, Response, Router } from 'express';

import adminModel from '../models/admin';
const router = Router();

interface AdminInfo {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    EmailAdress: string;
    Authority: number;
    Password: string;
}

/**
 * Admin ROUTE
 * /:
 *   get:
 *     summary: Display all admins
 *     description: Render admin list
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/admin', async (req: Request, res: Response) => {
    try {
        const allAdmins = await adminModel.showAllAdmins();

        const allAdminsData = JSON.parse(JSON.stringify(allAdmins));

        if (allAdminsData[0].length === 0) {
            return res.status(404).send('No admins currently in the system');
        }
        return res.status(200).send(allAdmins);
    } catch (error) {
        res.status(404).send(error);
    }
});

/**
 * Admin ROUTE
 *  /admin/:id:
 *   get:
 *     summary: One admin
 *     description: Render admin by adminId
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.get('/admin/:id', async (req: Request, res: Response) => {
    try {
        const oneAdmin = await adminModel.getOneAdmin(req.params.id);
        const oneAdminData = JSON.parse(JSON.stringify(oneAdmin));
        if (oneAdminData[0].length === 0) {
            return res.status(404).send(`No admin for Id ${req.params.id} was found`);
        }
        return res.status(200).send(oneAdmin);
    } catch (error) {
        return res.status(404).send(error);
    }
});

/**
 * Admin ROUTE
 *  /admin/:id:
 *   get:
 *     summary: Create one admin
 *     description: Create Admin with information
 *     { firstName, lastName,phoneNumber, emailAdress, authority, password }
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.post('/admin', async (req: Request, res: Response) => {
    try {
        const adminInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            emailAdress: req.body.emailAdress,
            authority: req.body.authority,
            password: req.body.password,
        };

        const newAdmin = await adminModel.createOneAdmin(
            adminInfo.firstName,
            adminInfo.lastName,
            adminInfo.phoneNumber,
            adminInfo.emailAdress,
            adminInfo.authority,
            adminInfo.password
        );

        res.status(201).send(
            `Admin has been created with the following information:\n
                firstName: ${adminInfo.firstName},
                lastName: ${adminInfo.lastName}, 
                phoneNumber: ${adminInfo.phoneNumber}, 
                emailAdress: ${adminInfo.emailAdress}`
        );
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
