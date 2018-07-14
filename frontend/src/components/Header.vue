<template>
  <div class="header">
    <div class="header-container bg-dark1 h-sm">
      <div class="row">
        <div class="col-0 col-md-4">
        </div>
        <div class="col-6 col-md-4 brand">
          <img src="@image/brand.svg">
        </div>
        <div class="col-6 col-md-4 menu">
          <input type="checkbox" id="menu-toggle">
          <label id="trigger" for="menu-toggle"></label>
          <label id="burger" for="menu-toggle"></label>
          <!-- <ul id="menu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
</style>
