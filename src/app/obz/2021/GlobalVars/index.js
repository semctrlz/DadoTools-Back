import qlGeral from './ql/qlGeral';
import qlComercial from './ql/qlComercial';
import qlAdm from './ql/qlAdm';
import areas from './ql/areas';
import qlRH from './ql/qlRH';
import FixosSalariosBase from './fixas/dp/salariosBase';
import FixosAdicionalNoturno from './fixas/dp/adicionalNoturno';
import FixosQuinquenios from './fixas/dp/quinquenio';
import FixosGratificacoes from './fixas/dp/gratificacoes';

class GlobalVars {
  QlGeral(ano, mes) {
    return qlGeral(ano, mes);
  }

  QlComercial(ano, mes) {
    return qlComercial(ano, mes);
  }

  QlAdm(ano, mes) {
    return qlAdm(ano, mes);
  }

  Areas(ano) {
    return areas(ano);
  }

  QlRH(ano) {
    return qlRH(ano);
  }

  FixosSalariosBase(ano, mes) {
    return FixosSalariosBase(ano, mes);
  }

  FixosAdicionalNoturno(ano, mes) {
    return FixosAdicionalNoturno(ano, mes);
  }

  FixosQuinquenios(ano, mes) {
    return FixosQuinquenios(ano, mes);
  }

  FixosGratificacoes(ano, mes) {
    return FixosGratificacoes(ano, mes);
  }
}

export default new GlobalVars();
