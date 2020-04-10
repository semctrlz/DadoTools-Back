import {Op} from 'sequelize'

import CondicoesPagto from '../models/CondicoesPagto';
import FormasPagto from '../models/FormasPagto';
import Segmento from '../models/Segmento';
import Responsabilidades from '../models/Responsabilidades';
import User from '../models/User';

class OpcoesCadastroController{
  async index(req, res){

    const condicoes_pagto = await CondicoesPagto.findAll({attributes: [['cod_condicao_pagto', 'cod'], ['nome_condicao_pagto', 'descricao']]});
    const formas_pagto = await FormasPagto.findAll({attributes: [['cod_forma_pagto', 'cod'], ['nome_forma_pagto', 'descricao']]});
    const segmentos = await Segmento.findAll({attributes: [['cod_segmento', 'cod'], ['nome_segmento', 'descricao']]});

    const {codigo_cigam} = await User.findByPk(req.idUsuario);

    const rotas = await Responsabilidades.findAll({
      where:{
        [Op.or]: [
          { gerente_geral: codigo_cigam},
          { gerente_comercial: codigo_cigam},
          { supervisor: codigo_cigam},
          { vendedor: codigo_cigam}
        ]
      },
      attributes: [['cod_rota', 'cod'], ['nome_rota', 'descricao']]
    });

    return res.json({
      condicoes_pagto,
      formas_pagto,
      segmentos,
      rotas
    });

    const CondicoesPacto = await CondPagto.findAll({});



    return res.json(apps);
  }
}

export default new OpcoesCadastroController();
