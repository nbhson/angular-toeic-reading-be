/**
 * Prompt templates for TOEIC question generation.
 * Moved from the Angular UI's OmnirouteService to the backend.
 */

export function buildPart5Prompt(count) {
  return `Hãy đóng vai trò là một chuyên gia khảo thí TOEIC chuyên nghiệp. Tạo đúng ${count} câu hỏi trắc nghiệm tiếng Anh bám sát cấu trúc phần thi TOEIC Part 5 (Incomplete Sentences).
Mỗi câu hỏi phải là một câu tiếng Anh hoàn chỉnh có chứa một khoảng trống ký hiệu là '_______'.
Phân chia cân đối các chủ đề: Grammar (Ngữ pháp), Vocabulary (Từ vựng), Word Forms (Từ loại).
Độ khó (difficulty) chọn ngẫu nhiên giữa "Easy", "Medium", "Hard".
Tạo các id ngẫu nhiên độc nhất dạng chuỗi như 'q1', 'q2'...
Đảm bảo tất cả nội dung phong phú, chất lượng cao, đúng cấu trúc câu thi TOEIC thực tế.

QUY TRÌNH TẠO MỖI CÂU HỎI (BẮT BUỘC):
Bước 1 — TẠO TRƯỚC 4 ĐÁP ÁN KHÁC NHAU hoàn toàn (4 cụm từ/cụm ngữ pháp HOÀN TOÀN KHÔC NHAU).
Bước 2 — Xác định đáp án đúng (correctAnswer = index 0, 1, 2 hoặc 3).
Bước 3 — Viết câu hỏi với khoảng trống mà đáp án đúng vừa tạo mới lấp vào.
=> TUYỆT ĐỐI KHÔNG được tạo câu hỏi trước rồi mới nghĩ đáp án. PHẢI tạo 4 đáp án KHÁC NHAU trước.

QUAN TRỌNG VỀ OPTIONS:
- 4 đáp án (options) PHẢI khác nhau hoàn toàn về nghĩa và từ vựng.
- KHÔNG ĐƯỢC có 2 đáp án giống nhau hoặc có nghĩa trùng lặp.
- Mỗi đáp án phải là một ứng viên hợp lý nhưng chỉ MỘT đáp án mới đúng ngữ pháp/từ vựng nhất.
- Đáp án sai phải là các từ/cụm từ cũng phổ biến trong ngữ cảnh tương tự nhưng sai ngữ pháp hoặc sai nghĩa.

Đáp án đúng (correctAnswer) là chỉ số index từ 0 đến 3 (0 = A, 1 = B, 2 = C, 3 = D).
Hãy cung cấp dịch nghĩa tiếng Việt (translation) và giải thích chi tiết lý do chọn đáp án đúng bằng tiếng Việt (explanation).
Trong explanation, PHẢI giải thích tại sao đáp án đúng hợp lý VÀ tại sao mỗi đáp án sai là sai.

Trả về JSON với cấu trúc:
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "translation": "string",
      "explanation": "string",
      "category": "Grammar" | "Vocabulary" | "Word Forms",
      "difficulty": "Easy" | "Medium" | "Hard"
    }
  ]
}`;
}

