<script setup>
import { useBaseStore } from '~/stores/base';

const currentTime = ref(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
const currentDate = ref(new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))

const baseStore = useBaseStore()

const isAccountOpen = ref(false)

const handleOpenAccountSidebar = () => {
    isAccountOpen.value = true
}

</script>

<template>
    <AccountSidebar v-model="isAccountOpen" />

    <nav class="w-full backdrop-blur-md px-6 py-3 flex items-center justify-between border-b border-gray-100">

        <div class="flex items-center gap-4">
            <UButton icon="i-heroicons-bars-2" variant="outline" color="neutral" class="rounded-xl bg-white p-2.5"
                @click="handleOpenAccountSidebar" />

            <div class="flex items-center bg-gray-50/50 rounded-full px-1 py-1 border border-gray-100/50">
                <div class="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm">
                    <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-blue-500" />
                    <span class="text-sm font-bold text-gray-700">{{ currentDate }}</span>
                </div>

                <span class="px-2 text-gray-300 font-light">—</span>

                <div class="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm">
                    <UIcon name="i-heroicons-clock" class="w-4 h-4 text-blue-500" />
                    <span class="text-sm font-bold text-gray-700">
                        {{ currentTime.split(' ')[0] }}
                        <span class="text-[10px] text-gray-400 font-medium ml-0.5 uppercase">
                            {{ currentTime.split(' ')[1] }}
                        </span>
                    </span>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-100 shadow-sm group  transition-colors"
                :class="baseStore.isOpenOrder ? 'border-emerald-200' : 'border-rose-200'">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        :class="baseStore.isOpenOrder ? 'bg-emerald-400' : 'bg-rose-400'"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2"
                        :class="baseStore.isOpenOrder ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                </span>
                <span class="text-sm font-bold transition-colors"
                    :class="baseStore.isOpenOrder ? 'text-emerald-600' : 'text-rose-600'">
                    {{ baseStore.isOpenOrder ? 'Open Order' : 'Close Order' }}
                </span>
            </div>

            <UButton @click="baseStore.toggleOpenOrder" icon="i-heroicons-power" variant="ghost" color="emerald"
                class="rounded-full bg-emerald-50/50 p-3 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm cursor-pointer" />
        </div>

    </nav>
</template>