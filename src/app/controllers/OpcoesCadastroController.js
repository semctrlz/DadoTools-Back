import { Op } from 'sequelize';

import CondicoesPagto from '../models/CondicoesPagto';
import FormasPagto from '../models/FormasPagto';
import FiltrosTabelasPrecos from '../models/FiltrosTabelasPrecos';
import UserApp from '../models/UserApp';
import App from '../models/App';

import Responsabilidades from '../models/Responsabilidades';
import User from '../models/User';

class OpcoesCadastroController {
  async index(req, res) {
    const condicoes_pagto = await CondicoesPagto.findAll({
      attributes: [
        ['cod_condicao_pagto', 'cod'],
        ['nome_condicao_pagto', 'descricao'],
      ],
    });
    const formas_pagto = await FormasPagto.findAll({
      attributes: [
        ['cod_forma_pagto', 'cod'],
        ['nome_forma_pagto', 'descricao'],
      ],
    });

    const [retorno] = await FiltrosTabelasPrecos.findAll({
      attributes: ['json'],
      limit: 1,
      order: [['createdAt', 'DESC']],
    });

    const { codigo_cigam } = await User.findByPk(req.idUsuario);

    // Verificar se o usuário tem adm 3+, se sim retorna todas as rotas

    let rotas = [];

    const [retornoNivel] = await UserApp.findAll({
      where: {
        id_usuario: req.idUsuario,
      },
      attributes: ['nivel'],
      include: [
        {
          model: App,
          where: { rota: 'cadastros' },
          as: 'Apps',
          attributes: ['rota', 'nome', 'descricao'],
          required: true,
        },
      ],
    });

    if (retornoNivel.nivel >= 3) {
      rotas = await Responsabilidades.findAll({
        attributes: [
          ['cod_rota', 'cod'],
          ['nome_rota', 'descricao'],
        ],
      });
    } else {
      rotas = await Responsabilidades.findAll({
        where: {
          [Op.or]: [
            { gerente_geral: codigo_cigam },
            { gerente_comercial: codigo_cigam },
            { supervisor: codigo_cigam },
            { vendedor: codigo_cigam },
          ],
        },
        attributes: [
          ['cod_rota', 'cod'],
          ['nome_rota', 'descricao'],
        ],
      });
    }

    const { rotas: filtrosRotas } = JSON.parse(retorno.json);

    return res.json({
      condicoes_pagto,
      formas_pagto,
      filtrosRotas,
      rotas,
    });
  }
}

export default new OpcoesCadastroController();
