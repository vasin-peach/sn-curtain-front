<template>
  <div class="section2">
    <div class="container">
      <div class="row category-container">
        <div class="col-4 col-md-2 category-box" v-for="(item, index) in category" :key="index">
          <div class="category-content">
            <img :src="'/static/images/category/' + item.name">
          </div>
          <div class="category-title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section2',
  data() {
    return {
      category: [
        {
        name: 'category-01.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-02.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-03.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-04.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-05.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-06.png',
        title: 'ม่านตาไก่'
        },
      ]
    }
  },
}
</script>

<style>
</style>
