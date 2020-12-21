// RH
import ServicoAcessoriaDP, {
  NomeConta as ServicoAcessoriaDP_C,
  ContaContabil as ServicoAcessoriaDP_CC,
} from './RH/ServicoAcessoriaRH';
import DecimoTerceiro, {
  NomeConta as DecimoTerceiro_C,
  ContaContabil as DecimoTerceiro_CC,
} from './RH/DecimoTerceiro';
import Salarios, {
  NomeConta as Salarios_C,
  ContaContabil as Salarios_CC,
} from './RH/Salarios';
import HorasExtras, {
  NomeConta as HorasExtras_C,
  ContaContabil as HorasExtras_CC,
} from './RH/HorasExtras';
import AdicionalNoturno, {
  NomeConta as AdicionalNoturno_C,
  ContaContabil as AdicionalNoturno_CC,
} from './RH/AdicionalNoturno';
import AuxilioEducacao, {
  NomeConta as AuxilioEducacao_C,
  ContaContabil as AuxilioEducacao_CC,
} from './RH/AuxilioEducacao';
import AlimentacaoFuncionarios, {
  NomeConta as AlimentacaoFuncionarios_C,
  ContaContabil as AlimentacaoFuncionarios_CC,
} from './RH/AlimentacaoFuncionarios';
import Farmacia, {
  NomeConta as Farmacia_C,
  ContaContabil as Farmacia_CC,
} from './RH/Farmacia';
import PlanoSaude, {
  NomeConta as PlanoSaude_C,
  ContaContabil as PlanoSaude_CC,
} from './RH/PlanoSaude';
import SeguroVida, {
  NomeConta as SeguroVida_C,
  ContaContabil as SeguroVida_CC,
} from './RH/SeguroVida';
import MedicinaTrabalho, {
  NomeConta as MedicinaTrabalho_C,
  ContaContabil as MedicinaTrabalho_CC,
} from './RH/MedicinaTrabalho';
import CapacitacaoEDesenvolvimento, {
  NomeConta as CapacitacaoEDesenvolvimento_C,
  ContaContabil as CapacitacaoEDesenvolvimento_CC,
} from './RH/CapacitacaoEDesenvolvimento';
import Endomarketing, {
  NomeConta as Endomarketing_C,
  ContaContabil as Endomarketing_CC,
} from './RH/Endomarketing';
import RecrutamentoESelecao, {
  NomeConta as RecrutamentoESelecao_C,
  ContaContabil as RecrutamentoESelecao_CC,
} from './RH/RecrutamentoESelecao';
import ServicoConsultoriaRH, {
  NomeConta as ServicoConsultoriaRH_C,
  ContaContabil as ServicoConsultoriaRH_CC,
} from './RH/ServicoConsultoriaRH';
import EntidadesAssociativas, {
  NomeConta as EntidadesAssociativas_C,
  ContaContabil as EntidadesAssociativas_CC,
} from './RH/EntidadesAssociativas';
import ServicosContratados, {
  NomeConta as ServicosContratados_C,
  ContaContabil as ServicosContratados_CC,
} from './RH/ServicosContratados';
import FgtsSobreFolha, {
  NomeConta as FgtsSobreFolha_C,
  ContaContabil as FgtsSobreFolha_CC,
} from './RH/FgtsSobreFolha';
import InssSobreFolha, {
  NomeConta as InssSobreFolha_C,
  ContaContabil as InssSobreFolha_CC,
} from './RH/InssSobreFolha';
import VerbasRescisorias, {
  NomeConta as VerbasRescisorias_C,
  ContaContabil as VerbasRescisorias_CC,
} from './RH/VerbasRescisorias';
import Epis, { NomeConta as Epis_C, ContaContabil as Epis_CC } from './RH/Epis';
import Ferias, {
  NomeConta as Ferias_C,
  ContaContabil as Ferias_CC,
} from './RH/Ferias';
import FgtsSobreProvisoes, {
  NomeConta as FgtsSobreProvisoes_C,
  ContaContabil as FgtsSobreProvisoes_CC,
} from './RH/FgtsSobreProvisoes';
import InssSobreProvisoes, {
  NomeConta as InssSobreProvisoes_C,
  ContaContabil as InssSobreProvisoes_CC,
} from './RH/InssSobreProvisoes';
import AuxilioInternet, {
  NomeConta as AuxilioInternet_C,
  ContaContabil as AuxilioInternet_CC,
} from './RH/AuxilioInternet';
import ValeTransporte, {
  NomeConta as ValeTransporte_C,
  ContaContabil as ValeTransporte_CC,
} from './RH/ValeTransporte';

// DGO
import LegaisJuduciais, {
  NomeConta as LegaisJuduciais_C,
  ContaContabil as LegaisJuduciais_CC,
} from './DGO/LegaisJuduciais';
import DespesasDeViagem, {
  NomeConta as DespesasDeViagem_C,
  ContaContabil as DespesasDeViagem_CC,
} from './DGO/DespesasDeViagem';
import AluguelMaquinasEquip, {
  NomeConta as AluguelMaquinasEquip_C,
  ContaContabil as AluguelMaquinasEquip_CC,
} from './DGO/AluguelMaquinasEquip';
import MaterialEscritorioExpediente, {
  NomeConta as MaterialEscritorioExpediente_C,
  ContaContabil as MaterialEscritorioExpediente_CC,
} from './DGO/MaterialEscritorioExpediente';
import MateriaisLimpeza, {
  NomeConta as MateriaisLimpeza_C,
  ContaContabil as MateriaisLimpeza_CC,
} from './DGO/MateriaisLimpeza';
import BensNaturezaPermanente, {
  NomeConta as BensNaturezaPermanente_C,
  ContaContabil as BensNaturezaPermanente_CC,
} from './DGO/BensNaturezaPermanente';
import ConservacaoManutencaoBens, {
  NomeConta as ConservacaoManutencaoBens_C,
  ContaContabil as ConservacaoManutencaoBens_CC,
} from './DGO/ConservacaoManutencaoBens';
import ConsertosGerais, {
  NomeConta as ConsertosGerais_C,
  ContaContabil as ConsertosGerais_CC,
} from './DGO/ConsertosGerais';
import ServicosLaboratoriais, {
  NomeConta as ServicosLaboratoriais_C,
  ContaContabil as ServicosLaboratoriais_CC,
} from './DGO/ServicosLaboratoriais';
import Amortizacao, {
  NomeConta as Amortizacao_C,
  ContaContabil as Amortizacao_CC,
} from './DGO/Amortizacao';
import Depreciacao, {
  NomeConta as Depreciacao_C,
  ContaContabil as Depreciacao_CC,
} from './DGO/Depreciacao';
import DesenvolvimentoProdutos, {
  NomeConta as DesenvolvimentoProdutos_C,
  ContaContabil as DesenvolvimentoProdutos_CC,
} from './DGO/DesenvolvimentoProdutos';

