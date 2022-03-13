import { Injectable } from "@nestjs/common"
import { InjectModel } from "nestjs-typegoose"
import { ProductModel } from "./product.model"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { CreateProductDto } from "./dto/create-product.dto"
import { FindProductDto } from "./dto/find-product.dto"
import { ReviewModel } from "../review/review.model"

@Injectable()
export class ProductService {
  constructor (@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

  async create (dto: CreateProductDto) {
    return this.productModel.create(dto)
  }

  async findById (id: string) {
     return this.productModel
       .findById(id)
       .exec()
  }

  async deleteById (id: string) {
    return this.productModel
      .findByIdAndDelete(id)
      .exec()
  }

  async updateById (id: string, dto: ProductModel) {
    return this.productModel
      .findByIdAndUpdate(id, dto, { new: true }) // вернет новый объект, а не старый
      .exec()
  }

  async findWithReviews (dto: FindProductDto) {
    return await this.productModel
      // шаги, последовательность действий, которые произойдут в БД
      .aggregate([
        {
          $match: {
            categories: dto.category, // в массиве будет искать и если есть хотя бы один, то он будет выведен
          },
        },
        {
          $sort: {
            _id: 1, // сделать стабильную сортировку, чтобы $limit показывал одни и те же данные при каждом вызове запроса
          },
        },
        {
          $limit: dto.limit,
        },
        {
          // подтягиваем внешнюю таблицу Review, по внешнему ключу productId
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' }, // ссылка на поле из $lookup
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec() as Array<ProductModel & {
      review: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    }>
  }
}
