import pool from "../database";
import { Request, Response } from "express";

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await pool.query(
      `DELETE  FROM public.user WHERE email='${email}' returning email`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
