import { Model, DECIMAL } from 'sequelize';
import db from '.';

class CarteiraModel extends Model {
  valor!: number;
}

CarteiraModel.init({
  valor: DECIMAL(20, 2),
}, {
  sequelize: db,
  modelName: 'Carteira',
  underscored: true,
  timestamps: false,
});

export default CarteiraModel;
