import pool from "../database";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const email = req.body.email
  const psw = req.body.password
  try {
    const result = await pool.query(`SELECT * FROM public.User Where email='${email}'`);

    if(result.rows.length > 0)
    { 
        if(result.rows[0].psw === psw)
        {
          res.json({"errors": true, "data":"Email exist "})
        }
        else
        {
          res.json({"errors": false, "data":"password uncorrect !! "})
        }
    }
    else
    {
      res.json({"errors": false, "data":"Email doesn't exist "})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
