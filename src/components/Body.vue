<template>
  <div class="body">
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
