<template>

  <div class="admin-slide-left card-container col-12 col-md col-xl">

    <transition
      name="fade"
      mode="out-in"
    >
      <AddSlidePop
        :uploadType="'main'"
        :title="'อัพโหลดสไลด์หลัก'"
        v-if="popup"
        v-on:update="updateState"
      ></AddSlidePop>
    </transition>

    <div class="card-box">
      <div class="row m-0">

        <div class="col">
          สไดล์โชว์หลัก
        </div>

        <div class="col text-right add">
          <div @click="popup = true">
            <font-awesome-icon
              icon="plus"
              aria-hidden="true"
            />
            เพิ่มสไลด์
          </div>
        </div>
        <div class="col-12">
          <hr>
        </div>

      </div>
      <div class="slide-list-container row m-0">

        <div
          v-if="!slideEdit[0]"
          class="data-empty"
        >ไม่มีสไลด์</div>

        <div
          class="slide-list"
          v-for="(slide, count) in slideEdit"
          :key="slide._id"
          :class="[slide._id, {'checked': count == 0}]"
        >

          <div
            class="slide-list-delete"
            @click="triggerSlideDelete(slide._id)"
          >
            <font-awesome-icon
              icon="times"
              aria-hidden="true"
            />
          </div>

          <div class="content row m-0">
            <div class="col-12">
              <div><img v-lazy="slide.src"></div>
            </div>
            <div class="col">
              <b-form-input
                v-model="slide.url"
                required
                placeholder="ลิ้งไปยัง URL"
                disabled
              ></b-form-input>
            </div>
            <div class="col-12">
              <hr>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AddSlidePop from "../../Popup/AddSlidePop";
import isEmpty from "lodash.isempty";
import cloneDeep from "lodash.clonedeep";
import { mapActions } from "vuex";
export default {
  name: "SlideMain",
  data() {
    return {
      popup: false,
      slideEdit: null
    };
  },
  props: {
    data: {}
  },
  methods: {
    ...mapActions(["slideDelete", "slideAllGet"]),
    updateState(state) {
      this.popup = state;
    },
    async triggerSlideDelete(id) {
      const confirm = await this.$swal({
        type: "warning",
        title: "คุณต้องการลบสไลด์นี้หรือไม่?",
        text:
          "เมื่อคุณลบสไลด์นี้ไปแล้ว จะไม่สามารถกู้คืนได้ คุณต้องการลบสไลด์นี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#D44638",
        confirmButtonText: "ใช่, ลบ ",
        cancelButtonText: "ไม่, ย้อนกลับ"
      }).then(x => x.value);
      if (!confirm) return;

      try {
        // call
        const result = await this.slideDelete({ id: id, type: "main" });

        // alert
        this.$swal({
          type: "success",
          title: "ลบสไลด์เสร็จสิ้น"
        });

        // refresh data
        this.slideAllGet();
      } catch (err) {
        // alert error
        this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการลบสไลด์",
          text: `กรุณาส่งข้อมูลนี้ให้ผู้ดูแลระบบ: ${JSON.stringify(err)}`
        });
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        this.slideEdit = cloneDeep(data.slideMainData, true);
      }
    }
  },
  components: { AddSlidePop }
};
</script>

<style>
</style>
