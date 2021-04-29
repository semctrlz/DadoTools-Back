import { format } from 'date-fns';
import apiSintegra from '../../services/apiSintegra';
import SintegraConsultas from '../../app/models/SintegraConsultas';

class Sintegra {
  async ConsultaCpf(id, cpf, nascimento) {
    const dadosSalvos = await SintegraConsultas.findAll({
      where: { cnpj_cpf: cpf },
      order: [['createdAt', 'DESC']],
      limit: 1,
      attributes: ['retorno_json'],
    });

    if (dadosSalvos.length !== 0) {
      const { retorno_json } = dadosSalvos;
      return JSON.parse(retorno_json);
    }

    const dados = await apiSintegra.get(
      `api/v1/execute-api.php?token=${
        process.env.SINTEGRA_TOKEN
      }&cpf=${cpf}&data-nascimento=${format(nascimento, 'ddMMyyyy')}&plugin=CPF`
    );

    const dadosRetornoSintegra = dados.data;

    if (JSON.stringify(dadosRetornoSintegra).length > 0) {
      await SintegraConsultas.create({
        id_cadastro: id,
        cnpj_cpf: cpf,
        retorno_json: JSON.stringify(dadosRetornoSintegra),
      });
    }

    return dadosRetornoSintegra;
  }

  async ConsultaCNPJ(id, cnpj) {
    const dadosSalvos = await SintegraConsultas.findAll({
      where: { cnpj_cpf: cnpj },
      order: [['createdAt', 'DESC']],
      limit: 1,
      attributes: ['retorno_json'],
    });

    if (dadosSalvos.length !== 0) {
      const { retorno_json } = dadosSalvos;
      return JSON.parse(retorno_json);
    }

    const dados = await apiSintegra.get(
      `api/v1/execute-api.php?token=${process.env.SINTEGRA_TOKEN}&cnpj=${cnpj}&plugin=ST`
    );

    const dadosRetornoSintegra = dados.data;

    if (JSON.stringify(dadosRetornoSintegra).length > 0) {
      await SintegraConsultas.create({
        id_cadastro: id,
        cnpj_cpf: cnpj,
        retorno_json: JSON.stringify(dadosRetornoSintegra),
      });
    }

    return dadosRetornoSintegra;
  }

  Consulta(id, cnpjCpf, nascimento = '') {
    if (nascimento === '') {
      return this.ConsultaCNPJ(id, cnpjCpf);
    }

    return this.ConsultaCpf(id, cnpjCpf, new Date(nascimento));
  }

  async ConsultaSaldo() {
    try {
      const response = await apiSintegra.get(
        `api/v1/consulta-saldo.php?token=${process.env.SINTEGRA_TOKEN}`
      );
      return response.data;
    } catch (err) {
      console.log('Erro consulta sintegra: ', err);
      return { qtd_consultas_disponiveis: 99 };
    }

    // console.log('saldo');
    // return dados.data;
  }
}

export default new Sintegra();
