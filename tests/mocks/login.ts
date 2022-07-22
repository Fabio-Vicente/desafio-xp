const usrToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJyb2xlIjoidXN1w6FyaW8ifQ.WnLelf6C_Su7bL42QgVvj_PhvoqQ_ytlxxCl-80om4c';

const admToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyLCJyb2xlIjoiYWRtaW5pc3RyYWRvciJ9.VIVhdK_JSPDL4_DNaEiv_BnuOPkgmck4dVQpCMJDij4';

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJyb2xlIjoidXN1w6FyaW8ifQ.WnLelf6C_Su7bL42QgVvj_PhvoqQ_ytlxxCl-80om4';

const notFoundUser = null;

const regularUser = {
  codCliente: 1,
  role: 'usuário',
};

const admUser = {
  codCliente: 2,
  role: 'administrador',
};

const usrLogin = {
  codCliente: 1,
  password: 'menteaberta',
};

const admLogin = {
  codCliente: 2,
  password: 'espiritoinovador',
};

const noInfoLogin = {};

const noCodClienteLogin = {
  password: 'menteaberta',
};

const noPassworLogin = {
  codCliente: 1,
};

const wrongCodLogin = {
  codCliente: '1',
  password: 'menteaberta',
};

const wrongPasswordLogin = {
  codCliente: 1,
  password: 12345678,
};

const shortPasswordLogin = {
  codCliente: 1,
  password: 'xpinc',
};

const notExistentLogin = {
  codCliente: 3,
  password: 'deixarpradepois',
};

const crackerLogin = {
  codCliente: 4,
  password: 'naoconfiavel',
};

export {
  usrToken,
  admToken,
  invalidToken,
  notFoundUser,
  regularUser,
  admUser,
  usrLogin,
  admLogin,
  noInfoLogin,
  noCodClienteLogin,
  noPassworLogin,
  wrongCodLogin,
  wrongPasswordLogin,
  shortPasswordLogin,
  notExistentLogin,
  crackerLogin,
};
