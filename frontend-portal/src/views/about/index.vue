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
            我们服务了500+企业客户，交付了{{ reviewStore.totalCount }}个合作项目，
            并沉淀下来自客户的真实评价，帮助他们实现了数字化转型的目标。
          </p>
          <p>
            我们相信，技术的价值在于解决实际问题。因此，我们不断探索前沿技术，
            将其转化为切实可行的解决方案，为客户创造真正的商业价值。
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
              <span class="stat-value">{{ reviewStore.totalCount }}</span>
              <span class="stat-label">合作项目（均有客户反馈）</span>
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
    <section id="reviews" class="reviews-section">
      <div class="reviews-container">
        <div class="section-header">
          <span class="section-header__badge">
            <el-icon><ChatDotRound /></el-icon> 客户评价
          </span>
          <h2 class="section-header__title">听听客户怎么说</h2>
          <p class="section-header__desc">
            来自 {{ reviewStore.totalCount }} 个合作项目的真实反馈，按项目类型集中展示
          </p>
        </div>

        <!-- 暂无任何评价 -->
        <el-empty v-if="reviewStore.totalCount === 0" class="reviews-empty">
          <template #image>
            <el-icon class="empty-icon"><ChatLineSquare /></el-icon>
          </template>
          <template #description>
            <p class="empty-title">还没有客户评价</p>
            <p class="empty-desc">目前评价专区暂无内容。可从已完成项目里邀请客户提交评价，评价通过审核后将在这里展示。</p>
          </template>
          <el-button type="primary" round @click="router.push('/cases')">
            前往已完成项目
            <el-icon><Right /></el-icon>
          </el-button>
        </el-empty>

        <template v-else>
          <!-- 平均分 + 评分筛选入口 -->
          <div class="reviews-toolbar">
            <div class="rating-summary">
              <div class="summary-score">
                <span class="score-value">{{ reviewStore.averageRating.toFixed(1) }}</span>
                <el-rate :model-value="reviewStore.averageRating" disabled allow-half />
              </div>
              <div class="summary-meta">
                <span class="summary-count">
                  基于 {{ reviewStore.ratedReviews.length }} 条已评分评价
                </span>
                <span v-if="reviewStore.pendingReviews.length > 0" class="summary-pending">
                  另有 {{ reviewStore.pendingReviews.length }} 条评分待补充，暂不计入平均分
                </span>
              </div>
            </div>

            <div class="rating-filters" role="tablist" aria-label="按评分查看评价">
              <button
                class="filter-btn"
                :class="{ active: activeRating === 'all' }"
                @click="activeRating = 'all'"
              >
                全部 <span class="filter-count">{{ reviewStore.ratedReviews.length }}</span>
              </button>
              <button
                v-for="star in [5, 4, 3, 2, 1]"
                :key="star"
                class="filter-btn"
                :class="{ active: activeRating === star }"
                @click="activeRating = star"
              >
                {{ star }} 星 <span class="filter-count">{{ reviewStore.ratingCounts[star] }}</span>
              </button>
              <button
                class="filter-btn filter-btn--pending"
                :class="{ active: activeRating === 'pending' }"
                @click="activeRating = 'pending'"
              >
                待补充 <span class="filter-count">{{ reviewStore.pendingReviews.length }}</span>
              </button>
            </div>
          </div>

          <!-- 筛选无结果 -->
          <el-empty
            v-if="filteredReviews.length === 0"
            class="reviews-empty reviews-empty--small"
            :description="activeRating === 'pending' ? '当前没有评分待补充的评价' : `暂无 ${activeRating} 星评价`"
          />

          <template v-else>
            <!-- 待补充：单独归类 -->
            <div v-if="activeRating === 'pending'" class="review-group">
              <div class="group-header">
                <h3 class="group-title">
                  <el-icon><WarningFilled /></el-icon>
                  待补充评分
                </h3>
                <span class="group-desc">以下评价原文已收集，但评分暂时缺失，已单独归档且不计入平均分</span>
              </div>
              <div class="reviews-grid">
                <div
                  v-for="review in filteredReviews"
                  :key="review.id"
                  class="review-card review-card--pending"
                  @click="goDetail(review.id)"
                >
                  <div class="card-top">
                    <span class="card-industry">{{ review.industry }}</span>
                    <span class="card-team">
                      <el-icon><User /></el-icon>{{ review.team }}
                    </span>
                  </div>
                  <div class="card-rating card-rating--pending">
                    <el-tag type="warning" effect="light" round>评分待补充</el-tag>
                  </div>
                  <p class="card-content">{{ review.content }}</p>
                  <div class="card-missing-reason">
                    <el-icon><InfoFilled /></el-icon>
                    <span>{{ review.missingRatingReason }}</span>
                  </div>
                  <div class="card-bottom">
                    <span class="card-author">{{ review.author }} · {{ review.company }}</span>
                    <span class="card-link">
                      查看项目背景<el-icon><Right /></el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 按项目类型分组 -->
            <div
              v-for="group in visibleGroups"
              :key="group.serviceType"
              class="review-group"
            >
              <div class="group-header">
                <h3 class="group-title">
                  <el-icon><CollectionTag /></el-icon>
                  {{ group.serviceType }}
                </h3>
                <span class="group-desc">{{ group.items.length }} 条评价</span>
              </div>
              <div class="reviews-grid">
                <div
                  v-for="review in group.items"
                  :key="review.id"
                  class="review-card"
                  @click="goDetail(review.id)"
                >
                  <div class="card-top">
                    <span class="card-industry">{{ review.industry }}</span>
                    <span class="card-team">
                      <el-icon><User /></el-icon>{{ review.team }}
                    </span>
                  </div>
                  <div class="card-rating">
                    <el-rate :model-value="review.rating ?? 0" disabled />
                  </div>
                  <h4 class="card-title">{{ review.title }}</h4>
                  <p class="card-content">{{ review.content }}</p>
                  <div class="card-bottom">
                    <span class="card-author">{{ review.author }} · {{ review.company }}</span>
                    <span class="card-link">
                      查看项目背景<el-icon><Right /></el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </section>

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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useReviewsStore } from '@/stores/reviews'
import type { RatingFilterValue, ReviewItem } from '@/types'

