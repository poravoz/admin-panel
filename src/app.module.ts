import { Module } from '@nestjs/common';
import { PostsModule } from './phone/phone.module';

@Module({
  imports: [PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
