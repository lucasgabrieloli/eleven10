import { Request, Response } from 'express';
import {
  criarCurriculoDB,
  obterCurriculoDB,
  atualizarCurriculoDB,
  deletarCurriculoDB,
} from '../models/curriculoModel';

export const criarCurriculo = async (req: Request, res: Response) => {
  try {
    const novoCurriculo = await criarCurriculoDB(req.body);
    res.status(201).json(novoCurriculo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar currículo', erro: error });
  }
};

export const obterCurriculo = async (req: Request, res: Response) => {
  try {
    const curriculo = await obterCurriculoDB(req.params.idAtleta);
    if (curriculo.length === 0) return res.status(404).json({ mensagem: 'Currículo não encontrado' });
    res.status(200).json(curriculo[0]);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter currículo', erro: error });
  }
};

export const atualizarCurriculo = async (req: Request, res: Response) => {
  try {
    const curriculoAtualizado = await atualizarCurriculoDB(req.params.idAtleta, req.body);
    res.status(200).json(curriculoAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar currículo', erro: error });
  }
};

export const deletarCurriculo = async (req: Request, res: Response) => {
  try {
    const deletado = await deletarCurriculoDB(req.params.idAtleta);
    res.status(200).json(deletado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar currículo', erro: error });
  }
};
