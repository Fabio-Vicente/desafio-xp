module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cod_ativo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(5),
      },
      nome: {
        type: Sequelize.STRING(30),
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(20, 2),
      },
      qtde_ativo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      qtde_disponivel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Ativos');
  },
};
