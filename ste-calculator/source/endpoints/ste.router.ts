import express, { Request, Response } from "express";
import HttpException from "../common/http-exception";
import * as SteService from "./ste.service";

export const steRouter = express.Router();

steRouter.get(/^\/((?:terra+[0-9a-z].*))(?:\/(?=$))?(?=\/|$)/i, async (req: Request, res: Response) => {
    try {
        const ste = await SteService.getSteValue(req.params[0]);
        res
            .type('application/json')
            .status(200)
            .send(ste);
    } catch (e) {
        res.status(500).send((e as HttpException).message);
    }
});