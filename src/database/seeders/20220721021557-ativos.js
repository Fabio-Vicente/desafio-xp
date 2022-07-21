module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Ativos',
      [
        {
          cod_ativo: 'RRRP3',
          nome: '3R PETROLEUM',
          valor: 30_44,
          qtde_ativo: 200_372_163,
          qtde_disponivel: 200_372_163,
        },
        {
          cod_ativo: 'ALPA4',
          nome: 'ALPARGATAS',
          valor: 19_59,
          qtde_ativo: 201_257_220,
          qtde_disponivel: 201_257_220,
        },
        {
          cod_ativo: 'ABEV3',
          nome: 'AMBEV S/A',
          valor: 14_48,
          qtde_ativo: 4_380_195_841,
          qtde_disponivel: 4_380_195_841,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Ativos', null, {});
  },
};
