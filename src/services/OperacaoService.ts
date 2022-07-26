import { ModelStatic } from 'sequelize';
import { AtivoModel, CarteiraModel, OperacaoModel } from '../database/models';
import { Operacao, OperacaoServiceReturn } from '../interfaces';
import database from '../database';

export default class OperacaoService {
  private model;

  private carteiraModel;

  private ativoModel;

  private sequelize;

  constructor(
    model: ModelStatic<OperacaoModel> = OperacaoModel,
    carteiraModel: ModelStatic<CarteiraModel> = CarteiraModel,
    ativoModel: ModelStatic<AtivoModel> = AtivoModel,
    sequelize: typeof database = database,
    //  * There is a problem importing libraries reported here:
    //  * source: https://github.com/sequelize/sequelize-typescript/issues/196
  ) {
    this.model = model;
    this.carteiraModel = carteiraModel;
    this.ativoModel = ativoModel;
    this.sequelize = sequelize;
  }

  public async comprarAtivo(operacao: Operacao): Promise<OperacaoServiceReturn> {
    const { qtdeAtivo, codAtivo, codCliente } = operacao;

    const ativo = await this.ativoModel.findOne({
      where: { codAtivo },
    }) as AtivoModel;

    const qtdeDisponivel = ativo?.qtdeDisponivel;

    if (qtdeDisponivel < qtdeAtivo) {
      return { error: true, id: null };
    }

    const carteira = await this.carteiraModel.findOne({
      where: { codAtivo, codCliente },
    }) as CarteiraModel;

    const qtde = carteira?.qtde;

    return this.sequelize.transaction(async (transaction) => {
      this.ativoModel.update({ qtdeDisponivel: qtdeDisponivel - qtdeAtivo }, {
        where: { codAtivo },
      });

      if (qtde === undefined) {
        this.carteiraModel.create({
          codCliente,
          codAtivo,
          qtde: operacao.qtdeAtivo,
        }, { transaction });
      } else {
        this.carteiraModel.update(
          { qtde: qtde + qtdeAtivo },
          { where: { codAtivo, codCliente }, transaction },
        );
      }
      const { id } = await this.model.create(
        { codCliente, codAtivo, qtde: qtdeAtivo },
        { transaction },
      );

      return { id, error: false };
    });
  }
}
