module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Clientes',
      [
        {
          nome: 'Fábio Vicente',
          saldo: 1_000,
        },
        {
          nome: 'Gustavo Bensimol',
          saldo: 1_300_000_000,
        },
        {
          nome: 'Thiago Manfra',
          saldo: 900_000_000,
        },
        {
          nome: 'Gregory Portugal',
          saldo: 10_000_000,
        },
        {
          nome: 'Joana Mesquita',
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
