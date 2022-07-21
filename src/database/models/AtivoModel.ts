import {
  Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';
import db from '.';
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
  codAtivo: STRING(5),
  nome: STRING(30),
  valor: DECIMAL(20, 2),
  qtdeAtivo: INTEGER,
  qtdeDisponivel: INTEGER,
}, {
  sequelize: db,
  modelName: 'Ativo',
  underscored: true,
  timestamps: false,
});

CarteiraModel.belongsTo(AtivoModel, { foreignKey: 'id_ativo', as: 'Carteira' });
OperacaoModel.belongsTo(AtivoModel, { foreignKey: 'id_ativo', as: 'Operacoes' });

AtivoModel.hasMany(CarteiraModel, { foreignKey: 'id_ativo', as: 'Carteira' });
AtivoModel.hasMany(OperacaoModel, { foreignKey: 'id_ativo', as: 'Operacoes' });

export default AtivoModel;
