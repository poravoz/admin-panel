import { Module } from '@nestjs/common';
import PhonesController from './phone.controller';
import PhonesService from './phone.service';
 
@Module({
  imports: [],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PostsModule {}