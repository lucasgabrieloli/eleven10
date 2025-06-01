
import { pgTable, integer, varchar, timestamp, boolean,  text, unique } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2'
import { copyFile, cp } from 'fs';
import { customType } from 'drizzle-orm/pg-core';
import { int } from 'drizzle-orm/mysql-core';

const bytea = customType<{ data: Buffer; notNull: true }>({
  dataType() {
    return 'bytea';
  },
});


export const generoEnum = pgEnum('genero', ['Masculino', 'Feminino']);



export const atleta = pgTable('atleta', {
  idAtleta: text('id_atleta').primaryKey().$defaultFn(() => createId()),
  username: varchar('username', { length: 30 }).notNull().unique(),
  senha: varchar('senha', { length: 24 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  nomeCompleto: varchar('nome_completo', { length: 50 }).notNull(),
  dataNascimento: timestamp('data_nascimento').notNull(),
  genero: generoEnum('genero').notNull(),
  telefone: varchar('telefone', { length: 15 }).notNull(),
  logadouro: varchar('logadouro', { length: 100 }).notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export const olheiro = pgTable('olheiro', {
  idOlheiro: text('id_olheiro').primaryKey().$defaultFn(() => createId()),
  username: varchar('username', { length: 30 }).notNull().unique(),
  senha: varchar('senha', { length: 24 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  nomeCompleto: varchar('nome_completo', { length: 50 }).notNull(),
  cpf: varchar('cpf', { length: 11 }).notNull().unique(),
  dataNascimento: timestamp('data_nascimento').notNull(),
  genero: generoEnum('genero').notNull(),
  telefone: varchar('telefone', { length: 15 }).notNull(),
  logadouro: varchar('logadouro', { length: 100 }).notNull(),
  verificado: boolean('verificado').notNull().default(false),
});

export const eventos = pgTable('eventos', {
  idEventos: text('id_eventos').primaryKey().$defaultFn(() => createId()),
  idOlheiro: text('id_olheiro').notNull().references(() => olheiro.idOlheiro),
  nomeTime: varchar('nome_time', { length: 30 }).notNull(),
  dataEvento: timestamp('data_evento').notNull(),
  local: varchar('local', { length: 100 }).notNull(),
  horario: timestamp('horario').notNull(),
  categoria: varchar('categoria', { length: 20 }).notNull(),
  posicoes: varchar('posicoes', { length: 100 }).notNull(),
});

export const posts = pgTable('posts', {
  idPosts: text('id_posts').primaryKey().$defaultFn(() => createId()),
  idAtleta: text('id_atleta').notNull().references(() => atleta.idAtleta),
  idOlheiro: text('id_olheiro').notNull().references(() => olheiro.idOlheiro),
  midia: bytea ('midia') .notNull(),
  legenda: text('legenda').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export const curtida = pgTable('curtida', {
  idCurtida: text('id_curtida').primaryKey().$defaultFn(() => createId()),
  idposts: text('id_posts').notNull().references(() => posts.idPosts),
  idAtleta: text('id_atleta').notNull().references(() => atleta.idAtleta),
  idOlheiro: text('id_olheiro').notNull().references(() => olheiro.idOlheiro),
  criadoem: timestamp('criado_em').notNull().defaultNow(),
});

export const comentarios = pgTable('comentarios', {
  idComentarios: text('id_comentarios').primaryKey().$defaultFn(() => createId()),
  idPosts: text('id_posts').notNull().references(() => posts.idPosts),
  idAtleta: text('id_atleta').notNull().references(() => atleta.idAtleta),
  idOlheiro: text('id_olheiro').notNull().references(() => olheiro.idOlheiro),
  conteudo: text('comentario').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export const perfil = pgTable('perfil', {
  idPerfil: text('id_perfil').primaryKey().$defaultFn(() => createId()),
  idAtleta: text('id_atleta').notNull().references(() => atleta.idAtleta),
  fotoPerfil: bytea('foto_perfil').notNull(),
  idPosts: text('id_posts').notNull().references(() => posts.idPosts),
  bio: text('bio').notNull(),
  favoritos: integer('favoritos').notNull().default(0),
  favoritados: integer('favoritados').notNull().default(0),
  contadorPosts: integer('contador_posts').notNull().default(0),
});

export const Curriculo = pgTable('curriculo', {
  idCurriculo: text('id_curriculo').primaryKey().$defaultFn(() => createId()),
  idAtleta: text('id_atleta').notNull().references(() => atleta.idAtleta),
  nomeCompleto: varchar('nome_completo', { length: 50 }).notNull(),
  idade: integer('idade').notNull(),
  altura: varchar('altura', { length: 10 }).notNull(),
  peso: varchar('peso', { length: 10 }).notNull(),
  categoria: varchar('categoria', { length: 20 }).notNull(),
  posicao: varchar('posicao', { length: 40 }).notNull(),
  jogos: integer('jogos').notNull().default(0),
  gols: integer('gols').notNull().default(0),
  assistencias: integer('assistencias').notNull().default(0),
  conquistas: text('conquistas').notNull(),
  camisaFavorita: integer('camisa_favorita').notNull(),
});