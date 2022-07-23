export interface ILogin {
  codCliente: number,
  senha: string,
}

export interface loginReturn {
  error: string | boolean | null,
  token: string | null,
}
