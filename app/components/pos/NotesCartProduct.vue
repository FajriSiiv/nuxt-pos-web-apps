<script setup>
import { useCartStore } from '~/stores/cart'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


const cartStore = useCartStore()
const filterItemsNoNote = computed(() => cartStore.items.filter(item => item.notes))

</script>

<template>
    <UModal v-model:open="isOpen" title="Notes Products">

        <template #body>
            <div class="flex flex-col gap-2">
                <div v-for="(item, index) in filterItemsNoNote" :key="index" class="flex flex-row gap-2">
                    <div class="w-40 h-40 bg-gray-50 rounded-2xl flex-shrink-0 p-2 flex items-center justify-center">
                        <img :src="item.image" class="w-full h-full object-contain" />
                    </div>
                    <div class="">
                        <h4 class=" font-semibold">{{ item.name }}</h4>
                        <p class="text-sm mt-0.5">Note : {{ item.notes }}</p>
                    </div>
                </div>
            </div>
        </template>

        <template #footer="{ close }">
            <UButton color="error" variant="outline" class="w-full text-center text-lg flex justify-center items-center"
                @click="close()">Close</UButton>
        </template>
    </UModal>
</template>