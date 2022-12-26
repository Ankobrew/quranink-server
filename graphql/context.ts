// @ts-ignore
import { PrismaClient } from "@prisma/client";

export interface MyContext {
  prisma: PrismaClient;
}

export const prisma = new PrismaClient();
