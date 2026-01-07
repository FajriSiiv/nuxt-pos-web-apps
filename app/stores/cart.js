import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        discount: 1.0,
        taxRate: 0.1, // 10%
    }),

    getters: {
        // Menghitung total harga semua item sebelum pajak/diskon
        subtotal: (state) => {
            return state.items.reduce((acc, item) => acc + (item.price * item.qty), 0)
        },

        // Menghitung nominal pajak
        taxAmount: (getters) => {
            return getters.subtotal * 0.1
        },

        // Total akhir yang harus dibayar
        total: (getters) => {
            return (getters.subtotal + getters.taxAmount) - 1.0 // Diskon flat $1.0 sesuai gambar
        },

        // Menghitung total jumlah item di keranjang
        totalItems: (state) => {
            return state.items.reduce((acc, item) => acc + item.qty, 0)
        }
    },

    actions: {
        addToCart(product) {
            // Cek apakah produk sudah ada di keranjang dengan catatan yang sama
            const existingItem = this.items.find(item =>
                item.id === product.id
            )

            if (existingItem) {
                existingItem.qty += product.qty
            } else {
                this.items.push({ ...product })
            }
        },

        removeFromCart(index) {
            this.items.splice(index, 1)
        },

        updateQty(index, newQty) {
            if (newQty > 0) {
                this.items[index].qty = newQty
            } else {
                this.removeFromCart(index)
            }
        },

        clearCart() {
            this.items = []
        },


    }
})