import{Injectable,Dependencies} from '@nestjs/common'
import {getRepositoryToken,createQueryBuilder} from '@nestjs/typeorm'
import { Biometrics } from './typeorm/biometrics.entity'
import { Like } from '../../node_modules/typeorm/index'

@Injectable()
@Dependencies(getRepositoryToken(Biometrics))
export class BiometricService{
    constructor(biometricsRepository){
        this.biometricRepository = biometricsRepository
    }

    addFingerPrint(Dto){
            const newPrint = {...Dto,created_at:new Date()}
            const createdSchema = this.biometricRepository.create(newPrint)
            return this.biometricRepository.save(createdSchema)        
        }

    addFingerPrintFromDevice(device){
        const entry = device.split('**')
        console.log(entry[1])
        const extract = entry[1].split('0000000000000000000000000000000000000000000000000000000000000000');
        //const extract = entry[1].split('0000000000');
        console.log(extract)
            const newPrint = {device_id:entry[0],printTemplate:entry[1],device_status:0,template_extract:extract[0],created_at:new Date()}
            const createdSchema = this.biometricRepository.create(newPrint)
            return this.biometricRepository.save(createdSchema)        
        }
    
    async getFingerPrint(template){
        console.log(template)
        const extract = template.split('0000000000000000000000000000000000000000000000000000000000000000');
        const extractLength = extract[0].length>0 && extract[0].length
        const extractToken = extract[0].slice(0,4)
        console.log(extractToken,extractLength)
        const extractArr = await this.biometricRepository.find({where:{template_extract:Like(`${extractToken}%`)}})
        console.log(extractArr)
        const percentageMatch =[]
       if(extractArr.length > 0){
        extractArr.forEach(element => {
            const {template_extract} = element
            const compareSubstrate = template_extract.split("")
            const saltToken = extract[0].split("")
            const matches = []
            for(let i=0; i<compareSubstrate.length; i++){
                compareSubstrate[i]===saltToken[i] && matches.push(compareSubstrate[i])
         
            }
            const calculatedPercentage = (matches.length/extractLength)*100
            const percentageObj = {
                id:template_extract,
                percentage:calculatedPercentage
            }
            percentageMatch.push(percentageObj)
        });
        const tempArr = percentageMatch.filter(match => match.percentage>60)
        const queryExtract = tempArr.sort((a,b)=>{
            let x= a.percentage
            let y= b.percentage
           if(x>y){
            return 1
           }
        else{
            return -1
        }
        })
        console.log(percentageMatch,queryExtract[queryExtract.length-1])
        if(queryExtract.length>0){
            console.log("user found!!")
              return this.biometricRepository.findOneBy({template_extract:queryExtract[queryExtract.length-1].id})
        }
        else{
            console.log("Not Quite Sure of your Print")
            return{message:"Not Quite Sure of your Print"}
        }
       }
       else{
        console.log('No user found')
        return ''
       }
    }
    getRecordStatus(){// this tells the subscribed device which id is awaiting a print
          // const dateTimes = new Date(time).toString()
          // return this.biometricRepository.createQueryBuilder().select().where('device_id= :id',{id:"0"})
                                                                       
       return this.biometricRepository.find({where:{device_id:0},andWhere:{owner_id:''}})                                                                
      
   }
    updatePrintRecord(owner,Dto){
       return this.biometricRepository.update({id:owner},{...Dto})
    }

    updatePrintExtractRecord(extract,Dto){
       return this.biometricRepository.update({id:extract},{...Dto})
    }


}