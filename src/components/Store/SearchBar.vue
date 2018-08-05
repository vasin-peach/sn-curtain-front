<template>
  <div id="searchbar">
    <div class="bar-container">
      <div class="container">
        <div class="bar-search row m-0">
          <div class="col p-0">
            <div class="input-group">
              <span class="input-group-append">
                <div class="input-group-text border-right-0 border">
                  <font-awesome-icon icon="search" aria-hidden="true" />
                </div>
              </span>
              <input class="form-control py-2 border-left-0 border" type="search" placeholder="ค้นหา" id="search">
            </div>
          </div>
        </div>
        <div class="bar-filter row m-0">
          <div class="col">
            <div class="title">
              ประเภทผ้าม่าน
            </div>
            <input type="select" v-model="filter1" id="filter1">
          </div>
          <div class="col">
            <div class="title">
              ชนิดของผ้า
            </div>
            <input type="select" v-model="filter2" id="filter2">
          </div>
          <div class="col">
            <div class="title">
              สี
            </div>
            <input type="select" v-model="filter3" id="filter3">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  ///
  // Name
  ///
  name: "SearchBar",

  ///
  // Data
  ///
  data() {
    return {
      search: null,
      filter1: null,
      filter2: null,
      filter3: null
    }
  },

  ///
  // Mounted
  ///
  mounted() {},

  ///
  // Methods
  ///
  methods: {}
}
</script>

<style>
</style>
