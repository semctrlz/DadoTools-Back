import Volumes from '../../../GlobalVars/Simulador/Volumes';

export const NomeConta = 'CONDUCAO E TRANSPORTE';
export const ContaContabil = '3.1.1.1.04.02.001.010';

const politicas = {};
const variaveis = {
  custoLitroPuxada: 0.09258,
};

export default async function ConducaoETransporte(ano, mes) {
  const vol = await Volumes(ano, mes);
  const VolumesMes = vol.value;

  const valorMes = variaveis.custoLitroPuxada * VolumesMes.TotalDist;

  return {
    value: {
      Total: valorMes,
      politicas,
      variaveis,
    },
  };
}
