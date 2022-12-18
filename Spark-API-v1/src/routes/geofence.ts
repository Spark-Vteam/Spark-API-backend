import { NextFunction, Request, Response, Router } from 'express';

import geofenceModel from '../models/geofence';
const router = Router();

interface GeofenceInfo {
    Coordinates: string;
    Info: string;
    Type: number;
}

/**
 * Geofence ROUTE
 * /:
 *   get:
 *     summary: Display all geofences
 *     description: Render list of all geofences
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/geofence', async (req: Request, res: Response, next: NextFunction) => {
    const allGeofences = await geofenceModel.showAllGeofences(res, next);
    return res.status(200).send({ success: true, data: allGeofences });
});

/**
 * Geofence ROUTE
 * /:
 *   get:
 *     summary: Display information for one geofence
 *     description: Render a specific geofence
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.get('/geofence/:id', async (req: Request, res: Response, next: NextFunction) => {
    let geofenceId = parseInt(req.params.id);
    const oneGeofence = await geofenceModel.getOneGeofence(geofenceId, res, next);

    return res.status(200).send({ success: true, data: oneGeofence });
});

/**
 * Geofence ROUTE
 * /:
 *   get:
 *     summary: Create one geofence
 *     description: Create one geofence with information:
 * { coordinates, info , type }
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.post('/geofence', async (req: Request, res: Response, next: NextFunction) => {
    const geofenceInfo = {
        coordinates: req.body.coordinates,
        info: req.body.info,
        type: req.body.type,
    };

    await geofenceModel.createOneGeofence(geofenceInfo, res, next);

    return res.status(200).send({
        success: true,
        msg: `A new geofence has been created.`,
    });
});

/**
 * Geofence ROUTE
 * /:
 *   put:
 *     summary: Update coordinates for one geofence
 *     description: Update one geofence with information: { coordinates }
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/geofence/coordinates/:id', async (req: Request, res: Response, next: NextFunction) => {
    let geofenceInfo = {
        geofenceId: req.params.id,
        coordinates: req.body.coordinates,
    };

    await geofenceModel.updateCoordinates(geofenceInfo, res, next);

    return res.status(200).send({
        success: true,
        msg: `Geofence with id has been updated with new coordinates ${geofenceInfo.coordinates}`,
    });
});

/**
 * Geofence ROUTE
 * /:
 *   put:
 *     summary: Update info for one geofence
 *     description: Update one geofence with information: { info }
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/geofence/info/:id', async (req: Request, res: Response, next: NextFunction) => {
    const geofenceInfo = {
        geofenceId: req.params.id,
        info: req.body.info,
    };

    await geofenceModel.updateInfo(geofenceInfo, res, next);

    return res
        .status(200)
        .send({ succes: true, msg: `Geofence with id has been updated with new info ${geofenceInfo.info}` });
});

/**
 * Geofence ROUTE
 * /:
 *   put:
 *     summary: Update type for one geofence
 *     description: Update one geofence with information: { type }
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.put('/geofence/type/:id', async (req: Request, res: Response, next: NextFunction) => {
    const geofenceInfo = {
        geofenceId: req.params.id,
        type: req.body.type,
    };

    await geofenceModel.updateType(geofenceInfo, res, next);

    return res
        .status(200)
        .send({ success: true, msg: `Geofence with id has been updated with new type ${geofenceInfo.type}` });
});

/**
 * Geofence ROUTE
 * /:
 *   post:
 *     summary: Delete one geofence
 *     description: Delete a geofence with its id
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */
router.delete('/geofence/:id', async (req: Request, res: Response, next: NextFunction) => {
    const geofenceId = parseInt(req.params.id);

    await geofenceModel.deleteOneGeofence(geofenceId, res, next);

    return res.status(200).send({ success: true, msg: `Geofence with id ${geofenceId} has been deleted (Type 40)` });
});

export default router;
