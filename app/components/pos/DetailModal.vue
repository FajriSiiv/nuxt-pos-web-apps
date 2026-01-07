<script setup>
import { useCartStore } from '~/stores/cart'

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})

const cartStore = useCartStore()
const emit = defineEmits(['update:modelValue'])

// Menggunakan computed untuk sinkronisasi v-model dengan Nuxt UI
const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


// // AGAR CONSOLE LOG JALAN SETIAP KALI KLIK:
// watch(() => props.product, (newProduct) => {
//     if (newProduct) {
//         console.log('Produk terbaru di-klik:', newProduct.name)
//         // Di sini Anda bisa mereset state lain, misal jumlah beli kembali ke 1
//     }
// }, { deep: true })

const quantity = ref(1)
const notes = ref('')

const addToCart = () => {
    cartStore.addToCart({
        ...props.product,
        qty: quantity.value,
        notes: notes.value
    })

    // Tutup modal setelah menambah
    isOpen.value = false


}

// reset notes/quantity
watch(() => isOpen.value, (newIsOpen) => {
    if (!newIsOpen) {
        notes.value = ''
        quantity.value = 1
    }
})

</script>

<template>
    <UModal v-model:open="isOpen">
        <template #header>
            <h3 class="text-lg font-bold text-gray-800">Detail Menu</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                class="absolute right-4 top-4 rounded-full bg-red-50 text-red-400 hover:bg-red-100"
                @click="isOpen = false" />
        </template>
        <template #body>
            <div class="p-5 relative">
                <div class="bg-[#F8F9FA] rounded-2xl p-3 flex items-center justify-center mb-4 aspect-[6/3]">
                    <NuxtImg v-if="product.image" :src="product.image" class="w-full h-full object-contain" />
                    <UIcon v-else name="i-heroicons-photo" class="w-20 h-20 text-gray-200" />
                </div>

                <div class="space-y-2 mb-4">
                    <span
                        class="px-3 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
                        {{ product.category }}
                    </span>
                    <h2 class="text-2xl font-bold text-gray-800 leading-tight">
                        {{ product.name }}
                    </h2>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Premium butter croissant with a crispy pastry crust and soft inside will melt away on your
                        mouth!
                    </p>
                </div>

                <div class="text-3xl font-black text-blue-600 mb-5">
                    Rp {{ product.price.toLocaleString('id-ID') }}
                </div>

                <div class="mb-5">
                    <UTextarea v-model="notes" placeholder="Add notes to your order..." :rows="3" variant="none"
                        class="bg-gray-50 rounded-2xl p-1 border border-gray-100 focus-within:border-blue-200 w-full" />
                </div>

                <div class="space-y-4">

                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex flex-row justify-between w-full gap-2">
                <div
                    class="flex items-center justify-between bg-gray-50 rounded-full p-1 border border-gray-100 text-center">
                    <UButton icon="i-heroicons-minus-20-solid" variant="ghost" color="gray" :disabled="quantity <= 1"
                        @click="quantity--"
                        class="rounded-full h-10 w-10 bg-white shadow-sm border border-gray-200 text-gray-400 flex items-center justify-center"
                        :ui="{
                            padding: { sm: 'p-0', md: 'p-0', lg: 'p-0' },
                            icon: { size: { sm: 'h-6 w-6' } }
                        }" />
                    <p class="font-black  text-lg text-gray-800 min-w-[100px]">{{
                        quantity || 1 }}</p>
                    <UButton icon="i-heroicons-plus-20-solid" variant="ghost" color="gray" :disabled="quantity >= 10"
                        @click="quantity++"
                        class="rounded-full h-10 w-10 bg-white shadow-sm border border-gray-200 text-gray-800 flex items-center justify-center"
                        :ui="{
                            padding: { sm: 'p-0', md: 'p-0', lg: 'p-0' },
                            icon: { size: { sm: 'h-6 w-6' } }
                        }" />
                </div>
                <UButton size="xl" type="button" variant="outline" class="rounded-2xl" @click="addToCart"
                    icon="material-symbols-light:shopping-cart-outline">
                    <!-- jangan sampai NaN, jika belum ada quantity, maka quantity = 1 -->
                    Rp {{ (product.price * (quantity || 1)).toLocaleString('id-ID') }}
                </UButton>
            </div>

        </template>
    </UModal>
</template>