import { Model, BIGINT } from 'sequelize';
import db from '..';

class OperacaoModel extends Model {
  qtde!: number;
}

OperacaoModel.init({
  qtde: BIGINT,
}, {
  sequelize: db,
  modelName: 'Operacao',
  underscored: true,
  timestamps: true,
  createdAt: 'data_hora',
  updatedAt: true,
});

export default OperacaoModel;
