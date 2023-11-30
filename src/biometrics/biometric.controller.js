import {Controller,Dependencies,Get,Post,Bind,Body,Param,Put,Patch} from '@nestjs/common'
import { BiometricService } from './biometric.service';


@Controller('biometrics')
@Dependencies(BiometricService)
export class BiometricController{
    constructor(biometricService){
        this.biometricService = biometricService
    }

    @Post()
    @Bind(Body())
    addFingerPrint(CreatePrintDto){
        return this.biometricService.addFingerPrint(CreatePrintDto)
    }
    
    @Get()
    getRecordStatus(){
        return this.biometricService.getRecordStatus()
      }

    @Get(':template')
    @Bind(Param('template'))
    getFingerPrint(template){
      return this.biometricService.getFingerPrint(template)
    }

    @Get('enrol/:device')
    @Bind(Param('device'))
    addFingerPrintFromDevice(device){
       return this.biometricService.addFingerPrintFromDevice(device)
       
      }


    @Put(':owner')
    @Bind(Param('owner'), Body())
    updateFingerPrintRecord(owner,createDto){
        return this.biometricService.updatePrintRecord(owner,createDto)
     
    }

    @Patch('/extract/:extract')
    @Bind(Param('extract'), Body())
      updateFingerPrintExtractRecord(extract,createDto){
          return this.biometricService.updatePrintRecord(extract,createDto)
      
      }

}