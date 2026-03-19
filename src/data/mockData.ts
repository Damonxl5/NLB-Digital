
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  pages: number;
  language: string;
  category: string;
  status: 'available' | 'borrowed' | 'reserved';
  borrowDate?: string;
  returnDate?: string;
  progress?: number;
  tags: string[];
}

export const CATEGORIES = [
  { id: 'lit', name: '文学', icon: 'BookOpen' },
  { id: 'biz', name: '经管', icon: 'TrendingUp' },
  { id: 'sci', name: '科幻', icon: 'Zap' },
  { id: 'child', name: '少儿', icon: 'Smile' },
  { id: 'hist', name: '历史', icon: 'History' },
  { id: 'arts', name: '艺术', icon: 'Palette' },
  { id: 'tech', name: '技术', icon: 'Cpu' },
  { id: 'health', name: '健康', icon: 'Heart' },
  { id: 'travel', name: '旅行', icon: 'Map' },
  { id: 'life', name: '生活', icon: 'Coffee' },
];

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: '人工智能：从理解到重构',
    author: '吴建国',
    cover: 'https://picsum.photos/seed/ai/400/600',
    description: '本书深入探讨了 2026 年人工智能在跨国协作、医疗、交通等领域的爆发式应用。作为 NLB 年度重点推荐资源，本书由新加坡科技研究局 (A*STAR) 专家团队联袂编撰，为读者揭示智能时代的底层逻辑。',
    rating: 4.9,
    pages: 342,
    language: '中/英',
    category: 'sci',
    status: 'borrowed',
    borrowDate: '2026-03-10',
    returnDate: '2026-03-31',
    progress: 12,
    tags: ['AI & TECHNOLOGY', 'L4 级'],
  },
  {
    id: '2',
    title: '新加坡历史：从莱佛士至今',
    author: '陈振东',
    cover: 'https://picsum.photos/seed/history/400/600',
    description: '全面回顾新加坡从殖民地时期到现代国家的演变历程，包含大量珍贵历史图片与文献。',
    rating: 4.8,
    pages: 520,
    language: '中文',
    category: 'hist',
    status: 'borrowed',
    borrowDate: '2026-03-01',
    returnDate: '2026-03-22',
    progress: 68,
    tags: ['HISTORY', 'NLB 联合推荐'],
  },
  {
    id: '3',
    title: '百年狮城：回望',
    author: '李国辉',
    cover: 'https://picsum.photos/seed/lion/400/600',
    description: '通过摄影作品记录新加坡百年的城市变迁与人文风貌。',
    rating: 4.7,
    pages: 280,
    language: '中文',
    category: 'arts',
    status: 'available',
    tags: ['PHOTOGRAPHY'],
  },
  {
    id: '4',
    title: '智慧国家 2030',
    author: 'GovTech SG',
    cover: 'https://picsum.photos/seed/smart/400/600',
    description: '新加坡政府发布的未来十年智慧城市发展蓝图与技术路线。',
    rating: 4.9,
    pages: 150,
    language: '英文',
    category: 'tech',
    status: 'available',
    tags: ['GOVERNMENT', 'TECH'],
  },
  {
    id: '5',
    title: '少儿绘本：我的狮城',
    author: '吴晓梅',
    cover: 'https://picsum.photos/seed/kids/400/600',
    description: '专为 4-8 岁儿童设计的绘本，带你游览新加坡的名胜古迹。',
    rating: 4.9,
    pages: 48,
    language: '中/英',
    category: 'child',
    status: 'available',
    tags: ['L4 级', 'KIDS'],
  },
  {
    id: '6',
    title: '三体',
    author: '刘慈欣',
    cover: 'https://picsum.photos/seed/threebody/400/600',
    description: '中国科幻文学的里程碑之作，讲述人类文明与外星文明的首次接触。',
    rating: 4.9,
    pages: 302,
    language: '中文',
    category: 'sci',
    status: 'available',
    tags: ['SCI-FI', 'CLASSIC'],
  },
  {
    id: '7',
    title: '沙丘',
    author: '弗兰克·赫伯特',
    cover: 'https://picsum.photos/seed/dune/400/600',
    description: '一部关于政治、宗教、生态学和人类进化的史诗巨著。',
    rating: 4.8,
    pages: 600,
    language: '英文',
    category: 'sci',
    status: 'available',
    tags: ['SCI-FI', 'EPIC'],
  },
  {
    id: '8',
    title: '原则',
    author: '瑞·达利欧',
    cover: 'https://picsum.photos/seed/principles/400/600',
    description: '桥水基金创始人分享的生活与工作原则，帮助读者在复杂的世界中做出更好的决策。',
    rating: 4.8,
    pages: 560,
    language: '中/英',
    category: 'biz',
    status: 'available',
    tags: ['BUSINESS', 'MANAGEMENT'],
  },
  {
    id: '9',
    title: '穷查理宝典',
    author: '查理·芒格',
    cover: 'https://picsum.photos/seed/charlie/400/600',
    description: '查理·芒格的智慧结晶，涵盖了投资、心理学和普世智慧。',
    rating: 4.9,
    pages: 480,
    language: '中文',
    category: 'biz',
    status: 'reserved',
    tags: ['INVESTMENT', 'WISDOM'],
  },
  {
    id: '10',
    title: '活着',
    author: '余华',
    cover: 'https://picsum.photos/seed/alive/400/600',
    description: '讲述了一个人一生的苦难与坚韧，是中国当代文学的经典。',
    rating: 4.9,
    pages: 200,
    language: '中文',
    category: 'lit',
    status: 'available',
    tags: ['LITERATURE', 'CLASSIC'],
  },
  {
    id: '11',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: 'https://picsum.photos/seed/solitude/400/600',
    description: '魔幻现实主义的巅峰之作，讲述布恩迪亚家族七代人的命运。',
    rating: 4.9,
    pages: 400,
    language: '中文',
    category: 'lit',
    status: 'available',
    tags: ['LITERATURE', 'NOBEL'],
  },
  {
    id: '12',
    title: '哈利·波特与魔法石',
    author: 'J.K. 罗琳',
    cover: 'https://picsum.photos/seed/hp1/400/600',
    description: '开启魔法世界的奇幻之旅，深受全球儿童和成人喜爱。',
    rating: 4.9,
    pages: 300,
    language: '中/英',
    category: 'child',
    status: 'available',
    tags: ['FANTASY', 'KIDS'],
  },
  {
    id: '13',
    title: '小王子',
    author: '圣埃克苏佩里',
    cover: 'https://picsum.photos/seed/prince/400/600',
    description: '一则关于爱、友谊和责任的永恒寓言。',
    rating: 4.9,
    pages: 120,
    language: '中/法',
    category: 'child',
    status: 'available',
    tags: ['CLASSIC', 'KIDS'],
  },
  {
    id: '14',
    title: '零边际成本社会',
    author: '杰里米·里夫金',
    cover: 'https://picsum.photos/seed/zero/400/600',
    description: '探讨物联网、协同共享经济如何改变人类的未来。',
    rating: 4.7,
    pages: 350,
    language: '中文',
    category: 'biz',
    status: 'available',
    tags: ['ECONOMY', 'FUTURE'],
  },
  {
    id: '15',
    title: '影响力',
    author: '罗伯特·西奥迪尼',
    cover: 'https://picsum.photos/seed/influence/400/600',
    description: '揭示说服他人的心理学原理，是营销和沟通的必读书。',
    rating: 4.8,
    pages: 320,
    language: '中文',
    category: 'biz',
    status: 'available',
    tags: ['PSYCHOLOGY', 'MARKETING'],
  },
  {
    id: '16',
    title: '基地',
    author: '艾萨克·阿西莫夫',
    cover: 'https://picsum.photos/seed/foundation/400/600',
    description: '科幻黄金时代的经典，探讨文明的兴衰与心理史学。',
    rating: 4.9,
    pages: 250,
    language: '英文',
    category: 'sci',
    status: 'available',
    tags: ['SCI-FI', 'CLASSIC'],
  },
  {
    id: '17',
    title: '解忧杂货店',
    author: '东野圭吾',
    cover: 'https://picsum.photos/seed/namiya/400/600',
    description: '一间能穿越时空的杂货店，连接起过去与未来的温情故事。',
    rating: 4.8,
    pages: 290,
    language: '中文',
    category: 'lit',
    status: 'available',
    tags: ['FICTION', 'BESTSELLER'],
  },
  {
    id: '18',
    title: '窗边的小豆豆',
    author: '黑柳彻子',
    cover: 'https://picsum.photos/seed/totto/400/600',
    description: '讲述了一个真实而动人的教育故事，影响了无数家长和孩子。',
    rating: 4.9,
    pages: 240,
    language: '中文',
    category: 'child',
    status: 'available',
    tags: ['EDUCATION', 'KIDS'],
  },
];

