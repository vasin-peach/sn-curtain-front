<template>
  <div class="profile">
    <div class="profile-wrapper">
      <div class="profile-header">
        <div class="profile-box">
          <div class="profile-background"></div>
          <div class="profile-profile">
            <div class="image">
              <img :src="userData.photo || '/static/images/lazy/lazyload.svg'">
            </div>
            <div class="name">
              {{ userData.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="profile-content row m-01">
          <div class="profile-nav col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
            <router-link :to="{ name: 'Profile' }">
              <div class="nav">
                <div>
                  <font-awesome-icon icon="user-circle" aria-hidden="true" />
                </div>
                <span :class="{'color-orange1' : currentRoute == 'Profile'}">ข้อมูลส่วนตัว</span>
              </div>
            </router-link>
            <router-link :to="{ name: 'ProfileHistory' }">
              <div class="nav">
                <div>
                  <font-awesome-icon icon="list-alt" aria-hidden="true" />
                </div>
                <span :class="{'color-orange1' : currentRoute == 'ProfileHistory'}">ประวัติการซื้อ</span>
              </div>
            </router-link>
          </div>
          <div class="profile-body col">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Profile",
  data() {
    return {
      currentRoute: 'profile',
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  mounted() {
    this.currentRoute = this.$route.name;
  },
  watch: {
    $route (to, from) {
      this.currentRoute = to.name;
    }
  }
}
</script>

<style>
</style>
