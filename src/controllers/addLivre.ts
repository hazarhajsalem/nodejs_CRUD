import pool from "../database";
import { Request, Response } from "express";


export const verifyIsbn = async (isbn: string) => {

  try {
      const result = await pool.query(`SELECT isbn FROM public.Livre WHERE isbn='${isbn}' `);

      if (result.rows.length >0  ) {
          return true
      } else {
          return false
      }
  } catch (error) {
      console.log(error);
  }
};
export const addLivre = async (request: Request, response: Response) => {
  try {
    const {isbn,titre,auteur,categorie} = request.body;
    if (await verifyIsbn(isbn) === false) {
      
        let sql =`INSERT INTO public.livre(isbn, titre, auteur, categorie) VALUES ('${isbn}','${titre}','${auteur}','${categorie}') `
        const newBook =  await pool.query(sql)      
        if (newBook.rowCount > 0) {
          response.json({ "error": false, "data": "ADD"});
      } else {
          response.json({ "error": true, "data": "there's an error !!" });
      }  
      }
      else{
        response.json({ "error": true, "data": "ISBN exist !!" });
      }
  } catch (error) {
    console.log(error);
  }
};