// Terceiros
import ServicosJuridicos, {
  NomeConta as ServicosJuridicos_C,
  ContaContabil as ServicosJuridicos_CC,
} from './Terceiros/ServicosJuridicos';
import ServicoGerenciamentoArquivos, {
  NomeConta as ServicoGerenciamentoArquivos_C,
  ContaContabil as ServicoGerenciamentoArquivos_CC,
} from './Terceiros/ServicoGerenciamentoArquivos';
import ServicosContabilidade, {
  NomeConta as ServicosContabilidade_C,
  ContaContabil as ServicosContabilidade_CC,
} from './Terceiros/ServicosContabilidade';
import AssessoriaFinanceira, {
  NomeConta as AssessoriaFinanceira_C,
  ContaContabil as AssessoriaFinanceira_CC,
} from './Terceiros/AssessoriaFinanceira';
import ConsultoriaAdm, {
  NomeConta as ConsultoriaAdm_C,
  ContaContabil as ConsultoriaAdm_CC,
} from './Terceiros/ConsultoriaAdm';

// Tributos
import TaxaDeAlvara, {
  NomeConta as TaxaDeAlvara_C,
  ContaContabil as TaxaDeAlvara_CC,
} from './Tributos/TaxaDeAlvara';
import TaxaControleFiscAmb, {
  NomeConta as TaxaControleFiscAmb_C,
  ContaContabil as TaxaControleFiscAmb_CC,
} from './Tributos/TaxaControleFiscAmb';
import DesagioCompraIcms, {
  NomeConta as DesagioCompraIcms_C,
  ContaContabil as DesagioCompraIcms_CC,
} from './Tributos/DesagioCompraIcms';
import ContribuicaoSindicalEmpresa, {
  NomeConta as ContribuicaoSindicalEmpresa_C,
  ContaContabil as ContribuicaoSindicalEmpresa_CC,
} from './Tributos/ContribuicaoSindicalEmpresa';
import Multas, {
  NomeConta as Multas_C,
  ContaContabil as Multas_CC,
} from './Tributos/Multas';
import OutrosDebitosTributarios, {
  NomeConta as OutrosDebitosTributarios_C,
  ContaContabil as OutrosDebitosTributarios_CC,
} from './Tributos/OutrosDebitosTributarios';
import MultasIndedutiveisObrigTribut, {
  NomeConta as MultasIndedutiveisObrigTribut_C,
  ContaContabil as MultasIndedutiveisObrigTribut_CC,
} from './Tributos/MultasIndedutiveisObrigTribut';

// Fincnceiro
import VariacaoMonetariaAtiva, {
  NomeConta as VariacaoMonetariaAtiva_C,
  ContaContabil as VariacaoMonetariaAtiva_CC,
} from './Financeiro/VariacaoMonetariaAtiva';
import DespesasBancariasCambiais, {
  NomeConta as DespesasBancariasCambiais_C,
  ContaContabil as DespesasBancariasCambiais_CC,
} from './Financeiro/DespesasBancariasCambiais';

// TI
import Telefonia, {
  NomeConta as Telefonia_C,
  ContaContabil as Telefonia_CC,
} from './TI/Telefonia';
import MateriaisInformatica, {
  NomeConta as MateriaisInformatica_C,
  ContaContabil as MateriaisInformatica_CC,
} from './TI/MateriaisInformatica';
import ServicosInformatica, {
  NomeConta as ServicosInformatica_C,
  ContaContabil as ServicosInformatica_CC,
} from './TI/ServicosInformatica';
import Internet, {
  NomeConta as Internet_C,
  ContaContabil as Internet_CC,
} from './TI/Internet';

// Seguros
import SegurosDiversos, {
  NomeConta as SegurosDiversos_C,
  ContaContabil as SegurosDiversos_CC,
} from './Seguros/SegurosDiversos';

