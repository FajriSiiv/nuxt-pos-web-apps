<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    resultOrder: {
        type: Object,
        default: () => { }
    }
})



const emit = defineEmits(['update:modelValue'])

const isOpenResultOrder = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})


</script>
<template>
    <ClientOnly>
        <UModal v-model:open="isOpenResultOrder" title="Result Order" :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full cursor-pointer',

        }" class="">
            <template #header>
                <div class="flex justify-between items-center w-full">
                    <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <UIcon name="solar:bill-list-outline" /> Result Order {{
                            props.resultOrder.table.includes('Table') ? props.resultOrder.table.replace('Table ', '') : ''
                        }}
                    </h2>
                    <UButton color="error" variant="outline" icon="i-heroicons-x-mark"
                        class="rounded-full w-10 h-10 flex items-center justify-center p-0"
                        @click="isOpenResultOrder = false" />
                </div>
            </template>
            <template #body>
                <div class="bg-white relative">
                    <div class="flex flex-col gap-4">
                        <div class="">
                            <div class="space-y-6">
                                <div v-for="order in props.resultOrder.items" :key="order.id"
                                    class="flex flex-col gap-2 border-b border-gray-50 pb-4 last:border-0">
                                    <div class="flex justify-between items-start gap-2">
                                        <div
                                            class="w-20 h-20 bg-gray-50 rounded-2xl flex-shrink-0 p-2 flex items-center justify-center">
                                            <img :src="order.image" class="w-full h-full object-contain" />
                                        </div>
                                        <div class="flex flex-row justify-between w-full pt-1">
                                            <div class="flex items-center gap-2">
                                                <span class="font-medium text-gray-900 text-sm ">{{
                                                    order.name }}</span>
                                                <span class="font-medium text-gray-500 text-sm">x{{ order.qty }}</span>
                                            </div>
                                            <span class="font-medium text-gray-500 text-sm">Rp{{
                                                order.price.toLocaleString('id-ID') }}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <USeparator />
                        <div class="p-6 bg-white space-y-3 relative">
                            <div class="pt-2 space-y-2 ">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-400 font-medium">Subtotal</span>
                                    <span class="text-gray-700 font-bold">Rp {{
                                        props.resultOrder.subtotal.toLocaleString('id-ID')
                                        }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-400 font-medium">Tax (10%)</span>
                                    <span class="text-gray-700 font-bold">Rp {{
                                        props.resultOrder.taxAmount.toLocaleString('id-ID')
                                        }}</span>
                                </div>
                            </div>

                            <div class="flex justify-between items-end py-4">
                                <span class="text-xl font-black text-gray-900 tracking-tighter uppercase">Total</span>
                                <div class="flex items-baseline gap-1">
                                    <span class="text-sm font-bold text-gray-400">Rp</span>
                                    <p class="text-3xl font-black text-gray-900">{{
                                        props.resultOrder.total.toLocaleString('id-ID') > 0
                                            ?
                                            props.resultOrder.total.toLocaleString('id-ID') : '0' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2 w-full">
                    <UButton color="error" variant="outline" @click="isOpenResultOrder = false"
                        class="flex items-center justify-center px-5 py-2">Close</UButton>
                </div>
            </template>
        </UModal>
    </ClientOnly>
</template>