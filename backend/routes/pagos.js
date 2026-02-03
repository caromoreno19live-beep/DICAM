import express from "express";
import { crearPreferencia } from "../js/mercadopago.js";

const router = express.Router();

router.post("/crear-preferencia", crearPreferencia);

export default router;
