import { RequestHandler } from "express";

export const register: RequestHandler = (req, res) => {
    res.json({ ok: true });
}