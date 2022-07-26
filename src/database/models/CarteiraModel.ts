import {
  Model,
  STRING,
  BIGINT,
  INTEGER,
} from 'sequelize';
import db from '..';

class CarteiraModel extends Model {
  qtde!: number;
}

CarteiraModel.init({
  codCliente: {
    primaryKey: true,
    type: STRING(6),
  },
  codAtivo: {
    primaryKey: true,
    type: INTEGER,
  },
  qtde: BIGINT,
}, {
  sequelize: db,
  modelName: 'Carteira',
  tableName: 'Carteira',
  underscored: true,
  timestamps: false,
});

export default CarteiraModel;
