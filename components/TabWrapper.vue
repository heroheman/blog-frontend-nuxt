<template>
  <div class="tab-wrapper">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-6" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selectedTab = tab"
          :class="[
            'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none',
            selectedTab === tab
              ? 'border-fuchsia-500 text-fuchsia-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          {{ tab }}
        </button>
      </nav>
    </div>
    <div class="pt-6">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'

const tabs = ref([])
const selectedTab = ref(null)

const registerTab = (title) => {
  if (!tabs.value.includes(title)) {
    tabs.value.push(title)
  }
}

provide('registerTab', registerTab)
provide('selectedTab', selectedTab)

watch(tabs, (newTabs) => {
  if (newTabs.length > 0 && !selectedTab.value) {
    selectedTab.value = newTabs[0]
  }
}, { deep: true })
</script>
