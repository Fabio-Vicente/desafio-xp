const usrToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJyb2xlIjoidXN1w6FyaW8ifQ.WnLelf6C_Su7bL42QgVvj_PhvoqQ_ytlxxCl-80om4c';

const admToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyLCJyb2xlIjoiYWRtaW5pc3RyYWRvciJ9.VIVhdK_JSPDL4_DNaEiv_BnuOPkgmck4dVQpCMJDij4';

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJyb2xlIjoidXN1w6FyaW8ifQ.WnLelf6C_Su7bL42QgVvj_PhvoqQ_ytlxxCl-80om4';

const anotherUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyLCJyb2xlIjoidXN1w6FyaW8ifQ.GvLy70kpVS9EviqrZm8skDD1fPKRT9QBLT3JnraHZTk';

const notFoundUser = null;

const regularUser = {
  codCliente: 1,
  senha: 'menteaberta',
  funcao: 'usuário',
};

const admUser = {
  codCliente: 2,
  senha: 'espiritoinovador',
  funcao: 'administrador',
};

const usrLogin = {
  codCliente: 1,
  senha: 'menteaberta',
};

const admLogin = {
  codCliente: 2,
  senha: 'espiritoinovador',
};

const wrongLogin = {
  codCliente: 3,
  senha: 'nopassword',
};

const noInfoLogin = {};

const noCodClienteLogin = {
  senha: 'menteaberta',
};

const noPassworLogin = {
  codCliente: 1,
};

const invalidCodLogin = {
  codCliente: '1',
  senha: 'menteaberta',
};

const invalidPasswordLogin = {
  codCliente: 1,
  senha: 12345678,
};

const shortPasswordLogin = {
  codCliente: 1,
  senha: 'xpinc',
};

const notExistentLogin = {
  codCliente: 3,
  senha: 'deixarpradepois',
};

const crackerLogin = {
  codCliente: 4,
  senha: 'naoconfiavel',
};

export {
  usrToken,
  admToken,
  invalidToken,
  anotherUser,
  notFoundUser,
  regularUser,
  admUser,
  usrLogin,
  admLogin,
  wrongLogin,
  noInfoLogin,
  noCodClienteLogin,
  noPassworLogin,
  invalidCodLogin,
  invalidPasswordLogin,
  shortPasswordLogin,
  notExistentLogin,
  crackerLogin,
};
