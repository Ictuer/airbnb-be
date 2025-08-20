import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Status, Topic } from '@prisma/client';
import { EditTopicDto } from './dto/edit-topic.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ResponseTopicDto } from './dto/respone-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async updateTopicStatus(
    topicId: string,
    status: Status,
    userId: string,
  ): Promise<Topic> {
    const topic = await this.prisma.topic.update({
      where: {
        id: topicId,
        userId: userId,
        deleted: false,
      },
      data: {
        status: status,
      },
    });

    return topic;
  }

  async getTopic(topicId: string, userId: string): Promise<ResponseTopicDto> {
    return this.checkTopicBelongToUser(topicId, userId);
  }

  async getTopics(userId: string): Promise<ResponseTopicDto[]> {
    const topics = await this.prisma.topic.findMany({
      where: {
        userId: userId,
        deleted: false,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        prompt: true,
        deleted: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        _count: {
          select: {
            knowledges: true,
          },
        },
        knowledges: {
          select: {
            _count: {
              select: {
                questions: true,
              },
            },
            questions: {
              select: {
                type: true,
                score: true,
              },
            },
          },
        },
      },
    });

    const responseTopics = topics.map((topic) => {
      const listQuestionPractice: any = [];
      topic.knowledges
        .filter((knowledge) => knowledge.questions.length > 0)
        .forEach((knowledge) => {
          knowledge.questions
            .filter((question) => question.type === 'practice')
            .forEach((question) => {
              listQuestionPractice.push(question);
            });
        });
      const listQuestionTheory: any = [];
      topic.knowledges
        .filter((knowledge) => knowledge.questions.length > 0)
        .forEach((knowledge) => {
          knowledge.questions
            .filter((question) => question.type === 'theory')
            .forEach((question) => {
              listQuestionTheory.push(question);
            });
        });
      const res: ResponseTopicDto = {
        id: topic.id,
        name: topic.name,
        prompt: topic.prompt || 'Không có mô tả',
        deleted: topic.deleted,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
        status: topic.status,
        totalKnowledge: topic._count.knowledges,
        totalQuestion: topic.knowledges.reduce(
          (acc, knowledge) => acc + knowledge._count.questions,
          0,
        ),
        avgScorePractice: listQuestionPractice
          ? listQuestionPractice.reduce(
              (acc, question) => acc + (question.score || 0),
              0,
            ) / listQuestionPractice.length
          : 0,
        avgScoreTheory: listQuestionTheory
          ? listQuestionTheory.reduce(
              (acc, question) => acc + (question.score || 0),
              0,
            ) / listQuestionTheory.length
          : 0,
      };
      return res;
    });

    return responseTopics;
  }

  async createTopic(topic: CreateTopicDto, userId: string): Promise<Topic> {
    const newTopic = await this.prisma.topic.create({
      data: {
        name: topic.name,
        prompt: topic.prompt,
        userId,
      },
    });
    return newTopic;
  }

  async editTopic(topicId: string, topic: EditTopicDto, userId: string): Promise<Topic> {
    const updatedTopic = await this.prisma.topic.update({
      where: { id: topicId, userId: userId, deleted: false },
      data: topic,
    });
    return updatedTopic;
  }

  async deleteTopic(topicId: string, userId: string): Promise<Topic> {
    const deletedTopic = await this.prisma.topic.update({
      where: { id: topicId, userId: userId, deleted: false },
      data: { deleted: true },
    });
    return deletedTopic;
  }

  private async checkTopicBelongToUser(topicId: string, userId: string): Promise<ResponseTopicDto> {
    const topic = await this.prisma.topic.findUnique({
      where: {
        id: topicId,
        userId: userId,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        prompt: true,
        deleted: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        _count: {
          select: {
            knowledges: true,
          },
        },
        knowledges: {
          select: {
            _count: {
              select: {
                questions: true,
              },
            },
            questions: {
              select: {
                type: true,
                score: true,
              },
            },
          },
        },
      },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    const listQuestionPractice: any = [];
    topic.knowledges
      .filter((knowledge) => knowledge.questions.length > 0)
      .forEach((knowledge) => {
        knowledge.questions
          .filter((question) => question.type === 'practice')
          .forEach((question) => {
            listQuestionPractice.push(question);
          });
      });
    const listQuestionTheory: any = [];
    topic.knowledges
      .filter((knowledge) => knowledge.questions.length > 0)
      .forEach((knowledge) => {
        knowledge.questions
          .filter((question) => question.type === 'theory')
          .forEach((question) => {
            listQuestionTheory.push(question);
          });
      });
    const res: ResponseTopicDto = {
      id: topic.id,
      name: topic.name,
      prompt: topic.prompt || 'Không có mô tả',
      deleted: topic.deleted,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      status: topic.status,
      totalKnowledge: topic._count.knowledges,
      totalQuestion: topic.knowledges.reduce(
        (acc, knowledge) => acc + knowledge._count.questions,
        0,
      ),
      avgScorePractice: listQuestionPractice
        ? listQuestionPractice.reduce(
            (acc, question) => acc + (question.score || 0),
            0,
          ) / listQuestionPractice.length
        : 0,
      avgScoreTheory: listQuestionTheory
        ? listQuestionTheory.reduce(
            (acc, question) => acc + (question.score || 0),
            0,
          ) / listQuestionTheory.length
        : 0,
    };
    return res;
  }
}
