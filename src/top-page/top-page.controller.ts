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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { FindTopPageDto } from "./dto/find-top-page.dto"
import { CreateTopPageDto } from "./dto/create-top-page.dto"
import { TopPageService } from "./top-page.service"
import { IdValidationPipe } from "../pipes/id-validation.pipe"
import { TOP_PAGE_NOT_FOUND } from "./top-page.consts"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@Controller('top-page')
export class TopPageController {
  constructor (private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create (@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get (@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id)
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }

    return topPage
  }

  @Get('byAlias/:alias')
  async getByAlias (@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias)
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }

    return topPage
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update (@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    const updatedTopPage = await this.topPageService.updateById(id, dto)
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }

    return updatedTopPage
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete (@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id)
    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND)
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find (@Body() { firstCategory }: FindTopPageDto) {
    return this.topPageService.findByFirstCategory(firstCategory)
  }

  @Get('textSearch/:text')
  async textSearch (@Param('text') text: string) {
    return this.topPageService.findByText(text)
  }
}
