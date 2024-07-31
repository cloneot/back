import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const app_host = configService.get<string>('app.host');
        const db_name = configService.get<string>('db.database');
        console.log(`app host: ${app_host}`);
        console.log(`db name: ${db_name}`);
        return {
          type: 'mysql',
          host: configService.get<string>('db.host'),
          username: configService.get<string>('db.username'),
          password: configService.get<string>('db.password'),
          database: configService.get<string>('db.database'),
          synchronize: configService.get<boolean>('db.synchronize'),
          charset: 'utf8mb4',
          collation: 'utf8mb4_unicode_ci',
          autoLoadEntities: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
