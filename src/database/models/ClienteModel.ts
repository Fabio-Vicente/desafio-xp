import {
  Model,
  INTEGER,
  STRING,
  DECIMAL,
} from 'sequelize';
import db from '.';
import CarteiraModel from './CarteiraModel';
import OperacaoModel from './OperacoesModel';

class ClienteModel extends Model {
  codCliente!: string;

  nome!: string;

  valor!: number;

  qtdeAtivo!: number;

  qtdeDisponivel!: number;
}

ClienteModel.init({
  codCliente: {
    primaryKey: true,
    type: INTEGER,
  },
  nome: STRING(50),
  saldo: DECIMAL(20, 2),
}, {
  sequelize: db,
  modelName: 'Cliente',
  underscored: true,
  timestamps: false,
});

CarteiraModel.belongsTo(ClienteModel, { foreignKey: 'id_cliente', as: 'Carteira' });
OperacaoModel.belongsTo(ClienteModel, { foreignKey: 'id_cliente', as: 'Operacoes' });

ClienteModel.hasMany(CarteiraModel, { foreignKey: 'id_cliente', as: 'Carteira' });
ClienteModel.hasMany(OperacaoModel, { foreignKey: 'id_cliente', as: 'Operacoes' });

export default ClienteModel;
