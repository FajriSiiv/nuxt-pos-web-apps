<script setup>
const { data: billingQueue } = await useFetch('/api/billing-queue');


const mockTrackOrder = ref([
    {
        "id": "001",
        "date": "06/01/2026 - 08:00 AM",
        "customer": "George",
        "orderStatus": "Done",
        "total": 525000,
        "paymentStatus": "Paid",
        "tableNumber": "01",
        "items": ["1x Beef Crowich", "1x Grains Pan Bread"]
    },
    {
        "id": "002",
        "date": "06/01/2026 - 08:17 AM",
        "customer": "Charlie",
        "orderStatus": "Done",
        "total": 187500,
        "paymentStatus": "Paid",
        "tableNumber": "02",
        "items": ["2x Cereal Cream Donut"]
    },
    {
        "id": "003",
        "date": "06/01/2026 - 08:30 AM",
        "customer": "Hyacinth",
        "orderStatus": "Done",
        "total": 228000,
        "paymentStatus": "Paid",
        "tableNumber": "03",
        "items": ["1x Sliced Black Forest", "1x Hot Tea"]
    },
    {
        "id": "004",
        "date": "06/01/2026 - 08:45 AM",
        "customer": "Mike",
        "orderStatus": "Processing",
        "total": 375000,
        "paymentStatus": "Unpaid",
        "tableNumber": "04",
        "items": ["1x Beef Crowich", "1x Cheezy Sourdough"]
    },
    {
        "id": "005",
        "date": "06/01/2026 - 09:00 AM",
        "customer": "Elouise",
        "orderStatus": "Canceled",
        "total": 290000,
        "paymentStatus": "Unpaid",
        "tableNumber": "05",
        "items": ["3x Grains Pan Bread"]
    },
    {
        "id": "006",
        "date": "06/01/2026 - 09:15 AM",
        "customer": "Francois",
        "orderStatus": "Done",
        "total": 300000,
        "paymentStatus": "Paid",
        "tableNumber": "06",
        "items": ["1x Beef Crowich", "2x Coffee Late"]
    },
    {
        "id": "007",
        "date": "06/01/2026 - 09:30 AM",
        "customer": "Billie",
        "orderStatus": "Processing",
        "total": 472500,
        "paymentStatus": "Unpaid",
        "tableNumber": "07",
        "items": ["1x Cereal Cream Donut", "1x Sliced Black Forest"]
    },
    {
        "id": "008",
        "date": "06/01/2026 - 09:45 AM",
        "customer": "Richard",
        "orderStatus": "Done",
        "total": 125000,
        "paymentStatus": "Paid",
        "tableNumber": "08",
        "items": ["1x Cheezy Sourdough"]
    },
    {
        "id": "009",
        "date": "06/01/2026 - 10:00 AM",
        "customer": "Sharon",
        "orderStatus": "Done",
        "total": 540000,
        "paymentStatus": "Paid",
        "tableNumber": "09",
        "items": ["2x Beef Crowich", "2x Grains Pan Bread"]
    },
    {
        "id": "010",
        "date": "06/01/2026 - 10:15 AM",
        "customer": "Jelly",
        "orderStatus": "Processing",
        "total": 960000,
        "paymentStatus": "Unpaid",
        "tableNumber": "10",
        "items": ["4x Cheezy Sourdough"]
    }
])

</script>


<template>
    <div class="space-y-4">
        <div class="flex gap-4">
            <UButton label="All" color="primary" variant="outline" class="rounded-full px-8" />
            <UButton label="Active" color="gray" variant="ghost" class="rounded-full px-8 bg-gray-100" />
            <UButton label="Closed" color="gray" variant="ghost" class="rounded-full px-8 bg-gray-100" />
        </div>

        <div class="divide-y divide-gray-100 max-h-[600px] overflow-y-auto px-5">
            <div v-for="item in billingQueue" :key="item.id" class="py-6 flex justify-between items-start">
                <div class="space-y-1">
                    <h3 class="font-bold text-lg">{{ item.customer }}</h3>
                    <p class="text-sm text-gray-500">Order Number: <span class="text-black font-semibold">{{ item.id
                    }}</span>
                    </p>
                    <p class="text-sm text-gray-500">Table: <span class="text-black font-semibold">{{ item.table
                    }}</span></p>
                    <p class="text-xs text-gray-400">{{ item.date }}</p>
                </div>
                <div class="text-right space-y-2">
                    <p class="font-bold text-xl">{{ item.total.toLocaleString('id-ID', {
                        style: 'currency', currency:
                            'IDR'
                    }) }}</p>
                    <UBadge :label="item.orderStatus"
                        :color="item.orderStatus === 'Done' ? 'primary' : item.orderStatus === 'Canceled' ? 'error' : item.orderStatus === 'Processing' ? 'warning' : 'info'"
                        variant="soft" class="rounded-full px-4 border-none"
                        :class="item.orderStatus === 'Done' ? 'text-primary' : item.orderStatus === 'Canceled' ? 'text-error' : item.orderStatus === 'Processing' ? 'text-warning' : 'text-info'" />
                </div>
            </div>
        </div>

        <div class="pt-5">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Track Order</h2>

            </div>

            <div class="flex gap-4 overflow-x-auto pb-4">
                <div v-for="name in mockTrackOrder" :key="name.id"
                    class="min-w-[280px] p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div class="flex justify-between mb-4">
                        <span class="font-bold text-lg">{{ name.customer }}</span>
                        <UBadge label="On Kitchen" color="primary" variant="soft" size="xs" class="px-2 rounded-md" />
                    </div>
                    <p class="text-xs text-gray-400">Table: {{ name.tableNumber }} • {{ name.orderStatus }}</p>
                    <div class="border-t border-dashed my-4"></div>
                    <ul class="text-xs space-y-2 text-gray-600">
                        <li v-for="item in name.items" :key="item">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
