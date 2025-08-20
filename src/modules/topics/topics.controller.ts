import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Topic, User } from '@prisma/client';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { EditTopicDto } from './dto/edit-topic.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger';
import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';
import { ResponseTopicDto } from './dto/respone-topic.dto';

import { UpdateTopicStatusDto } from './dto/update-topic-status.dto';

@ApiBearerAuth()
@Controller('topics')
@UseGuards(ClerkAuthGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  // GET: /topics/:id
  @ApiOperation({ summary: 'Get a topic by ID' })
  @ApiParam({ name: 'id', description: 'ID of the topic' , example: '3f92a5df-09d9-4ae1-ab99-421c7da12ac9'})
  @ApiResponse({ type: ResponseTopicDto })
  @Get(':id')
  async getTopic(
    @Param('id') topicId: string,
    @CurrentUser() user: User
  ) : Promise<ResponseTopicDto> {
    return this.topicsService.getTopic(topicId, user.id);
  }

  // GET: /topics
  @ApiOperation({ summary: 'Get all topics for a user' })
  @ApiResponse({ type: ResponseTopicDto, isArray: true })
  @Get()
  async getTopics(
    @CurrentUser() user: User
  ) : Promise<ResponseTopicDto[]> {
    return this.topicsService.getTopics(user.id);
  }

  // POST: /topics
  @ApiOperation({ summary: 'Create a new topic' })
  @Post()
  async createTopic(
    @Body() createTopicDto: CreateTopicDto, 
    @CurrentUser() user: User
  ) : Promise<Topic> {
    return this.topicsService.createTopic(createTopicDto, user.id);
  }

  // PATCH: /topics/:id
  @ApiOperation({ summary: 'Edit an existing topic' })
  @ApiParam({ name: 'id', description: 'ID of the topic' , example: '3f92a5df-09d9-4ae1-ab99-421c7da12ac9'})
  @Patch(':id')
  async editTopic(
    @Param('id') topicId: string,
    @Body() editTopicDto: EditTopicDto,
    @CurrentUser() user: User
  ) : Promise<Topic> {
    return this.topicsService.editTopic(topicId, editTopicDto, user.id);
  }

  // DELETE: /topics/:id
  @ApiOperation({ summary: 'Delete a topic by ID' })
  @ApiParam({ name: 'id', description: 'ID of the topic' , example: '3f92a5df-09d9-4ae1-ab99-421c7da12ac9'})
  @Delete(':id')
  async deleteTopic(
    @Param('id') topicId: string,
    @CurrentUser() user: User
  ): Promise<Topic> {
    return this.topicsService.deleteTopic(topicId, user.id);
  }

  // PATCH: /topics/:id/status
  @ApiOperation({ summary: 'Update status of a topic' })
  @ApiParam({ name: 'id', description: 'ID of the topic', example: '3f92a5df-09d9-4ae1-ab99-421c7da12ac9' })
  @Patch(':id/status')
  async updateStatus(
    @Param('id') topicId: string,
    @Body() updateStatusDto: UpdateTopicStatusDto,
    @CurrentUser() user: User
  ): Promise<Topic> {
    return this.topicsService.updateTopicStatus(topicId, updateStatusDto.status, user.id);
  }

}
