import {
  Model, STRING, DECIMAL, BIGINT,
} from 'sequelize';
import db from '..';
import CarteiraModel from './CarteiraModel';
import OperacaoModel from './OperacaoModel';

class AtivoModel extends Model {
  codAtivo!: string;

  nome!: string;

  valor!: number;

  qtdeAtivo!: number;

  qtdeDisponivel!: number;
}

AtivoModel.init({
  codAtivo: {
    primaryKey: true,
    type: STRING(6),
  },
  nome: STRING(30),
  valor: DECIMAL(20, 2),
  qtdeAtivo: BIGINT,
  qtdeDisponivel: BIGINT,
}, {
  sequelize: db,
  modelName: 'Ativo',
  tableName: 'Ativos',
  underscored: true,
  timestamps: false,
});

CarteiraModel.belongsTo(AtivoModel, { foreignKey: 'cod_ativo', as: 'Ativo' });
OperacaoModel.belongsTo(AtivoModel, { foreignKey: 'cod_ativo', as: 'Ativo' });

AtivoModel.hasMany(CarteiraModel, { foreignKey: 'cod_ativo', as: 'Carteiras' });
AtivoModel.hasMany(OperacaoModel, { foreignKey: 'cod_ativo', as: 'Operacoes' });

export default AtivoModel;
