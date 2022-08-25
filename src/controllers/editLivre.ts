import pool from "../database";
import { Request, Response } from "express";

export const editLivre = async (req: Request, res: Response) => {
    const {isbn,titre,auteur,categorie} = req.body;
    try {
      const result = await pool.query(`UPDATE public.livre	SET titre='${titre}', auteur='${auteur}', categorie='${categorie}' WHERE isbn='${isbn}';`);
      res.status(200).json(result.rows);
      console.log("*************",result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }  
};
