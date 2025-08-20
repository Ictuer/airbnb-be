// import { Topic } from '@prisma/client';

// export const generateKnowledgePrompt = (topic: Topic, maxTokens: number) => {
//   const prompt = `
//     Bạn là một chuyên gia giáo dục có kinh nghiệm thiết kế chương trình học.

//     THÔNG TIN LỚP HỌC:
//     - Tên lớp: "${topic["class"].name}"
//     - Yêu cầu học tập: ${topic["class"].prompt}

//     CHỦ ĐỀ CẦN PHÂN TÍCH:
//     - Tên chủ đề: "${topic.name}"
//     - Mô tả chi tiết: ${topic.prompt}

//     NHIỆM VỤ:
//     Hãy phân tích chủ đề trên và tạo ra một cấu trúc kiến thức hoàn chỉnh với các knowledge point theo thứ bậc phù hợp với trình độ học sinh.

//     YÊU CẦU ĐẦU RA:
//     1. Trả về CHÍNH XÁC định dạng JSON array
//     2. Mỗi knowledge point bao gồm:
//       - "name": Tên ngắn gọn, dễ hiểu của điểm kiến thức
//       - "prompt": Mô tả chi tiết nội dung và phạm vi kiến thức (50-100 từ)
//       - "children": Array các knowledge point con (có thể lồng nhiều cấp)
//     3. Cấu trúc từ tổng quát đến chi tiết (có thể 3-4 cấp độ nếu bạn thấy cần thiết)
//     4. Đảm bảo độ dài phản hồi < ${maxTokens} tokens
//     5. Ưu tiên chất lượng nội dung hơn số lượng
//     6. LUÔN bắt đầu bằng "[" và kết thúc bằng "]" để hoàn thiện JSON

//     VÍ DỤ ĐỊNH DẠNG:
//     [{"name":"Kiến thức nền tảng","prompt":"Các khái niệm cơ bản...","children":[{"name":"Khái niệm A","prompt":"Chi tiết về...","children":[]}]}]
//   `
//   return prompt;
// };