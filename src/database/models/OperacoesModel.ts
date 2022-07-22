import { Model, DECIMAL } from 'sequelize';
import db from '.';

class OperacaoModel extends Model {
  valor!: number;
}

OperacaoModel.init({
  valor: DECIMAL(20, 2),
}, {
  sequelize: db,
  modelName: 'Operacao',
  underscored: true,
  timestamps: true,
  createdAt: 'data_hora',
  updatedAt: true,
});

export default OperacaoModel;
