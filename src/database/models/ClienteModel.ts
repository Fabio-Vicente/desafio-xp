import {
  Model,
  DECIMAL,
  ENUM,
  INTEGER,
  STRING,
} from 'sequelize';
import db from '..';

import { ICliente } from '../../interfaces';
import CarteiraModel from './CarteiraModel';
import OperacaoModel from './OperacoesModel';

class ClienteModel extends Model implements ICliente {
  codCliente!: number;

  nome!: string;

  senha!: string;

  funcao!: string;

  saldo!: number;
}

ClienteModel.init({
  codCliente: {
    primaryKey: true,
    type: INTEGER,
  },
  nome: STRING(50),
  senha: STRING(30),
  funcao: ENUM('usuario, administrador'),
  saldo: DECIMAL(20, 2),
}, {
  sequelize: db,
  modelName: 'Cliente',
  underscored: true,
  timestamps: false,
});

CarteiraModel.belongsTo(ClienteModel, { foreignKey: 'id_cliente', as: 'Cliente' });
OperacaoModel.belongsTo(ClienteModel, { foreignKey: 'id_cliente', as: 'Cliente' });

ClienteModel.hasMany(CarteiraModel, { foreignKey: 'id_cliente', as: 'Carteiras' });
ClienteModel.hasMany(OperacaoModel, { foreignKey: 'id_cliente', as: 'Operacoes' });

export default ClienteModel;
