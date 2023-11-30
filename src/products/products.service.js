import {Injectable,NotFoundException,Dependencies} from '@nestjs/common'
import { Products } from './typeorm/products.entity'
import{getRepositoryToken} from '@nestjs/typeorm'


@Injectable()
@Dependencies(getRepositoryToken(Products))
export class ProductsService{
    constructor(productsRepository){
        this.productRepository = productsRepository
    }
  
    addProduct(title,desc,price){
         // const newProduct = new Product(prodId,title,desc,price)
        const newProduct = {
            title:title,
            description:desc,
            price:price,
            created_at:new Date()
        }
        
        const schema=  this.productRepository.create(newProduct)
        return this.productRepository.save(schema)
        
    }
    getProducts(){
     return  this.productRepository.find()
    }

    findOne(id){
        // const product = this.productsArray.filter((item) => item.id === parseInt(id))
    
        // if(!product || product.length===0){
        //     throw new NotFoundException('could not Find this Product')
        // }
       
        // return product
       return this.productRepository.findOneBy({id})

   }
    updateProduct(id,title,desc,price){
       // for saving in memory only..
        // const productIndex = this.productsArray.findIndex(prod=>prod.id === parseInt(id));
        // const product = this.productsArray[productIndex]
      
        // if(!product){
        //     throw new NotFoundException('could not Find this Product')
        // }
       
        const newProduct = {
            title:title,
            description:desc,
            price:price,
            created_at:new Date()
        }
       return this.productRepository.update({id},{...newProduct})
    }

    deleteProduct(id){
            // const productnew = this.productsArray.filter(prod=>prod.id !== parseInt(id))
            // this.productsArray = productnew
            // return { message : "Deleted"}
        return this.productRepository.delete(id)

    }

}