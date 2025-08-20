// import { Class } from '@prisma/client';

// export const generateTopicPrompt = (classFound: Class, maxTokens: number) => {
//   return `
//     Bạn là một chuyên gia giáo dục có kinh nghiệm thiết kế chương trình học.

//     THÔNG TIN LỚP HỌC:
//     - Tên lớp: "${classFound.name}"
//     - Yêu cầu học tập: ${classFound.prompt}

//     NHIỆM VỤ:
//     Hãy thiết kế các chủ đề học tập chính cho lớp học này, đảm bảo:
//     1. Bao quát toàn bộ yêu cầu học tập của học sinh
//     2. Có tính logic và trình tự phù hợp
//     3. Phù hợp với trình độ và mục tiêu của lớp học
//     4. Các chủ để phải đủ lớn để học sinh có thể học tập hiệu quả
//     5. Các chủ đề phải nằm trong phạm vi mà bạn hoặc mô hình LLMs khác có thể thiết kế được 

//     YÊU CẦU ĐẦU RA:
//     1. Trả về CHÍNH XÁC định dạng JSON array
//     2. Mỗi chủ đề bao gồm:
//       - "name": Tên chủ đề ngắn gọn, rõ ràng (10-15 từ)
//       - "prompt": Mô tả chi tiết nội dung và phạm vi chủ đề (60-100 từ)
//     3. Đảm bảo độ dài phản hồi < ${maxTokens} tokens
//     4. Ưu tiên chất lượng nội dung hơn số lượng chủ đề
//     5. LUÔN kết thúc bằng "]" để hoàn thiện JSON

//     VÍ DỤ ĐỊNH DẠNG:
//     [{"name":"Chủ đề 1","prompt":"Mô tả chi tiết nội dung..."},{"name":"Chủ đề 2","prompt":"Mô tả chi tiết nội dung..."}]
//   `;
// };
