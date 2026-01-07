<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()


const router = useRouter()
const isNavigating = ref(false)

router.beforeEach(() => {
    isNavigating.value = true
})
router.afterEach(() => {
    isNavigating.value = false
})

const linkActivity = ref([
    {
        label: 'Billing Queue',
        icon: 'i-heroicons-magnifying-glass',
        link: '/activity/billing-queue',
    },
    {
        label: 'Order History',
        icon: 'i-heroicons-magnifying-glass',
        link: '/activity/order-history',
    },
    {
        label: 'Tables',
        icon: 'i-heroicons-magnifying-glass',
        link: '/activity/tables',
    },
])



</script>

<template>
    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-3">
            <div class="w-full py-4 flex flex-col gap-4 bg-gray-50/50 min-h-screen">

                <UInput icon="i-heroicons-magnifying-glass" size="xl" color="white" :trailing="false"
                    placeholder="Search..." variant="none" class="bg-white rounded-2xl shadow-sm border border-gray-100"
                    ui="{ rounded: 'rounded-full' }" />

                <div class="flex flex-col gap-2">

                    <UButton v-for="link in linkActivity" :key="link.label" :label="link.label" variant="solid"
                        color="white" size="xl" block
                        class="justify-start px-6 py-4 text-black bg-white  border-none rounded-2xl hover:bg-blue-700 hover:text-white w-full disabled:opacity-50"
                        :class="{ 'bg-blue-700 text-white': route.path === link.link }" :to="link.link"
                        :disabled="isNavigating" />
                </div>
            </div>
        </div>
        <div class="col-span-9 bg-white p-4 rounded-md">
            <div v-if="router.isNavigating" class="animate-pulse bg-gray-100 h-64 rounded-xl" />
            <NuxtPage v-else />
        </div>
    </div>
</template>
