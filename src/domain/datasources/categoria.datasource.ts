import { CreateCategoriaDTO, UpdateCategoriaDTO } from "../dtos";
import { CategoriaEntity, PreguntaEntity, RespuestaEntity } from "../entities";

export abstract class CategoriaDatasource {
    abstract create(
        createCategoriaDTO: CreateCategoriaDTO
    ): Promise<CategoriaEntity>;
    abstract getAll(): Promise<CategoriaEntity[]>;

    abstract findById(id: number): Promise<CategoriaEntity>;
    abstract findByName(name: string): Promise<CategoriaEntity>;
    abstract updateById(
        updateCategoriaDTO: UpdateCategoriaDTO
    ): Promise<CategoriaEntity>;
    abstract deleteById(id: number): Promise<CategoriaEntity>
    abstract getAllPreguntas(id: number): Promise<{categoria: CategoriaEntity, preguntas: PreguntaEntity[]}>;
    abstract getSimulacro(id: number): Promise<{categoria: CategoriaEntity, preguntas: {pregunta: PreguntaEntity,respuestas: RespuestaEntity[]}[]}>
}
