// ==================== 客户评价相关 ====================
export interface TestimonialMember {
  name: string
  role: string
  avatar: string
}

export interface Testimonial {
  id: number
  /** 客户名称 */
  client: string
  /** 评价人职务 */
  clientTitle: string
  /** 所在行业 */
  industry: string
  /** 项目类型（评价按此集中分组） */
  projectType: string
  /** 项目名称 */
  projectName: string
  /** 关联的服务案例 ID，用于跳转查看完整项目背景 */
  caseId: number
  /** 对接团队 */
  team: string
  /** 评分（1-5）；缺失时为 null，归入“待补充”且不计入平均分 */
  rating: number | null
  /** 评分缺失原因 */
  pendingReason?: string
  /** 评价原文 */
  content: string
  /** 项目背景 */
  background: string
  /** 项目成员（memberPool 的 key） */
  memberIds: string[]
  /** 评价时间 */
  date: string
}

// 项目类型分组的展示顺序
export const PROJECT_TYPE_ORDER = [
  '数字化平台建设',
  '电商与零售',
  '教育与培训',
  '智能制造与物联网',
  '智能化系统',
  '数字内容'
]

// 项目团队成员池，评价通过 memberIds 引用
export const memberPool: Record<string, TestimonialMember> = {
  chen: {
    name: '陈伟',
    role: '项目经理',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face'
  },
  liu: {
    name: '刘洋',
    role: '首席架构师',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  },
  sun: {
    name: '孙静',
    role: '前端工程师',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'
  },
  zhou: {
    name: '周磊',
    role: '算法工程师',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
  },
  wu: {
    name: '吴敏',
    role: 'UI/UX 设计师',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
  },
  zheng: {
    name: '郑昊',
    role: '测试负责人',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'
  },
  feng: {
    name: '冯丽',
    role: '数据工程师',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face'
  },
  he: {
    name: '何军',
    role: 'DevOps 工程师',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  },
  huang: {
    name: '黄涛',
    role: '产品经理',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'
  },
  xu: {
    name: '许晴',
    role: '客户成功经理',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face'
  }
}

