/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import Fixos from './Calculos/Fixos';

class OBZ2021 {
  async OBZ2021_Analitico(mes = 0) {
    if (mes > 0) {
      const Analitico = await Fixos.Fixos_analitico(2021, mes);
      return {
        Ano: 2021,
        Mes: [
          {
            Mes: mes,
            OBZ: {
              Fixos: Analitico,
            },
          },
        ],
      };
    }
    const retorno = [];
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of meses) {
      const Analitico = await Fixos.Fixos_analitico(2021, item);
      retorno.push({
        Mes: item,
        OBZ: {
          Fixos: Analitico,
        },
      });
    }

    return { Ano: 2021, Mes: retorno };
  }

  async OBZ2021_Sintetico(mes = 0) {
    if (mes > 0) {
      const Sintetico = await Fixos.Fixos_sintetico(2021, mes);
      return {
        Ano: 2021,
        Mes: [
          {
            Mes: mes,
            OBZ: {
              Fixos: Sintetico,
            },
          },
        ],
      };
    }
    const retorno = [];
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of meses) {
      const Sintetico = await Fixos.Fixos_sintetico(2021, item);
      retorno.push({
        Mes: item,
        OBZ: {
          Fixos: Sintetico,
        },
      });
    }

    return { Ano: 2021, Mes: retorno };
  }

  async OBZ2021_Sintetico_excel(mes = 0) {
    const Sinteticos = await Fixos.Fixos_sintetico_excel(2021, mes);
    if (mes > 0) {
      return {
        Ano: 2021,
        Mes: [
          {
            Mes: mes,
            OBZ: {
              Fixos: Sinteticos,
            },
          },
        ],
      };
    }
    const retorno = [];
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of meses) {
      const Sintetico = await Fixos.Fixos_sintetico_excel(2021, item);
      retorno.push({
        Mes: item,
        OBZ: {
          Fixos: Sintetico,
        },
      });
    }
    return { Ano: 2021, Mes: retorno };
  }
}
export default new OBZ2021();
