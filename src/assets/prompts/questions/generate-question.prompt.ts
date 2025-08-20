// import { Knowledge, TypeQuestion } from '@prisma/client';

// export const generateQuestionPrompt = (knowledge: Knowledge, historyQuestion: any, typeQuestion: TypeQuestion) => {
//   const subTask = typeQuestion === TypeQuestion.theory ? 
//     'Câu hỏi dưới dạng hỏi đáp ngắn về lý thuyết, câu hỏi rõ ràng, ngắn gọn, súc tích, không quá dài để người học có thể trả lời nhanh' : 
//     'Câu hỏi dưới dạng bài tập, có thể là trắc nghiệm, điền từ vào chỗ trống hoặc bất cứ dạng bài tập nào bạn cho là phù hợp';
  
//   return `
//     Bạn là một chuyên gia giáo dục có kinh nghiệm thiết kế chương trình học.

//     THÔNG TIN LỚP HỌC:
//     - Tên lớp: "${knowledge["topic"].class.name}"
//     - Yêu cầu học tập: ${knowledge["topic"].class.prompt}

//     KIẾN THỨC CẦN TẠO CÂU HỎI:
//     - Tên kiến thức: "${knowledge.name}"
//     - Mô tả chi tiết: ${knowledge.prompt}

//     LỊCH SỬ HỎI ĐÁP:
//     ${historyQuestion.map((question, index) => `- Câu hỏi ${index + 1}: ${question.content}\n- Câu trả lời: ${question.answer}\n- Đánh giá: ${question.aiFeedback}`).join('\n')}

//     NHIỆM VỤ:
//     Dựa vào những thông tin trên, hãy tạo ra đúng 1 câu hỏi phù hợp đáp ứng việc học tập hiệu quả của học sinh
//     Nếu bạn cảm thấy học sinh cần cải thiện phần nào hãy đặt câu hỏi để học sinh cải thiện phần đó
//     Nếu bạn cảm thấy học sinh cần bổ sung phần nào hãy đặt câu hỏi để bổ sung phần đó. 
//     ${subTask}

//     YÊU CẦU ĐẦU RA:
//     1. Trả về đúng câu hỏi không giải thích gì thêm, không thêm những text ngoài lề, chỉ nội dung câu hỏi thôi
//     2. Đúng một câu hỏi thôi, không cần nhiều câu hỏi
//     3. Đề bài phải phù hợp với kiến thức đã tạo
//     4. Đề bài phải phù hợp với yêu cầu học tập của lớp học
//     5. Đề bài phải phù hợp với tình hình học tập hiện tại của học sinh
//   `
// };