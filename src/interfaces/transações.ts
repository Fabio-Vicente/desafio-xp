export interface Investimento {
  codCliente: number,
  codAtivo: number,
}

export interface Operacao extends Investimento {
  qtdeAtivo: number,
}

export interface OperacaoServiceReturn {
  error: boolean | null,
  id: number | null,
}
