<template>
    <div class="webpage">
        <router-view v-slot="{ Component }">
            <transition name="page-transition" mode="out-in">
                <component :is="Component" :key="$route.fullPath" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import '../assets/fonts/global.css'

console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>

<style>
body {
    margin: 0;
    overflow: hidden;
}

.webpage {}

.page-transition-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.page-transition-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.page-transition-enter-active,
.page-transition-leave-active {
    transition: all 0.3s cubic-bezier(0.25, 0.10, 0.25, 1.00);
}

* {
    user-select: none;
    -webkit-user-drag: none;
    font-family: 'OPPOSans4.0';
}
</style>