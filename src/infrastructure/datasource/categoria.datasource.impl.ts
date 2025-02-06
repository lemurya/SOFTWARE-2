import { prisma } from "../../data/postgres";
import { CategoriaDatasource, CategoriaEntity, CreateCategoriaDTO, CustomError, UpdateCategoriaDTO } from "../../domain";

export class CategoriaDatasourceImpl implements CategoriaDatasource{
    async create(createCategoriaDTO: CreateCategoriaDTO): Promise<CategoriaEntity> {
        const categoria = await prisma.categoria.create({
            data: createCategoriaDTO
        })
        return CategoriaEntity.fromObject(categoria)
    }
    async getAll(): Promise<CategoriaEntity[]> {
        const categorias = await prisma.categoria.findMany()
        return categorias.map(c => CategoriaEntity.fromObject(c))
    }
    async findById(id: number): Promise<CategoriaEntity> {
        const categoria = await prisma.categoria.findUnique({
            where: {
                id
            }
        })
        if (!categoria) throw new CustomError(`No se encontro categoria con ID: ${id}`, 404);
        return CategoriaEntity.fromObject(categoria)
    }
    async findByName(name: string): Promise<CategoriaEntity> {
        const categoria = await prisma.categoria.findUnique({
            where: {
                nombre: name
            }
        })
        if (!categoria) throw new CustomError(`No se encontro categoria con Nombre: ${name}`, 404);
        return CategoriaEntity.fromObject(categoria)
    }
    async updateById(updateCategoriaDTO: UpdateCategoriaDTO): Promise<CategoriaEntity> {
        await this.findById(updateCategoriaDTO.id)
        const updateCat = await prisma.categoria.update({
            where: {
                id: updateCategoriaDTO.id
            },
            data: updateCategoriaDTO!.values
        })
        return CategoriaEntity.fromObject(updateCat)
    }
    async deleteById(id: number): Promise<CategoriaEntity> {
        await this.findById(id)
        const deleted = await prisma.categoria.delete({
            where: {
                id: id
            }
        })
        return CategoriaEntity.fromObject(deleted)
    }
    
}