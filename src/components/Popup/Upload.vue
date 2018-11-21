<template>
  <div class="payment-options-form">
    <div class="bg-fade" @click="popupUploadUpdate(false)"></div>
    <div class="payment-options-wrapper upload-wrapper">
      <div class="close" @click="popupUploadUpdate(false)">
        <font-awesome-icon icon="times" aria-hidden="true" />
      </div>
      <div class="login-head">
      </div>
      <div class="payment-options-container">
        <div class="title">
          อัพโหลดหลักฐานการโอน
        </div>
        <form enctype="multipart/form-data" @submit.prevent="submitUpload()">
          <div class="row m-0">
            <div class="col-12 form-upload">
              <input type="file" ref="atmUpload" id="upload" name="upload" accept="image/png, image/jpeg, image/gif" @change="previewUpload" required>
              <div class="form-upload-preview image-preview" style="background-image: url('/static/images/icon/upload.svg');"></div>
            </div>
            <div class="col-12 p-0">
              <button type="submit" class="button">อัพโหลดหลักฐาน</button>
            </div>
          </div>
          <!-- <div class="row m-0">
            <div class="col-12 col-md-6">
              <b-form-group label="วันที่โอน">
                <input type="date" name="form-dateDay">
              </b-form-group>
            </div>

            <div class="col-12 col-md-6">
              <b-form-group label="เวลาที่โอน">
                <input type="date" name="form-dateTime">
              </b-form-group>
            </div>

            <div class="col-12">
              <b-form-group label="หมายเลขบัญชีของท่านที่โอน (4 ตัวสุดท้าย)">
                <input type="number" name="form-BankNumber">
              </b-form-group>
            </div>

            <div class="col-12 col-md-6">
              <b-form-group label="โอนจากธนาคาร">
                <input type="text" name="form-fromBank">
              </b-form-group>
            </div>

            <div class="col-12 col-md-6">
              <b-form-group label="มายังธนาคาร">
                <b-form-select id="exampleInput3" name="form-toBank" :options="options.formBank">
                </b-form-select>
              </b-form-group>
            </div>
          </div> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import isEmpty from "lodash.isempty";
export default {
  data() {
    return {
      file: null,
      options: {
        fromBank: [
          "ธนาคารกรุงเทพ",
          "ธนาคารกรุงไทย",
          "ธนาคารกรุงศรีอยุธยา",
          "ธนาคารกสิกรไทย",
          "ธนาคารเกียรตินาคิน",
          "ธนาคารซีไอเอ็มบี ไทย",
          "ธนาคารทหารไทย",
          "ธนาคารทิสโก้",
          "ธนาคารไทยเครดิต",
          "ธนาคารไทยพาณิช",
          "ธนาคารธนชาต",
          "ธนาคารยูโอบี",
          "ธนาคารแลนด์ แอนด์ เฮ้าส์",
          "ธนาคารสแตนดาร์ดชาร์เตอร์ด",
          "ธนาคารไอซีบีซี"
        ]
      }
    };
  },

  // ! PROPS
  props: {
    destination: String,
    maxSize: Number, // 1000 = 1MB
    type: Array,
    message: Object
  },

  // ! METHODS
  methods: {
    // ? Mutations
    ...mapMutations(["popupUploadUpdate"]),

    // ? Actions
    ...mapActions(["upload"]),

    // ? Submit form
    submitUpload() {
      this.upload({
        file: this.submitFile,
        destination: this.destination
      }).then(
        resp => {
          // success

          // alert
          this.$swal(
            this.message.success || {
              type: "success",
              title: "อัพโหลดเสร็จสิ้น"
            }
          );

          // disable popup upload
          this.popupUploadUpdate(true);

          return resp || true;
        },
        err => {
          // error

          // alert
          this.$swal(
            this.message.error || {
              type: "error",
              title: "เกิดข้อผิดพลาดในการอัพโหลด",
              html: `ไม่สามารถอัพโหลดได้ กรุณาลองใหม่ในภายหลัง ${
                err.statusText ? `<br>Error: ${err.statusText}` : ""
              }`
            }
          );

          return err || false;
        }
      );
    },

    // ? Preview image
    previewUpload() {
      // preview image

      this.file = this.$refs.atmUpload.files || null;

      // check file is not empty
      if (!this.file || isEmpty(this.file)) return;

      const size = this.file[0].size * 0.0009765625;
      const type = this.type.indexOf(this.file[0].type);

      // check typ of image
      if (type < 0) {
        // clear input val
        let input = this.$refs.atmUpload;
        input.type = "text";
        input.type = "file";

        // alert
        return this.$swal({
          type: "warning",
          title: "รูปแบบภาพไม่ถูกต้อง",
          text: `นามสกุลของภาพต้องเป็น ${this.type
            .map(item => item.split("/")[1].toUpperCase(), [])
            .join(", ")} เท่านั้น.`
        });
      } else if (size > this.maxSize) {
        // check is of image

        // clear input val
        let input = this.$refs.atmUpload;
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

      // prepare payload to submit
      this.uploadFile = this.file[0];

      // preview image
      const reader = new FileReader();
      reader.onload = function(e) {
        $(".image-preview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
      };
      reader.readAsDataURL(this.file[0]);
    }
  }
};
</script>

<style>
</style>