const generateBooks = (count: number): Book[] => {
  const books: Book[] = [...INITIAL_BOOKS];
  const authors = ['张伟', '王芳', '李娜', '刘洋', '陈杰', '杨波', '赵敏', '周涛', '徐磊', '孙倩'];
  const titles = [
    '未来的秘密', '深海探索', '星际迷航', '心灵之窗', '代码之美', 
    '历史的尘埃', '艺术的真谛', '健康的奥秘', '旅行的意义', '生活的哲学',
    '算法人生', '量子纠缠', '平行宇宙', '基因密码', '数字时代',
    '古文明之谜', '现代艺术史', '营养学基础', '环球游记', '极简生活'
  ];
  const categoryIds = CATEGORIES.map(c => c.id);

  for (let i = INITIAL_BOOKS.length + 1; i <= count; i++) {
    const categoryId = categoryIds[i % categoryIds.length];
    const titleBase = titles[i % titles.length];
    const author = authors[i % authors.length];
    
    books.push({
      id: i.toString(),
      title: `${titleBase} Vol. ${Math.floor(i / titles.length) + 1}`,
      author: author,
      cover: `https://picsum.photos/seed/book${i}/400/600`,
      description: `这是一本关于${titleBase}的深度探讨书籍，编号为 ${i}。它涵盖了该领域的最新研究成果和实践经验，适合广大读者阅读。`,
      rating: parseFloat((4 + Math.random()).toFixed(1)),
      pages: 100 + Math.floor(Math.random() * 500),
      language: i % 3 === 0 ? '英文' : '中文',
      category: categoryId,
      status: 'available',
      tags: [categoryId.toUpperCase(), 'RECOMMENDED'],
    });
  }
  return books;
};

