<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="space-y-12 sm:space-y-16">
      <article
        v-for="(post, index) in articles"
        :key="index"
        class="group"
      >
        <article-view v-if="post.category !== 'Heavy Rotation'" :post="post" />
      </article>

      <pagination
        class="mt-16 sm:mt-20"
        :articles-count="articlesCount"
        :per-page="perPage"
        :current-page="currentPage"
      />
    </div>
  </main>
</template>

<script setup>
import qs from 'qs'

const route = useRoute()
const { public: { strapiUrl } } = useRuntimeConfig()

const perPage = 10
const currentPage = computed(() => parseInt(route.params.page) || 1)

// Calculate pagination
const start = computed(() => (currentPage.value - 1) * perPage)

const INDEX_POPULATE = {
  author: true,
  bookseries: true,
  genre_books: true,
  cover: true,
  category: true,
  localizations: { fields: ['slug', 'locale'] },
  additional: {
    on: {
      'external-api.book-container': {
        populate: { bookmeta: { populate: ['cover'] } }
      },
      'content.rating': { populate: '*' },
    }
  },
}

// Fetch articles
const queryUrl = computed(() =>
  `/api/articles?${qs.stringify({
    populate: INDEX_POPULATE,
    sort: 'display_published_date:DESC',
    'pagination[start]': start.value,
    'pagination[limit]': perPage,
  }, { encodeValuesOnly: true })}`
)

const { data: response } = await useFetch(queryUrl, {
  baseURL: strapiUrl,
})

const articles = computed(() => response.value?.data || [])
const articlesCount = computed(() => response.value?.meta?.pagination?.total || 0)
</script>
