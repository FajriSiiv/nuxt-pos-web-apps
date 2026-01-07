<script setup lang="ts">
definePageMeta({
    middleware: [
        function (to, from) {
            if (to.path === '/activity' || to.path === '/activity/') {
                return navigateTo('/activity/billing-queue', { replace: true })
            }
        }
    ]
})
</script>
<template>
    <ClientOnly>
        <div>Redirecting...</div>
    </ClientOnly>
</template>