export interface Notification {
  id: string;
  title: string;
  content: string;
  time: string;
  type: 'system' | 'book' | 'reservation';
  isRead: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: '借阅即将到期',
    content: '您借阅的《人工智能：从理解到重构》还有 3 天到期，请及时归还或续借。',
    time: '10分钟前',
    type: 'book',
    isRead: false,
  },
  {
    id: '2',
    title: '预约书籍已到馆',
    content: '您预约的《穷查理宝典》已到馆，请在 2026-03-22 前前往指定地点领取或在线阅读。',
    time: '2小时前',
    type: 'reservation',
    isRead: false,
  },
  {
    id: '3',
    title: '系统维护通知',
    content: '为了提供更好的服务，平台将于 2026-03-25 凌晨 2:00-4:00 进行例行维护，届时部分功能可能无法使用。',
    time: '昨天',
    type: 'system',
    isRead: true,
  },
  {
    id: '4',
    title: '新书推荐',
    content: '根据您的阅读偏好，我们为您推荐了新上架的《数字时代生存指南》，快来看看吧！',
    time: '2天前',
    type: 'system',
    isRead: true,
  },
];

export const BOOKS: Book[] = generateBooks(1000);

export const USER = {
  name: '李建华',
  id: 'NLB-82XXXX90',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  stats: {
    booksRead: 124,
    readingMinutes: 1890,
    badges: 12,
  },
  devices: [
    { id: 'd1', name: 'My Kindle Paperwhite', type: 'Kindle', status: 'Online', lastSync: '刚刚同步过' },
    { id: 'd2', name: '文石 Leaf 3', type: 'E-Reader', status: 'Offline', lastSync: '2026-03-15' },
  ],
};

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string;
  tags: string[];
  date: string;
}

