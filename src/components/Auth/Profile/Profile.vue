<template>
  <div class="profile">
    <div class="profile-wrapper">
      <div class="profile-header">
        <div class="profile-box">
          <div class="profile-background"></div>
          <div class="profile-profile">
            <form enctype="multipart/form-data">
              <div class="image">
                <!-- <img :src="userData.photo || '/static/images/lazy/lazyload.svg'"> -->
                <input type="file" ref="profileUpload" id="profileUpload" name="profile_img" accept="image/png, image/jpeg, image/gif" @change="previewUpload">
                <div class="image-hover"></div>
                <div class="image-preview" :style="{ 'background-image' : 'url(' + userData.photo || '/static/images/lazy/lazyload.svg' + ')' }">
                  <div>
                    <span>UPLOAD</span>
                  </div>
                </div>
              </div>
            </form>
            <div class="name">
              {{ userData.name ? userData.name.display_name : userData.email }}
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
                <span :class="{'color-orange1' : currentRoute == 'ProfileHistory'}">รายการสั่งซื้อ</span>
              </div>
            </router-link>
          </div>
          <div class="profile-body col">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      currentRoute: "profile",
      file: null
    };
  },
  computed: {
    ...mapGetters(["userData"])
  },
  mounted() {
    this.currentRoute = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.name;
    }
  },
  methods: {
    ...mapActions(["uploadProfile"]),
    previewUpload() {
      // preview image

      this.file = this.$refs.profileUpload.files;
      const size = this.file[0].size * 0.0009765625;
      const type = ["image/gif", "image/jpeg", "image/png"].indexOf(
        this.file[0].type
      );

      if (type < 0) {
        // check typ of image

        // clear input val
        let input = this.$refs.profileUpload;
        input.type = "text";
        input.type = "file";

        // alert
        return this.$swal({
          type: "warning",
          title: "รูปแบบภาพไม่ถูกต้อง",
          text: "นามสกุลของภาพต้องเป็น jpg, jpeg, png หรือ gif เท่านั้น."
        });
      } else if (size > 1000) {
        // check is of image

        // clear input val
        let input = this.$refs.profileUpload;
        input.type = "text";
        input.type = "file";

        // alert
        return this.$swal({
          type: "warning",
          title: "ขนาดไฟล์ใหญ่เกินไป",
          text:
            "ขนาดไฟล์ต้องใหญ่ไม่เกิน 1MB, รูปภาพของคุณขนาด: " +
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

      this.uploadProfile(this.file[0]);
    }
  }
};
</script>

<style>
</style>
