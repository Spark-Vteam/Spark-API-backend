import { Request, response, Response, Router } from 'express';
import fetch from 'cross-fetch';
const router = Router();

router.get('/auth/getAccessToken', async function (req: Request, res: Response) {
    const code = req.query.code;

    await fetch(
        `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRETS}&code=${code}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        }
    )
        .then(async (response) => {
            return await response.json();
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        });
});

router.get('/auth/getUserData', async function (req: Request, res: Response) {
    await fetch(`https://api.github.com/user`, {
        method: 'GET',
        headers: {
            Authorization: req.get('Authorization')!,
        },
    })
        .then(async (response) => {
            return await response.json();
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        });
});

module.exports = router;
