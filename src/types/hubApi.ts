export interface HubApiTelefone {
  telefoneComDDD: string;
  telemarketingBloqueado: boolean | null;
  operadora: string | null;
  tipoTelefone: string | null;
  whatsApp: boolean | null;
}

export interface HubApiEndereco {
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export interface HubApiEmail {
  enderecoEmail: string;
}

export interface HubApiResult {
  codigoPessoa: string;
  nomeCompleto: string;
  genero: string;
  dataDeNascimento: string;
  documento: string;
  nomeDaMae: string;
  anos: number;
  zodiaco: string | null;
  listaTelefones: HubApiTelefone[];
  listaEnderecos: HubApiEndereco[];
  listaEmails: HubApiEmail[];
  salarioEstimado: string;
  statusCadastral: string | null;
  dataStatusCadastral: string | null;
  lastUpdate: string;
}

export interface HubApiResponse {
  status: boolean;
  return: string;
  consumed: number;
  result: HubApiResult;
}

export interface HubApiError {
  error: string;
  message?: string;
}