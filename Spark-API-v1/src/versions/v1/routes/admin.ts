import { NextFunction, Request, Response, Router } from 'express';

import adminModel from '../../../models/admin';
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
router.get('/admin', async (req: Request, res: Response, next: NextFunction) => {
    const allAdmins = await adminModel.showAllAdmins(res, next);

    return res.status(200).send({ success: true, data: allAdmins });
});

/**
 * Admin ROUTE
 *  /admin/mail/:
 *   post:
 *     summary: Admin login
 *     description: Manual login for admin
 *  @param {Request}  req  The incoming request.
 *  @param {Response} res  The outgoing response.
 *  @param {Function} next Next to call in chain of middleware.
 *
 * @returns {Response}
 */
router.post('/admin/login', async (req: Request, res: Response, next: NextFunction) => {
    const adminInfo = req.body;    
    try {
        return await adminModel.adminLogin(adminInfo, res, next);
    } catch (error) {
        next(error);
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
router.get('/admin/:id', async (req: Request, res: Response, next: NextFunction) => {
    const adminId = parseInt(req.params.id);
    const oneAdmin = await adminModel.getOneAdmin(adminId, res, next);
    return res.status(200).send({ success: true, data: oneAdmin });
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
router.post('/admin', async (req: Request, res: Response, next: NextFunction) => {
    const adminInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
        authority: req.body.authority,
        password: req.body.password,
    };

    try {
        return await adminModel.createOneAdmin(adminInfo, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