export const TOPICS: Topic[] = [
  {
    id: 't1',
    title: '2026 新加坡双语阅读节',
    subtitle: '探索多元文化的魅力，开启智慧阅读之旅',
    image: 'https://picsum.photos/seed/reading-festival/800/400',
    content: `
      # 2026 新加坡双语阅读节：连接文字与心灵

      新加坡国家图书馆管理局 (NLB) 隆重推出 2026 年度双语阅读节。本次活动旨在通过丰富的双语资源，促进不同文化背景读者之间的交流与理解。

      ## 活动亮点
      - **名家讲座**：邀请来自全球的知名作家分享创作心得。
      - **双语工作坊**：专为青少年设计的翻译与写作技巧课程。
      - **数字阅读马拉松**：通过 NLB Digital 平台参与在线阅读挑战。

      阅读不仅是获取知识的途径，更是连接过去与未来、自我与世界的桥梁。在这个数字化时代，我们依然坚信文字的力量。

      ## 推荐书单
      - 《人工智能：从理解到重构》
      - 《新加坡历史：从莱佛士至今》
      - 《三体》
    `,
    tags: ['官方活动', '双语阅读'],
    date: '2026-03-15',
  },
  {
    id: 't2',
    title: '智慧国家：数字时代的生存指南',
    subtitle: '从底层逻辑到应用实践，全面解析智慧城市',
    image: 'https://picsum.photos/seed/smart-city/800/400',
    content: `
      # 智慧国家：数字时代的生存指南

      随着“智慧国家 2030”计划的深入推进，新加坡正经历着前所未有的数字化转型。作为普通市民，我们该如何适应并引领这一变革？

      ## 核心议题
      1. **数据隐私与安全**：在万物互联的时代，如何保护个人信息？
      2. **终身学习的必要性**：技术迭代加速，如何通过 NLB 资源保持竞争力？
      3. **数字包容性**：确保每一位社会成员都能享受技术带来的便利。

      本专题汇集了政府科技局 (GovTech) 与学术界的最新研究成果，为您提供一份实用的数字时代生存手册。
    `,
    tags: ['科技趋势', '智慧城市'],
    date: '2026-03-10',
  },
  {
    id: 't3',
    title: '狮城人文：消失的街角与记忆',
    subtitle: '寻访那些被时光掩埋的城市印记',
    image: 'https://picsum.photos/seed/old-sg/800/400',
    content: `
      # 狮城人文：消失的街角与记忆

      城市在扩张，记忆在消逝。本专题带您走进那些已经消失或正在改变的街角，寻找老新加坡的温度。

      ## 寻访路线
      - **牛车水的旧戏院**：曾经的繁华与如今的静谧。
      - **加东的土生华人建筑**：色彩斑斓的文化瑰宝。
      - **芽笼的深夜食堂**：传承几代的味道。

      通过这些文字与图片，我们希望能够唤起您心中那份对土地的眷恋。
    `,
    tags: ['人文历史', '城市记忆'],
    date: '2026-03-05',
  },
  {
    id: 't4',
    title: '少儿分级阅读：如何科学选书',
    subtitle: 'NLB 专家为您解读分级阅读体系',
    image: 'https://picsum.photos/seed/kids-reading/800/400',
    content: `
      # 少儿分级阅读：如何科学选书

      很多家长在面对海量童书时会感到迷茫。分级阅读 (Leveled Reading) 提供了一套科学的评估体系，帮助孩子找到最适合自己的书籍。

      ## 选书原则
      - **兴趣优先**：尊重孩子的选择。
      - **难度适中**：遵循“五个手指”原则。
      - **多元题材**：平衡虚构与非虚构类书籍。

      NLB 的 L1-L5 分级体系是基于新加坡教育部的教学大纲设计的，旨在循序渐进地培养孩子的阅读能力。
    `,
    tags: ['亲子教育', '分级阅读'],
    date: '2026-03-01',
  },
];
