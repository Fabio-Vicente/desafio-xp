import { Model, BIGINT } from 'sequelize';
import db from '..';

class CarteiraModel extends Model {
  qtde!: number;
}

CarteiraModel.init({
  qtde: BIGINT,
}, {
  sequelize: db,
  modelName: 'Carteira',
  underscored: true,
  timestamps: false,
});

export default CarteiraModel;
