import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Phone from './entities/phone.entity';
import PhonesController from './phone.controller';
import PhonesService from './phone.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhoneModule {}