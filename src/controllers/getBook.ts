import pool from "../database";
import { Request, Response } from "express";

export const getBook = async (req: Request, res: Response) => {

  try {
    const result = await pool.query("SELECT * FROM public.livre");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const getBookwhere = async (req: Request, res: Response) => {
  const isbn = req.body.isbn;
  try {
    const result = await pool.query(`SELECT * FROM public.livre WHERE isbn='${isbn}';`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};