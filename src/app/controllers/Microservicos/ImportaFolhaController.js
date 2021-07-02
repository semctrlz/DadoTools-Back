/* eslint-disable no-restricted-syntax */

import { Op } from 'sequelize';
import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
import fs from 'fs';
import path from 'path';
import ConfigsMicroservicos from '../../models/ConfigsMicroservicos';

class ImportaFolhaController {
  async process(req, res) {
    const schema = Yup.object().shape({
      dados: Yup.string('Formato inválido').required(
        'O campo id_usuário é obrigatório'
      ),
      dataProcessamento: Yup.date('Formato inválido').required(
        'Campo obrigatório'
      ),
      unidade: Yup.number(),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { dados, dataProcessamento, unidade = 1 } = req.body;

    // Precisamos percorrer a array procurando os dados de enventos salvos.
    // caso não encontre um evento/cr, salvar na array de erro

    const [eventos] = await ConfigsMicroservicos.findAll({
      where: {
        [Op.and]: [
          { config: 'eventos_folha' },
          { microservico: 'importa_folha' },
        ],
      },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    if (!eventos) {
      return res.status(401).json({ message: 'Sem eventos cadastrados' });
    }

    const dadosEventos = eventos.json_obj;

    const erros = [];
    const dados_dat = [];

    const dados_obj = JSON.parse(dados);

    dados_obj.forEach(dado => {
      // Encontra o crédito e dédito do evento/cr
      const evento = dadosEventos.find(
        e => e.cd_evento === dado.codigo && e.CR.includes(dado.cr_cigam)
      );

      if (!evento) {
        erros.push({
          evento: dado.codigo,
          cr: dado.cr_cigam,
        });
      } else if (evento.natureza !== 'IGN') {
        // Continua a execução
        const { conta_deb, conta_cred } = evento;

        if (conta_deb === 0 || conta_cred === 0) {
          erros.push({
            evento: dado.codigo,
            cr: dado.cr_cigam,
          });
        } else {
          dados_dat.push({
            unidade,
            data: format(parseISO(dataProcessamento), 'dd/MM/yyyy'),
            cred: 0,
            deb: evento.conta_deb,
            valor: dado.valor,
          });
          dados_dat.push({
            unidade,
            data: format(parseISO(dataProcessamento), 'dd/MM/yyyy'),
            cred: evento.conta_cred,
            deb: 0,
            valor: dado.valor,
          });
        }
      }
    });

    const destination = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'temp',
      'uploads',
      'files',
      'dat'
    );

    const fileName = `FECHAMENTO UNIDADE ${unidade} ${format(
      parseISO(dataProcessamento),
      'dd-MM-yyyy'
    )}.dat`;

    fs.readdir(destination, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (file !== fileName) {
          fs.unlink(path.join(destination, file), erro => {
            if (erro) throw erro;
          });
        }
      }
    });

    const arquivo = fs.createWriteStream(path.join(destination, fileName));

    dados_dat.forEach(dado => {
      const s_unidade = `0000000000${unidade === 6 ? 2 : 1}`;
      const s_deb = `${dado.deb}      `;
      const s_cred = `${dado.cred}      `;
      const s_valor = `000000000${Math.trunc(dado.valor)}`;

      const i_unidade = s_unidade.substr(s_unidade.length - 6);
      const i_deb = dado.deb !== 0 ? s_deb.substr(0, 6) : '      ';
      const i_cred = dado.cred !== 0 ? s_cred.substr(0, 6) : '      ';
      const i_valor = s_valor.substr(s_valor.length - 9);

      arquivo.write(
        `CCC;${i_unidade};       ;${dado.data};${i_deb};${i_cred};${i_valor};0401;0000000;\n`
      );
    });

    arquivo.end();

    if (erros.length > 0) {
      return res.json({ sucesso: false, erros });
    }

    return res.json({
      sucesso: true,
      link: `${process.env.SITE}/files/dat/${fileName}`,
    });
  }
}

export default new ImportaFolhaController();
