import { db } from '../db';
import { Curriculo } from '../db/schemas';
import { eq } from 'drizzle-orm';

export const criarCurriculoDB = async (dados: typeof Curriculo.$inferInsert) => {
  return await db.insert(Curriculo).values(dados).returning();
};

export const obterCurriculoDB = async (idAtleta: string) => {
  return await db.select().from(Curriculo).where(eq(Curriculo.idAtleta, idAtleta));
};

export const atualizarCurriculoDB = async (idAtleta: string, dados: Partial<typeof Curriculo.$inferInsert>) => {
  return await db.update(Curriculo).set(dados).where(eq(Curriculo.idAtleta, idAtleta)).returning();
};

export const deletarCurriculoDB = async (idAtleta: string) => {
  return await db.delete(Curriculo).where(eq(Curriculo.idAtleta, idAtleta)).returning();
};
