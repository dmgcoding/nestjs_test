import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    const products = await this.prisma.product.findMany();
    return {
      data: products,
    };
  }

  async getProductFromId(prodId: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: prodId,
      },
    });
    if (!product) throw new NotFoundException('product with that id not found');
    return {
      data: product,
    };
  }

  async createNewProduct(userId: number, dto: ProductDto) {
    const product = await this.prisma.product.create({
      data: {
        title: dto.title,
        desc: dto.desc,
        ownerId: dto.ownerId,
      },
    });
    return {
      data: product,
    };
  }

  async updateProduct(userId: number, prodId: number, dto: ProductDto) {
    let prod = await this.prisma.product.findUnique({
      where: {
        id: prodId,
      },
    });
    if (!prod) throw new NotFoundException('product not found');
    if (prod.ownerId != userId)
      throw new ForbiddenException(
        "You don't have permission to edit this product",
      );
    prod = await this.prisma.product.update({
      where: {
        id: prodId,
      },
      data: {
        ...dto,
      },
    });
    return {
      data: prod,
    };
  }
}
