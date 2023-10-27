import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetUser } from 'src/auth/decorator';
import { ProductDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getProductFromId(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductFromId(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  createNewProduct(@GetUser('id') id: number, @Body() dto: ProductDto) {
    return this.productService.createNewProduct(id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateProduct(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductDto,
  ) {
    return this.productService.updateProduct(userId, id, dto);
  }
}
