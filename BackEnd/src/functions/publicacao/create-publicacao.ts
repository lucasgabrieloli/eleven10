import { db } from '../../db';
import { posts } from '../../db/schemas/index';

export const criarPost = async ({
  idAtleta,
  midiaUrl,
  legenda,
}: {
  idAtleta: string;
  midiaUrl: string;
  legenda: string;
}) => {
  const midiaBuffer = Buffer.from(midiaUrl, 'base64');

  const novoPost = await db.insert(posts).values({
    idAtleta,
    midiaUrl: midiaBuffer,
    legenda,

  }).returning();

  return novoPost;
};
