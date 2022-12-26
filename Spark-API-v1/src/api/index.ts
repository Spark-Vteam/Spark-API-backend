import express, { Application, Request, Response, Router } from 'express';
const router = Router();

router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));

module.exports = router;
