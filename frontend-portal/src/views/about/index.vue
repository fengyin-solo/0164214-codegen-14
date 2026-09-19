<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="hero-content">
        <span class="hero-badge">关于我们</span>
        <h1>用技术创新<br/><span class="gradient-text">驱动企业成长</span></h1>
        <p>我们是一支充满激情的团队，致力于帮助企业实现数字化转型，在数字时代保持竞争优势。</p>
      </div>
    </section>

    <!-- 公司简介 -->
    <section class="intro-section">
      <div class="intro-container">
        <div class="intro-content">
          <span class="section-badge">我们的故事</span>
          <h2>从创业到行业领先</h2>
          <p>
            自2018年成立以来，我们始终坚持以客户为中心，以技术创新为驱动。
            从最初的3人团队，发展到如今拥有50+专业人才的科技公司，
            我们服务了500+企业客户，帮助他们实现了数字化转型的目标。
          </p>
          <p>
            我们相信，技术的价值在于解决实际问题。因此，我们不断探索前沿技术，
            将其转化为切实可行的解决方案，为客户创造真正的商业价值。
          </p>
          <p class="intro-cooperation">
            截至目前，我们已交付 <strong>{{ testimonials.length }}</strong> 个合作项目并收到客户的真实评价，
            你可以在下方的<a href="#testimonials" @click.prevent="scrollToTestimonials">客户评价专区</a>逐条查看。
          </p>
          <div class="intro-stats">
            <div class="stat">
              <span class="stat-value">6+</span>
              <span class="stat-label">年行业经验</span>
            </div>
            <div class="stat">
              <span class="stat-value">500+</span>
              <span class="stat-label">服务客户</span>
            </div>
            <div class="stat">
              <span class="stat-value">50+</span>
              <span class="stat-label">专业团队</span>
            </div>
          </div>
        </div>
        <div class="intro-image">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop" alt="团队协作" />
          <div class="image-decoration"></div>
        </div>
      </div>
    </section>

    <!-- 使命愿景 -->
    <section class="mission-section">
      <div class="mission-container">
        <div class="mission-card">
          <div class="mission-icon">
            <span class="icon-emoji">🎯</span>
          </div>
          <h3>我们的使命</h3>
          <p>通过技术创新，帮助每一家企业实现数字化转型，提升运营效率，创造更大价值。</p>
        </div>
        <div class="mission-card featured">
          <div class="mission-icon">
            <span class="icon-emoji">📈</span>
          </div>
          <h3>我们的愿景</h3>
          <p>成为最受信赖的数字化转型伙伴，引领企业走向智能化未来。</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">
            <span class="icon-emoji">🏆</span>
          </div>
          <h3>核心价值观</h3>
          <p>诚信为本、创新驱动、客户至上、追求卓越 - 这是我们始终坚守的信念。</p>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
    <section class="timeline-section">
      <div class="section-header">
        <span class="section-header__badge">
          <el-icon><Clock /></el-icon> 发展历程
        </span>
        <h2 class="section-header__title">一路走来</h2>
        <p class="section-header__desc">每一个里程碑都是我们成长的见证</p>
      </div>
      
      <div class="timeline-wrapper">
        <div class="timeline-line"></div>
        <div class="timeline-items">
          <div 
            v-for="(item, index) in timeline" 
            :key="index" 
            class="timeline-item"
            :class="{ 'is-right': index % 2 === 1 }"
          >
            <div class="timeline-card">
              <span class="timeline-year">{{ item.year }}</span>
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客户评价 -->
    <section id="testimonials" ref="testimonialsSectionRef" class="testimonials-section">
      <div class="testimonials-container">
        <div class="section-header">
          <span class="section-header__badge">
            <el-icon><ChatLineSquare /></el-icon> 客户评价
          </span>
          <h2 class="section-header__title">来自合作伙伴的真实反馈</h2>
          <p class="section-header__desc">评价按项目类型集中展示，点击任意卡片可查看项目背景与团队成员</p>
        </div>

        <template v-if="testimonials.length > 0">
          <!-- 评分概览 -->
          <div class="rating-overview">
            <div class="overview-score">
              <template v-if="ratedTestimonials.length > 0">
                <span class="score-value">{{ averageRating.toFixed(1) }}</span>
                <div class="score-detail">
                  <el-rate :model-value="averageRating" disabled />
                  <span class="score-label">平均分 · 共 {{ ratedTestimonials.length }} 条已评分</span>
                </div>
              </template>
              <template v-else>
                <span class="score-value">--</span>
                <span class="score-total">暂无已评分评价，平均分待统计</span>
              </template>
            </div>
            <el-alert
              v-if="pendingTestimonials.length > 0"
              class="overview-note"
              type="warning"
              :closable="false"
              show-icon
            >
              <template #title>
                另有 {{ pendingTestimonials.length }} 条评价评分缺失，已单独归入「待补充」，
                暂不计入平均分。
              </template>
            </el-alert>
          </div>

          <!-- 按评分查看 -->
          <div class="filter-bar">
            <span class="filter-label">
              <el-icon><Filter /></el-icon>
              按评分查看：
            </span>
            <div class="filter-tabs">
              <button
                v-for="opt in ratingFilters"
                :key="opt.value"
                class="filter-tab"
                :class="{ active: activeRatingFilter === opt.value }"
                @click="activeRatingFilter = opt.value"
              >
                {{ opt.label }}
                <span class="tab-count">{{ opt.count }}</span>
              </button>
            </div>
          </div>

          <!-- 项目类型分组 -->
          <template v-if="visibleGroups.length > 0">
            <div v-for="group in visibleGroups" :key="group.key" class="testimonial-group">
              <div class="group-header">
                <el-icon><CollectionTag /></el-icon>
                <h3>{{ group.label }}</h3>
                <span class="group-count">{{ group.items.length }} 条</span>
              </div>

              <div v-if="group.key !== 'pending'" class="testimonial-grid">
                <div
                  v-for="item in group.items"
                  :key="item.id"
                  class="testimonial-card"
                  @click="showTestimonialDetail(item)"
                >
                  <div class="card-top">
                    <span class="card-industry">
                      <el-icon><OfficeBuilding /></el-icon>
                      {{ item.industry }}
                    </span>
                    <el-rate :model-value="item.rating ?? 0" disabled size="small" />
                  </div>
                  <p class="card-quote">“{{ item.content }}”</p>
                  <div class="card-footer">
                    <div class="card-meta">
                      <span class="meta-client">{{ item.client }}</span>
                      <span class="meta-team">
                        <el-icon><UserFilled /></el-icon>
                        {{ item.team }}
                      </span>
                    </div>
                    <el-button text type="primary" size="small">
                      查看项目背景<el-icon><ArrowRight /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- 待补充评分 -->
              <div v-else class="testimonial-grid">
                <div
                  v-for="item in group.items"
                  :key="item.id"
                  class="testimonial-card is-pending"
                  @click="showTestimonialDetail(item)"
                >
                  <div class="card-top">
                    <span class="card-industry">
                      <el-icon><OfficeBuilding /></el-icon>
                      {{ item.industry }}
                    </span>
                    <span class="rating-pending">
                      <el-icon><WarningFilled /></el-icon>
                      待补充
                    </span>
                  </div>
                  <p class="card-quote">“{{ item.content }}”</p>
                  <el-alert
                    class="pending-reason"
                    type="warning"
                    :closable="false"
                    :title="item.pendingReason"
                    show-icon
                  />
                  <div class="card-footer">
                    <div class="card-meta">
                      <span class="meta-client">{{ item.client }}</span>
                      <span class="meta-team">
                        <el-icon><UserFilled /></el-icon>
                        {{ item.team }}
                      </span>
                    </div>
                    <el-button text type="primary" size="small">
                      查看项目背景<el-icon><ArrowRight /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <el-empty
            v-else
            class="filter-empty"
            :description="`暂无${currentFilterLabel}的评价`"
          />
        </template>

        <!-- 一条评价都没有 -->
        <el-empty v-else class="no-testimonial" description="还没有客户评价">
          <template #image>
            <el-icon class="no-testimonial__icon"><ChatLineSquare /></el-icon>
          </template>
          <p class="no-testimonial__tip">
            评价专区暂时为空。您可以从已完成项目里邀请客户填写评价，评价经审核后将在这里按项目类型集中展示。
          </p>
          <el-button type="primary" round @click="goToCases">
            <el-icon><Promotion /></el-icon>
            前往已完成项目邀请评价
          </el-button>
        </el-empty>
      </div>
    </section>

    <!-- 评价详情：项目背景与团队成员 -->
    <el-dialog
      v-model="detailVisible"
      :title="currentTestimonial?.projectName"
      width="720px"
      class="testimonial-dialog"
      destroy-on-close
    >
      <div v-if="currentTestimonial" class="detail-body">
        <div class="detail-meta">
          <span class="meta-badge">
            <el-icon><OfficeBuilding /></el-icon>
            {{ currentTestimonial.industry }}
          </span>
          <span class="meta-badge">
            <el-icon><CollectionTag /></el-icon>
            {{ currentTestimonial.projectType }}
          </span>
          <span class="meta-badge">
            <el-icon><UserFilled /></el-icon>
            {{ currentTestimonial.team }}
          </span>
        </div>

        <div class="detail-rating">
          <template v-if="currentTestimonial.rating !== null">
            <el-rate :model-value="currentTestimonial.rating" disabled />
            <span class="rating-score">{{ currentTestimonial.rating }}.0 分</span>
          </template>
          <el-alert
            v-else
            type="warning"
            :closable="false"
            show-icon
            title="评分待补充，暂不计入平均分"
            :description="currentTestimonial.pendingReason"
          />
        </div>

        <div class="detail-block">
          <h4>
            <el-icon><ChatLineSquare /></el-icon>
            评价原文
          </h4>
          <p class="detail-quote">“{{ currentTestimonial.content }}”</p>
          <p class="detail-author">—— {{ currentTestimonial.client }}（{{ currentTestimonial.clientTitle }}）</p>
        </div>

        <div class="detail-block">
          <h4>
            <el-icon><Notebook /></el-icon>
            项目背景
            <el-button
              v-if="currentTestimonial.caseId"
              class="case-link"
              text
              type="primary"
              size="small"
              @click="goToCase(currentTestimonial.caseId)"
            >
              查看完整项目案例<el-icon><TopRight /></el-icon>
            </el-button>
          </h4>
          <p class="detail-text">{{ currentTestimonial.background }}</p>
        </div>

        <div class="detail-block">
          <h4>
            <el-icon><Avatar /></el-icon>
            团队成员（{{ resolveMembers(currentTestimonial).length }} 人）
          </h4>
          <div class="member-list">
            <div v-for="member in resolveMembers(currentTestimonial)" :key="member.name" class="member-item">
              <img :src="member.avatar" :alt="member.name" />
              <div class="member-info">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-role">{{ member.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 团队介绍 -->
    <section class="team-section">
      <div class="section-header">
        <span class="section-header__badge">
          <el-icon><User /></el-icon> 核心团队
        </span>
        <h2 class="section-header__title">遇见我们的团队</h2>
        <p class="section-header__desc">一群充满激情、专业敬业的伙伴</p>
      </div>
      
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.name" class="team-card">
          <div class="team-avatar">
            <img :src="member.avatar" :alt="member.name" />
          </div>
          <div class="team-info">
            <h4>{{ member.name }}</h4>
            <span class="team-position">{{ member.position }}</span>
            <p>{{ member.description }}</p>
          </div>
          <div class="team-social">
            <a @click="handleNotImplemented"><el-icon><Link /></el-icon></a>
            <a @click="handleNotImplemented"><el-icon><Message /></el-icon></a>
          </div>
        </div>
      </div>
    </section>

    <!-- 办公环境 -->
    <section class="office-section">
      <div class="section-header">
        <span class="section-header__badge">
          <el-icon><OfficeBuilding /></el-icon> 办公环境
        </span>
        <h2 class="section-header__title">我们的工作空间</h2>
        <p class="section-header__desc">开放、协作、充满创意的办公环境</p>
      </div>
      
      <div class="office-gallery">
        <div class="gallery-item large">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" alt="办公室" />
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop" alt="会议室" />
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400&h=300&fit=crop" alt="休息区" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onActivated, onDeactivated, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  testimonials,
  memberPool,
  PROJECT_TYPE_ORDER,
  type Testimonial,
  type TestimonialMember
} from '@/data/testimonials'

