<script setup>
import { Time } from '@internationalized/date'

const props = defineProps({
    table: {
        type: Object,
        required: true
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    currentTable: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['update:modelValue', 'save'])
const validationInput = ref(false)
const now = new Date()
let hours = now.getHours()
let minutes = now.getMinutes()

const defaultValueTime = shallowRef(new Time(hours, minutes, 0))

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const state = reactive({
    table: props.table?.id || '',
    user: '',
    guests: 1,
    time: defaultValueTime,
    status: ''
})

// Helper untuk parsing waktu "HH:mm AM/PM" ke Time object
const parseTime = (timeString) => {
    if (!timeString || timeString === '--:--') return new Time(hours, minutes, 0)

    try {
        const [time, period] = timeString.split(' ')
        let [h, m] = time.split(':').map(Number)

        if (period === 'PM' && h !== 12) h += 12
        if (period === 'AM' && h === 12) h = 0

        return new Time(h, m, 0)
    } catch (e) {
        return new Time(hours, minutes, 0)
    }
}

// Gunakan watch agar state selalu sinkron dengan meja yang dipilih
watch(() => props.currentTable, (newTable) => {
    if (newTable) {
        state.table = newTable.id || ''
        state.user = newTable.user || ''
        state.guests = newTable.guests || 1
        // Parse string time ke object Time
        state.time = parseTime(newTable.time)
        state.status = newTable.status || ''
    }
}, { immediate: true })



const statusTable = [
    { label: 'Available', value: 'available' },
    { label: 'Reserved', value: 'reserved' },
    { label: 'Served', value: 'served' },
]



const handleSaveTableReserved = (state) => {
    if (!state.user || !state.guests || !state.time || !state.status || state.status === 'available') {
        return validationInput.value = true
    }

    const t = state.time

    // Logika konversi ke AM/PM
    const period = t.hour >= 12 ? 'PM' : 'AM'
    const hour12 = t.hour % 12 || 12 // Ubah 0 atau 13-23 menjadi 1-12
    const minuteStr = t.minute.toString().padStart(2, '0') // Pastikan 2 digit (misal: 05)

    const formattedTime = `${hour12}:${minuteStr} ${period}`


    isOpen.value = false
    emit('save', { ...state, time: formattedTime })
    state.user = ''
    state.guests = 1
    state.time = defaultValueTime
    state.status = ''
    validationInput.value = false
}


const handleCleanTable = (state) => {
    if (state.status === 'available') return

    isOpen.value = false
    state.user = ''
    state.guests = 1
    state.time = defaultValueTime
    state.status = 'available'
    validationInput.value = false
    emit('save', { ...state, time: '--:--' })
}

</script>

<template>
    <ClientOnly>
        <UModal :dismissible="false" title="Reserved Table" v-model:open="isOpen" :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full'

        }">
            <template #header>
                <div class="flex flex-row items-start justify-start gap-3">
                    <div class="w-14 h-14 rounded-md"
                        :class="state.status === 'available' ? 'bg-gray-500' : '', state.status === 'reserved' ? 'bg-rose-500' : '', state.status === 'served' ? 'bg-blue-500' : ''">
                    </div>
                    <div class="flex flex-col">
                        <h3 class="text-lg font-bold">{{ state.user }}</h3>
                        <p class="text-xs text-gray-400/80 ">{{ currentTable?.id }}</p>
                    </div>
                </div>
            </template>
            <template #body>
                <p :class="validationInput ? 'visible' : 'invisible'" class="text-rose-500 text-center">Please fill
                    all the fields | Status must be "Reserved"</p>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-1">
                        <label for="table">Which table?</label>
                        <p class="p-1.5 border border-gray-100 rounded-md">{{ state.table }}</p>
                        <UInput v-model="state.table" id="table" hidden />
                    </div>
                    <div class="flex flex-row gap-2 w-full">
                        <UFormField label="User" name="user" class="flex-1">
                            <UInput size="lg" v-model="state.user" class="w-full" required="required" />
                        </UFormField>
                        <UFormField label="Guests" name="guests" class="flex-1">
                            <UInput size="lg" v-model="state.guests" type="number" class="w-full" required="required" />
                        </UFormField>

                    </div>
                    <div class="flex flex-col gap-2">
                        <UFormField label="Time" name="time">
                            <UInputTime v-model="state.time" />
                        </UFormField>
                    </div>
                    <div class="flex flex-col gap-2">
                        <UFormField label="Status" name="status">
                            <USelect placeholder="Select Status" :items="statusTable" v-model="state.status"
                                required="required" />
                        </UFormField>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-row gap-2 justify-between w-full">
                    <div class="flex flex-row gap-2">
                        <UButton size="md" color="error" variant="soft" @click="isOpen = false">Cancel</UButton>
                        <UButton size="md" color="warning" variant="soft" @click="handleCleanTable(state)"
                            :disabled="state.status === 'available'">Clean Table
                        </UButton>
                    </div>

                    <UButton size="md" color="primary" class=" items-center justify-center"
                        @click="handleSaveTableReserved(state)">Save</UButton>
                </div>
            </template>
        </UModal>
    </ClientOnly>
</template>
