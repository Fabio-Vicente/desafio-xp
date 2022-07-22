module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      cod_cliente: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: Sequelize.STRING(50),
      senha: Sequelize.STRING(30),
      funcao: {
        type: Sequelize.ENUM('usuário', 'administrador'),
      },
      saldo: {
        allowNull: false,
        type: Sequelize.DECIMAL(20, 2),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Clientes');
  },
};
