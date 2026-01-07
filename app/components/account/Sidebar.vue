<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const route = useRoute()

const emit = defineEmits(['update:modelValue'])

const isAccountOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const menuItems = ref([
    { label: 'Point of Sales', icon: 'i-heroicons-building-storefront', link: '/' },
    { label: 'Activity', icon: 'i-heroicons-chart-bar', link: '/activity/billing-queue' },
    { label: 'Report', icon: 'i-heroicons-document-text' },
    { label: 'Inventory', icon: 'i-heroicons-cube' },
    { label: 'Teams', icon: 'i-heroicons-users' },
    { label: 'Settings', icon: 'i-heroicons-cog-6-tooth' },
])

const handleActiveMenu = () => {
    menuItems.value = menuItems.value.map((item) => {
        if (item.link === route.path) {
            item.active = true
        } else {
            item.active = false
        }
        return item
    })
}

watch(() => route.path, (newPath) => {
    menuItems.value = menuItems.value.map((item) => ({
        ...item,
        active: item.link === newPath
    }))
}, { immediate: true })

</script>

<template>
    <UDrawer :handle="false" v-model:open="isAccountOpen" direction="left">
        <!-- <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up"
            @click="isOpen = true" /> -->

        <template #content>
            <aside class="w-[280px] h-screen bg-gray-50 flex flex-col border-r border-gray-100">

                <div class="flex items-center justify-between p-2 mb-8 bg-white">
                    <div class="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 pr-4 flex-1 border border-gray-100">
                        <UAvatar alt="Gary Patel" size="md" class="rounded-xl shadow-sm" />
                        <div class="flex flex-col">
                            <div class="flex items-center gap-1">
                                <span class="text-sm font-bold text-gray-800">Gary Patel</span>
                                <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 text-gray-400" />
                            </div>
                            <span class="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Cashier</span>
                        </div>
                    </div>

                    <UButton icon="i-heroicons-x-mark" variant="soft"
                        class="ml-2 rounded-full p-2 h-12 w-12 flex justify-center items-center hover:bg-red-200 text-red-600 bg-red-50 text-2xl"
                        @click="isAccountOpen = false" />
                </div>

                <nav class="flex-1 space-y-2">
                    <div v-for="item in menuItems" :key="item.label" @click="handleActiveMenu()">
                        <NuxtLink :to="item.link"
                            class="w-full h-full group flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-all duration-200"
                            :class="[
                                item.active
                                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50'
                                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                            ]">
                            <div class="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                                :class="[item.active ? 'bg-blue-600 text-white' : 'bg-gray-200/70 group-hover:bg-gray-200']">
                                <UIcon :name="item.icon" class="w-5 h-5" />
                            </div>
                            <span class="text-sm tracking-tight"
                                :class="[item.active ? 'text-blue-600' : 'text-gray-400']">{{ item.label }}</span>
                        </NuxtLink>

                    </div>
                </nav>

                <div class="mt-auto">
                    <div
                        class="flex items-center justify-between p-2 bg-gray-50  border border-gray-100 group cursor-pointer hover:bg-red-50 hover:border-red-100 transition-all">
                        <span class="pl-4 text-sm font-bold text-gray-500 group-hover:text-red-500">Log Out</span>
                        <div
                            class="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                            <UIcon name="i-heroicons-arrow-right-start-on-rectangle" class="w-5 h-5 rotate-180" />
                        </div>
                    </div>
                </div>

            </aside>
        </template>
    </UDrawer>
</template>