<template>
  <div class="admin">
    <div class="container">
      <div class="admin-container row">
        <!-- Left -->
        <div class="admin-menu col-12 col-sm-4 col-md-3 col-xl-2">
          <div class="admin-menu-container">
            <div class="admin-menu-item">
              <div>
                <font-awesome-icon icon="user-circle" aria-hidden="true" />
              </div>
              <span :class="{'color-orange1' : currentRoute == 'Profile'}">ข้อมูลส่วนตัว</span>
            </div>
            <div class="admin-menu-item">
              <div>
                <font-awesome-icon icon="user-circle" aria-hidden="true" />
              </div>
              <span :class="{'color-orange1' : currentRoute == 'Profile'}">ข้อมูลส่วนตัว</span>
            </div>
          </div>
        </div>
        <!-- Right -->
        <div class="admin-content col">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin'
}
</script>

<style>
</style>
