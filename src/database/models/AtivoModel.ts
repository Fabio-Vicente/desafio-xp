import {
  Model, STRING, DECIMAL, BIGINT,
} from 'sequelize';
import db from '..';
import CarteiraModel from './CarteiraModel';
import OperacaoModel from './OperacoesModel';

class AtivoModel extends Model {
  codAtivo!: string;

  nome!: string;

  valor!: number;

  qtdeAtivo!: number;

  qtdeDisponivel!: number;
}

AtivoModel.init({
  codAtivo: STRING(6),
  nome: STRING(30),
  valor: DECIMAL(20, 2),
  qtdeAtivo: BIGINT,
  qtdeDisponivel: BIGINT,
}, {
  sequelize: db,
  modelName: 'Ativo',
  underscored: true,
  timestamps: false,
});

CarteiraModel.belongsTo(AtivoModel, { foreignKey: 'id_ativo', as: 'Ativo' });
OperacaoModel.belongsTo(AtivoModel, { foreignKey: 'id_ativo', as: 'Ativo' });

AtivoModel.hasMany(CarteiraModel, { foreignKey: 'id_ativo', as: 'Carteiras' });
AtivoModel.hasMany(OperacaoModel, { foreignKey: 'id_ativo', as: 'Operacoes' });

export default AtivoModel;
