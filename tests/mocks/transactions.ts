const insertedTransaction = {
  id: 2,
  valor: 523.45,
  codCliente: 1,
  codAtivo: 'XPBR31',
  qtde: 5,
};

const oldPortfolio = {
  valor: 1_000,
  qtde: 10,
};

const noPortfolio = null;

const unsuficientPortfolio = {
  valor: 100,
  qtde: 1,
};

const updatedPortfolio = [1, {
  dataValues: [{
    valor: 1_523.45,
    qtde: 15,
  }],
}];

const createdPortfolio = [1, {
  dataValues: [{
    valor: 523.45,
    qtde: 5,
  }],
}];

const availableAssets = {
  qtdeDiponivel: 10,
};

const unavailableAssets = {
  qtdeDiponivel: 1,
};

const transaction = {
  codCliente: 1,
  codAtivo: 'XPBR31',
  qtdeAtivo: 5,
};

const noCostumerTransaction = {
  codAtivo: 'XPBR31',
  qtdeAtivo: 5,
};

const noAssetTransaction = {
  codCliente: 1,
  qtdeAtivo: 5,
};

const noQtdeTransaction = {
  codCliente: 1,
  codAtivo: 'XPBR31',
};

const unauthorizedTransaction = {
  codCliente: 5,
  codAtivo: 'XPBR31',
  qtdeAtivo: 5,
};

export {
  transaction,
  insertedTransaction,
  oldPortfolio,
  noPortfolio,
  unsuficientPortfolio,
  createdPortfolio,
  availableAssets,
  unavailableAssets,
  updatedPortfolio,
  noCostumerTransaction,
  noAssetTransaction,
  noQtdeTransaction,
  unauthorizedTransaction,
};
