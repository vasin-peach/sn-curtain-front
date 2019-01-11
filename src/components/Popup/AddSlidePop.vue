<template>
  <div class="popup-container">
    <div class="popup-form">

      <div
        class="bg-fade"
        @click="$emit('update', false)"
      ></div>

      <div class="popup-wrapper">
        <div
          class="close"
          @click="$emit('update', false)"
        >
          <font-awesome-icon
            icon="times"
            aria-hidden="true"
          />
        </div>

        <div class="popup-content">
          <div class="content-head">
            {{ title }}
          </div>
          <div class="content-body">

            <form
              enctype="multipart/form-data"
              @submit.prevent="triggerUpload(uploadType)"
            >

              <div class="row m-0">
                <div class="col">
                  <div class="col form-upload">
                    <input
                      type="file"
                      ref="upload"
                      id="upload"
                      name="upload"
                      accept="image/png, image/jpeg, image/gif"
                      @change="preview"
                      required
                    >
                    <div
                      class="form-upload-preview image-preview"
                      style="background-image: url('/static/images/icon/upload.svg');"
                    ></div>
                  </div>
                  <div class="form-input">
                    <b-form-input
                      v-model="url"
                      type="text"
                      placeholder="ลิ้งไปยัง URL"
                      required
                    ></b-form-input>
                  </div>
                </div>

              </div>

              <div class="row m-0">

                <div class="col-12">
                  <hr>
                </div>

                <div class="col-12">
                  <button
                    type="submit"
                    class="button w-100"
                  >เพิ่มสไลด์</button>
                </div>

              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import isEmpty from "lodash.isempty";
export default {
  name: "AddSlidePop",

  // ! DATA
  data() {
    return {
      data: null,
      filter: ["image/png", "image/jpeg", "image/gif"],
      url: null
    };
  },

  // ! PROPS
  props: {
    uploadType: null,
    title: null
  },

  // ! METHODS
  methods: {
    ...mapActions(["upload", "slideUpdate", "slideAllGet"]),
    // * preview image
    preview() {
      // declear file
      this.file = this.$refs.upload.files || null;

      // check file is not empty
      if (!this.file || isEmpty(this.file)) return;

      const size = this.file[0].size * 0.0009765625;
      const type = this.filter.indexOf(this.file[0].type);

      // check typ of image
      if (type < 0) {
        // clear input val
        let input = this.$refs.upload;
        input.type = "text";
        input.type = "file";

        // alert
        return this.$swal({
          type: "warning",
          title: "รูปแบบภาพไม่ถูกต้อง",
          text: `นามสกุลของภาพต้องเป็น ${this.filter
            .map(item => item.split("/")[1].toUpperCase(), [])
            .join(", ")} เท่านั้น.`
        });
      } else if (size > this.maxSize) {
        // check is of image

        // clear input val
        let input = this.$refs.upload;
        input.type = "text";
        input.type = "file";

        // alert
        return this.$swal({
          type: "warning",
          title: "ขนาดไฟล์ใหญ่เกินไป",
          text:
            `ขนาดไฟล์ต้องใหญ่ไม่เกิน ${this.maxSize /
              1000}MB, รูปภาพของคุณขนาด: ` +
            Math.round(size * 0.0009765625 * 100) / 100 +
            " MB."
        });
      }

      // preview image
      const reader = new FileReader();
      reader.onload = function(e) {
        $(".image-preview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
      };
      reader.readAsDataURL(this.file[0]);
    },

    // * upload image
    async triggerUpload() {
      if (this.uploadType == "sub" && this.slideSubData.length >= 2) {
        return this.$swal({
          type: "warning",
          title: "สไลด์รองมีได้มากสุด 2 ไลด์เท่านั้น",
          text:
            "ไม่สามารถเพิ่มสไลด์รองได้เนื่องจากมีสไลด์รองมากกว่า 2 สไลด์ กรุณาลบสไลด์ก่อนหน้านี้"
        });
      }

      const uploadResult = await this.upload({
        file: this.file[0],
        destination: "slide",
        objectId: this.uploadType
      }).then(resp => resp, err => err);
      const fileUrl = uploadResult.data.data;

      try {
        // call
        const updateResult = await this.slideUpdate({
          update: {
            src: fileUrl,
            url: this.url,
            type: this.uploadType
          }
        });

        // alert success
        this.$swal({
          type: "success",
          title: "เพิ่มสไลด์เสร็จสิ้น"
        });

        // fetch new data
        this.slideAllGet();

        // disable popup
        this.$emit("update", false);
      } catch (err) {
        this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการเพิ่มสไลด์",
          text: JSON.stringify(err)
        });

        // fetch new data
        this.slideAllGet();

        // disable popup
        this.$emit("update", false);
      }
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["slideSubData"])
  }
};
</script>

<style>
</style>
