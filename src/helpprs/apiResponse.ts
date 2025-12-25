import type { Response } from "express";

/**
 * Estrutura padrão para erros por campo (ex.: validação).
 * - chave: nome do campo (ex: "email", "password", "user.email" para campos aninhados)
 * - valor: lista de mensagens (permite acumular múltiplas regras por campo)
 */
export type FieldErrors = Record<string, string[]>;

/**
 * Contrato padrão de resposta da API (consistente em todo o projeto).
 * - success: indica se a operação foi bem-sucedida
 * - data: payload de sucesso (ou null em caso de erro)
 * - message: mensagem de contexto (útil para UI/toast/log)
 * - errors: erros detalhados (por campo) quando houver validação/erros de domínio
 *
 * O genérico T permite tipar o `data` por endpoint:
 * - Ex.: ApiResponse<UserSafe>, ApiResponse<Paginated<Order>>, ApiResponse<string[]>, etc.
 */
export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    message: string;
    errors: FieldErrors | null;
};

/**
 * Helper de resposta de sucesso.
 *
 * @param res     Response do Express (onde enviamos status + JSON)
 * @param status  HTTP status code (ex.: 200, 201, 204*). Aqui enviamos body, então 204 não se aplica.
 * @param message Mensagem amigável/operacional para o cliente (UI/toast) e logs
 * @param data    Payload do sucesso (tipado como T)
 *
 * Retorna a resposta já enviada (res.status(...).json(...)).
 */
export function ok<T>(
    res: Response,
    status: number,
    message: string,
    data: T
) {
    // Monta o payload seguindo o contrato ApiResponse<T>.
    // Em sucesso: errors é sempre null para evitar ambiguidade no front.
    const payload: ApiResponse<T> = {
        success: true,
        data,
        message,
        errors: null,
    };

    return res.status(status).json(payload);
}

/**
 * Helper de resposta de erro.
 *
 * @param res     Response do Express
 * @param status  HTTP status code do erro (ex.: 400 validação, 401 não autenticado, 403 proibido, 404 não encontrado, 409 conflito, 500 interno)
 * @param message Mensagem geral do erro (para UI/toast/log)
 * @param errors  Erros detalhados por campo (opcional). Default null.
 *
 * Observação: `data` é sempre null em erro. O front usa `success` + `errors`/`message` para decidir o que exibir.
 */
export function fail(
    res: Response,
    status: number,
    message: string,
    errors: FieldErrors | null = null
) {
    // ApiResponse<null> reforça que em erro não existe payload de dados.
    const payload: ApiResponse<null> = {
        success: false,
        data: null,
        message,
        errors,
    };

    return res.status(status).json(payload);
}