// Despesas de força de vendas
import ForcaVendas_Salarios, {
  NomeConta as ForcaVendas_Salarios_C,
  ContaContabil as ForcaVendas_Salarios_CC,
} from './DespForcaDeVenda/Salarios';
import ForcaVendas_HorasExtras, {
  NomeConta as ForcaVendas_HorasExtras_C,
  ContaContabil as ForcaVendas_HorasExtras_CC,
} from './DespForcaDeVenda/HorasExtras';
import ForcaVendas_VerbasRescisorias, {
  NomeConta as ForcaVendas_VerbasRescisorias_C,
  ContaContabil as ForcaVendas_VerbasRescisorias_CC,
} from './DespForcaDeVenda/VerbasRescisorias';
import ForcaVendas_FgtsSobreFolha, {
  NomeConta as ForcaVendas_FgtsSobreFolha_C,
  ContaContabil as ForcaVendas_FgtsSobreFolha_CC,
} from './DespForcaDeVenda/FgtsSobreFolha';
import ForcaVendas_InssSobreFolha, {
  NomeConta as ForcaVendas_InssSobreFolha_C,
  ContaContabil as ForcaVendas_InssSobreFolha_CC,
} from './DespForcaDeVenda/InssSobreFolha';
import ForcaVendas_AlimentacaoFuncionarios, {
  NomeConta as ForcaVendas_AlimentacaoFuncionarios_C,
  ContaContabil as ForcaVendas_AlimentacaoFuncionarios_CC,
} from './DespForcaDeVenda/AlimentacaoFuncionarios';
import ForcaVendas_Endomarketing, {
  NomeConta as ForcaVendas_Endomarketing_C,
  ContaContabil as ForcaVendas_Endomarketing_CC,
} from './DespForcaDeVenda/Endomarketing';
import ForcaVendas_PlanoSaude, {
  NomeConta as ForcaVendas_PlanoSaude_C,
  ContaContabil as ForcaVendas_PlanoSaude_CC,
} from './DespForcaDeVenda/PlanoSaude';
import ForcaVendas_RecrutamentoESelecao, {
  NomeConta as ForcaVendas_RecrutamentoESelecao_C,
  ContaContabil as ForcaVendas_RecrutamentoESelecao_CC,
} from './DespForcaDeVenda/RecrutamentoESelecao';
import ForcaVendas_CapacitacaoEDesenvolvimento, {
  NomeConta as ForcaVendas_CapacitacaoEDesenvolvimento_C,
  ContaContabil as ForcaVendas_CapacitacaoEDesenvolvimento_CC,
} from './DespForcaDeVenda/CapacitacaoEDesenvolvimento';
import ForcaVendas_Ferias, {
  NomeConta as ForcaVendas_Ferias_C,
  ContaContabil as ForcaVendas_Ferias_CC,
} from './DespForcaDeVenda/Ferias';
import ForcaVendas_DecimoTerceiro, {
  NomeConta as ForcaVendas_DecimoTerceiro_C,
  ContaContabil as ForcaVendas_DecimoTerceiro_CC,
} from './DespForcaDeVenda/DecimoTerceiro';
import ForcaVendas_FgtsSobreProvisoes, {
  NomeConta as ForcaVendas_FgtsSobreProvisoes_C,
  ContaContabil as ForcaVendas_FgtsSobreProvisoes_CC,
} from './DespForcaDeVenda/FgtsSobreProvisoes';
import ForcaVendas_InssSobreProvisoes, {
  NomeConta as ForcaVendas_InssSobreProvisoes_C,
  ContaContabil as ForcaVendas_InssSobreProvisoes_CC,
} from './DespForcaDeVenda/InssSobreProvisoes';
import ForcaVendas_LocacaoOutrosBens, {
  NomeConta as ForcaVendas_LocacaoOutrosBens_C,
  ContaContabil as ForcaVendas_LocacaoOutrosBens_CC,
} from './DespForcaDeVenda/LocacaoOutrosBens';
import ForcaVendas_MedicinaTrabalho, {
  NomeConta as ForcaVendas_MedicinaTrabalho_C,
  ContaContabil as ForcaVendas_MedicinaTrabalho_CC,
} from './DespForcaDeVenda/MedicinaTrabalho';
import ForcaVendas_SeguroVida, {
  NomeConta as ForcaVendas_SeguroVida_C,
  ContaContabil as ForcaVendas_SeguroVida_CC,
} from './DespForcaDeVenda/SeguroVida';
import ForcaVendas_ServicosContratadosDespVendas, {
  NomeConta as ForcaVendas_ServicosContratadosDespVendas_C,
  ContaContabil as ForcaVendas_ServicosContratadosDespVendas_CC,
} from './DespForcaDeVenda/ServicosContratadosDespVendas';
import ForcaVendas_DespesasDeViagem, {
  NomeConta as ForcaVendas_DespesasDeViagem_C,
  ContaContabil as ForcaVendas_DespesasDeViagem_CC,
} from './DespForcaDeVenda/DespesasDeViagem';
import ForcaVendas_Uniformes, {
  NomeConta as ForcaVendas_Uniformes_C,
  ContaContabil as ForcaVendas_Uniformes_CC,
} from './DespForcaDeVenda/Uniformes';
import ForcaVendas_TaxasCartaoCredito, {
  NomeConta as ForcaVendas_TaxasCartaoCredito_C,
  ContaContabil as ForcaVendas_TaxasCartaoCredito_CC,
} from './DespForcaDeVenda/TaxasCartaoCredito';
import ForcaVendas_AluguelMaquinetas, {
  NomeConta as ForcaVendas_AluguelMaquinetas_C,
  ContaContabil as ForcaVendas_AluguelMaquinetas_CC,
} from './DespForcaDeVenda/AluguelMaquinetas';
import ForcaVendas_DespesasArmazenagem, {
  NomeConta as ForcaVendas_DespesasArmazenagem_C,
  ContaContabil as ForcaVendas_DespesasArmazenagem_CC,
} from './DespForcaDeVenda/DespesasArmazenagem';
import ForcaVendas_ConducaoETransporte, {
  NomeConta as ForcaVendas_ConducaoETransporte_C,
  ContaContabil as ForcaVendas_ConducaoETransporte_CC,
} from './DespForcaDeVenda/ConducaoETransporte';

// Ocupacao
import Aluguel, {
  NomeConta as Aluguel_C,
  ContaContabil as Aluguel_CC,
} from './Ocupacao/Aluguel';

// Receitas
import MercadoInterno from './Receitas/MercadoInterno';
import Exportacoes from './Receitas/Exportacoes';

