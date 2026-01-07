<script setup>
import { useCartStore } from '~/stores/cart'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const cartStore = useCartStore()
const isNotesOpen = ref(false)
const resultOrder = ref(null)

const { items, subtotal, total, taxAmount } = storeToRefs(cartStore)
const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})



// buatkan pilihan table dari 1-20 meja
// buatkan pilihan dine in dan take away
const tableActive = ref('')
const dineInActive = ref('')

const tableOptions = ref([
    { label: 'Table 01', value: 'Table 01' },
    { label: 'Table 02', value: 'Table 02' },
    { label: 'Table 03', value: 'Table 03' },
    { label: 'Table 04', value: 'Table 04' },
    { label: 'Table 05', value: 'Table 05' },
    { label: 'Table 06', value: 'Table 06' },
    { label: 'Table 07', value: 'Table 07' },
    { label: 'Table 08', value: 'Table 08' },
    { label: 'Table 09', value: 'Table 09' },
    { label: 'Table 10', value: 'Table 10' },
    { label: 'Table 11', value: 'Table 11' },
    { label: 'Table 12', value: 'Table 12' },
    { label: 'Table 13', value: 'Table 13' },
    { label: 'Table 14', value: 'Table 14' },
    { label: 'Table 15', value: 'Table 15' },
    { label: 'Table 16', value: 'Table 16' },
    { label: 'Table 17', value: 'Table 17' },
    { label: 'Table 18', value: 'Table 18' },
    { label: 'Table 19', value: 'Table 19' },
    { label: 'Table 20', value: 'Table 20' },
])

const dineInOptions = ref([
    { label: 'Dine In', value: 'Dine In' },
    { label: 'Take Away', value: 'Take Away' },
])

const isOpenResultOrder = ref(false)

const handlePlaceOrder = async () => {

    const orderData = {
        table: tableActive.value,
        dineIn: dineInActive.value,
        items: cartStore.items,
        subtotal: cartStore.subtotal,
        total: cartStore.total,
        taxAmount: cartStore.taxAmount,
    }

    if (orderData.table && orderData.dineIn) {
        // const { data: order } = await useFetch('/api/order', {
        //     method: 'POST',
        //     body: orderData
        // })
        resultOrder.value = orderData
        isOpen.value = false

        await nextTick()

        isOpenResultOrder.value = true
    }
}


</script>