// keep-alive 缓存时使用固定名称，确保从项目案例返回后仍停在原位置
defineOptions({ name: 'AboutPage' })

const router = useRouter()

const handleNotImplemented = () => {
  ElMessage.info('功能开发中，敬请期待')
}

// ==================== 客户评价 ====================
const activeRatingFilter = ref<'all' | number | 'pending'>('all')
const detailVisible = ref(false)
const currentTestimonial = ref<Testimonial | null>(null)

const ratedTestimonials = computed(() => testimonials.filter(t => t.rating !== null))
const pendingTestimonials = computed(() => testimonials.filter(t => t.rating === null))

const averageRating = computed(() => {
  if (ratedTestimonials.value.length === 0) return 0
  const total = ratedTestimonials.value.reduce((sum, t) => sum + (t.rating ?? 0), 0)
  return total / ratedTestimonials.value.length
})

const ratingFilters = computed(() => [
  { label: '全部', value: 'all' as const, count: testimonials.length },
  { label: '5 分', value: 5, count: testimonials.filter(t => t.rating === 5).length },
  { label: '4 分', value: 4, count: testimonials.filter(t => t.rating === 4).length },
  { label: '待补充', value: 'pending' as const, count: pendingTestimonials.value.length }
])

const currentFilterLabel = computed(() => {
  if (activeRatingFilter.value === 'all') return ''
  if (activeRatingFilter.value === 'pending') return '待补充评分'
  return `${activeRatingFilter.value} 分`
})