class Fixos {
  async Fixos_analitico(ano, mes) {
    // const ValoresMercadoInterno = await MercadoInterno(ano, mes);
    return {
      RH: [
        {
          NomeConta: ValeTransporte_C,
          ContaContabil: ValeTransporte_CC,
          Valor: ValeTransporte(ano, mes),
        },
        {
          NomeConta: DecimoTerceiro_C,
          ContaContabil: DecimoTerceiro_CC,
          Valor: DecimoTerceiro(ano, mes),
        },
        {
          NomeConta: AuxilioInternet_C,
          ContaContabil: AuxilioInternet_CC,
          Valor: AuxilioInternet(ano, mes),
        },
        {
          NomeConta: InssSobreProvisoes_C,
          ContaContabil: InssSobreProvisoes_CC,
          Valor: InssSobreProvisoes(ano, mes),
        },
        {
          NomeConta: InssSobreFolha_C,
          ContaContabil: InssSobreFolha_CC,
          Valor: InssSobreFolha(ano, mes),
        },
        {
          NomeConta: FgtsSobreProvisoes_C,
          ContaContabil: FgtsSobreProvisoes_CC,
          Valor: FgtsSobreProvisoes(ano, mes),
        },
        {
          NomeConta: FgtsSobreFolha_C,
          ContaContabil: FgtsSobreFolha_CC,
          Valor: FgtsSobreFolha(ano, mes),
        },
        {
          NomeConta: Ferias_C,
          ContaContabil: Ferias_CC,
          Valor: Ferias(ano, mes),
        },
        {
          NomeConta: Epis_C,
          ContaContabil: Epis_CC,
          Valor: Epis(ano, mes),
        },
        {
          NomeConta: VerbasRescisorias_C,
          ContaContabil: VerbasRescisorias_CC,
          Valor: VerbasRescisorias(ano, mes),
        },
        {
          NomeConta: ServicosContratados_C,
          ContaContabil: ServicosContratados_CC,
          Valor: ServicosContratados(ano, mes),
        },
        {
          NomeConta: EntidadesAssociativas_C,
          ContaContabil: EntidadesAssociativas_CC,
          Valor: EntidadesAssociativas(ano, mes),
        },
        {
          NomeConta: ServicoConsultoriaRH_C,
          ContaContabil: ServicoConsultoriaRH_CC,
          Valor: ServicoConsultoriaRH(ano, mes),
        },
        {
          NomeConta: RecrutamentoESelecao_C,
          ContaContabil: RecrutamentoESelecao_CC,
          Valor: RecrutamentoESelecao(ano, mes),
        },
        {
          NomeConta: Endomarketing_C,
          ContaContabil: Endomarketing_CC,
          Valor: Endomarketing(ano, mes),
        },
        {
          NomeConta: CapacitacaoEDesenvolvimento_C,
          ContaContabil: CapacitacaoEDesenvolvimento_CC,
          Valor: CapacitacaoEDesenvolvimento(ano, mes),
        },
        {
          NomeConta: ServicoAcessoriaDP_C,
          ContaContabil: ServicoAcessoriaDP_CC,
          Valor: ServicoAcessoriaDP(ano, mes),
        },
        {
          NomeConta: Salarios_C,
          ContaContabil: Salarios_CC,
          Valor: Salarios(ano, mes),
        },
        {
          NomeConta: HorasExtras_C,
          ContaContabil: HorasExtras_CC,
          Valor: HorasExtras(ano, mes),
        },
        {
          NomeConta: AdicionalNoturno_C,
          ContaContabil: AdicionalNoturno_CC,
          Valor: AdicionalNoturno(ano, mes),
        },
        {
          NomeConta: AuxilioEducacao_C,
          ContaContabil: AuxilioEducacao_CC,
          Valor: AuxilioEducacao(ano, mes),
        },
        {
          NomeConta: AlimentacaoFuncionarios_C,
          ContaContabil: AlimentacaoFuncionarios_CC,
          Valor: AlimentacaoFuncionarios(ano, mes),
        },
        {
          NomeConta: Farmacia_C,
          ContaContabil: Farmacia_CC,
          Valor: Farmacia(ano, mes),
        },
        {
          NomeConta: PlanoSaude_C,
          ContaContabil: PlanoSaude_CC,
          Valor: PlanoSaude(ano, mes),
        },
        {
          NomeConta: SeguroVida_C,
          ContaContabil: SeguroVida_CC,
          Valor: SeguroVida(ano, mes),
        },
        {
          NomeConta: MedicinaTrabalho_C,
          ContaContabil: MedicinaTrabalho_CC,
          Valor: MedicinaTrabalho(ano, mes),
        },
      ],
      Terceiros: [
        {
          NomeConta: ServicosContabilidade_C,
          ContaContabil: ServicosContabilidade_CC,
          Valor: await ServicosContabilidade(ano, mes),
        },
        {
          NomeConta: ServicoGerenciamentoArquivos_C,
          ContaContabil: ServicoGerenciamentoArquivos_CC,
          Valor: ServicoGerenciamentoArquivos(ano, mes),
        },
        {
          NomeConta: ServicosJuridicos_C,
          ContaContabil: ServicosJuridicos_CC,
          Valor: ServicosJuridicos(ano, mes),
        },
        {
          NomeConta: AssessoriaFinanceira_C,
          ContaContabil: AssessoriaFinanceira_CC,
          Valor: AssessoriaFinanceira(ano, mes),
        },
        {
          NomeConta: ConsultoriaAdm_C,
          ContaContabil: ConsultoriaAdm_CC,
          Valor: ConsultoriaAdm(ano, mes),
        },
      ],
      DGO: [
        {
          NomeConta: Depreciacao_C,
          ContaContabil: Depreciacao_CC,
          Valor: Depreciacao(ano, mes),
        },
        {
          NomeConta: Amortizacao_C,
          ContaContabil: Amortizacao_CC,
          Valor: Amortizacao(ano, mes),
        },
        {
          NomeConta: ServicosLaboratoriais_C,
          ContaContabil: ServicosLaboratoriais_CC,
          Valor: ServicosLaboratoriais(ano, mes),
        },
        {
          NomeConta: ConsertosGerais_C,
          ContaContabil: ConsertosGerais_CC,
          Valor: ConsertosGerais(ano, mes),
        },
        {
          NomeConta: ConservacaoManutencaoBens_C,
          ContaContabil: ConservacaoManutencaoBens_CC,
          Valor: ConservacaoManutencaoBens(ano, mes),
        },
        {
          NomeConta: BensNaturezaPermanente_C,
          ContaContabil: BensNaturezaPermanente_CC,
          Valor: BensNaturezaPermanente(ano, mes),
        },
        {
          NomeConta: MateriaisLimpeza_C,
          ContaContabil: MateriaisLimpeza_CC,
          Valor: MateriaisLimpeza(ano, mes),
        },
        {
          NomeConta: MaterialEscritorioExpediente_C,
          ContaContabil: MaterialEscritorioExpediente_CC,
          Valor: MaterialEscritorioExpediente(ano, mes),
        },
        {
          NomeConta: AluguelMaquinasEquip_C,
          ContaContabil: AluguelMaquinasEquip_CC,
          Valor: AluguelMaquinasEquip(ano, mes),
        },
        {
          NomeConta: DespesasDeViagem_C,
          ContaContabil: DespesasDeViagem_CC,
          Valor: DespesasDeViagem(ano, mes),
        },
        {
          NomeConta: LegaisJuduciais_C,
          ContaContabil: LegaisJuduciais_CC,
          Valor: LegaisJuduciais(ano, mes),
        },
        {
          NomeConta: DesenvolvimentoProdutos_C,
          ContaContabil: DesenvolvimentoProdutos_CC,
          Valor: DesenvolvimentoProdutos(ano, mes),
        },
      ],
      Tributos: [
        {
          NomeConta: MultasIndedutiveisObrigTribut_C,
          ContaContabil: MultasIndedutiveisObrigTribut_CC,
          Valor: MultasIndedutiveisObrigTribut(ano, mes),
        },
        {
          NomeConta: OutrosDebitosTributarios_C,
          ContaContabil: OutrosDebitosTributarios_CC,
          Valor: OutrosDebitosTributarios(ano, mes),
        },
        {
          NomeConta: Multas_C,
          ContaContabil: Multas_CC,
          Valor: Multas(ano, mes),
        },
        {
          NomeConta: ContribuicaoSindicalEmpresa_C,
          ContaContabil: ContribuicaoSindicalEmpresa_CC,
          Valor: ContribuicaoSindicalEmpresa(ano, mes),
        },
        {
          NomeConta: DesagioCompraIcms_C,
          ContaContabil: DesagioCompraIcms_CC,
          Valor: await DesagioCompraIcms(ano, mes),
        },
        {
          NomeConta: TaxaControleFiscAmb_C,
          ContaContabil: TaxaControleFiscAmb_CC,
          Valor: TaxaControleFiscAmb(ano, mes),
        },
        {
          NomeConta: TaxaDeAlvara_C,
          ContaContabil: TaxaDeAlvara_CC,
          Valor: TaxaDeAlvara(ano, mes),
        },
      ],
      Financeiro: [
        {
          NomeConta: VariacaoMonetariaAtiva_C,
          ContaContabil: VariacaoMonetariaAtiva_CC,
          Valor: VariacaoMonetariaAtiva(ano, mes),
        },
        {
          NomeConta: DespesasBancariasCambiais_C,
          ContaContabil: DespesasBancariasCambiais_CC,
          Valor: DespesasBancariasCambiais(ano, mes),
        },
      ],
      TI: [
        {
          NomeConta: Telefonia_C,
          ContaContabil: Telefonia_CC,
          Valor: Telefonia(ano, mes),
        },
        {
          NomeConta: ServicosInformatica_C,
          ContaContabil: ServicosInformatica_CC,
          Valor: ServicosInformatica(ano, mes),
        },
        {
          NomeConta: MateriaisInformatica_C,
          ContaContabil: MateriaisInformatica_CC,
          Valor: MateriaisInformatica(ano, mes),
        },
        {
          NomeConta: Internet_C,
          ContaContabil: Internet_CC,
          Valor: Internet(ano, mes),
        },
      ],
      Seguros: [
        {
          NomeConta: SegurosDiversos_C,
          ContaContabil: SegurosDiversos_CC,
          Valor: SegurosDiversos(ano, mes),
        },
      ],
      DespForcaVendas: [
        {
          NomeConta: ForcaVendas_ConducaoETransporte_C,
          ContaContabil: ForcaVendas_ConducaoETransporte_CC,
          Valor: ForcaVendas_ConducaoETransporte(ano, mes),
        },
        {
          NomeConta: ForcaVendas_DespesasArmazenagem_C,
          ContaContabil: ForcaVendas_DespesasArmazenagem_CC,
          Valor: ForcaVendas_DespesasArmazenagem(ano, mes),
        },
        {
          NomeConta: ForcaVendas_Uniformes_C,
          ContaContabil: ForcaVendas_Uniformes_CC,
          Valor: ForcaVendas_Uniformes(ano, mes),
        },
        {
          NomeConta: ForcaVendas_DespesasDeViagem_C,
          ContaContabil: ForcaVendas_DespesasDeViagem_CC,
          Valor: ForcaVendas_DespesasDeViagem(ano, mes),
        },
        {
          NomeConta: ForcaVendas_ServicosContratadosDespVendas_C,
          ContaContabil: ForcaVendas_ServicosContratadosDespVendas_CC,
          Valor: ForcaVendas_ServicosContratadosDespVendas(ano, mes),
        },
        {
          NomeConta: ForcaVendas_SeguroVida_C,
          ContaContabil: ForcaVendas_SeguroVida_CC,
          Valor: ForcaVendas_SeguroVida(ano, mes),
        },
        {
          NomeConta: ForcaVendas_MedicinaTrabalho_C,
          ContaContabil: ForcaVendas_MedicinaTrabalho_CC,
          Valor: ForcaVendas_MedicinaTrabalho(ano, mes),
        },
        {
          NomeConta: ForcaVendas_LocacaoOutrosBens_C,
          ContaContabil: ForcaVendas_LocacaoOutrosBens_CC,
          Valor: ForcaVendas_LocacaoOutrosBens(ano, mes),
        },
        {
          NomeConta: ForcaVendas_InssSobreProvisoes_C,
          ContaContabil: ForcaVendas_InssSobreProvisoes_CC,
          Valor: ForcaVendas_InssSobreProvisoes(ano, mes),
        },
        {
          NomeConta: ForcaVendas_FgtsSobreProvisoes_C,
          ContaContabil: ForcaVendas_FgtsSobreProvisoes_CC,
          Valor: ForcaVendas_FgtsSobreProvisoes(ano, mes),
        },
        {
          NomeConta: ForcaVendas_DecimoTerceiro_C,
          ContaContabil: ForcaVendas_DecimoTerceiro_CC,
          Valor: ForcaVendas_DecimoTerceiro(ano, mes),
        },
        {
          NomeConta: ForcaVendas_Ferias_C,
          ContaContabil: ForcaVendas_Ferias_CC,
          Valor: ForcaVendas_Ferias(ano, mes),
        },
        {
          NomeConta: ForcaVendas_CapacitacaoEDesenvolvimento_C,
          ContaContabil: ForcaVendas_CapacitacaoEDesenvolvimento_CC,
          Valor: ForcaVendas_CapacitacaoEDesenvolvimento(ano, mes),
        },
        {
          NomeConta: ForcaVendas_RecrutamentoESelecao_C,
          ContaContabil: ForcaVendas_RecrutamentoESelecao_CC,
          Valor: ForcaVendas_RecrutamentoESelecao(ano, mes),
        },
        {
          NomeConta: ForcaVendas_PlanoSaude_C,
          ContaContabil: ForcaVendas_PlanoSaude_CC,
          Valor: ForcaVendas_PlanoSaude(ano, mes),
        },
        {
          NomeConta: ForcaVendas_Endomarketing_C,
          ContaContabil: ForcaVendas_Endomarketing_CC,
          Valor: ForcaVendas_Endomarketing(ano, mes),
        },
        {
          NomeConta: ForcaVendas_AlimentacaoFuncionarios_C,
          ContaContabil: ForcaVendas_AlimentacaoFuncionarios_CC,
          Valor: ForcaVendas_AlimentacaoFuncionarios(ano, mes),
        },
        {
          NomeConta: ForcaVendas_InssSobreFolha_C,
          ContaContabil: ForcaVendas_InssSobreFolha_CC,
          Valor: ForcaVendas_InssSobreFolha(ano, mes),
        },
        {
          NomeConta: ForcaVendas_FgtsSobreFolha_C,
          ContaContabil: ForcaVendas_FgtsSobreFolha_CC,
          Valor: ForcaVendas_FgtsSobreFolha(ano, mes),
        },
        {
          NomeConta: ForcaVendas_VerbasRescisorias_C,
          ContaContabil: ForcaVendas_VerbasRescisorias_CC,
          Valor: ForcaVendas_VerbasRescisorias(ano, mes),
        },
        {
          NomeConta: ForcaVendas_HorasExtras_C,
          ContaContabil: ForcaVendas_HorasExtras_CC,
          Valor: ForcaVendas_HorasExtras(ano, mes),
        },
        {
          NomeConta: ForcaVendas_Salarios_C,
          ContaContabil: ForcaVendas_Salarios_CC,
          Valor: ForcaVendas_Salarios(ano, mes),
        },
        {
          NomeConta: ForcaVendas_TaxasCartaoCredito_C,
          ContaContabil: ForcaVendas_TaxasCartaoCredito_CC,
          Valor: ForcaVendas_TaxasCartaoCredito(ano, mes),
        },
        {
          NomeConta: ForcaVendas_AluguelMaquinetas_C,
          ContaContabil: ForcaVendas_AluguelMaquinetas_CC,
          Valor: ForcaVendas_AluguelMaquinetas(ano, mes),
        },
      ],
      Ocupacao: [
        {
          NomeConta: Aluguel_C,
          ContaContabil: Aluguel_CC,
          Valor: Aluguel(ano, mes),
        },
      ],
      Receita: {
        MercadoInterno: await MercadoInterno(ano, mes),
        Exportacoes: Exportacoes(ano, mes),
      },
    };
  }

