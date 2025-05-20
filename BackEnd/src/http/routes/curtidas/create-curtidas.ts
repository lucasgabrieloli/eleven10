import z from "zod";
import { createCurtida } from "../../../functions/curtidas/create-curtida"
import { app } from "../../server";


export const createdCurtida = async () => {
    app.post(
        "/curtida",
        {
            schema: {
                body: z.object({
                    idCurtidas: z.string({ message: "usuarioIdusuario is required" }), 
                    usuarioIdUsuario: z.string({ message: "usuarioIdusuario is required" }),
                    publicacoesIdPublicacoes: z.string({ message: "PublicacoesIdpublicacoes is required" }),

                }),
            },
        },
        async (req, reply) => {
            const {
                idCurtidas,
                usuarioIdUsuario,
                publicacoesIdPublicacoes,

              
            } = req.body;

            const createdAdress = await createCurtida({
                 idCurtidas,
                 usuarioIdUsuario,
                 publicacoesIdPublicacoes,

            });
            reply
                .status(201)
                .send({ message: "Adress created successfully", id: createdAdress });
        },
    );
};
