import { RequestHandler } from "express";
import z, { success } from "zod";
import { zodToFieldErrors } from "../helpprs/zodToFieldErrors.js";
import { fail, ok } from "../helpprs/apiResponse.js";
import { hashPassword } from "../helpprs/password.js";
import { serviceRegister } from "../services/auth.js";

// 1) Base: garante que vira string e não pode ser vazio
const requiredString = (requiredMsg: string, typeMsg = "Tipo inválido") =>
    z.preprocess(
        (val) => (val === undefined || val === null ? "" : val),
        z.string({ message: typeMsg }).min(1, requiredMsg)
    );

// 2) Agora você "completa" as regras usando pipe
const registerSchema = z.object({
    first_name: requiredString("Informe seu primeiro nome."),
    last_name: requiredString("Informe seu sobrenome."),

    email: requiredString("Precisa informar um e-mail.")
        .pipe(z.string().email("Informe um e-mail válido.")),

    password: requiredString("Informe sua senha.")
        .pipe(z.string().min(4, "A senha precisa ter no mínimo 4 caracteres.")),
});
export const register: RequestHandler = async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) return fail(res, 400, "Erro de validação", zodToFieldErrors(parsed.error));

    const data = parsed.data;
    const password_hash = await hashPassword(data.password);
    const user = await serviceRegister({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: password_hash
    })
    if (!user) return fail(res, 500, "Erro ao criar usuário", null);
    return ok(res, 201, "Usuário criado com sucesso", user);
}