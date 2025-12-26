import { Prisma } from "@prisma/client";
import { prisma } from "../helpprs/prisma.js";

export const serviceRegister = async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
        data,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
        }
    });
}