const matchFilter = (item: Testimonial) => {
  if (activeRatingFilter.value === 'all') return true
  if (activeRatingFilter.value === 'pending') return item.rating === null
  return item.rating === activeRatingFilter.value
}

// 待补充评价单独成组，并说明原因（分组依据：项目类型）
const visibleGroups = computed(() => {
  const groups = PROJECT_TYPE_ORDER.map(type => ({
    key: type,
    label: type,
    items: testimonials.filter(t => t.projectType === type && matchFilter(t))
  }))
    .filter(g => g.items.length > 0)

  const pendingItems = pendingTestimonials.value.filter(matchFilter)
  if (pendingItems.length > 0) {
    groups.push({ key: 'pending', label: '待补充评分', items: pendingItems })
  }
  return groups
})

const resolveMembers = (item: Testimonial): TestimonialMember[] =>
  item.memberIds.map(id => memberPool[id]).filter(Boolean)

const showTestimonialDetail = (item: Testimonial) => {
  currentTestimonial.value = item
  detailVisible.value = true
}

const goToCase = (caseId: number) => {
  detailVisible.value = false
  router.push({ path: '/cases', query: { caseId: String(caseId) } })
}

const goToCases = () => {
  router.push('/cases')
}

const testimonialsSectionRef = ref<HTMLElement | null>(null)
const scrollToTestimonials = () => {
  testimonialsSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
}

