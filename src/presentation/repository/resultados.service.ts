import { prisma } from "../../data/postgres";

export interface ResultadoObject {
    id: number;
    // calificacion: number,
    cantidadCorrectas: number;
    cantidadIncorrectas: number;
    tiempo: number;
    monedas: number;
    experiencia: number
}

export class ResultadosService {
    constructor() {}
    getResultadosPorUserId = async (userId: number) => {
        try {
            const resultados = await prisma.resultado.findMany({
                where: {
                    id_usuario: userId,
                },
            });
            if (resultados.length === 0) return "No se encontraron resultados"
            return resultados;

        } catch (error) {
            return new Error('Error al buscar resultados')
        }
    };

    crearResultado = async (userId: number, category: ResultadoObject) => {
        const calificacion =
            Math.round(
                (category.cantidadCorrectas * 200) /
                    (category.cantidadCorrectas + category.cantidadIncorrectas)
            ) / 10.0;

        const resultadoExiste = await prisma.resultado.findUnique({
            where: {
                id_usuario_id_categoria: {
                    id_categoria: category.id,
                    id_usuario: userId
                }
            }
        })
        this.sumarRecompensaUsuario(userId,category.monedas,category.experiencia)
        if (!resultadoExiste){
            const resultado = await prisma.resultado.create({
                data: {
                    cantidadCorrectas: category.cantidadCorrectas,
                    cantidadIncorrectas: category.cantidadIncorrectas,
                    calificacion: calificacion,
                    tiempo: category.tiempo,
                    id_usuario: userId,
                    id_categoria: category.id,
                },
            });
            if (!resultado) throw new Error("no se pudo crear el resultado");
            return resultado
        }else{
            const resultado = await prisma.resultado.update({
                where:{
                    id_usuario_id_categoria: {
                        id_usuario: userId,
                        id_categoria: category.id
                    }
                },
                data: {
                    cantidadCorrectas: category.cantidadCorrectas,
                    cantidadIncorrectas: category.cantidadIncorrectas,
                    calificacion: calificacion,
                    tiempo: category.tiempo,
                    id_usuario: userId,
                    id_categoria: category.id,
                },
            });
            if (!resultado) throw new Error("no se pudo crear el resultado");
            return resultado
        }
        
    };

    private sumarRecompensaUsuario = async (userId: number, monedas: number, experiencia:number) => {
        const usuarioExiste = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!usuarioExiste) throw new Error(`El usuario con id ${userId} no existe`)
        const actualizarDatos = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                monedas: usuarioExiste.monedas+monedas,
                exp: usuarioExiste.exp+experiencia
            }
        })
        return actualizarDatos
    }
}