  async Fixos_sintetico(ano, mes) {
    const ValoresMercadoInterno = await MercadoInterno(ano, mes);

    return {
      RH: [
        {
          NomeConta: ValeTransporte_C,
          ContaContabil: ValeTransporte_CC,
          Valor: ValeTransporte(ano, mes).value.Total,
        },
        {
          NomeConta: DecimoTerceiro_C,
          ContaContabil: DecimoTerceiro_CC,
          Valor: DecimoTerceiro(ano, mes).value.Total,
        },
        {
          NomeConta: AuxilioInternet_C,
          ContaContabil: AuxilioInternet_CC,
          Valor: AuxilioInternet(ano, mes).value.Total,
        },
        {
          NomeConta: InssSobreProvisoes_C,
          ContaContabil: InssSobreProvisoes_CC,
          Valor: InssSobreProvisoes(ano, mes).value.Total,
        },
        {
          NomeConta: InssSobreFolha_C,
          ContaContabil: InssSobreFolha_CC,
          Valor: InssSobreFolha(ano, mes).value.Total,
        },
        {
          NomeConta: FgtsSobreProvisoes_C,
          ContaContabil: FgtsSobreProvisoes_CC,
          Valor: FgtsSobreProvisoes(ano, mes).value.Total,
        },
        {
          NomeConta: FgtsSobreFolha_C,
          ContaContabil: FgtsSobreFolha_CC,
          Valor: FgtsSobreFolha(ano, mes).value.Total,
        },
        {
          NomeConta: Ferias_C,
          ContaContabil: Ferias_CC,
          Valor: Ferias(ano, mes).value.Total,
        },
        {
          NomeConta: Epis_C,
          ContaContabil: Epis_CC,
          Valor: Epis(ano, mes).value.Total,
        },
        {
          NomeConta: VerbasRescisorias_C,
          ContaContabil: VerbasRescisorias_CC,
          Valor: VerbasRescisorias(ano, mes).value.Total,
        },
        {
          NomeConta: ServicosContratados_C,
          ContaContabil: ServicosContratados_CC,
          Valor: ServicosContratados(ano, mes).value.Total,
        },
        {
          NomeConta: EntidadesAssociativas_C,
          ContaContabil: EntidadesAssociativas_CC,
          Valor: EntidadesAssociativas(ano, mes).value.Total,
        },
        {
          NomeConta: ServicoConsultoriaRH_C,
          ContaContabil: ServicoConsultoriaRH_CC,
          Valor: ServicoConsultoriaRH(ano, mes).value.Total,
        },
        {
          NomeConta: RecrutamentoESelecao_C,
          ContaContabil: RecrutamentoESelecao_CC,
          Valor: RecrutamentoESelecao(ano, mes).value.Total,
        },
        {
          NomeConta: Endomarketing_C,
          ContaContabil: Endomarketing_CC,
          Valor: Endomarketing(ano, mes).value.Total,
        },
        {
          NomeConta: CapacitacaoEDesenvolvimento_C,
          ContaContabil: CapacitacaoEDesenvolvimento_CC,
          Valor: CapacitacaoEDesenvolvimento(ano, mes).value.Total,
        },
        {
          NomeConta: ServicoAcessoriaDP_C,
          ContaContabil: ServicoAcessoriaDP_CC,
          Valor: ServicoAcessoriaDP(ano, mes).value.Total,
        },
        {
          NomeConta: Salarios_C,
          ContaContabil: Salarios_CC,
          Valor: Salarios(ano, mes).value.Total,
        },
        {
          NomeConta: HorasExtras_C,
          ContaContabil: HorasExtras_CC,
          Valor: HorasExtras(ano, mes).value.Total,
        },
        {
          NomeConta: AdicionalNoturno_C,
          ContaContabil: AdicionalNoturno_CC,
          Valor: AdicionalNoturno(ano, mes).value.Total,
        },
        {
          NomeConta: AuxilioEducacao_C,
          ContaContabil: AuxilioEducacao_CC,
          Valor: AuxilioEducacao(ano, mes).value.Total,
        },
        {
          NomeConta: AlimentacaoFuncionarios_C,
          ContaContabil: AlimentacaoFuncionarios_CC,
          Valor: AlimentacaoFuncionarios(ano, mes).value.Total,
        },
        {
          NomeConta: Farmacia_C,
          ContaContabil: Farmacia_CC,
          Valor: Farmacia(ano, mes).value.Total,
        },
        {
          NomeConta: PlanoSaude_C,
          ContaContabil: PlanoSaude_CC,
          Valor: PlanoSaude(ano, mes).value.Total,
        },
        {
          NomeConta: SeguroVida_C,
          ContaContabil: SeguroVida_CC,
          Valor: SeguroVida(ano, mes).value.Total,
        },
        {
          NomeConta: MedicinaTrabalho_C,
          ContaContabil: MedicinaTrabalho_CC,
          Valor: MedicinaTrabalho(ano, mes).value.Total,
        },
      ],
      Terceiros: [
        {
          NomeConta: ServicosContabilidade_C,
          ContaContabil: ServicosContabilidade_CC,
          Valor: (await ServicosContabilidade(ano, mes)).value.Total,
        },
        {
          NomeConta: ServicoGerenciamentoArquivos_C,
          ContaContabil: ServicoGerenciamentoArquivos_CC,
          Valor: ServicoGerenciamentoArquivos(ano, mes).value.Total,
        },
        {
          NomeConta: ServicosJuridicos_C,
          ContaContabil: ServicosJuridicos_CC,
          Valor: ServicosJuridicos(ano, mes).value.Total,
        },
        {
          NomeConta: AssessoriaFinanceira_C,
          ContaContabil: AssessoriaFinanceira_CC,
          Valor: AssessoriaFinanceira(ano, mes).value.Total,
        },
        {
          NomeConta: ConsultoriaAdm_C,
          ContaContabil: ConsultoriaAdm_CC,
          Valor: ConsultoriaAdm(ano, mes).value.Total,
        },
      ],
      DGO: [
        {
          NomeConta: Depreciacao_C,
          ContaContabil: Depreciacao_CC,
          Valor: Depreciacao(ano, mes).value.Total,
        },
        {
          NomeConta: Amortizacao_C,
          ContaContabil: Amortizacao_CC,
          Valor: Amortizacao(ano, mes).value.Total,
        },
        {
          NomeConta: ServicosLaboratoriais_C,
          ContaContabil: ServicosLaboratoriais_CC,
          Valor: ServicosLaboratoriais(ano, mes).value.Total,
        },
        {
          NomeConta: ConsertosGerais_C,
          ContaContabil: ConsertosGerais_CC,
          Valor: ConsertosGerais(ano, mes).value.Total,
        },
        {
          NomeConta: ConservacaoManutencaoBens_C,
          ContaContabil: ConservacaoManutencaoBens_CC,
          Valor: ConservacaoManutencaoBens(ano, mes).value.Total,
        },
        {
          NomeConta: BensNaturezaPermanente_C,
          ContaContabil: BensNaturezaPermanente_CC,
          Valor: BensNaturezaPermanente(ano, mes).value.Total,
        },
        {
          NomeConta: MateriaisLimpeza_C,
          ContaContabil: MateriaisLimpeza_CC,
          Valor: MateriaisLimpeza(ano, mes).value.Total,
        },
        {
          NomeConta: MaterialEscritorioExpediente_C,
          ContaContabil: MaterialEscritorioExpediente_CC,
          Valor: MaterialEscritorioExpediente(ano, mes).value.Total,
        },
        {
          NomeConta: AluguelMaquinasEquip_C,
          ContaContabil: AluguelMaquinasEquip_CC,
          Valor: AluguelMaquinasEquip(ano, mes).value.Total,
        },
        {
          NomeConta: DespesasDeViagem_C,
          ContaContabil: DespesasDeViagem_CC,
          Valor: DespesasDeViagem(ano, mes).value.Total,
        },
        {
          NomeConta: LegaisJuduciais_C,
          ContaContabil: LegaisJuduciais_CC,
          Valor: LegaisJuduciais(ano, mes).value.Total,
        },
        {
          NomeConta: DesenvolvimentoProdutos_C,
          ContaContabil: DesenvolvimentoProdutos_CC,
          Valor: DesenvolvimentoProdutos(ano, mes).value.Total,
        },
      ],
      Tributos: [
        {
          NomeConta: MultasIndedutiveisObrigTribut_C,
          ContaContabil: MultasIndedutiveisObrigTribut_CC,
          Valor: MultasIndedutiveisObrigTribut(ano, mes).value.Total,
        },
        {
          NomeConta: OutrosDebitosTributarios_C,
          ContaContabil: OutrosDebitosTributarios_CC,
          Valor: OutrosDebitosTributarios(ano, mes).value.Total,
        },
        {
          NomeConta: Multas_C,
          ContaContabil: Multas_CC,
          Valor: Multas(ano, mes).value.Total,
        },
        {
          NomeConta: ContribuicaoSindicalEmpresa_C,
          ContaContabil: ContribuicaoSindicalEmpresa_CC,
          Valor: ContribuicaoSindicalEmpresa(ano, mes).value.Total,
        },
        {
          NomeConta: DesagioCompraIcms_C,
          ContaContabil: DesagioCompraIcms_CC,
          Valor: (await DesagioCompraIcms(ano, mes)).value.Total,
        },
        {
          NomeConta: TaxaControleFiscAmb_C,
          ContaContabil: TaxaControleFiscAmb_CC,
          Valor: TaxaControleFiscAmb(ano, mes).value.Total,
        },
        {
          NomeConta: TaxaDeAlvara_C,
          ContaContabil: TaxaDeAlvara_CC,
          Valor: TaxaDeAlvara(ano, mes).value.Total,
        },
      ],
      Financeiro: [
        {
          NomeConta: VariacaoMonetariaAtiva_C,
          ContaContabil: VariacaoMonetariaAtiva_CC,
          Valor: VariacaoMonetariaAtiva(ano, mes).value.Total,
        },
        {
          NomeConta: DespesasBancariasCambiais_C,
          ContaContabil: DespesasBancariasCambiais_CC,
          Valor: DespesasBancariasCambiais(ano, mes).value.Total,
        },
      ],
      TI: [
        {
          NomeConta: Telefonia_C,
          ContaContabil: Telefonia_CC,
          Valor: Telefonia(ano, mes).value.Total,
        },
        {
          NomeConta: ServicosInformatica_C,
          ContaContabil: ServicosInformatica_CC,
          Valor: ServicosInformatica(ano, mes).value.Total,
        },
        {
          NomeConta: MateriaisInformatica_C,
          ContaContabil: MateriaisInformatica_CC,
          Valor: MateriaisInformatica(ano, mes).value.Total,
        },
        {
          NomeConta: Internet_C,
          ContaContabil: Internet_CC,
          Valor: Internet(ano, mes).value.Total,
        },
      ],
      Seguros: [
        {
          NomeConta: SegurosDiversos_C,
          ContaContabil: SegurosDiversos_CC,
          Valor: SegurosDiversos(ano, mes).value.Total,
        },
      ],
      DespForcaVendas: [
        {
          NomeConta: ForcaVendas_ConducaoETransporte_C,
          ContaContabil: ForcaVendas_ConducaoETransporte_CC,
          Valor: (await ForcaVendas_ConducaoETransporte(ano, mes)).value.Total,
        },
        {
          NomeConta: ForcaVendas_DespesasArmazenagem_C,
          ContaContabil: ForcaVendas_DespesasArmazenagem_CC,
          Valor: ForcaVendas_DespesasArmazenagem(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_Uniformes_C,
          ContaContabil: ForcaVendas_Uniformes_CC,
          Valor: ForcaVendas_Uniformes(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_DespesasDeViagem_C,
          ContaContabil: ForcaVendas_DespesasDeViagem_CC,
          Valor: ForcaVendas_DespesasDeViagem(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_ServicosContratadosDespVendas_C,
          ContaContabil: ForcaVendas_ServicosContratadosDespVendas_CC,
          Valor: ForcaVendas_ServicosContratadosDespVendas(ano, mes).value
            .Total,
        },
        {
          NomeConta: ForcaVendas_SeguroVida_C,
          ContaContabil: ForcaVendas_SeguroVida_CC,
          Valor: ForcaVendas_SeguroVida(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_MedicinaTrabalho_C,
          ContaContabil: ForcaVendas_MedicinaTrabalho_CC,
          Valor: ForcaVendas_MedicinaTrabalho(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_LocacaoOutrosBens_C,
          ContaContabil: ForcaVendas_LocacaoOutrosBens_CC,
          Valor: ForcaVendas_LocacaoOutrosBens(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_InssSobreProvisoes_C,
          ContaContabil: ForcaVendas_InssSobreProvisoes_CC,
          Valor: ForcaVendas_InssSobreProvisoes(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_FgtsSobreProvisoes_C,
          ContaContabil: ForcaVendas_FgtsSobreProvisoes_CC,
          Valor: ForcaVendas_FgtsSobreProvisoes(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_DecimoTerceiro_C,
          ContaContabil: ForcaVendas_DecimoTerceiro_CC,
          Valor: ForcaVendas_DecimoTerceiro(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_Ferias_C,
          ContaContabil: ForcaVendas_Ferias_CC,
          Valor: ForcaVendas_Ferias(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_CapacitacaoEDesenvolvimento_C,
          ContaContabil: ForcaVendas_CapacitacaoEDesenvolvimento_CC,
          Valor: ForcaVendas_CapacitacaoEDesenvolvimento(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_RecrutamentoESelecao_C,
          ContaContabil: ForcaVendas_RecrutamentoESelecao_CC,
          Valor: ForcaVendas_RecrutamentoESelecao(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_PlanoSaude_C,
          ContaContabil: ForcaVendas_PlanoSaude_CC,
          Valor: ForcaVendas_PlanoSaude(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_Endomarketing_C,
          ContaContabil: ForcaVendas_Endomarketing_CC,
          Valor: ForcaVendas_Endomarketing(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_AlimentacaoFuncionarios_C,
          ContaContabil: ForcaVendas_AlimentacaoFuncionarios_CC,
          Valor: ForcaVendas_AlimentacaoFuncionarios(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_InssSobreFolha_C,
          ContaContabil: ForcaVendas_InssSobreFolha_CC,
          Valor: ForcaVendas_InssSobreFolha(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_FgtsSobreFolha_C,
          ContaContabil: ForcaVendas_FgtsSobreFolha_CC,
          Valor: ForcaVendas_FgtsSobreFolha(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_VerbasRescisorias_C,
          ContaContabil: ForcaVendas_VerbasRescisorias_CC,
          Valor: ForcaVendas_VerbasRescisorias(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_HorasExtras_C,
          ContaContabil: ForcaVendas_HorasExtras_CC,
          Valor: ForcaVendas_HorasExtras(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_Salarios_C,
          ContaContabil: ForcaVendas_Salarios_CC,
          Valor: ForcaVendas_Salarios(ano, mes).value.Total,
        },
        {
          NomeConta: ForcaVendas_TaxasCartaoCredito_C,
          ContaContabil: ForcaVendas_TaxasCartaoCredito_CC,
          Valor: (await ForcaVendas_TaxasCartaoCredito(ano, mes)).value.Total,
        },
        {
          NomeConta: ForcaVendas_AluguelMaquinetas_C,
          ContaContabil: ForcaVendas_AluguelMaquinetas_CC,
          Valor: ForcaVendas_AluguelMaquinetas(ano, mes).value.Total,
        },
      ],
      Ocupacao: [
        {
          NomeConta: Aluguel_C,
          ContaContabil: Aluguel_CC,
          Valor: Aluguel(ano, mes).value.Total,
        },
      ],
      Receitas: {
        MercadoInterno: ValoresMercadoInterno,
        Exportacoes: Exportacoes(ano, mes),
      },
    };
  }
}

export default new Fixos();
