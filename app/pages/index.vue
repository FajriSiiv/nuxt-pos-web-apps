<script setup>
import { useCartStore } from '~/stores/cart'
const { data: product } = await useFetch('/api/products')

const cartStore = useCartStore()
const searchQuery = ref('')
const selectedCategory = ref('Semua')

const isDetailOpen = ref(false)
const selectedProduct = ref(null)

// Fungsi yang dipicu saat Card Produk di-klik
const handleOpenModal = (item) => {
  selectedProduct.value = item
  isDetailOpen.value = true
}


const filteredProduct = computed(() => {
  if (!product.value) return []

  return product.value.filter((product) => {
    // 1. Filter berdasarkan teks (Nama atau SKU)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.value.toLowerCase())

    // 2. Filter berdasarkan kategori
    const matchesCategory = selectedCategory.value === 'Semua' || product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})


const categoryStats = computed(() => {
  const stats = {
    Semua: product.value?.length || 0,
    Makanan: 0,
    Minuman: 0,
    Paket: 0,
    Snack: 0
  }

  product.value?.forEach(item => {
    if (stats[item.category] !== undefined) {
      stats[item.category]++
    }
  })

  return stats
})


const openCart = ref(false)
const toggleCart = () => {
  openCart.value = !openCart.value
}

</script>

<template>
  <PosCategoryList v-model="selectedCategory" :category-counts="categoryStats" />
  <PosSearchFood v-model="searchQuery" />
  <PosCartSidebar v-model="openCart" />
  <div class="grid grid-cols-6 gap-2">
    <div class="transition-[grid-template-columns] duration-500 ease-in-out grid gap-2" :style="{
      gridTemplateColumns: openCart
        ? 'repeat(5, minmax(0, 1fr))'
        : 'repeat(6, minmax(0, 1fr))'
    }" :class="openCart ? 'col-span-5' : 'col-span-6'">
      <div v-for="item in filteredProduct" :key="item.id"
        class="col-span-1 bg-white rounded-2xl p-2 relative group cursor-pointer border border-transparent hover:border-blue-100 transition-all shadow-sm"
        @click="handleOpenModal(item)">
        <div class="aspect-square bg-[#F8F9FA] rounded-xl flex items-center justify-center overflow-hidden mb-3">
          <NuxtImg v-if="item.image" :src="item.image" loading="lazy" format="webp" width="200" height="200"
            fit="contain"
            class="w-full h-full p-3 group-hover:scale-105 transition-transform duration-500 object-contain"
            alt="product" />
          <div v-else class="w-full h-full bg-gray-100 rounded-md">
          </div>
        </div>

        <h3 class="text-[15px] font-bold text-gray-800 leading-tight mb-2 line-clamp-1">
          {{ item.name }}
        </h3>

        <div class="flex items-center justify-between mt-auto">
          <span
            :class="item.category === 'Makanan' ? 'bg-green-50 text-green-400 px-2 py-0.5 rounded-full border border-green-100' : item.category === 'Minuman' ? 'bg-blue-50 text-blue-400 px-2 py-0.5 rounded-full border border-blue-100' : 'bg-orange-50 text-orange-400 px-2 py-0.5 rounded-full border border-orange-100'"
            class="text-[10px] font-medium">
            {{ item.category }}
          </span>

          <span class="text-[12px] font-black text-gray-900">
            Rp{{ item.price.toLocaleString('id-ID') }}
          </span>
        </div>
      </div>
    </div>


    <PosDetailModal v-model="isDetailOpen" :product="selectedProduct || {}" />
    <div class="fixed bottom-8 right-8 z-50">
      <UButton icon="material-symbols:shopping-cart-outline-sharp" size="xl"
        class="h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-blue-600 hover:bg-blue-700 text-white border-4 border-white cursor-pointer active:bg-blue-700"
        @click="toggleCart" />
    </div>
  </div>
</template>
