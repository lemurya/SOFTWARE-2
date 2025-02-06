import { CategoriaDatasource, CategoriaEntity, CategoriaRepository, CreateCategoriaDTO, UpdateCategoriaDTO } from "../../domain";

export class CategoriaRepositoryImpl implements CategoriaRepository{

    constructor(
        private readonly dataSource: CategoriaDatasource
    ){}

    create(createCategoriaDTO: CreateCategoriaDTO): Promise<CategoriaEntity> {
        return this.dataSource.create(createCategoriaDTO)
    }
    getAll(): Promise<CategoriaEntity[]> {
        return this.dataSource.getAll()
    }
    findById(id: number): Promise<CategoriaEntity> {
        return this.dataSource.findById(id)
    }
    findByName(name: string): Promise<CategoriaEntity> {
        return this.dataSource.findByName(name)
    }
    updateById(updateCategoriaDTO: UpdateCategoriaDTO): Promise<CategoriaEntity> {
        return this.dataSource.updateById(updateCategoriaDTO)
    }
    deleteById(id: number): Promise<CategoriaEntity> {
        return this.dataSource.deleteById(id)
    }
    
}