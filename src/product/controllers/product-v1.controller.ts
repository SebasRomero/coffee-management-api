import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductService } from '../product.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductListResponse } from '../responses/product-list.response';
import { CreateProductResponse } from '../responses/create-product.response';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { DeleteProductResponse } from '../responses/delete-product.response';

@ApiTags('Products')
@Controller('v1/products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @ApiCreatedResponse({ type: CreateProductResponse })
  @Post()
  async createProduct(@Body() newProduct: CreateProductDTO): Promise<CreateProductResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: await this.productService.createProduct(newProduct)
    };
  }

  @ApiOkResponse({ type: ProductListResponse })
  @Get()
  async getProducts(@Query() pagination: PaginationQueryDto): Promise<ProductListResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: await this.productService.getProducts(pagination)
    };
  }

  @ApiOkResponse({type: DeleteProductResponse})
  @Patch(':id')
  async deleteProduct(@Param('id') id:string): Promise<DeleteProductResponse> {
      await this.productService.deleteProduct(id)
      return {
        statusCode: HttpStatus.OK,
        message: 'Product deleted',
        data: {id}
      }
  }
}

