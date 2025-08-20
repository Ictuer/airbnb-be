// import { Knowledge } from '@prisma/client';

// export const generateTheoryPrompt = (knowledge: Knowledge, maxTokens: number) => {
//   return `
//     Bạn là một giáo viên chuyên nghiệp với kinh nghiệm giảng dạy phong phú. Nhiệm vụ của bạn là tạo ra một bài giảng lý thuyết chi tiết, dễ hiểu và hấp dẫn.

//     THÔNG TIN BỐI CẢNH:
//     • Môn học: "${knowledge["topic"].class.name}"
//     • Đối tượng học sinh: ${knowledge["topic"].class.prompt}
//     • Điểm kiến thức cần giảng: "${knowledge.name}"
//     • Phạm vi nội dung: ${knowledge.prompt}

//     NHIỆM VỤ:
//     Hãy soạn một bài giảng lý thuyết hoàn chỉnh cho điểm kiến thức trên, phù hợp với trình độ và đặc điểm của học sinh.
//     Chỉ lý thuyết thôi, không cần bài tập

//     YÊU CẦU KỸ THUẬT:
//     • Sử dụng các thẻ HTML5, được bọc trong thẻ <div>
//     • Nếu có css thì dùng inline css, theo phong cách trắng đen sang trọng
//     • Tối ưu cho hiển thị web responsive
//     • Độ dài: Tối đa ${maxTokens} tokens
//     • Ngôn ngữ: Tiếng Việt chuẩn, dễ hiểu

//     YÊU CẦU NỘI DUNG:
//     • Sử dụng ngôn ngữ phù hợp với trình độ học sinh
//     Đi thẳng vào lý thuyết không cần chào hỏi 
//     • Bố cục logic, mạch lạc từ cơ bản đến nâng cao
//     • Ưu tiên chất lượng và độ chính xác của nội dung
//     • Tích hợp ví dụ thực tế để tăng hiểu biết

//     Hãy bắt đầu tạo bài giảng:
//   `
// };