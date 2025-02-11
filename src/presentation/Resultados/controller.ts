import { Request, Response } from "express";
import { CreateResultado, CustomError, GetResultadosByUser, ResultadoRepository } from "../../domain";
import { CreateResultadoDTO } from '../../domain/dtos/resultado/create-resultado.dto';



export class ResultadosController{
    constructor(
        private readonly resultadoRepository: ResultadoRepository
    ){}
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: "Internal server error"})
    }
    public getAllResultados = (req: Request, res: Response) => {
        const {id} = req.body.user
        new GetResultadosByUser(this.resultadoRepository)
            .execute(id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    public postResultado  = (req: Request, res: Response) => {
        const {id} = req.body.user
        const [error, createResultadoDto] = CreateResultadoDTO.create({
            tiempo: req.body.tiempo,
            cantidadCorrectas: req.body.cantidadCorrectas,
            cantidadIncorrectas: req.body.cantidadIncorrectas,
            id_categoria: req.body.id_categoria,
            id_usuario: id
        })
        const monedas = req.body.monedas
        const experiencia = req.body.experiencia
        if (error || !monedas || !experiencia) return res.status(400).json(error);
        new CreateResultado(this.resultadoRepository)
            .execute(createResultadoDto!,monedas,experiencia)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }


}

