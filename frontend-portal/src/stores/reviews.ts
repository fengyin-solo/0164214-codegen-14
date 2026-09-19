import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ReviewItem, ReviewMember } from '@/types'

/**
 * 团队成员池：评价详情中的「团队成员」通过 memberIds 引用这里的成员
 */
const members: ReviewMember[] = [
  {
    id: 'm-zhangming',
    name: '张明',
    role: '项目总负责人 / CEO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-lihua',
    name: '李华',
    role: '技术总监',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-wangfang',
    name: '王芳',
    role: '产品总监',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-zhaoqiang',
    name: '赵强',
    role: '运营总监',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-chenjing',
    name: '陈静',
    role: '高级前端工程师',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-liuyang',
    name: '刘洋',
    role: '后端架构师',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-sunli',
    name: '孙丽',
    role: 'UI/UX 设计师',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-zhourui',
    name: '周锐',
    role: '数据算法工程师',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-wujun',
    name: '吴俊',
    role: '测试负责人',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-zhengxia',
    name: '郑霞',
    role: '实施交付经理',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-huangbo',
    name: '黄博',
    role: '运维工程师',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 'm-xumin',
    name: '徐敏',
    role: '客户成功经理',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face'
  }
]

export const useReviewsStore = defineStore('reviews', () => {
  // 评价列表（当前为内置示例数据，后续可替换为接口获取）
  const reviews = ref<ReviewItem[]>([
    {
      id: 1,
      author: '马先生',
      title: '国有大行核心系统数字化升级的靠谱伙伴',
      company: '某国有银行',
      industry: '金融科技',
      team: '金融解决方案一组',
      rating: 5,
      content:
        '团队对金融业务的理解超出预期，微服务改造期间核心交易零事故。高峰期系统稳定性从 99.9% 提升到 99.99%，业务部门非常满意，已经把二期项目也交给了他们。',
      date: '2024-04',
      project: {
        name: '某大型银行数字化转型平台',
        industry: '金融科技',
        serviceType: '平台开发',
        client: '某国有银行',
        duration: '2023.06 - 2024.03（10个月）',
        background:
          '客户原有核心系统架构老旧，渠道分散，无法支撑亿级用户的并发访问。项目采用微服务架构重构全渠道数字化服务平台，覆盖 PC、APP、小程序多端，并建设智能化风控体系，实现业务线上化与智能化升级。',
        memberIds: ['m-zhangming', 'm-lihua', 'm-liuyang', 'm-wujun', 'm-huangbo']
      }
    },
    {
      id: 2,
      author: '林女士',
      title: '智能理赔上线后效率翻倍',
      company: '某保险公司',
      industry: '金融科技',
      team: '金融解决方案二组',
      rating: 4,
      content:
        'OCR 识别和 AI 定损的准确率很高，小额案件基本实现自动赔付，理赔时效缩短了八成。项目管理规范、周报清晰，唯一的建议是早期多安排一些业务人员培训。',
      date: '2023-10',
      project: {
        name: '保险智能理赔系统',
        industry: '金融科技',
        serviceType: '智能系统',
        client: '某保险公司',
        duration: '2023.03 - 2023.09（7个月）',
        background:
          '客户理赔流程长期依赖人工审核，时效慢、欺诈风险高。项目通过 OCR+NLP 智能识别理赔材料，结合 AI 自动定损与智能风控模型，实现小额案件自动赔付，到账时间压缩至 5 分钟以内。',
        memberIds: ['m-lihua', 'm-zhourui', 'm-wujun', 'm-xumin']
      }
    },
    {
      id: 3,
      author: 'David Wang',
      title: '品牌出海的独立站一次做对了',
      company: '某跨境电商公司',
      industry: '电商零售',
      team: '电商解决方案组',
      rating: 5,
      content:
        '多语言、多货币和本地化税费处理得很细致，支付成功率肉眼可见地提高。海外营销团队配合度很高，SEO 方案上线三个月自然流量翻了一倍，推荐给做出海的同行。',
      date: '2024-03',
      project: {
        name: '跨境电商独立站建设',
        industry: '电商零售',
        serviceType: '电商平台',
        client: '某跨境电商公司',
        duration: '2023.09 - 2024.02（6个月）',
        background:
          '客户长期依赖第三方平台，品牌沉淀不足。项目帮助客户搭建品牌独立站，支持多语言、多货币、多税费体系，集成全球主流支付方式，并配套 SEO 优化与营销自动化，支撑品牌出海战略落地。',
        memberIds: ['m-wangfang', 'm-chenjing', 'm-sunli', 'm-zhaoqiang', 'm-zhengxia']
      }
    },
    {
      id: 4,
      author: '何先生',
      title: '生鲜供应链全链路数字化落地',
      company: '某生鲜电商公司',
      industry: '电商零售',
      team: '电商解决方案组',
      rating: 5,
      content:
        '需求预测和冷链监控解决了我们最头疼的损耗问题，库存周转明显加快。实施团队驻场配合很扎实，一线仓管都反馈系统简单好用。',
      date: '2023-09',
      project: {
        name: '生鲜电商供应链系统',
        industry: '电商零售',
        serviceType: '供应链系统',
        client: '某生鲜电商公司',
        duration: '2023.02 - 2023.08（7个月）',
        background:
          '客户采购、仓储、配送环节系统割裂，生鲜损耗率长期偏高。项目建设覆盖全链路的供应链管理系统，包含智能需求预测、多温区 WMS、全程冷链 TMS 与商品溯源，实现采购到配送全流程数字化。',
        memberIds: ['m-zhangming', 'm-liuyang', 'm-zhengxia', 'm-zhourui']
      }
    },
    {
      id: 5,
      author: '赵校长',
      title: '万人直播课堂稳定流畅',
      company: '某教育科技公司',
      industry: '教育培训',
      team: '教育解决方案组',
      rating: 5,
      content:
        '万人同时在线直播延迟控制在 1 秒以内，开课高峰期一次都没崩过。AI 题库和学习路径推荐很受学员欢迎，完课率提升非常明显，家长群里口碑很好。',
      date: '2024-02',
      project: {
        name: '在线教育学习平台',
        industry: '教育培训',
        serviceType: '教育平台',
        client: '某教育科技公司',
        duration: '2023.07 - 2024.01（7个月）',
        background:
          '客户线下转线上过程中缺乏统一的教学平台。项目打造综合性在线学习平台，支持万人级低延迟直播授课、录播课程、互动问答，配套 AI 智能题库与个性化学习路径推荐，并支持多端同步与离线缓存。',
        memberIds: ['m-wangfang', 'm-chenjing', 'm-liuyang', 'm-sunli', 'm-huangbo']
      }
    },
    {
      id: 6,
      author: '孙主任',
      title: '职业培训平台一期顺利交付',
      company: '某职业教育机构',
      industry: '教育培训',
      team: '教育解决方案组',
      rating: null,
      missingRatingReason: '项目已通过终验，客户书面评分流程尚在内部审批中，预计下月回填',
      content:
        '技能测评和在线考试模块贴合我们的认证业务，防作弊机制让考试组织方很放心。评分还在走客户内部的盖章流程，先提交文字反馈，分数随后补齐。',
      date: '2023-08',
      project: {
        name: '职业技能培训平台',
        industry: '教育培训',
        serviceType: '培训平台',
        client: '某职业教育机构',
        duration: '2023.01 - 2023.07（7个月）',
        background:
          '客户希望将线下职业技能培训线上化、标准化。项目提供技能测评、课程学习、认证考试一体化服务，包含 AI 技能测评、实战项目教学、在线防作弊考试与学习路径规划，覆盖学员成长全周期。',
        memberIds: ['m-wangfang', 'm-zhourui', 'm-wujun', 'm-xumin']
      }
    },
    {
      id: 7,
      author: '梁主任',
      title: '智慧医疗让患者少跑腿',
      company: '某三甲医院',
      industry: '医疗健康',
      team: '行业解决方案组',
      rating: 5,
      content:
        '预约挂号和智能分诊上线后，患者平均等待时间下降了七成，门诊秩序也好了很多。团队对医疗合规要求把握到位，信息科对接省心。',
      date: '2024-01',
      project: {
        name: '智慧医疗预约挂号系统',
        industry: '医疗健康',
        serviceType: '医疗系统',
        client: '某三甲医院',
        duration: '2023.06 - 2023.12（7个月）',
        background:
          '患者挂号排队时间长、号源管理分散。项目建设智慧医疗服务平台，实现多渠道线上预约、号源实时同步、AI 智能分诊、电子处方流转与远程问诊，全面提升就医体验与医生工作效率。',
        memberIds: ['m-zhangming', 'm-chenjing', 'm-liuyang', 'm-zhengxia']
      }
    },
    {
      id: 8,
      author: '高厂长',
      title: '预测性维护帮我们省下大笔停机损失',
      company: '某制造企业',
      industry: '智能制造',
      team: '行业解决方案组',
      rating: 4,
      content:
        '5000 多台设备接入后数据看板一目了然，故障提前 72 小时预警，非计划停机明显减少。现场设备型号多、协议杂，前期对接花了些时间，但结果值得。',
      date: '2023-12',
      project: {
        name: '工业物联网平台',
        industry: '智能制造',
        serviceType: '物联网平台',
        client: '某制造企业',
        duration: '2023.04 - 2023.11（8个月）',
        background:
          '客户设备数量大、品牌杂，运维以事后维修为主。项目搭建工业物联网平台，接入 5000+ 生产设备进行实时数据采集，结合 AI 预测性维护、智能排产与数字孪生技术，实现生产全过程可视化管理。',
        memberIds: ['m-lihua', 'm-zhourui', 'm-huangbo', 'm-wujun', 'm-zhengxia']
      }
    },
    {
      id: 9,
      author: '潘总',
      title: 'AI 创作工具让内容团队如虎添翼',
      company: '某传媒集团',
      industry: '文化传媒',
      team: '行业解决方案组',
      rating: 5,
      content:
        'AI 脚本生成和智能剪辑把内容生产效率提高了三倍，一键多平台分发也节省了大量运营人力。产品设计很懂内容创作者，培训后大家很快就上手了。',
      date: '2023-11',
      project: {
        name: '短视频内容创作平台',
        industry: '文化传媒',
        serviceType: '内容平台',
        client: '某传媒集团',
        duration: '2023.05 - 2023.10（6个月）',
        background:
          '客户短视频产量需求快速增长，传统人工创作与分发模式遇到瓶颈。项目打造内容创作与分发平台，提供 AI 辅助脚本生成、智能剪辑、10+ 平台一键分发与内容数据分析，帮助客户提升爆款产出效率。',
        memberIds: ['m-wangfang', 'm-chenjing', 'm-zhourui', 'm-sunli', 'm-zhaoqiang']
      }
    },
    {
      id: 10,
      author: '吴科长',
      title: '互联网医院一期试运行中',
      company: '某区域医疗中心',
      industry: '医疗健康',
      team: '行业解决方案组',
      rating: null,
      missingRatingReason: '项目仍在试运行阶段，客户约定试运行满 3 个月后统一回访评分',
      content:
        '在线问诊和报告查询功能已上线试运行，医生和患者反馈都不错。按照双方约定，试运行满三个月后再做正式评价和评分，目前先记录项目进展。',
      date: '2024-05',
      project: {
        name: '互联网医院平台（一期）',
        industry: '医疗健康',
        serviceType: '医疗系统',
        client: '某区域医疗中心',
        duration: '2024.01 - 2024.05（5个月，试运行中）',
        background:
          '客户希望将复诊、问诊、报告查询等高频服务延伸到线上。项目一期建设互联网医院平台，打通院内 HIS 数据，实现在线复诊、电子处方、检验报告查询与用药提醒，目前处于试运行阶段。',
        memberIds: ['m-lihua', 'm-chenjing', 'm-zhengxia', 'm-xumin']
      }
    }
  ])

  // 全部评价条数（= 公司简介中的合作项目数量）
  const totalCount = computed(() => reviews.value.length)

  // 已有评分的评价（评分缺失的不计入平均分）
  const ratedReviews = computed(() =>
    reviews.value.filter((review): review is ReviewItem & { rating: number } => review.rating !== null)
  )

  // 评分暂时缺失、待补充的评价
  const pendingReviews = computed(() => reviews.value.filter((review) => review.rating === null))

  // 平均分（仅基于已评分评价，保留一位小数）
  const averageRating = computed(() => {
    if (ratedReviews.value.length === 0) return 0
    const sum = ratedReviews.value.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / ratedReviews.value.length) * 10) / 10
  })

  // 各星级数量
  const ratingCounts = computed(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    ratedReviews.value.forEach((review) => {
      counts[review.rating] += 1
    })
    return counts
  })

  // 按项目类型分组（已评分评价），返回 [{ serviceType, items }]
  const groupedByServiceType = computed(() => {
    const groupMap = new Map<string, ReviewItem[]>()
    ratedReviews.value.forEach((review) => {
      const key = review.project.serviceType
      const group = groupMap.get(key)
      if (group) {
        group.push(review)
      } else {
        groupMap.set(key, [review])
      }
    })
    return Array.from(groupMap, ([serviceType, items]) => ({ serviceType, items }))
  })

  const getReviewById = (id: number) => reviews.value.find((review) => review.id === id)

  const getMembersByIds = (memberIds: string[]) =>
    memberIds
      .map((memberId) => members.find((member) => member.id === memberId))
      .filter((member): member is ReviewMember => Boolean(member))

  return {
    reviews,
    totalCount,
    ratedReviews,
    pendingReviews,
    averageRating,
    ratingCounts,
    groupedByServiceType,
    getReviewById,
    getMembersByIds
  }
})
