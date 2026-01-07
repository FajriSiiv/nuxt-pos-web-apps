<script setup>
const floors = ['1st Floor', '2nd Floor', '3rd Floor']
const activeFloor = ref('1st Floor')

// const tableSections = [
//     {
//         title: '2 Persons Table',
//         tables: [
//             { id: 'T-01', user: 'Sharon', guests: 2, time: '09:00 AM', status: 'served' },
//             { id: 'T-02', user: '', guests: 0, time: '--:--', status: 'available' },
//             { id: 'T-03', user: 'Billie', guests: 2, time: '09:00 AM', status: 'served' },
//             { id: 'T-04', user: 'Mike', guests: 1, time: '09:00 AM', status: 'served' },
//             { id: 'T-05', user: '', guests: 0, time: '--:--', status: 'available' },
//             { id: 'T-06', user: '', guests: 0, time: '--:--', status: 'available' },
//         ]
//     },
//     {
//         title: '4 Persons',
//         tables: [
//             { id: 'T-07', user: '', guests: 0, time: '--:--', status: 'available' },
//             { id: 'T-08', user: 'Hyacinth', guests: 3, time: '01:00 PM', status: 'reserved' },
//             { id: 'T-09', user: '', guests: 0, time: '--:--', status: 'available' },
//             { id: 'T-10', user: 'Justin', guests: 4, time: '09:30 AM', status: 'served' },
//         ]
//     }
// ]

// Helper untuk warna status

const { data: tables } = await useFetch('/api/tables')
const tablesData = ref(tables.value)

const getStatusStyles = (status) => {
    if (status === 'served') return 'bg-blue-50 border-blue-100 text-blue-600'
    if (status === 'reserved') return 'bg-red-50 border-red-100 text-red-600'
    return 'bg-gray-50 border-gray-100 text-gray-400'
}

const getBadgeStyles = (status) => {
    if (status === 'served') return 'bg-blue-600 text-white'
    if (status === 'reserved') return 'bg-red-600 text-white'
    return 'bg-gray-200 text-gray-500'
}

// const filteredTablesByFloor = ref([])
const filteredTablesByFloor = computed(() => {
    // Jika data tables belum ada (masih loading), kembalikan array kosong
    if (!tables.value) return []

    // Cari objek lantai yang sesuai, lalu ambil bagian "sections"-nya
    const floorData = tables.value.find((f) => f.floor === activeFloor.value)

    return floorData ? floorData.sections : []
})

const handleFloorActive = (floor) => {
    activeFloor.value = floor
}

const tableModalOpen = ref(false)
const sendCurrentTable = ref(null)

const handleTableModal = (table) => {
    tableModalOpen.value = true
    sendCurrentTable.value = table
}

const handleUpdateTable = (updatedData) => {


    tables.value.forEach(floor => {
        floor.sections.forEach(section => {
            const index = section.tables.findIndex(t => t.id === updatedData.table)

            if (index !== -1) {
                // 2. Timpa data meja yang lama dengan data baru dari Child
                section.tables[index] = {
                    ...section.tables[index], // pertahankan id jika ada data lain
                    user: updatedData.user,
                    guests: updatedData.guests,
                    time: updatedData.time,
                    status: updatedData.status // 'reserved'
                }
            }
        })
    })

}

</script>

<template>
    <ActivityModalReservedTable @save="handleUpdateTable" v-model="tableModalOpen" :table="tablesData.value"
        :current-table="sendCurrentTable" />
    <div class="flex flex-col h-full">
        <div class="flex items-center justify-between mb-4 border border-gray-100 p-2 rounded-md bg-gray-50">
            <h1 class="text-2xl text-gray-900">Add Table</h1>
            <!-- <UButton icon="i-heroicons-plus" color="primary" variant="soft" class="rounded-full px-4"
                @click="handleTableModal" /> -->
        </div>
        <div class="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded-md">
            <div class="flex gap-3 bg-gray-100/50 p-1.5 rounded-full">
                <UButton v-for="table in tables" :key="table.floor" :label="table.floor"
                    :variant="activeFloor === table.floor ? 'outline' : 'soft'"
                    :color="activeFloor === table.floor ? 'secondary' : 'info'"
                    class="rounded-full px-8 py-2 text-sm font-semibold"
                    :class="{ ' text-blue-600': activeFloor === table.floor }"
                    @click="handleFloorActive(table.floor)" />
            </div>
            <div class="flex gap-4 text-gray-400">
                <UIcon name="i-heroicons-pencil-square" class="w-6 h-6 cursor-pointer" />
                <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6 cursor-pointer" />
                <UIcon name="i-heroicons-funnel" class="w-6 h-6 cursor-pointer" />
            </div>
        </div>

        <div class="flex-grow space-y-10 overflow-y-auto pr-2">

            <div v-for="section in filteredTablesByFloor" :key="section.title">
                <h3 class="text-sm font-medium text-gray-400 my-3">{{ section.title }}</h3>
                <div class="grid grid-cols-5 gap-3">
                    <div @click="handleTableModal(table)" v-for="table in section.tables" :key="table.id"
                        class="border-2 rounded-md p-3 flex flex-col items-center justify-between min-h-[160px] transition-all hover:scale-105 col-span-1"
                        :class="getStatusStyles(table.status)">
                        <div class="px-5 py-1.5 rounded-full text-xs font-bold mb-3"
                            :class="getBadgeStyles(table.status)">
                            {{ table.id }}
                        </div>

                        <div class="text-center">
                            <p class="text-sm font-bold truncate max-w-[100px]"
                                :class="table.status !== 'available' ? '' : 'invisible'">
                                {{ table.user || 'Empty' }}
                            </p>
                            <p class="text-[11px] font-medium opacity-80 mt-0.5">
                                {{ table.status === 'available' ? '0 Guest' : `${table.guests} Guests` }}
                            </p>
                        </div>

                        <p class="text-[11px] font-bold mt-4 tracking-wider">{{ table.time }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
            <div class="flex items-center gap-2">Table Status:</div>
            <div class="flex gap-6">
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-gray-300"></span> Available
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-blue-600"></span> Served
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-red-600"></span> Reserved
                </div>
            </div>
        </div>
    </div>
</template>