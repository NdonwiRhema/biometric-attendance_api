import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { Products } from './products/typeorm/products.entity';
import { BiometricModule } from './biometrics/biometric.module';
import { Biometrics } from './biometrics/typeorm/biometrics.entity';

@Module({
  imports: [BiometricModule, ProductsModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'biometricsdb',
    entities:[Products,Biometrics],
    synchronize:true,
    autoLoadEntities:true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
