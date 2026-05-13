import { Module } from '@nestjs/common';
import { PrismaDB1Service } from '../prisma/prisma-db1.service';
import { PrismaDB2Service } from '../prisma/prisma-db2.service';

@Module({
  providers: [PrismaDB1Service, PrismaDB2Service],
  exports: [PrismaDB1Service, PrismaDB2Service],
})
export class DatabaseModule {}
