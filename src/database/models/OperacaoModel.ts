import {
  Model,
  BIGINT,
  INTEGER,
  STRING,
} from 'sequelize';
import db from '..';

class OperacaoModel extends Model {
  id!: number;

  codCliente!: number;

  codAtivo!: string;

  qtde!: number;
}

OperacaoModel.init({
  codCliente: INTEGER,
  codAtivo: STRING(6),
  qtde: BIGINT,
}, {
  sequelize: db,
  modelName: 'Operacao',
  tableName: 'Operacoes',
  underscored: true,
  timestamps: true,
  createdAt: 'data_hora',
  updatedAt: false,
});

export default OperacaoModel;
