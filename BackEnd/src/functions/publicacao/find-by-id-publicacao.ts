import { eq } from "drizzle-orm";
import { db } from "../../db";
import { posts } from "../../db/schemas/index";

export const getPublicacaoBYId = async (id: string) => {
    const publicacao = await db
        .select({
            idPosts: posts.idPosts,
            idAtleta: posts.idAtleta,
            midiaUrl: posts.midiaUrl,
            legenda: posts.legenda,
            criadoEm: posts.criadoEm,
            

        })
        .from(posts)
        .where(eq(posts.idPosts, id));

    return posts;
};