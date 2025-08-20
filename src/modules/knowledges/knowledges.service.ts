// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Knowledge, PrismaClient, Topic } from '@prisma/client';
// import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
// import { EditKnowledgeDto } from './dto/edit.knowledge.dto';
// import { GeminiService } from '../gemini/gemini.service';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { generateKnowledgePrompt } from 'src/assets/prompts/knowledges/generate-knowledge.prompt';
// import { generateTheoryPrompt } from 'src/assets/prompts/knowledges/generate-theory.prompt';

// @Injectable()
// export class KnowledgesService {
//   constructor(
//     private readonly geminiService: GeminiService, 
//     private readonly prisma: PrismaService
//   ) {}

//   async getOneKnowledge(knowledgeId: string, userId: string): Promise<Knowledge> {
//     const knowledge = await this.prisma.knowledge.findUnique({
//       where: { 
//         id: knowledgeId,
//         topic: { class: { userId: userId } }
//       }
//     });
    
//     if(!knowledge) throw new NotFoundException("Knowledge not found");

//     return knowledge;
//   }

//   async getKnowledgesOfTopic(topicId: string, userId: string): Promise<any> {
//     const isUser = await this.checkKnowledgesUser(userId, topicId);

//     if (!isUser) throw new NotFoundException("Topic not found");

//     const knowledges = await this.prisma.knowledge.findMany({
//       where: { topicId: topicId },
//       orderBy: { createdAt: 'asc' }
//     });

//     return this.buildTreeOptimized(knowledges);
//   }

//   async generateKnowledge(topicId: string, userId: string, maxTokens: number, temperature: number): Promise<any> {
//     const topic:Topic = await this.checkKnowledgesUser(userId, topicId);

    
//     const prompt = generateKnowledgePrompt(topic, maxTokens);
    
//     const response = await this.geminiService.generateText({
//       prompt,
//       maxTokens,
//       temperature
//     });
//     const result = JSON.parse(response.text.replace(/^.*\n/, '').replace(/\n.*$/, ''));
//     await this.prisma.knowledge.deleteMany({
//       where: { topicId: topicId }
//     });
//     const responseAPI: Knowledge[] = [];
//     for (const knowledge of result) {
//         const newKnowledge = await this.saveKnowledgeRecursively(knowledge, topicId);
//         responseAPI.push(...newKnowledge);
//     }
//     return this.buildTreeOptimized(responseAPI);
//   }

//   async generateTheory(knowledgeId: string, userId: string, maxTokens: number, temperature: number): Promise<any> {
//     const knowledge:Knowledge = await this.checkKnowledge(knowledgeId, userId);
//     const prompt = generateTheoryPrompt(knowledge, maxTokens);
//     const response = await this.geminiService.generateText({
//       prompt,
//       maxTokens,
//       temperature
//     });
//     const promptResponse = response.text.replace(/^.*\n/, '').replace(/\n.*$/, '').replace(/```/g, '');

//     const newKnowledge = await this.prisma.knowledge.update({
//       where: { id: knowledgeId },
//       data: { theory: promptResponse }
//     });
//     return newKnowledge;
//   }

//   async createKnowledge(knowledge: CreateKnowledgeDto, userId: string): Promise<Knowledge> {
//     const isUser = await this.checkKnowledgesUser(userId, knowledge.topicId);

//     if (!isUser) throw new NotFoundException("Topic not found");

//     const newKnowledge = await this.prisma.knowledge.create({
//       data: knowledge
//     });
//     return newKnowledge;
//   }

//   async editKnowledge(knowledge: EditKnowledgeDto, knowledgeId: string, userId: string): Promise<Knowledge> {
//     await this.checkKnowledge(knowledgeId, userId);

//     const updatedKnowledge = await this.prisma.knowledge.update({
//       where: { id: knowledgeId },
//       data: knowledge
//     });

//     return updatedKnowledge;
//   }

//   async deleteKnowledge(knowledgeId: string, userId: string): Promise<Knowledge> {
//     await this.checkKnowledge(knowledgeId, userId);

//     const deletedKnowledge = await this.prisma.knowledge.delete({
//       where: { id: knowledgeId }
//     });

//     return deletedKnowledge;
//   }

//   private async checkKnowledge(knowledgeId: string, userId: string): Promise<Knowledge> {
//     const knowledge = await this.prisma.knowledge.findUnique({
//       where: { 
//         id: knowledgeId,
//         topic: { class: { userId: userId } }
//       },
//       include: {
//         topic: {
//           include: {
//             class: true
//           }
//         }
//       }
//     });

//     if (!knowledge) throw new NotFoundException("Knowledge not found");
//     return knowledge;
//   }

//   private async checkKnowledgesUser(userId: string, topicId: string): Promise<Topic> {
//     const topic: Topic | null = await this.prisma.topic.findUnique({
//       where: {
//         id: topicId,
//         class: { userId: userId }
//       },
//       include: {
//         class: true
//       }
//     });
//     if (!topic) throw new NotFoundException("Topic not found");
//     return topic;
//   }

//   private async saveKnowledgeRecursively(knowledgeData: any, topicId: string, parentId?: string): Promise<Knowledge[]> {
//     const newKnowledge = await this.prisma.knowledge.create({
//       data: {
//         name: knowledgeData.name,
//         prompt: knowledgeData.prompt,
//         topicId: topicId,
//         parentId: parentId || null
//       }
//     });

//     const responseAPI: Knowledge[] = [];
//     responseAPI.push(newKnowledge);
    
//     if (knowledgeData.children && knowledgeData.children.length > 0) {
//       for (const child of knowledgeData.children) {
//         const childKnowledges = await this.saveKnowledgeRecursively(child, topicId, newKnowledge.id);
//         responseAPI.push(...childKnowledges);
//       }
//     }
  
//     return responseAPI;
//   };

//   private async buildTreeOptimized(flatList: any) {
//     const tree: any[] = [];
//     const childrenMap = {};
    
//     // Nhóm các children theo parentId
//     flatList.forEach((item: any) => {
//       const parentId = item.parentId;
      
//       if (parentId === null || parentId === undefined) {
//         // Không có parent -> thêm vào root
//         tree.push({ ...item, children: [] });
//       } else {
//         // Có parent -> thêm vào map children
//         if (!childrenMap[parentId]) {
//           childrenMap[parentId] = [];
//         }
//         childrenMap[parentId].push({ ...item, children: [] });
//       }
//     });
    
//     // Gán children cho từng node trong cây
//     function assignChildren(nodes) {
//       nodes.forEach((node: any) => {
//         if (childrenMap[node.id]) {
//           node.children = childrenMap[node.id];
//           // Đệ quy gán children cho các node con
//           assignChildren(node.children);
//         }
//       });
//     }
    
//     assignChildren(tree);
//     return tree;
//   }
  

// }