// 客户评价：与「服务案例」中的已完成项目一一对应
export const testimonials: Testimonial[] = [
  {
    id: 1,
    client: '某国有银行',
    clientTitle: '信息科技部总经理 · 王建国',
    industry: '金融科技',
    projectType: '数字化平台建设',
    projectName: '某大型银行数字化转型平台',
    caseId: 1,
    team: '金融交付一部',
    rating: 5,
    content:
      '团队对金融业务的理解非常到位，微服务架构支撑住了亿级用户的并发压力，上线以来系统可用性达到 99.99%。交付过程透明、节奏可控，是我们合作过最专业的技术团队之一。',
    background:
      '客户原有线上渠道分散在多套系统中，体验不一致且高峰期频繁告警。项目历时 9 个月，完成全渠道数字化服务平台建设，涵盖业务中台、智能风控与统一用户中心，支持 PC、APP、小程序多端接入。',
    memberIds: ['chen', 'liu', 'he', 'xu'],
    date: '2024-03'
  },
  {
    id: 2,
    client: '某跨境电商公司',
    clientTitle: 'CEO · Linda Chen',
    industry: '电商零售',
    projectType: '电商与零售',
    projectName: '跨境电商独立站建设',
    caseId: 2,
    team: '电商交付组',
    rating: 5,
    content:
      '独立站上线后覆盖 200 多个国家和地区，多语言、多货币、本地支付都处理得很细致，支付成功率提升到 98%。团队响应速度快，遇到海外节点问题总能当天解决。',
    background:
      '客户长期依赖第三方平台，品牌心智弱、利润受限。项目为其打造品牌独立站，集成全球主流支付与物流追踪，并配套 SEO 与营销自动化能力，支撑品牌出海战略落地。',
    memberIds: ['chen', 'sun', 'wu', 'xu'],
    date: '2024-02'
  },
  {
    id: 3,
    client: '某教育科技公司',
    clientTitle: '教学副总裁 · 李敏',
    industry: '教育培训',
    projectType: '教育与培训',
    projectName: '在线教育学习平台',
    caseId: 3,
    team: '教育交付组',
    rating: 4,
    content:
      '万人同时在线直播延迟控制在 1 秒以内，AI 题库和学习路径推荐也很受学员欢迎。扣一星是希望后续数据分析看板能再开放一些自定义维度，整体仍然非常满意。',
    background:
      '客户原有系统以录播课程为主，无法支撑大班直播与互动教学。项目建设了直播授课、录播课程、互动问答、AI 题库与学习数据分析一体化平台，并支持多端同步与离线缓存。',
    memberIds: ['huang', 'sun', 'zheng'],
    date: '2024-01'
  },
  {
    id: 4,
    client: '某三甲医院',
    clientTitle: '门诊部主任 · 张宏',
    industry: '医疗健康',
    projectType: '数字化平台建设',
    projectName: '智慧医疗预约挂号系统',
    caseId: 4,
    team: '政企交付组',
    rating: 5,
    content:
      '号源实时同步、智能分诊很准，患者平均等待时间下降了 70%，门诊投诉明显减少。团队在等保合规和数据隐私方面考虑得很周全，院方很放心。',
    background:
      '医院线下挂号排队时间长、号源管理混乱。项目打造线上预约、智能分诊、远程问诊、电子处方流转的智慧医疗服务平台，并与院内 HIS 系统深度打通，满足医疗数据合规要求。',
    memberIds: ['chen', 'liu', 'feng'],
    date: '2023-12'
  },
  {
    id: 5,
    client: '某制造企业',
    clientTitle: 'CIO · 赵立新',
    industry: '智能制造',
    projectType: '智能制造与物联网',
    projectName: '工业物联网平台',
    caseId: 5,
    team: '物联网交付组',
    rating: null,
    pendingReason: '项目刚完成终验，客户满意度回访安排在平台上线满 3 个月后进行，评分暂未回收',
    content:
      '平台接入了全厂 5000 多台设备，数据采集稳定，预测性维护已经提前发现了两次潜在故障。等运行满一个季度、数据更完整后我们会给出正式评分。',
    background:
      '客户设备数量多、协议杂，故障排查依赖老师傅经验。项目建设工业物联网平台，实现设备远程监控、实时数据采集、AI 预测性维护、智能排产与数字孪生可视化。',
    memberIds: ['liu', 'zhou', 'he'],
    date: '2023-11'
  },
  {
    id: 6,
    client: '某传媒集团',
    clientTitle: '内容业务负责人 · 陈思',
    industry: '文化传媒',
    projectType: '数字内容',
    projectName: '短视频内容创作平台',
    caseId: 6,
    team: '内容生态交付组',
    rating: 4,
    content:
      'AI 脚本和智能剪辑把内容生产效率提高了 3 倍，一键多平台分发很省心。建议下一阶段在素材版权校验上继续增强，其余方面都达到了预期。',
    background:
      '客户内容生产依赖大量人工剪辑与逐平台发布，产能跟不上投放节奏。项目打造 AI 辅助脚本生成、智能剪辑、多平台一键分发与内容数据分析的一体化创作平台。',
    memberIds: ['zhou', 'wu', 'sun'],
    date: '2023-10'
  },
  {
    id: 7,
    client: '某保险公司',
    clientTitle: '理赔部总经理 · 刘国栋',
    industry: '金融科技',
    projectType: '智能化系统',
    projectName: '保险智能理赔系统',
    caseId: 7,
    team: '金融交付二部',
    rating: 5,
    content:
      'OCR 加 NLP 的材料识别准确率 99%，小额案件实现秒级自动赔付，理赔整体时效缩短 80%，客户口碑和运营成本同时改善。模型迭代服务也很到位。',
    background:
      '客户理赔流程高度依赖人工核材料、核定损，时效长且欺诈风险高。项目基于 OCR、NLP 与风控模型建设智能理赔系统，实现材料智能识别、AI 自动定损、小额案件自动赔付。',
    memberIds: ['zhou', 'feng', 'zheng'],
    date: '2023-09'
  },
  {
    id: 8,
    client: '某生鲜电商公司',
    clientTitle: '供应链总监 · 周燕',
    industry: '电商零售',
    projectType: '电商与零售',
    projectName: '生鲜电商供应链系统',
    caseId: 8,
    team: '供应链交付组',
    rating: null,
    pendingReason: '原项目对接人离职，评分需待新任供应链负责人熟悉系统后确认，预计下月补充',
    content:
      '全链路冷链监控和智能补货上线后，库存周转提升 50%、损耗下降 40%。系统本身效果明确，评分会在内部交接完成后尽快补上。',
    background:
      '生鲜品类损耗高、冷链不透明、库存依赖人工经验。项目建设覆盖采购、WMS 多温区仓储、TMS 冷链运输与商品溯源的全链路供应链管理系统，并用需求预测指导补货。',
    memberIds: ['huang', 'feng', 'he'],
    date: '2023-08'
  },
  {
    id: 9,
    client: '某职业教育机构',
    clientTitle: '校长 · 孙立德',
    industry: '教育培训',
    projectType: '教育与培训',
    projectName: '职业技能培训平台',
    caseId: 9,
    team: '教育交付组',
    rating: 5,
    content:
      '技能测评、课程学习、认证考试在一个平台里跑通，认证通过率 89%、学员就业率 92%，在线考试的防作弊机制也让证书含金量更有保障。',
    background:
      '客户线下培训规模受限，且缺少标准化的能力测评与认证手段。项目打造技能测评、项目制课程学习、在线认证考试一体化平台，配套学习路径规划与防作弊监考机制。',
    memberIds: ['huang', 'wu', 'xu'],
    date: '2023-07'
  }
]
