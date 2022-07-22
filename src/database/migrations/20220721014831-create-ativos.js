module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      cod_ativo: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(6),
      },
      nome: Sequelize.STRING(30),
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(20, 2),
      },
      qtde_ativo: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      qtde_disponivel: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Ativos');
  },
};
