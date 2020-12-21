import Rescisoes from '../../../GlobalVars/forcaVendas/dp/verbasRescisorias';

export const NomeConta = 'VERBAS RESCISORIAS - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.003';
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
