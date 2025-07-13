import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { CnaeController } from './cnae.controller';
import { CnaeService } from './cnae.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s', algorithm: 'HS256' },
    }),
  ],
  providers: [CnaeService],
  exports: [JwtModule],
  controllers: [CnaeController],
})
export class CnaeModule {}
