import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import { BiometricController } from './biometric.controller';
import { BiometricService } from './biometric.service';
import { Biometrics } from './typeorm/biometrics.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Biometrics])],
    controllers:[BiometricController],
    providers:[BiometricService]
})
export class BiometricModule{}