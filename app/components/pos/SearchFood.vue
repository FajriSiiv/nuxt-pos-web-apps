<template>
    <div class="w-full mx-auto mb-4">
        <UInput :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"
            placeholder="Search something sweet on your mind..." size="lg" :ui="{
                wrapper: 'relative',
                base: 'h-10 px-6 rounded-full bg-white border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500/10',
                placeholder: 'text-gray-400 font-normal',
                rounded: 'rounded-full',
                padding: { lg: 'px-6' }
            }" class="w-1/2">
            <template #trailing>
                <div class="mr-1">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-magnifying-glass"
                        class="rounded-full bg-gray-50 hover:bg-blue-600 hover:text-white transition-colors"
                        size="sm" />
                </div>
            </template>
        </UInput>
    </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>