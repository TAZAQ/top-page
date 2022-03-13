import { Injectable } from "@nestjs/common"
import { InjectModel } from "nestjs-typegoose"
import { TopPageModel } from "./top-page.model"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { CreateTopPageDto, TopLevelCategory } from "./dto/create-top-page.dto"

@Injectable()
export class TopPageService {
  constructor (@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async create (dto: CreateTopPageDto) {
    return this.topPageModel.create(dto)
  }

  async findById (id: string) {
    return this.topPageModel
      .findById(id)
      .exec()
  }

  async update (id: string, dto: TopPageModel) {
    return this.topPageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec()
  }

  async delete (id: string) {
    return this.topPageModel
      .findByIdAndDelete(id)
      .exec()
  }

  async findByFirstCategory (firstCategory: TopLevelCategory) {
    return this.topPageModel
      .find({ firstCategory })
      .exec()
  }
}
