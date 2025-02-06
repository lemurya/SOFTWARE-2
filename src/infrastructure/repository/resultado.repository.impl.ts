import { CreateResultadoDTO, ResultadoDatasource, ResultadoEntity, ResultadoRepository } from "../../domain";

export class ResultadoRepositoryImpl implements ResultadoRepository{
    constructor(
        private readonly dataSource: ResultadoDatasource
    ){}
    create(createResultadoDTO: CreateResultadoDTO): Promise<ResultadoEntity> {
        return this.dataSource.create(createResultadoDTO)
    }
    getByuserId(UserId: number): Promise<ResultadoEntity[]> {
        return this.dataSource.getByuserId(UserId)
    }
}