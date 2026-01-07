<script setup>
defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: String,
    categoryCounts: {
        type: Object,
        default: () => ({})
    }
})

const categories = [
    { name: 'Semua', icon: 'i-heroicons-squares-2x2' },
    { name: 'Makanan', icon: 'fluent:food-16-regular' },
    { name: 'Minuman', icon: 'hugeicons:soft-drink-01' },
    { name: 'Paket', icon: 'i-heroicons-gift' },
    { name: 'Snack', icon: 'streamline-pixel:food-drink-milk' }
]
</script>

<template>
    <div class="flex gap-4 py-4 scrollbar-hide">

        <button v-for="cat in categories" :key="cat.name" @click="$emit('update:modelValue', cat.name)" :class="[
            'flex flex-col min-w-[100px] p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer',
            modelValue === cat.name
                ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                : 'bg-white border-gray-100 hover:border-blue-200'
        ]">
            <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors',
                modelValue === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400'
            ]">
                <UIcon :name="cat.icon" class="w-6 h-6" />
            </div>

            <span :class="['font-bold text-sm', modelValue === cat.name ? 'text-blue-600' : 'text-gray-700']">
                {{ cat.name }}
            </span>
            <span class="text-[11px] text-gray-400">{{ categoryCounts[cat.name] || 0 }} Items</span>
        </button>
    </div>
</template>