// 从专区点进项目背景再回来时，仍停在原来的位置
let savedScrollTop = 0
let hasSavedPosition = false

onDeactivated(() => {
  savedScrollTop = window.scrollY
  hasSavedPosition = true
  detailVisible.value = false
})

onActivated(() => {
  if (hasSavedPosition) {
    nextTick(() => {
      window.scrollTo({ top: savedScrollTop, behavior: 'auto' })
    })
  }
})

const timeline = ref([
  { year: '2018', title: '公司成立', description: '怀揣梦想，在北京正式成立，开启创业之旅' },
  { year: '2019', title: '首个里程碑', description: '成功服务100家企业客户，团队规模扩展至20人' },
  { year: '2021', title: '业务拓展', description: '开设上海、深圳分公司，业务覆盖全国主要城市' },
  { year: '2023', title: '技术突破', description: '自主研发核心平台上线，获得多项技术专利' },
  { year: '2024', title: '行业领先', description: '荣获年度最佳创新企业奖，客户满意度达98%' }
])

const teamMembers = ref([
  {
    name: '张明',
    position: '创始人 & CEO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    description: '15年行业经验，曾任职于多家知名科技公司'
  },
  {
    name: '李华',
    position: '技术总监',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    description: '资深架构师，专注于企业级解决方案设计'
  },
  {
    name: '王芳',
    position: '产品总监',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    description: '10年产品经验，深谙用户需求与市场趋势'
  },
  {
    name: '赵强',
    position: '运营总监',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    description: '擅长品牌建设与市场推广，推动业务持续增长'
  }
])
</script>

<style lang="scss" scoped>
.about-page {
  padding-top: $header-height;
}