const router = useRouter()
const reviewStore = useReviewsStore()

const handleNotImplemented = () => {
  ElMessage.info('功能开发中，敬请期待')
}

// 按评分查看：'all' 全部已评分 | 5/4/3/2/1 | 'pending' 待补充
const activeRating = ref<RatingFilterValue>('all')

// 评分筛选命中的评价
const filteredReviews = computed<ReviewItem[]>(() => {
  if (activeRating.value === 'pending') return reviewStore.pendingReviews
  if (activeRating.value === 'all') return reviewStore.ratedReviews
  return reviewStore.ratedReviews.filter((review) => review.rating === activeRating.value)
})

// 当前筛选下按项目类型分组（待补充不参与项目类型分组）
const visibleGroups = computed(() => {
  if (activeRating.value === 'pending') return []
  const filteredIds = new Set(filteredReviews.value.map((review) => review.id))
  return reviewStore.groupedByServiceType
    .map((group) => ({
      ...group,
      items: group.items.filter((review) => filteredIds.has(review.id))
    }))
    .filter((group) => group.items.length > 0)
})

const goDetail = (id: number) => {
  router.push(`/about/reviews/${id}`)
}

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

// ==================== 客户评价 ====================
.reviews-section {
  padding: $spacing-4xl $spacing-lg;
  background: $bg-color-light;
}

.reviews-container {
  max-width: $container-max-width;
  margin: 0 auto;
}

.reviews-empty {
  padding: $spacing-3xl 0;

  .empty-icon {
    font-size: 64px;
    color: $text-color-placeholder;
  }

  .empty-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-color-primary;
    margin-bottom: $spacing-sm;
  }

  .empty-desc {
    max-width: 420px;
    margin: 0 auto $spacing-lg;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    line-height: $line-height-loose;
  }

  &--small {
    padding: $spacing-3xl 0;
  }
}