export function buildPart6Prompt(count) {
  return `Hãy đóng vai trò là một chuyên gia khảo thí TOEIC chuyên nghiệp. Tạo đúng ${count} đoạn văn luyện tập TOEIC Part 6 (Text Completion) chất lượng cao.
Mỗi đoạn văn phải chứa đúng 4 chỗ trống được ký hiệu lần lượt là [131], [132], [133], [134] (nếu là đoạn văn thứ nhất), hoặc [135], [136], [137], [138] (nếu là đoạn văn thứ hai), tương ứng với 4 câu hỏi trắc nghiệm.
Tổng cộng 4 câu hỏi trong mỗi đoạn văn cần phủ các dạng bài:
- Ít nhất 1 câu về Ngữ pháp (Grammar)
- Ít nhất 1 câu về Từ vựng (Vocabulary)
- Ít nhất 1 câu về Từ loại (Word Forms)
- Đúng 1 câu về Điền câu thích hợp vào đoạn văn (Sentence Insertion)

QUY TRÌNH TẠO MỖI CÂU HỎI (BẮT BUỘC):
Bước 1 — TẠO TRƯỚC 4 ĐÁP ÁN KHÁC NHAU hoàn toàn (4 cụm từ HOÀN TOÀN KHÁC NHAU).
Bước 2 — Xác định đáp án đúng (correctAnswer = index 0, 1, 2 hoặc 3).
Bước 3 — Viết câu hỏi cho chỗ trống mà đáp án đúng vừa tạo mới lấp vào chính xác nhất.
=> TUYỆT ĐỐI KHÔNG được tạo câu hỏi trước rồi mới nghĩ đáp án. PHẢI tạo 4 đáp án KHÁC NHAU trước.

QUAN TRỌNG VỀ OPTIONS:
- 4 đáp án (options) PHẢI khác nhau hoàn toàn về nghĩa và từ vựng.
- KHÔNG ĐƯỢC có 2 đáp án giống nhau hoặc có nghĩa trùng lặp.
- Mỗi đáp án phải là một ứng viên hợp lý nhưng chỉ MỘT đáp án mới đúng ngữ pháp/từ vựng nhất trong ngữ cảnh đoạn văn.
- Đáp án sai phải là các từ/cụm từ cũng phổ biến nhưng sai ngữ pháp hoặc sai nghĩa trong ngữ cảnh.

Nội dung đoạn văn có thể là email công việc, thư báo, bản ghi nhớ, quảng cáo... văn phong trang trọng, chuyên nghiệp chuẩn đề thi TOEIC.
Giải thích lý do lựa chọn đáp án chi tiết bằng tiếng Việt trong trường explanation.
Trong explanation, PHẢI giải thích tại sao đáp án đúng hợp lý VÀ tại sao mỗi đáp án sai là sai.
Tạo các id ngẫu nhiên độc nhất dạng chuỗi cho đoạn văn (ví dụ: 'p6-p1') và các câu hỏi (ví dụ: 'p6-p1-q1').
Đảm bảo tất cả nội dung phong phú, chất lượng cao, đúng cấu trúc câu thi TOEIC thực tế.

Trả về JSON với cấu trúc:
{
  "passages": [
    {
      "id": "string",
      "text": "string",
      "translation": "string",
      "questions": [
        {
          "id": "string",
          "questionNumber": 1,
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "string",
          "category": "Grammar" | "Vocabulary" | "Word Forms" | "Sentence Insertion"
        }
      ]
    }
  ]
}`;
}

