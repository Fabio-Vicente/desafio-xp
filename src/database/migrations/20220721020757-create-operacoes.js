module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Operacoes', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_hora: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(20, 2),
      },
      cod_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Clientes',
          key: 'cod_cliente',
        },
      },
      id_ativo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Ativos',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Operacoes');
  },
};
