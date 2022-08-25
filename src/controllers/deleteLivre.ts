import pool from "../database";
import { Request, Response } from "express";

export const deleteLivre = async (req: Request, res: Response) => {
  const isbn= req.body.isbn;
  try {
    const result = await pool.query(
      `DELETE  FROM public.livre WHERE isbn='${isbn}' returning isbn`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
