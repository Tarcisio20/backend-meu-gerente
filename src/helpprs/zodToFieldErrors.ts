import { ZodError } from "zod";

export function zodToFieldErrors(error: ZodError) {
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const field = issue.path.join(".") || "non_field_errors"; // ex: "user.email"
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
    }

    return fieldErrors;
}
