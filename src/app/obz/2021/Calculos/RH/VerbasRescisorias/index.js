import Rescisoes from '../../../GlobalVars/fixas/dp/verbasRescisorias';

export const NomeConta = 'VERBAS RESCISORIAS';
export const ContaContabil = '3.1.1.1.03.01.001.070';

export default function VerbasRescisorias(ano, mes) {
  const RescisoesMes = Rescisoes(ano, mes).value;

  const totalVerbasRescisorias =
    RescisoesMes.AvisoPrevioIndenizado.AvisoPrevio || 0;

  return {
    value: {
      Total: totalVerbasRescisorias,
      vars: {},
    },
  };
}
