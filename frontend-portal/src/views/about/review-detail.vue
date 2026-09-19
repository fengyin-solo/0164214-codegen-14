<template>
  <div class="review-detail-page">
    <!-- 顶部返回 -->
    <section class="detail-hero">
      <div class="detail-container">
        <el-button class="back-btn" round @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回客户评价
        </el-button>
        <span class="hero-badge">客户评价 · 项目详情</span>
        <h1 v-if="review">{{ review.project.name }}</h1>
        <div v-if="review" class="hero-meta">
          <span class="meta-tag">{{ review.project.industry }}</span>
          <span class="meta-tag">{{ review.project.serviceType }}</span>
        </div>
      </div>
    </section>

    <template v-if="review">
      <!-- 评价摘要 -->
      <section class="summary-section">
        <div class="detail-container">
          <div class="summary-card">
            <div class="summary-left">
              <div class="reviewer">
                <div class="reviewer-avatar">{{ review.author.slice(0, 1) }}</div>
                <div class="reviewer-info">
                  <span class="reviewer-name">{{ review.author }}</span>
                  <span class="reviewer-company">{{ review.company }} · {{ review.date }}</span>
                </div>
              </div>
              <div v-if="review.rating !== null" class="reviewer-rating">
                <el-rate :model-value="review.rating" disabled />
                <span class="rating-text">{{ review.rating }}.0 分</span>
              </div>
              <div v-else class="rating-pending">
                <el-icon><WarningFilled /></el-icon>
                <span>评分待补充，不计入平均分</span>
              </div>
            </div>
            <div class="summary-right">
              <h2 class="review-title">“{{ review.title }}”</h2>
              <p class="review-content">{{ review.content }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目背景 -->
      <section class="background-section">
        <div class="detail-container">
          <div class="section-header">
            <span class="section-header__badge">
              <el-icon><FolderOpened /></el-icon> 项目背景
            </span>
            <h2 class="section-header__title">{{ review.project.name }}</h2>
          </div>

          <div class="project-info">
            <div class="info-item">
              <span class="info-label">所属行业</span>
              <span class="info-value">{{ review.project.industry }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">项目类型</span>
              <span class="info-value">{{ review.project.serviceType }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">客户单位</span>
              <span class="info-value">{{ review.project.client }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">对接团队</span>
              <span class="info-value">{{ review.team }}</span>
            </div>
            <div class="info-item info-item--full">
              <span class="info-label">项目周期</span>
              <span class="info-value">{{ review.project.duration }}</span>
            </div>
          </div>

          <div class="background-card">
            <h3>
              <el-icon><Document /></el-icon>
              背景与建设内容
            </h3>
            <p>{{ review.project.background }}</p>
          </div>

          <el-alert
            v-if="review.rating === null && review.missingRatingReason"
            class="pending-alert"
            type="warning"
            :closable="false"
            show-icon
            title="该项目评价的评分暂时缺失"
            :description="`缺失原因：${review.missingRatingReason}。该条评价已归入「待补充」，不计入专区平均分。`"
          />
        </div>
      </section>

      <!-- 团队成员 -->
      <section class="members-section">
        <div class="detail-container">
          <div class="section-header">
            <span class="section-header__badge">
              <el-icon><UserFilled /></el-icon> 项目团队
            </span>
            <h2 class="section-header__title">参与本项目的团队成员</h2>
            <p class="section-header__desc">由「{{ review.team }}」对接交付，共 {{ members.length }} 位成员参与</p>
          </div>

          <div class="members-grid">
            <div v-for="member in members" :key="member.id" class="member-card">
              <div class="member-avatar">
                <img :src="member.avatar" :alt="member.name" />
              </div>
              <h4>{{ member.name }}</h4>
              <span class="member-role">{{ member.role }}</span>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 评价不存在 -->
    <section v-else class="not-found-section">
      <div class="detail-container">
        <el-result icon="warning" title="未找到对应的客户评价" sub-title="该评价可能已被移除，请返回评价专区查看其他内容。">
          <template #extra>
            <el-button type="primary" round @click="router.push('/about#reviews')">返回客户评价专区</el-button>
          </template>
        </el-result>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReviewsStore } from '@/stores/reviews'

const route = useRoute()
const router = useRouter()
const reviewsStore = useReviewsStore()

const review = computed(() => {
  const id = Number(route.params.id)
  return Number.isInteger(id) ? reviewsStore.getReviewById(id) : undefined
})

const members = computed(() =>
  review.value ? reviewsStore.getMembersByIds(review.value.project.memberIds) : []
)

// 从评价专区点入时浏览器返回即可回到原位置（路由 scrollBehavior 会恢复滚动位置）
const goBack = () => {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.push('/about#reviews')
  }
}
</script>

<style lang="scss" scoped>
.review-detail-page {
  padding-top: $header-height;
}

// ==================== 顶部 ====================
.detail-hero {
  padding: $spacing-3xl $spacing-lg $spacing-xxl;
  background: $gradient-hero;
  text-align: center;

  .detail-container {
    max-width: $container-max-width;
    margin: 0 auto;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: $spacing-lg;
  }

  .hero-badge {
    display: inline-block;
    padding: $spacing-sm $spacing-md;
    background: rgba(255, 255, 255, 0.1);
    color: $primary-color-light;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $border-radius-full;
    margin-bottom: $spacing-md;
  }

  h1 {
    font-size: clamp(28px, 4vw, $font-size-4xl);
    color: white;
    margin-bottom: $spacing-md;
  }

  .hero-meta {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;

    .meta-tag {
      padding: $spacing-xs $spacing-md;
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.85);
      font-size: $font-size-sm;
      border-radius: $border-radius-full;
    }
  }
}

// ==================== 评价摘要 ====================
.summary-section {
  padding: 0 $spacing-lg;
  margin-top: -$spacing-xxl;
  position: relative;
  z-index: 10;
}

.summary-card {
  max-width: $container-max-width;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: $spacing-xxl;
  background: white;
  border-radius: $border-radius-xl;
  box-shadow: $shadow-xl;
  padding: $spacing-xxl;
}

.summary-left {
  border-right: 1px solid $border-color-light;
  padding-right: $spacing-xxl;
}

.reviewer {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;

  &-avatar {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-primary;
    color: white;
    font-size: $font-size-xxl;
    font-weight: 700;
    border-radius: $border-radius-round;
    flex-shrink: 0;
  }

  &-info {
    display: flex;
    flex-direction: column;
  }

  &-name {
    font-size: $font-size-lg;
    font-weight: 600;
  }

  &-company {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

.reviewer-rating {
  display: flex;
  align-items: center;
  gap: $spacing-sm;

  .rating-text {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $warning-color;
  }
}

.rating-pending {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-md;
  background: rgba($warning-color, 0.1);
  color: $warning-color;
  font-size: $font-size-sm;
  border-radius: $border-radius-md;
}

.review-title {
  font-size: $font-size-xxl;
  font-weight: 700;
  margin-bottom: $spacing-md;
  line-height: 1.4;
}

.review-content {
  font-size: $font-size-md;
  color: $text-color-regular;
  line-height: $line-height-loose;
}

// ==================== 区块通用 ====================
.detail-container {
  max-width: $container-max-width;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-3xl;

  &__badge {
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
  }

  &__title {
    font-size: clamp(24px, 3vw, $font-size-3xl);
    font-weight: 700;
  }

  &__desc {
    font-size: $font-size-md;
    color: $text-color-secondary;
    margin-top: $spacing-sm;
  }
}

// ==================== 项目背景 ====================
.background-section {
  padding: $spacing-4xl $spacing-lg;
}

.project-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-xl;

  .info-item {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-lg;
    background: $bg-color-light;
    border-radius: $border-radius-lg;

    &--full {
      grid-column: 1 / -1;
    }

    .info-label {
      flex-shrink: 0;
      font-size: $font-size-sm;
      color: $text-color-secondary;

      &::after {
        content: '：';
      }
    }

    .info-value {
      font-size: $font-size-md;
      font-weight: 600;
      color: $text-color-primary;
    }
  }
}

.background-card {
  background: white;
  border: 1px solid $border-color-light;
  border-radius: $border-radius-xl;
  padding: $spacing-xxl;

  h3 {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-xl;
    font-weight: 600;
    margin-bottom: $spacing-md;

    .el-icon {
      color: $primary-color;
    }
  }

  p {
    font-size: $font-size-md;
    color: $text-color-regular;
    line-height: $line-height-loose;
  }
}

.pending-alert {
  margin-top: $spacing-lg;
  border-radius: $border-radius-lg;
}

// ==================== 团队成员 ====================
.members-section {
  padding: $spacing-4xl $spacing-lg;
  background: $bg-color-light;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: $spacing-lg;
}

.member-card {
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-xl $spacing-lg;
  text-align: center;
  transition: all $transition-normal;

  &:hover {
    box-shadow: $shadow-xl;
    transform: translateY(-4px);

    .member-avatar img {
      transform: scale(1.05);
    }
  }

  .member-avatar {
    width: 96px;
    height: 96px;
    margin: 0 auto $spacing-md;
    border-radius: $border-radius-round;
    overflow: hidden;
    border: 3px solid $bg-color-light;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-normal;
    }
  }

  h4 {
    font-size: $font-size-lg;
    margin-bottom: $spacing-xs;
  }

  .member-role {
    font-size: $font-size-sm;
    color: $primary-color;
  }
}

// ==================== 未找到 ====================
.not-found-section {
  padding: $spacing-4xl $spacing-lg;
}

// ==================== 响应式 ====================
@media (max-width: $breakpoint-lg) {
  .summary-card {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    padding: $spacing-xl;
  }

  .summary-left {
    border-right: none;
    border-bottom: 1px solid $border-color-light;
    padding-right: 0;
    padding-bottom: $spacing-lg;
  }
}

@media (max-width: $breakpoint-md) {
  .project-info {
    grid-template-columns: 1fr;

    .info-item--full {
      grid-column: auto;
    }
  }

  .background-card {
    padding: $spacing-lg;
  }
}
</style>
