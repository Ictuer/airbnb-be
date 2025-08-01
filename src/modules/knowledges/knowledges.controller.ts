import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { KnowledgesService } from './knowledges.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { Knowledge } from '@prisma/client';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@clerk/express';
import { EditKnowledgeDto } from './dto/edit.knowledge.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('knowledges')
export class KnowledgesController {
  constructor(private readonly knowledgesService: KnowledgesService) {}
  

  // GET /knowledges/detail/:id
  @ApiOperation({ summary: 'Get knowledge details by ID' })
  @Get('detail/:id')
  async getOneKnowledge(
    @Param('id') knowledgeId: string,
    @CurrentUser() user: User
  ): Promise<Knowledge> {
    return this.knowledgesService.getOneKnowledge(knowledgeId, user.id);
  }

  // GET /knowledges/topic/:id
  @ApiOperation({ summary: 'Get all knowledges of a topic by topic ID' })
  @Get('topic/:id')
  async getKnowledgesOfTopic(
    @Param('id') topicId: string,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.knowledgesService.getKnowledgesOfTopic(topicId, user.id);
  }

  // POST /knowledges
  @ApiOperation({ summary: 'Create a new knowledge' })
  @Post()
  async createKnowledge(
    @Body() createKnowledgeDto: CreateKnowledgeDto,
    @CurrentUser() user: User
  ): Promise<Knowledge> {
    return this.knowledgesService.createKnowledge(createKnowledgeDto, user.id);
  }

  // POST /knowledges/topic/:id/generate
  @ApiOperation({ summary: 'Generate knowledge points for a topic' })
  @Post('topic/:id/generate')
  async generateKnowledge(
    @Param('id') topicId: string,
    @Query('maxTokens') maxTokens: number,
    @Query('temperature') temperature: number,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.knowledgesService.generateKnowledge(topicId, user.id, maxTokens || 1000, temperature || 0.5);
  }

  // POST /knowledges/:id/generate-theory
  @ApiOperation({ summary: 'Generate theory for a knowledge' })
  @Post(':id/generate-theory')
  async generateTheory(
    @Param('id') knowledgeId: string,
    @Query('maxTokens') maxTokens: number,
    @Query('temperature') temperature: number,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.knowledgesService.generateTheory(knowledgeId, user.id, maxTokens || 1000, temperature || 0.5);
  }

  // PATCH /knowledges/:id
  @ApiOperation({ summary: 'Edit an existing knowledge' })
  @Patch(':id')
  async editKnowledge(
    @Param('id') knowledgeId: string,
    @Body() editKnowledgeDto: EditKnowledgeDto,
    @CurrentUser() user: User
  ): Promise<Knowledge> {
    return this.knowledgesService.editKnowledge(editKnowledgeDto, knowledgeId, user.id);
  }

  // DELETE /knowledges/:id
  @ApiOperation({ summary: 'Delete a knowledge by ID' })
  @Delete(':id')
  async deleteKnowledge(
    @Param('id') knowledgeId: string,
    @CurrentUser() user: User
  ): Promise<Knowledge> {
    return this.knowledgesService.deleteKnowledge(knowledgeId, user.id);
  }

  

}
