import { Request, Response } from "express";
import { AnswerService } from "../repository/answer.service";

export class RespuestaController{
    constructor(
        public readonly answerService: AnswerService
    ){}

    public getRespuestas = async (req: Request, res: Response) => {
        
    }
    public getRespuestasByIdPregunta = async (req: Request, res: Response) => {

    }

    public crearRespuesta = (req: Request, res: Response) => {
        const {id_pregunta, contenido, esCorrecto} = req.body
    }

    public actualizarRespuesta = (req: Request, res: Response) => {
        
    }
    
    public eliminarRespuesta = (req: Request, res: Response) => {

    }
}