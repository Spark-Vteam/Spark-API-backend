import { Request, Response, Router } from 'express';

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
router.get('/geofence', async (req: Request, res: Response) => {
    try {
        const allGeofences = await geofenceModel.showAllGeofences();
        const allGeofencesData = JSON.parse(JSON.stringify(allGeofences));
        if (allGeofencesData[0].length === 0) {
            return res.status(404).send('No geofences currently in the system');
        }
        return res.status(200).send(allGeofences);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.get('/geofence/:id', async (req: Request, res: Response) => {
    try {
        const oneGeofence = await geofenceModel.getOneGeofence(req.params.id);

        const oneGeofenceData = JSON.parse(JSON.stringify(oneGeofence));
        if (oneGeofenceData[0].length === 0) {
            return res.status(404).send(`No geofence with id ${req.params.id} in the system`);
        }
        return res.status(200).send(oneGeofence);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.post('/geofence', async (req: Request, res: Response) => {
    try {
        const geofenceInfo = {
            coordinates: req.body.coordinates,
            info: req.body.info,
            type: req.body.type,
        };

        const _newGeofence = await geofenceModel.createOneGeofence(
            geofenceInfo.coordinates,
            geofenceInfo.info,
            geofenceInfo.type
        );

        return res.status(200).send(`A new geofence has been created with info:\n
        Coordinates: ${geofenceInfo.coordinates},
        Info: ${geofenceInfo.info},
        Type: ${geofenceInfo.type}
        `);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.put('/geofence/coordinates/:id', async (req: Request, res: Response) => {
    try {
        const geofenceId = req.params.id;
        const coordinates = req.body.coordinates;

        const _newCoordinates = await geofenceModel.updateCoordinates(geofenceId, coordinates);

        return res.status(200).send(`Geofence with id has been updated with new coordinates ${coordinates}`);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.put('/geofence/info/:id', async (req: Request, res: Response) => {
    try {
        const geofenceId = req.params.id;
        const info = req.body.info;

        const _newInfo = await geofenceModel.updateInfo(geofenceId, info);

        return res.status(200).send(`Geofence with id has been updated with new info ${info}`);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.put('/geofence/type/:id', async (req: Request, res: Response) => {
    try {
        const geofenceId = req.params.id;
        const type = req.body.type;

        const _newType = await geofenceModel.updateType(geofenceId, type);

        return res.status(200).send(`Geofence with id has been updated with new type ${type}`);
    } catch (error) {
        return res.status(404).send(error);
    }
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
router.delete('/geofence/:id', async (req: Request, res: Response) => {
    try {
        const geofenceId = req.params.id;

        const deleteGeofence = await geofenceModel.deleteOneGeofence(geofenceId);

        return res.status(200).send(`Geofence with id ${geofenceId} has been deleted (Type 40)`);
    } catch (error) {
        return res.status(404).send(error);
    }
});

export default router;