// ==================== Hero ====================
.page-hero {
  padding: $spacing-4xl $spacing-lg;
  background: $bg-color-light;
  text-align: center;
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero-badge {
    display: inline-block;
    padding: $spacing-sm $spacing-md;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $border-radius-full;
    margin-bottom: $spacing-lg;
  }
  
  h1 {
    font-size: clamp(36px, 6vw, $font-size-5xl);
    line-height: 1.2;
    margin-bottom: $spacing-lg;
    
    .gradient-text {
      background: $gradient-text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  p {
    font-size: $font-size-lg;
    color: $text-color-secondary;
    line-height: $line-height-loose;
  }
}

// ==================== 公司简介 ====================
.intro-section {
  padding: $spacing-4xl $spacing-lg;
}

.intro-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-4xl;
  align-items: center;
  max-width: $container-max-width;
  margin: 0 auto;
}

.intro-content {
  .section-badge {
    display: inline-block;
    padding: $spacing-xs $spacing-md;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $border-radius-full;
    margin-bottom: $spacing-md;
  }
  
  h2 {
    font-size: $font-size-4xl;
    margin-bottom: $spacing-lg;
  }
  
  p {
    font-size: $font-size-md;
    color: $text-color-secondary;
    line-height: $line-height-loose;
    margin-bottom: $spacing-md;
  }

  .intro-cooperation {
    strong {
      color: $primary-color;
      font-size: $font-size-lg;
      font-weight: 800;
    }

    a {
      color: $primary-color;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.intro-stats {
  display: flex;
  gap: $spacing-xl;
  margin-top: $spacing-xl;
  padding-top: $spacing-xl;
  border-top: 1px solid $border-color-light;
  
  .stat {
    .stat-value {
      display: block;
      font-size: $font-size-3xl;
      font-weight: 800;
      color: $primary-color;
    }
    
    .stat-label {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }
}

.intro-image {
  position: relative;
  
  img {
    width: 100%;
    border-radius: $border-radius-xl;
    box-shadow: $shadow-2xl;
  }
  
  .image-decoration {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    background: $gradient-primary;
    border-radius: $border-radius-xl;
    z-index: -1;
    opacity: 0.2;
  }
}

// ==================== 使命愿景 ====================
.mission-section {
  padding: $spacing-4xl $spacing-lg;
  background: $bg-color-dark;
}

.mission-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  max-width: $container-max-width;
  margin: 0 auto;
}

.mission-card {
  padding: $spacing-xl;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $border-radius-lg;
  text-align: center;
  transition: all $transition-normal;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &.featured {
    background: $gradient-primary;
    border: none;
    transform: scale(1.05);
    
    &:hover {
      transform: scale(1.05) translateY(-4px);
    }
    
    .mission-icon {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  .mission-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($primary-color, 0.2);
    border-radius: $border-radius-md;
    color: white;
    margin: 0 auto $spacing-lg;
    
    .icon-emoji {
      font-size: 32px;
    }
  }
  
  h3 {
    font-size: $font-size-xl;
    color: white;
    margin-bottom: $spacing-sm;
  }
  
  p {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.7);
    line-height: $line-height-loose;
  }
}

// ==================== 发展历程 ====================
.timeline-section {
  padding: $spacing-4xl $spacing-lg;
  max-width: $container-max-width;
  margin: 0 auto;
}

.timeline-wrapper {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: $border-color;
  transform: translateX(-50%);
}

.timeline-items {
  position: relative;
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 30px);
  padding-bottom: $spacing-xl;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 8px;
    width: 16px;
    height: 16px;
    background: white;
    border: 3px solid $primary-color;
    border-radius: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  
  &.is-right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: calc(50% + 30px);
    
    .timeline-card {
      text-align: left;
    }
  }
  
  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-card {
  text-align: right;
  
  .timeline-year {
    display: inline-block;
    padding: $spacing-xs $spacing-md;
    background: $gradient-primary;
    color: white;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $border-radius-full;
    margin-bottom: $spacing-sm;
  }
  
  h4 {
    font-size: $font-size-lg;
    margin-bottom: $spacing-xs;
  }
  
  p {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

// ==================== 客户评价 ====================
.testimonials-section {
  padding: $spacing-4xl $spacing-lg;
  background: $bg-color-light;
}

.testimonials-container {
  max-width: $container-max-width;
  margin: 0 auto;
}

.testimonials-section .section-header {
  text-align: center;
  margin-bottom: $spacing-3xl;

  .section-header__badge {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $border-radius-full;
    margin-bottom: $spacing-md;

    .el-icon {
      font-size: 16px;
    }
  }

  .section-header__title {
    font-size: clamp(28px, 4vw, $font-size-3xl);
    font-weight: 700;
    margin-bottom: $spacing-sm;
  }

  .section-header__desc {
    font-size: $font-size-md;
    color: $text-color-secondary;
  }
}

.rating-overview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-lg;
  flex-wrap: wrap;
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg $spacing-xl;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;

  .overview-score {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    flex-wrap: wrap;

    .score-value {
      font-size: $font-size-4xl;
      font-weight: 800;
      background: $gradient-text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .score-total {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }

    .score-detail {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .score-label {
        font-size: $font-size-xs;
        color: $text-color-secondary;
      }
    }

    :deep(.el-rate__text) {
      color: $text-color-secondary;
    }
  }

  .overview-note {
    flex: 1;
    min-width: 280px;
  }
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  flex-wrap: wrap;
  margin-bottom: $spacing-xl;

  .filter-label {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $text-color-regular;

    .el-icon {
      color: $primary-color;
    }
  }

  .filter-tabs {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  .filter-tab {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: 6px $spacing-lg;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    background: white;
    border: 1px solid $border-color;
    border-radius: $border-radius-full;
    cursor: pointer;
    transition: all $transition-fast;

    .tab-count {
      padding: 1px 8px;
      background: $bg-color-light;
      border-radius: $border-radius-full;
      font-size: $font-size-xs;
    }

    &:hover {
      color: $primary-color;
      border-color: $primary-color;
    }

    &.active {
      color: white;
      background: $gradient-primary;
      border-color: transparent;

      .tab-count {
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }
}

.testimonial-group {
  margin-bottom: $spacing-3xl;

  &:last-child {
    margin-bottom: 0;
  }
}

.group-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;

  .el-icon {
    color: $primary-color;
    font-size: $font-size-xl;
  }

  h3 {
    font-size: $font-size-xl;
    font-weight: 700;
  }

  .group-count {
    padding: 2px 10px;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    font-size: $font-size-xs;
    border-radius: $border-radius-full;
  }
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid $border-color-light;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  cursor: pointer;
  transition: all $transition-normal;

  &:hover {
    box-shadow: $shadow-xl;
    transform: translateY(-4px);
  }

  &.is-pending {
    border-style: dashed;
    border-color: rgba($warning-color, 0.4);
    background: rgba($warning-color, 0.03);

    &:hover {
      border-color: $warning-color;
    }
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  .card-industry {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    font-size: $font-size-xs;
    font-weight: 600;
    border-radius: $border-radius-full;
  }

  .rating-pending {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: rgba($warning-color, 0.12);
    color: $warning-color;
    font-size: $font-size-xs;
    font-weight: 600;
    border-radius: $border-radius-full;
  }

  .card-quote {
    flex: 1;
    font-size: $font-size-sm;
    color: $text-color-regular;
    line-height: $line-height-loose;
    margin-bottom: $spacing-md;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pending-reason {
    margin-bottom: $spacing-md;
    align-items: flex-start;

    :deep(.el-alert__title) {
      font-size: $font-size-xs;
      line-height: 1.6;
    }
  }

  .card-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: $spacing-sm;
    padding-top: $spacing-md;
    border-top: 1px dashed $border-color-light;

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .meta-client {
      font-size: $font-size-sm;
      font-weight: 600;
      color: $text-color-primary;
    }

    .meta-team {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: $font-size-xs;
      color: $text-color-secondary;
    }
  }
}

.filter-empty,
.no-testimonial {
  padding: $spacing-3xl 0;
}

.no-testimonial {
  background: white;
  border-radius: $border-radius-lg;
  max-width: 640px;
  margin: 0 auto;

  &__icon {
    font-size: 64px;
    color: $text-color-placeholder;
  }

  &__tip {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    line-height: $line-height-loose;
    max-width: 420px;
    margin: -$spacing-md auto $spacing-lg;
  }
}

// 评价详情弹窗
.testimonial-dialog {
  :deep(.el-dialog__body) {
    padding-top: $spacing-md;
  }

  .detail-body {
    .detail-meta {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-sm;
      margin-bottom: $spacing-lg;

      .meta-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 12px;
        background: $bg-color-light;
        color: $text-color-regular;
        font-size: $font-size-xs;
        border-radius: $border-radius-full;
      }
    }

    .detail-rating {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      margin-bottom: $spacing-xl;

      .rating-score {
        font-size: $font-size-md;
        font-weight: 700;
        color: $warning-color;
      }

      :deep(.el-alert) {
        flex: 1;
      }
    }

    .detail-block {
      margin-bottom: $spacing-xl;

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        font-size: $font-size-md;
        font-weight: 700;
        margin-bottom: $spacing-md;

        .el-icon {
          color: $primary-color;
        }

        .case-link {
          margin-left: $spacing-sm;
        }
      }

      .detail-quote {
        font-size: $font-size-md;
        color: $text-color-regular;
        line-height: $line-height-loose;
        padding: $spacing-md $spacing-lg;
        background: $bg-color-light;
        border-left: 3px solid $primary-color;
        border-radius: $border-radius-sm;
        margin-bottom: $spacing-sm;
      }

      .detail-author {
        font-size: $font-size-sm;
        color: $text-color-secondary;
        text-align: right;
      }

      .detail-text {
        font-size: $font-size-sm;
        color: $text-color-regular;
        line-height: $line-height-loose;
      }
    }

    .member-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: $spacing-md;
    }

    .member-item {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      padding: $spacing-sm;
      background: $bg-color-light;
      border-radius: $border-radius-md;

      img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
      }

      .member-info {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .member-name {
        font-size: $font-size-sm;
        font-weight: 600;
      }

      .member-role {
        font-size: $font-size-xs;
        color: $text-color-secondary;
      }
    }
  }
}

// ==================== 团队介绍 ====================
.team-section {
  padding: $spacing-4xl $spacing-lg;
  background: $bg-color-light;
  
  .section-header {
    max-width: $container-max-width;
    margin: 0 auto $spacing-3xl;
  }
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;
  max-width: $container-max-width;
  margin: 0 auto;
}

.team-card {
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  text-align: center;
  transition: all $transition-normal;
  
  &:hover {
    box-shadow: $shadow-xl;
    transform: translateY(-4px);
    
    .team-avatar img {
      transform: scale(1.05);
    }
  }
  
  .team-avatar {
    width: 120px;
    height: 120px;
    margin: 0 auto $spacing-lg;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid $bg-color-light;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-normal;
    }
  }
  
  .team-info {
    h4 {
      font-size: $font-size-xl;
      margin-bottom: $spacing-xs;
    }
    
    .team-position {
      display: block;
      font-size: $font-size-sm;
      color: $primary-color;
      font-weight: 600;
      margin-bottom: $spacing-sm;
    }
    
    p {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      line-height: $line-height-loose;
    }
  }
  
  .team-social {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid $border-color-light;
    
    a {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $bg-color-light;
      border-radius: $border-radius-md;
      color: $text-color-secondary;
      transition: all $transition-fast;
      cursor: pointer;
      
      &:hover {
        background: $primary-color;
        color: white;
      }
    }
  }
}

// ==================== 办公环境 ====================
.office-section {
  padding: $spacing-4xl $spacing-lg;
  max-width: $container-max-width;
  margin: 0 auto;
}

.office-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: $spacing-md;
  
  .gallery-item {
    border-radius: $border-radius-lg;
    overflow: hidden;
    
    &.large {
      grid-row: span 2;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-slow;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

// ==================== 响应式 ====================
@media (max-width: $breakpoint-lg) {
  .intro-container {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
  }

  .intro-image {
    order: -1;
  }

  .mission-container {
    grid-template-columns: 1fr;

    .mission-card.featured {
      transform: none;

      &:hover {
        transform: translateY(-4px);
      }
    }
  }

  .testimonial-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonial-dialog {
    .detail-body {
      .member-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .timeline-line {
    left: 8px;
  }
  
  .timeline-item {
    padding-right: 0;
    padding-left: 40px;
    justify-content: flex-start;
    
    &::before {
      left: 8px;
      transform: translateX(-50%);
    }
    
    &.is-right {
      padding-left: 40px;
    }
    
    .timeline-card {
      text-align: left;
    }
  }
  
  .office-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    .gallery-item.large {
      grid-row: auto;
    }
  }

  .testimonial-grid {
    grid-template-columns: 1fr;
  }

  .rating-overview {
    flex-direction: column;
    align-items: stretch;
  }

  .testimonial-dialog {
    .detail-body {
      .member-list {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
