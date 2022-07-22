module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Clientes',
      [
        {
          nome: 'Fábio Vicente',
          senha: 'menteaberta',
          funcao: 'usuário',
          saldo: 1_000,
        },
        {
          nome: 'Gustavo Bensimol',
          senha: 'pensamentoinovador',
          funcao: 'administrador',
          saldo: 1_300_000_000,
        },
        {
          nome: 'Thiago Manfra',
          senha: 'errarrapido',
          funcao: 'administrador',
          saldo: 900_000_000,
        },
        {
          nome: 'Gregory Portugal',
          senha: 'diversidade',
          funcao: 'usuario',
          saldo: 10_000_000,
        },
        {
          nome: 'Mariana Melita',
          senha: 'protagonismo',
          funcao: 'usuario',
          saldo: 15_000_000,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Clientes', null, {});
  },
};
