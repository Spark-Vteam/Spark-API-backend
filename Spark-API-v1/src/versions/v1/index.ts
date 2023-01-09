import express, { Application, Request, Response, Router } from 'express';
const router = Router();

/**
 * v1 ROUTE
 * /v1/:
 * Below endpoints are included in version 1
 */
router.use('/', require('./routes/main'));
router.use('/', require('./routes/station'));
router.use('/', require('./routes/user'));
router.use('/', require('./routes/bike'));
router.use('/', require('./routes/rent'));
router.use('/', require('./routes/admin'));
router.use('/', require('./routes/auth'));
router.use('/', require('./routes/charger'));
router.use('/', require('./routes/geofence'));
router.use('/', require('./routes/invoice'));
router.use('/', require('./routes/pricing'));
router.use('/', require('./routes/creditcard'));

module.exports = router;
