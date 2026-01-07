<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

const { data: historyOrder } = await useFetch('/api/history-order')

type Payment = {
    id: string,
    date: string,
    time: string,
    customerName: string,
    orderStatus: string,
    totalPayment: string,
    paymentStatus: string
}

const data = ref<Payment[]>(historyOrder.value)

const columns: TableColumn<Payment>[] = [
    {
        accessorKey: 'id',
        header: () => h('span', { class: 'text-black bg-gray-200/80 py-2 px-5 rounded-lg' }, '#'),
        cell: ({ row }) => `#${row.getValue('id')}`,
    },
    {
        accessorKey: 'date',
        header: () => h('span', { class: 'text-black bg-gray-200/80 py-2 px-5 rounded-lg' }, 'Date'),
        cell: ({ row }) => {
            return row.getValue('date')
        }
    },
    {
        accessorKey: 'orderStatus',
        header: () => h('span', { class: 'text-black bg-gray-200/80 py-2 px-5 rounded-lg' }, 'Status'),
        cell: ({ row }) => {
            const status = String(row.getValue('orderStatus')).toLowerCase()
            const color = {
                done: 'success' as const,
                cancelled: 'error' as const,
                processing: 'warning' as const
            }[status] || 'primary'

            return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
                row.getValue('orderStatus')
            )
        }
    },
    {
        accessorKey: 'customerName',
        header: () => h('span', { class: 'text-black bg-gray-200/80 py-2 px-5 rounded-lg' }, 'Customer Name'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('customerName'))
        }
    },
    {
        accessorKey: 'totalPayment',
        header: () => h('div', { class: 'text-right text-black bg-gray-200/80 py-2 px-5 rounded-lg w-fit float-right' }, 'Total Payment'),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('totalPayment'))

            const formatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(amount)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    }
]
</script>

<template>
    <UTable :data="data" :columns="columns" class="flex-1 border border-gray-200 rounded-3xl" />
</template>
