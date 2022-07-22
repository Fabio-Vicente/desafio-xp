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
      },
      cod_ativo: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING(6),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Ativos',
          key: 'cod_ativo',
        },
      },
      qtde: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Carteira');
  },
};
