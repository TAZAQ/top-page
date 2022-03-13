import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { TopPageModel } from "./top-page.model"
import { FindTopPageDto } from "./dto/find-top-page.dto"
import { CreateTopPageDto } from "./dto/create-top-page.dto"
import { TopPageService } from "./top-page.service"
import { IdValidationPipe } from "../pipes/id-validation.pipe"
import { TOP_PAGE_NOT_FOUND } from "./top-page.consts"

@Controller('top-page')
export class TopPageController {
  constructor (private readonly topPageService: TopPageService) {}

  @Post('create')
  async create (@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @Get(':id')
  async get (@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id)
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }

    return topPage
  }

  @Patch(':id')
  async update (@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
    const updatedTopPage = await this.topPageService.update(id, dto)
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }

    return updatedTopPage
  }

  @Delete(':id')
  async delete (@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.delete(id)
    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find (@Body() { firstCategory } : FindTopPageDto) {
    return this.topPageService.findByFirstCategory(firstCategory)
  }
}