export function buildPart7Prompt(passageType, count, startQuestionNumber) {
  return `Hãy đóng vai trò là một chuyên gia khảo thí TOEIC chuyên nghiệp. Tạo đúng ${count} đoạn văn luyện tập TOEIC Part 7 (Reading Comprehension) thuộc thể loại ${passageType} Passage.
Bắt đầu đánh số thứ tự câu hỏi từ câu số ${startQuestionNumber}.

QUY TRÌNH TẠO MỖI CÂU HỎI (BẮT BUỘC):
Bước 1 — TẠO TRƯỚC 4 ĐÁP ÁN KHÁC NHAU hoàn toàn (4 câu trả lời HOÀN TOÀN KHÁC NHAU).
Bước 2 — Xác định đáp án đúng (correctAnswer = index 0, 1, 2 hoặc 3).
Bước 3 — Viết câu hỏi đọc hiểu mà đáp án đúng vừa tạo mới trả lời chính xác nhất.
=> TUYỆT ĐỐI KHÔNG được tạo câu hỏi trước rồi mới nghĩ đáp án. PHẢI tạo 4 đáp án KHÁC NHAU trước.

QUAN TRỌNG VỀ OPTIONS:
- 4 đáp án (options) PHẢI khác nhau hoàn toàn về nội dung và nghĩa.
- KHÔNG ĐƯỢC có 2 đáp án giống nhau hoặc có nghĩa trùng lặp.
- Mỗi đáp án phải là một câu trả lời hợp lý nhưng chỉ MỘT đáp án mới chính xác nhất dựa trên thông tin trong đoạn văn.
- Đáp án sai phải là các câu cũng hợp lý về mặt ngữ pháp nhưng sai thông tin so với đoạn văn.

Đáp án đúng (correctAnswer) là chỉ số index từ 0 đến 3 (0 = A, 1 = B, 2 = C, 3 = D).
Trong explanation, PHẢI giải thích tại sao đáp án đúng dựa trên thông tin cụ thể trong đoạn văn VÀ tại sao mỗi đáp án sai là sai.

Quy định cấu trúc chi tiết:
- Với mỗi đoạn văn (passage):
  + id: một id duy nhất dạng chuỗi (ví dụ: 'p7-p-${passageType.toLowerCase()}-1')
  + passageType: '${passageType}'
  + documentType: loại tài liệu (ví dụ: 'Email', 'Notice', 'Advertisement', 'Article', 'Chat Discussion', 'Webpage')
  + text: Nội dung tài liệu/đoạn văn bằng tiếng Anh. 
    * Nếu là Single Passage: chỉ chứa nội dung của 1 tài liệu.
    * Nếu là Double Passage: chứa đúng 2 tài liệu liên quan đến nhau. Hãy phân tách chúng rõ ràng bằng cấu trúc HTML sau:
      <div class="passage-part"><h5>Document 1: [Loại tài liệu, ví dụ: Advertisement]</h5><p>...</p></div><hr class="passage-divider"/><div class="passage-part"><h5>Document 2: [Loại tài liệu, ví dụ: Email]</h5><p>...</p></div>
    * Nếu là Triple Passage: chứa đúng 3 tài liệu liên quan đến nhau. Phân tách rõ ràng bằng thẻ HTML tương tự và ngăn cách giữa các tài liệu bằng <hr class="passage-divider"/>.
  + translation: Bản dịch nghĩa chi tiết toàn bộ các tài liệu trong đoạn văn sang tiếng Việt (nếu là Double/Triple, dịch cả 2/3 tài liệu phân tách rõ ràng).
  + questions: Danh sách các câu hỏi đi kèm đoạn văn này.
    * Với Single Passage: Số lượng câu hỏi của mỗi đoạn văn dao động từ 2 đến 4 câu.
    * Với Double/Triple Passage: Mỗi đoạn văn phải có ĐÚNG 5 câu hỏi đi kèm.

- Mỗi câu hỏi (question) trong mảng questions phải có cấu trúc:
  + id: id độc nhất dạng chuỗi (ví dụ: 'p7-q-${startQuestionNumber}')
  + questionNumber: số thứ tự câu hỏi dạng số nguyên (tăng dần liên tiếp từ ${startQuestionNumber})
  + question: câu hỏi đọc hiểu bằng tiếng Anh liên quan đến nội dung đoạn văn
  + options: đúng 4 lựa chọn trả lời (A, B, C, D) bằng tiếng Anh
  + correctAnswer: số nguyên chỉ số index đáp án đúng (từ 0 đến 3 tương ứng với A, B, C, D)
  + explanation: giải thích chi tiết lý do lựa chọn đáp án đúng bằng tiếng Việt
  + translation: dịch câu hỏi và 4 lựa chọn sang tiếng Việt

Hãy đảm bảo thông tin, từ vựng và ngữ cảnh bám sát đề thi TOEIC thật, các câu hỏi logic, có sự liên kết thông tin giữa các tài liệu đối với dạng Double/Triple passage.

Trả về JSON với cấu trúc:
{
  "passages": [
    {
      "id": "string",
      "passageType": "${passageType}",
      "documentType": "string",
      "text": "string",
      "translation": "string",
      "questions": [
        {
          "id": "string",
          "questionNumber": ${startQuestionNumber},
          "question": "string",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "string",
          "translation": "string"
        }
      ]
    }
  ]
}`;
}