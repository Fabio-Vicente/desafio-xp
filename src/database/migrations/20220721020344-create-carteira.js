module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carteira', {
      cod_cliente: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Clientes',
          key: 'cod_cliente',
        },
        unique: 'id',
      },
      id_ativo: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Ativos',
          key: 'id',
        },
        unique: 'id',
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(20, 2),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Carteira');
  },
};
