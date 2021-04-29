import * as Yup from 'yup';

class ImportaFolhaController {
  async process(req, res) {
    const schema = Yup.object().shape({
      dados: Yup.string('Formato inválido').required(
        'O campo id_usuário é obrigatório'
      ),
      dataProcessamento: Yup.date('Formato inválido').required(
        'Campo obrigatório'
      ),
    });

    // const dadosBase = [
    //   {
    //     codigo: '0010',
    //     cr_adp: '0100125',
    //     cr_cigam: 2,
    //     data: true,
    //     e_social: '1000',
    //     fgInfo: true,
    //     inInfo: true,
    //     irInfo: true,
    //     natureza: 'PAG',
    //     quant: 1261.33,
    //     valor: 36909.34,
    //   },
    // ];

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { dados, dataProcessamento } = req.body;

    const dados_array = Array(JSON.parse(dados));

    return res.json({ dataProcessamento, dados_array });
  }
}

export default new ImportaFolhaController();
