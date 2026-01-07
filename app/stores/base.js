import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', {
    state: () => ({
        isOpenOrder: true
    }),

    actions: {
        toggleOpenOrder() {
            this.isOpenOrder = !this.isOpenOrder
        }
    }
})
