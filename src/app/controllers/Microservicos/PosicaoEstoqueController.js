import { Op } from 'sequelize';
import * as Yup from 'yup';
import { format, parse } from 'date-fns';
import DataMS from '../../models/DataMicroservicos';
import AcessosMS from '../../models/AcessoMicroservicos';

// import User from '../../models/User';

class ImportaFolhaController {
  async getDailyData(req, res) {
    const schema = Yup.object().shape({
      date: Yup.string('Formato inválido').required(
        'O campo data é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const minLevel = 1;

    const { date } = req.query;

    const { idUsuario } = req;

    const acessos = await AcessosMS.findOne({
      where: { id_usuario: idUsuario },
    });

    if (!acessos)
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });

    const acessos_ms = JSON.parse(acessos.acessos);
    const acesso_posicao_estoque = acessos_ms.find(
      a => a.grupo === 'logistica' && a.microservico === 'posicao_estoque_log'
    );

    if (!acesso_posicao_estoque || acesso_posicao_estoque.nivel < minLevel) {
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });
    }

    const data_consulta = parse(date, 'ddMMyyyy', new Date());

    const dados = await DataMS.findOne({
      where: {
        [Op.and]: [
          { microservico: 'posicao_estoque_log' },
          { data_from: 'posicao_estoque_cigam' },
          { date: format(data_consulta, 'yyyy-MM-dd') },
        ],
      },
    });

    if (!dados) return res.json({});

    return res.json(dados);
  }

  async getMateriais(req, res) {
    const { idUsuario } = req;

    const acessos = await AcessosMS.findOne({
      where: { id_usuario: idUsuario },
    });

    const minLevel = 1;

    if (!acessos)
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });

    const acessos_ms = JSON.parse(acessos.acessos);
    const acesso_posicao_estoque = acessos_ms.find(
      a => a.grupo === 'logistica' && a.microservico === 'posicao_estoque_log'
    );

    if (!acesso_posicao_estoque || acesso_posicao_estoque.nivel < minLevel) {
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });
    }

    const dados = await DataMS.findOne({
      where: {
        [Op.and]: [
          { microservico: 'posicao_estoque_log' },
          { data_from: 'materiais_cigam' },
        ],
      },
    });

    if (!dados) return res.json({});

    return res.json(dados);
  }

  async getContagem(req, res) {
    const schema = Yup.object().shape({
      date: Yup.string('Formato inválido').required(
        'O campo data é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const minLevel = 1;

    const { date } = req.query;

    const { idUsuario } = req;

    const acessos = await AcessosMS.findOne({
      where: { id_usuario: idUsuario },
    });

    if (!acessos)
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });

    const acessos_ms = JSON.parse(acessos.acessos);
    const acesso_posicao_estoque = acessos_ms.find(
      a => a.grupo === 'logistica' && a.microservico === 'posicao_estoque_log'
    );

    if (!acesso_posicao_estoque || acesso_posicao_estoque.nivel < minLevel) {
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });
    }

    const data_consulta = parse(date, 'ddMMyyyy', new Date());

    const dados = await DataMS.findOne({
      where: {
        [Op.and]: [
          { microservico: 'posicao_estoque_log' },
          { data_from: 'posicao_fisica' },
          { date: format(data_consulta, 'yyyy-MM-dd') },
        ],
      },
    });

    if (!dados) return res.json([]);

    return res.json(dados.json_obj || []);
  }

  async storeContagem(req, res) {
    const schema = Yup.object().shape({
      date: Yup.string('Formato inválido').required(
        'O campo data é obrigatório'
      ),
      contagem: Yup.string('Formato inválido').required(
        'O campo contagem é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const minLevel = 2;

    const { date, contagem } = req.body;

    const { idUsuario } = req;

    const acessos = await AcessosMS.findOne({
      where: { id_usuario: idUsuario },
    });

    if (!acessos)
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });

    const acessos_ms = JSON.parse(acessos.acessos);
    const acesso_posicao_estoque = acessos_ms.find(
      a => a.grupo === 'logistica' && a.microservico === 'posicao_estoque_log'
    );

    if (!acesso_posicao_estoque || acesso_posicao_estoque.nivel < minLevel) {
      return res
        .status(401)
        .json({ message: 'Você não tem acesso a estes dados' });
    }

    const data_consulta = parse(date, 'ddMMyyyy', new Date());
    // Verificasr se existe
    const dadosExistentes = await DataMS.findOne({
      where: {
        [Op.and]: [
          { microservico: 'posicao_estoque_log' },
          { data_from: 'posicao_fisica' },
          { date: format(data_consulta, 'yyyy-MM-dd') },
        ],
      },
    });

    if (dadosExistentes) {
      dadosExistentes.json = contagem;
      dadosExistentes.created_by = idUsuario;
      dadosExistentes.save();
      return res.json(dadosExistentes.json_obj || []);
    }

    const dadosSalvos = await DataMS.create({
      json: contagem,
      date: format(data_consulta, 'yyyy-MM-dd'),
      created_by: idUsuario,
      microservico: 'posicao_estoque_log',
      data_from: 'posicao_fisica',
    });
    return res.json(dadosSalvos.json_obj || []);
  }
}

export default new ImportaFolhaController();
