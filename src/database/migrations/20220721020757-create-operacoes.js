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
      qtde: {
        allowNull: false,
        type: Sequelize.BIGINT,
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
      cod_ativo: {
        allowNull: false,
        type: Sequelize.STRING(6),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Ativos',
          key: 'cod_ativo',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Operacoes');
  },
};
