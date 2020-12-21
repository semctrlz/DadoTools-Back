import QLGeral from './qlGeral';
import Utils from '../../../../../utils/utils';

export default function Areas(ano) {
  const setores = QLGeral(ano, 12).value.map(ql => {
    return ql.setor;
  });

  const areas = setores.filter(Utils.UniqueValues);

  return {
    value: areas,
    vars: null,
  };
}
