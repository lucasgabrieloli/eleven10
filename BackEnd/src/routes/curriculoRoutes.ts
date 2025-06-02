import { Router } from 'express';
import {
  criarCurriculo,
  obterCurriculo,
  atualizarCurriculo,
  deletarCurriculo
} from '../controllers/curriculoController';

const router = Router();

router.post('/', criarCurriculo);                  // POST /api/curriculos
router.get('/:idAtleta', obterCurriculo);          // GET /api/curriculos/:idAtleta
router.put('/:idAtleta', atualizarCurriculo);      // PUT /api/curriculos/:idAtleta
router.delete('/:idAtleta', deletarCurriculo);     // DELETE /api/curriculos/:idAtleta

export default router;