<template>
    <ClientOnly>
        <PosResultOrder v-model="isOpenResultOrder" :resultOrder="resultOrder" />
    </ClientOnly>
    <UDrawer :handle="false" v-model:open="isOpen" :dismissible="false" :modal="false" direction="right"
        :overlay="false">
        <template #content>
            <div class="flex flex-col h-screen bg-white shadow-2xl border-l border-gray-100 w-[400px]">

                <div class="p-6 pb-4 border-b border-gray-50">
                    <div class="flex items-center justify-between mb-2">
                        <h2 class="text-xl font-bold text-gray-800">Order Table:
                            {{ tableActive.includes('Table') ? tableActive.replace('Table ', '') : '' }}
                        </h2>
                        <UButton icon="i-heroicons-x-mark-20-solid" variant="ghost" color="gray"
                            class="rounded-full bg-gray-50 p-2 hover:bg-rose-400 hover:text-white"
                            @click="isOpen = false" />
                    </div>
                    <div class="flex gap-3 mt-5">
                        <USelect :highlight="false" placeholder="Select Table" v-model="tableActive"
                            :items="tableOptions" trailing-icon="i-heroicons-chevron-down-20-solid"
                            class="flex-1 bg-gray-50 rounded-xl px-3 py-2 flex items-center justify-between border border-gray-100"
                            option-classes="text-sm font-semibold text-gray-700" />

                        <USelect :highlight="false" placeholder="Order Type" v-model="dineInActive"
                            :items="dineInOptions" trailing-icon="i-heroicons-chevron-down-20-solid"
                            class="flex-1 bg-gray-50 rounded-xl px-3 py-2 flex items-center justify-between border border-gray-100"
                            option-classes="text-sm font-semibold text-gray-700" />
                    </div>
                </div>

                <div v-if="items.length > 0" class="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    <div v-for="(item, index) in items" :key="index" class="flex gap-4 group">
                        <div
                            class="w-20 h-20 bg-gray-50 rounded-2xl flex-shrink-0 p-2 flex items-center justify-center">
                            <img :src="item.image" class="w-full h-full object-contain" />
                        </div>

                        <div class="flex-1">
                            <div class="flex justify-between items-start gap-2">
                                <h4 class="font-bold text-gray-800 text-sm leading-tight">{{ item.name }}</h4>
                                <span class="font-bold text-gray-800 text-sm">Rp {{ (item.price *
                                    item.qty).toLocaleString('id-ID')
                                    }}</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-0.5">Rp {{ item.price.toLocaleString('id-ID') }}</p>
                            <div class="flex items-center justify-between mt-3">
                                <UButton icon="i-heroicons-pencil-20-solid" size="xs" color="blue" variant="soft"
                                    class="rounded-full p-1.5" />

                                <div
                                    class="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                                    <button @click="cartStore.updateQty(index, item.qty - 1)"
                                        class="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-600 font-bold">
                                        -
                                    </button>
                                    <span class="text-xs font-bold w-4 text-center text-gray-700">{{ item.qty }}</span>
                                    <button @click="cartStore.updateQty(index, item.qty + 1)"
                                        class="w-6 h-6 flex items-center justify-center text-gray-800 hover:text-blue-600 font-bold text-lg">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="items.length === 0" class="h-full flex flex-col justify-center items-center">
                    <div class="w-full px-4">
                        <USeparator label="No Item Selected" :ui="{
                            label: 'text-gray-400 font-medium text-sm tracking-wide',
                            border: 'border-gray-100'
                        }" />
                    </div>

                    <p class="text-xs text-gray-300 mt-3 italic">
                        Silahkan pilih menu untuk memulai pesanan
                    </p>
                </div>

                <div class="p-6 bg-white space-y-3 relative">
                    <div
                        class="absolute -top-3 left-0 right-0 h-4 bg-[url('/zigzag-pattern.svg')] bg-repeat-x opacity-10">
                    </div>

                    <div class="pt-2 space-y-2 border-t border-dashed border-gray-200">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400 font-medium">Subtotal</span>
                            <span class="text-gray-700 font-bold">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400 font-medium">Tax (10%)</span>
                            <span class="text-gray-700 font-bold">Rp {{ taxAmount.toLocaleString('id-ID') }}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end py-4">
                        <span class="text-xl font-black text-gray-900 tracking-tighter uppercase">Total</span>
                        <div class="flex items-baseline gap-1">
                            <span class="text-sm font-bold text-gray-400">Rp</span>
                            <span class="text-3xl font-black text-gray-900">{{ total.toLocaleString('id-ID') > 0 ?
                                total.toLocaleString('id-ID') : '0' }}</span>
                        </div>
                    </div>

                    <div class="flex gap-3 mb-4">
                        <UButton label="Notes" variant="outline"
                            class="flex-1 rounded-xl border-blue-200 text-lg justify-center py-2"
                            @click="isNotesOpen = true" />

                    </div>

                    <UButton block size="xl"
                        class="rounded-2xl h-16 hover:bg-blue-700 font-black text-lg shadow-lg shadow-blue-100"
                        :class="items.length === 0 || total === 0 || dineInActive === '' || tableActive === '' ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer '"
                        @click="handlePlaceOrder"
                        :disabled="items.length === 0 || total === 0 || dineInActive === '' || tableActive === ''"
                        :color="items.length === 0 || total === 0 || dineInActive === '' || tableActive === '' ? 'error' : 'info'">
                        Place Order
                    </UButton>
                </div>
            </div>
        </template>
    </UDrawer>
    <PosNotesCartProduct v-model="isNotesOpen" />
</template>
