import { Milestone, MilestoneId } from '@/types/game';

export const MILESTONES: Milestone[] = [
  // Màn 1: 1930 - Thành lập Đảng
  {
    id: '1930',
    year: 1930,
    month: 2,
    day: 3,
    title: 'Thành lập Đảng',
    description: 'Đảng Cộng sản Việt Nam được thành lập',
    gameType: 'quiz',
    maxScore: 100,
    requiredScore: 60,
    timeLimit: 75, // 15s per question x 5
    icon: '🏛️',

    questions: [
      {
        question: 'Đảng Cộng sản Việt Nam được thành lập tại đâu?',
        options: ['Hà Nội', 'Hồng Kông', 'Paris', 'Quảng Châu'],
        correctAnswer: 1,
        explanation: 'Ngày 3/2/1930, tại Hồng Kông, Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.'
      },
      {
        question: 'Ai là người sáng lập Đảng Cộng sản Việt Nam?',
        options: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng', 'Trường Chinh'],
        correctAnswer: 0,
        explanation: 'Nguyễn Ái Quốc (Hồ Chí Minh) là người sáng lập và lãnh đạo Đảng Cộng sản Việt Nam.'
      },
      {
        question: 'Đảng Cộng sản Việt Nam được thành lập vào ngày nào?',
        options: ['2/2/1930', '3/2/1930', '19/5/1890', '2/9/1945'],
        correctAnswer: 1,
        explanation: 'Ngày 3 tháng 2 năm 1930 là ngày thành lập Đảng Cộng sản Việt Nam.'
      },
      {
        question: 'Trước khi thành lập Đảng thống nhất, có bao nhiêu tổ chức cộng sản ở Việt Nam?',
        options: ['2 tổ chức', '3 tổ chức', '4 tổ chức', '5 tổ chức'],
        correctAnswer: 1,
        explanation: 'Ba tổ chức là: Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng và Đông Dương Cộng sản Liên đoàn đã được hợp nhất.'
      },
      {
        question: 'Mục tiêu chính của Đảng Cộng sản Việt Nam là gì?',
        options: ['Phát triển kinh tế', 'Đánh đuổi thực dân Pháp, giành độc lập dân tộc', 'Cải cách giáo dục', 'Phát triển nông nghiệp'],
        correctAnswer: 1,
        explanation: 'Mục tiêu chính là đánh đuổi thực dân Pháp, phong kiến, giành độc lập dân tộc và xây dựng chủ nghĩa xã hội.'
      }
    ],

    infoTitle: 'Ngày thành lập Đảng Cộng sản Việt Nam',
    infoText: 'Ngày 3 tháng 2 năm 1930, tại Hồng Kông (Trung Quốc), dưới sự chủ trì của Nguyễn Ái Quốc, Hội nghị hợp nhất các tổ chức cộng sản đã ra đời. Ba tổ chức Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng và Đông Dương Cộng sản Liên đoàn đã được hợp nhất thành Đảng Cộng sản Việt Nam. Đây là mốc son chói lọi trong lịch sử dân tộc, đánh dấu bước ngoặt vĩ đại của cách mạng Việt Nam, từ tự phát chuyển sang tự giác.',
    infoImage: '/images/1930-founding.jpg',
    backgroundImage: '/backgrounds/1930-party.jpg'
  },

  // Màn 2: 1940 - Mặt trận Việt Minh
  {
    id: '1940',
    year: 1941,
    month: 5,
    day: 19,
    title: 'Mặt trận Việt Minh',
    description: 'Mặt trận Việt Nam Độc lập Đồng minh được thành lập',
    gameType: 'image-match',
    maxScore: 80,
    requiredScore: 60,
    timeLimit: null,
    icon: '🚩',

    pairs: [
      { id: 'p1', imageUrl: '👴', text: 'Hồ Chí Minh - Lãnh tụ Việt Minh' },
      { id: 'p2', imageUrl: '🏔️', text: 'Căn cứ địa Việt Bắc' },
      { id: 'p3', imageUrl: '⭐', text: 'Cờ đỏ sao vàng - Quốc kỳ' },
      { id: 'p4', imageUrl: '📰', text: 'Báo Việt Nam Độc lập' }
    ],

    infoTitle: 'Mặt trận Việt Minh ra đời',
    infoText: 'Ngày 19/5/1941, Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 8 họp tại Pác Bó, Cao Bằng đã quyết định thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh). Đây là mặt trận dân tộc thống nhất rộng rãi nhất, đoàn kết tất cả các tầng lớp nhân dân, các dân tộc, tôn giáo để đấu tranh giành độc lập dân tộc. Việt Minh đã trở thành lực lượng chính trị - quân sự hùng mạnh, lãnh đạo nhân dân ta giành thắng lợi trong Cách mạng Tháng Tám 1945.',
    infoImage: '/images/1941-vietminh.jpg',
    backgroundImage: '/backgrounds/1940-vietminh.jpg'
  },

  // Màn 3: 1941 - Bác Hồ về nước
  {
    id: '1941',
    year: 1941,
    month: 1,
    day: 28,
    title: 'Bác Hồ về nước',
    description: 'Nguyễn Ái Quốc về nước sau 30 năm hoạt động ở nước ngoài',
    gameType: 'timeline-sort',
    maxScore: 100,
    requiredScore: 80,
    timeLimit: null,
    icon: '🇻🇳',

    timeline: [
      { id: 'e1', text: 'Bác Hồ trở về Tổ quốc sau 30 năm hoạt động cách mạng ở nước ngoài', correctOrder: 0 },
      { id: 'e2', text: 'Hội nghị lần thứ 8 BCH TW Đảng họp tại Pác Bó', correctOrder: 1 },
      { id: 'e3', text: 'Thành lập Mặt trận Việt Minh', correctOrder: 2 },
      { id: 'e4', text: 'Ra tờ báo "Việt Nam Độc lập" - cơ quan ngôn luận của Việt Minh', correctOrder: 3 },
      { id: 'e5', text: 'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (tiền thân Quân đội nhân dân VN)', correctOrder: 4 }
    ],

    infoTitle: 'Bác Hồ về nước lãnh đạo cách mạng',
    infoText: 'Sau 30 năm hoạt động cách mạng ở nước ngoài, ngày 28/1/1941, Nguyễn Ái Quốc trở về Tổ quốc, đặt chân lên mảnh đất Pác Bó, Cao Bằng. Từ đây, Người trực tiếp lãnh đạo cách mạng Việt Nam. Dưới sự lãnh đạo sáng suốt của Người, Đảng ta đã vạch ra đường lối đúng đắn, đưa cách mạng Việt Nam đi từ thắng lợi này đến thắng lợi khác, cuối cùng giành được độc lập dân tộc vào năm 1945.',
    infoImage: '/images/1941-hochiminh-return.jpg',
    backgroundImage: '/backgrounds/1941-hochiminh.jpg'
  },

  // Màn 4: Tháng 8/1945 - Tổng khởi nghĩa
  {
    id: '1945-8',
    year: 1945,
    month: 8,
    day: 19,
    title: 'Tổng khởi nghĩa',
    description: 'Cách mạng Tháng Tám thành công',
    gameType: 'memory',
    maxScore: 120,
    requiredScore: 80,
    timeLimit: null,
    icon: '⚔️',

    cards: [
      { id: 'c1', content: 'Hà Nội', pairId: 'pair1' },
      { id: 'c2', content: '19/8', pairId: 'pair1' },
      { id: 'c3', content: 'Sài Gòn', pairId: 'pair2' },
      { id: 'c4', content: '25/8', pairId: 'pair2' },
      { id: 'c5', content: 'Huế', pairId: 'pair3' },
      { id: 'c6', content: '23/8', pairId: 'pair3' },
      { id: 'c7', content: 'Quảng Trị', pairId: 'pair4' },
      { id: 'c8', content: '16/8', pairId: 'pair4' },
      { id: 'c9', content: 'Võ Nguyên Giáp', pairId: 'pair5' },
      { id: 'c10', content: 'Tổng Tư lệnh', pairId: 'pair5' },
      { id: 'c11', content: 'Trần Huy Liệu', pairId: 'pair6' },
      { id: 'c12', content: 'Ủy ban nhân dân HN', pairId: 'pair6' }
    ],

    infoTitle: 'Cách mạng Tháng Tám 1945 thành công',
    infoText: 'Từ ngày 13 đến 15/8/1945, Hội nghị toàn quốc của Đảng họp tại Tân Trào quyết định phát động tổng khởi nghĩa giành chính quyền. Chỉ trong vòng 15 ngày, từ 14 đến 28/8/1945, nhân dân ta đã giành chính quyền về tay nhân dân trên phạm vi cả nước. Ngày 19/8, Hà Nội được giải phóng. Ngày 23/8, cách mạng thắng lợi ở Huế. Ngày 25/8, Sài Gòn được giải phóng. Vua Bảo Đại thoái vị ngày 30/8. Đây là thắng lợi vĩ đại đầu tiên của cách mạng Việt Nam do Đảng và Bác Hồ lãnh đạo.',
    infoImage: '/images/1945-8-revolution.jpg',
    backgroundImage: '/backgrounds/1945-8-revolution.jpg'
  },

  // Màn 5: 2/9/1945 - Tuyên ngôn Độc lập
  {
    id: '1945-9',
    year: 1945,
    month: 9,
    day: 2,
    title: 'Tuyên ngôn Độc lập',
    description: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập',
    gameType: 'fill-blank',
    maxScore: 150,
    requiredScore: 100,
    timeLimit: null,
    icon: '📜',

    fillBlanks: {
      text: 'Nước Việt Nam có quyền hưởng [blank1] và [blank2]. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền [blank1] và [blank2] ấy.',
      blanks: ['tự do', 'độc lập'],
      wordBank: ['tự do', 'độc lập', 'hòa bình', 'thịnh vượng', 'bình đẳng', 'toàn vẹn', 'dân chủ', 'giàu mạnh']
    },

    infoTitle: 'Ngày Quốc khánh 2/9/1945',
    infoText: 'Ngày 2/9/1945, tại Quảng trường Ba Đình, Hà Nội, trước hàng vạn đồng bào từ mọi miền đất nước đổ về, Chủ tịch Hồ Chí Minh đã long trọng đọc Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa - Nhà nước công nông đầu tiên ở Đông Nam Á. Tuyên ngôn khẳng định: "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do và độc lập". Đây là ngày lễ trọng đại nhất của dân tộc Việt Nam, đánh dấu chủ quyền, độc lập và toàn vẹn lãnh thổ của đất nước.',
    infoImage: '/images/1945-9-independence.jpg',
    backgroundImage: '/backgrounds/1945-9-independence.jpg'
  }
];

// Helper function to get milestone by ID
export function getMilestoneById(id: MilestoneId): Milestone | undefined {
  return MILESTONES.find(m => m.id === id);
}

// Get next milestone in sequence
export function getNextMilestone(currentId: MilestoneId): Milestone | null {
  const currentIndex = MILESTONES.findIndex(m => m.id === currentId);
  if (currentIndex === -1 || currentIndex === MILESTONES.length - 1) {
    return null;
  }
  return MILESTONES[currentIndex + 1];
}

// Check if milestone is unlocked
export function isMilestoneUnlocked(milestoneId: MilestoneId, completedMilestones: MilestoneId[]): boolean {
  const index = MILESTONES.findIndex(m => m.id === milestoneId);
  if (index === 0) return true; // First milestone always unlocked

  const previousMilestone = MILESTONES[index - 1];
  return completedMilestones.includes(previousMilestone.id);
}
