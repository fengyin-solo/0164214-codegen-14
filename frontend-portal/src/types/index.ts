// ==================== 通用类型 ====================
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface PageParams {
  page: number
  pageSize: number
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// ==================== 新闻相关 ====================
export interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  coverImage: string
  category: string
  author: string
  viewCount: number
  publishTime: string
  createTime: string
  updateTime: string
}

// ==================== 产品相关 ====================
export interface ProductItem {
  id: number
  name: string
  description: string
  image: string
  features: string[]
  price?: number
  category: string
}

// ==================== 联系表单 ====================
export interface ContactForm {
  name: string
  email: string
  phone: string
  company?: string
  message: string
}

// ==================== 案例相关 ====================
export interface CaseItem {
  id: number
  title: string
  description: string
  coverImage: string
  industry: string
  client: string
  serviceType: string
  tags: string[]
  highlights: string[]
  results: {
    label: string
    value: string
  }[]
  publishTime: string
}

// ==================== 预约咨询表单 ====================
export interface ConsultationForm {
  name: string
  email: string
  phone: string
  company?: string
  industry: string
  caseId?: number
  caseTitle?: string
  requirement: string
}

// ==================== 客户评价相关 ====================
// 评价团队成员
export interface ReviewMember {
  id: string
  name: string
  role: string
  avatar: string
}

// 评价关联的项目背景
export interface ReviewProject {
  name: string
  industry: string
  serviceType: string
  client: string
  duration: string
  background: string
  memberIds: string[]
}

// 客户评价
export interface ReviewItem {
  id: number
  author: string
  title: string
  company: string
  industry: string
  team: string
  // 评分：1-5；为 null 表示暂时缺失，归入「待补充」且不计入平均分
  rating: number | null
  // 评分缺失的原因说明
  missingRatingReason?: string
  content: string
  date: string
  project: ReviewProject
}

// 评分筛选取值：'all' 全部 | 1-5 按星查看 | 'pending' 待补充
export type RatingFilterValue = 'all' | 'pending' | number

// ==================== 导航菜单 ====================
export interface NavItem {
  name: string
  path: string
  icon?: string
  children?: NavItem[]
}

// ==================== Banner ====================
export interface BannerItem {
  id: number
  title: string
  subtitle?: string
  image: string
  link?: string
  buttonText?: string
}
