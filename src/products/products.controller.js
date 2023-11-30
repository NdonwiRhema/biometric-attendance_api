import{Controller,Post,Body,Bind,Dependencies,Get,Param,Put,Delete} from '@nestjs/common'
import { ProductsService } from './products.service';


@Controller('products')
@Dependencies(ProductsService)

export class ProductsController{

    constructor(productsService){
       this.productsService = productsService
      
    }


    @Post() 
    @Bind(Body())
    addProduct(CreateProductsDto){
       this.productsService.addProduct(CreateProductsDto.title,CreateProductsDto.description,CreateProductsDto.price)
       return "Product Created !!"
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts()
    }

    @Get(':id')
    @Bind(Param('id'))
    findOne(id){
        return this.productsService.findOne(id)
    }

    @Put(':id')
    @Bind(Param('id'), Body())
    updateProduct(id,CreateProductsDto){
        return this.productsService.updateProduct(id,CreateProductsDto.title,CreateProductsDto.description,CreateProductsDto.price)
    }

    @Delete(':id')
    @Bind(Param('id'))
    deleteProduct(id){
            return this.productsService.deleteProduct(id)
    }
}