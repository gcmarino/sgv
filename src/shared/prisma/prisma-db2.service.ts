import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '#generated/prisma-db2';

@Injectable()
export class PrismaDB2Service 
// extends PrismaClient implements OnModuleInit, OnModuleDestroy 
{
    // constructor() {
    //     const adapter = new PrismaMssql(process.env.DATABASE_URL_DB2!);
    //     super({ adapter });
    // }

    // async onModuleInit() {
    //     await this.$connect();
    // }

    // async onModuleDestroy() {
    //     await this.$disconnect();
    // }
}
