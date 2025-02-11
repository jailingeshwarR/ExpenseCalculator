import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sully6458:PLaFCPjKkKC8hu6a@cluster0.b65i5cz.mongodb.net/test?retryWrites=true&w=majority'),
    UserModule,
    ExpenseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}