import { CreatePreguntaDTO, PreguntaDatasource, PreguntaEntity, PreguntaRepository, UpdatePreguntaDTO } from "../../domain";

export class PreguntaRepositoryImpl implements PreguntaRepository{
    constructor(
        private readonly dataSource: PreguntaDatasource
    ){}
    create(createPreguntaDTO: CreatePreguntaDTO): Promise<PreguntaEntity> {
        return this.dataSource.create(createPreguntaDTO)
    }
    getById(id: number): Promise<PreguntaEntity> {
        return this.dataSource.getById(id)
    }
    updateById(updatePreguntaDTO: UpdatePreguntaDTO): Promise<PreguntaEntity> {
        return this.dataSource.updateById(updatePreguntaDTO)
    }
    deleteById(id: number): Promise<PreguntaEntity> {
        return this.dataSource.deleteById(id)
    }
    
}