.reviews-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $spacing-lg;
  flex-wrap: wrap;
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg $spacing-xl;
  margin-bottom: $spacing-3xl;
  box-shadow: $shadow-sm;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: $spacing-lg;

  .summary-score {
    display: flex;
    align-items: center;
    gap: $spacing-md;

    .score-value {
      font-size: $font-size-4xl;
      font-weight: 800;
      background: $gradient-text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }
  }

  .summary-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .summary-count {
      font-size: $font-size-sm;
      color: $text-color-primary;
      font-weight: 600;
    }

    .summary-pending {
      font-size: $font-size-xs;
      color: $warning-color;
    }
  }
}

.rating-filters {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-color-secondary;
    background: $bg-color-light;
    border: none;
    border-radius: $border-radius-full;
    cursor: pointer;
    transition: all $transition-fast;

    .filter-count {
      padding: 1px 8px;
      background: rgba(0, 0, 0, 0.06);
      border-radius: $border-radius-full;
      font-size: $font-size-xs;
    }

    &:hover {
      color: $text-color-primary;
      background: $border-color;
    }

    &.active {
      color: white;
      background: $gradient-primary;

      .filter-count {
        background: rgba(255, 255, 255, 0.25);
      }
    }

    &--pending {
      &.active {
        background: $warning-color;
      }
    }
  }
}

.review-group {
  margin-bottom: $spacing-3xl;

  &:last-child {
    margin-bottom: 0;
  }
}

.group-header {
  display: flex;
  align-items: baseline;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;

  .group-title {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-xl;
    font-weight: 700;

    .el-icon {
      color: $primary-color;
    }
  }

  .group-desc {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
}

.review-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: $border-radius-lg;
  border: 1px solid $border-color-light;
  padding: $spacing-xl;
  cursor: pointer;
  transition: all $transition-normal;

  &:hover {
    border-color: transparent;
    box-shadow: $shadow-xl;
    transform: translateY(-4px);

    .card-link {
      color: $primary-color;

      .el-icon {
        transform: translateX(2px);
      }
    }
  }

  &--pending {
    border-style: dashed;
    border-color: rgba($warning-color, 0.4);
    background: rgba($warning-color, 0.03);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;

    .card-industry {
      padding: 2px 10px;
      background: rgba($primary-color, 0.1);
      color: $primary-color;
      font-size: $font-size-xs;
      font-weight: 600;
      border-radius: $border-radius-full;
    }

    .card-team {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: $font-size-xs;
      color: $text-color-secondary;

      .el-icon {
        font-size: 12px;
      }
    }
  }

  .card-rating {
    margin-bottom: $spacing-sm;

    &--pending {
      margin-bottom: $spacing-md;
    }
  }

  .card-title {
    font-size: $font-size-md;
    font-weight: 600;
    margin-bottom: $spacing-sm;
    line-height: 1.4;
  }

  .card-content {
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

  .card-missing-reason {
    display: flex;
    align-items: flex-start;
    gap: $spacing-xs;
    margin-bottom: $spacing-md;
    padding: $spacing-sm $spacing-md;
    background: rgba($warning-color, 0.08);
    border-radius: $border-radius-md;
    font-size: $font-size-xs;
    color: $warning-color;
    line-height: $line-height-normal;

    .el-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
    padding-top: $spacing-md;
    border-top: 1px solid $border-color-light;

    .card-author {
      font-size: $font-size-xs;
      color: $text-color-secondary;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-link {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
      font-size: $font-size-xs;
      font-weight: 600;
      color: $text-color-regular;
      transition: color $transition-fast;

      .el-icon {
        font-size: 12px;
        transition: transform $transition-fast;
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

  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .reviews-toolbar {
    flex-direction: column;
    align-items: flex-start;
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

  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .group-header {
    flex-direction: column;
    gap: 4px;
  }

  .rating-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-sm;
  }
}
</style>
