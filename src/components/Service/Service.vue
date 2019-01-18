<template>
  <div class="app-index">
    <b-container class="mt-4">
      <b-row class="text-center">
        <b-col class="title">
          <h3><b>คิดราคาม่าน</b></h3>
          <hr>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col>
          <b-form-select
            v-model="curtainType"
            :options="curtainType_Options"
            size="lg"
          ></b-form-select>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <b-form
            @submit.prevent="cal()"
            @reset="reset()"
          >
            <b-row>
              <b-col cols="6">
                <b-form-group
                  label="ความกว้างม่าน: (เมตร)"
                  label-for="width"
                  description="เพิ่มได้ทีละ 50 เซนติเมตร(0.5เมตร) กว้างสุดที่ 4 เมตร"
                >
                  <b-form-input
                    name="width"
                    type="number"
                    v-model="width"
                    :class="{ 'danger' : widthCheck }"
                  ></b-form-input>
                  <span
                    :class="{ 'text-danger': widthCheck }"
                    v-if="widthCheck == 1"
                  >ขนาดต้องไม่เกิน: {{ maxWidth }}</span>
                  <span
                    :class="{ 'text-danger': widthCheck }"
                    v-if="widthCheck == 2"
                  >ขนาต้องมากกว่า: {{ maxWidth }}</span>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="ความสูงม่าน: (เมตร)"
                  label-for="height"
                  description="ความสูงของม่านน้อยสุด 1 เมตรเพิ่มได้ทีละ 10 เซนติเมตร(0.1เมตร) และมากสุดที่ 2 เมตร 50 เซนติเมตร"
                >
                  <b-form-input
                    name="height"
                    v-model="height"
                    type="number"
                    :class="{ 'danger' : heightCheck }"
                  ></b-form-input>
                  <span
                    :class="{ 'text-danger': heightCheck }"
                    v-if="heightCheck == 1"
                  >ความสูงต้องไม่เกิน: {{ maxHeight }}</span>
                  <span
                    :class="{ 'text-danger': heightCheck }"
                    v-if="heightCheck == 2"
                  >ความสูงต้องมากกว่า: {{ maxHeight }}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group
              class="d-none"
              label="คุณภาพ:"
              label-for="quality"
              description="คุณภาพของเนื้อผ้า"
            >
              <b-form-select
                v-model="quality"
                :options="quality_options"
                size="md"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              class="d-none"
              label="การคิดราคาผ้า: "
              description="(ตามเรท -> ขนาดปัดขึ้น)"
              v-if="[1, 2, 7].indexOf(curtainType) >= 0"
            >
              <b-form-select
                v-model="calWay"
                :options="calWay_options"
                size="md"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label="ประเภทราง: "
              description="(รางโชว์ -> ปัดขึ้น, รางM -> ปัดขึ้น1)"
              v-if="[1].indexOf(curtainType) >= 0"
            >
              <b-form-select
                v-model="railType"
                :options="railType_Options"
                size="md"
              ></b-form-select>
            </b-form-group>
            <hr class="d-none">
            <b-row class="d-none">
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาผ้า">
                  <b-form-input
                    type="number"
                    v-model=" curtainValue"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาราง">
                  <b-form-input
                    type="number"
                    v-model="railValue"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาหัวราง">
                  <b-form-input
                    type="number"
                    v-model="headValue"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาขา">
                  <b-form-input
                    type="number"
                    v-model="legValue"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาตะขอ">
                  <b-form-input
                    type="number"
                    v-model="hangerValue"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาข้อต่อ">
                  <b-form-input
                    type="number"
                    v-model="jointValue"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col
                cols="6"
                sm="4"
              >
                <b-form-group label="ราคาห่วง">
                  <b-form-input
                    type="number"
                    v-model="circleValue"
                    v-if="curtainType == 1"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <hr>
            <b-row>
              <b-col cols="4">
                <b-form-group label="ราคาชุดราง: ">
                  <b-form-input
                    :value="railPrice + ' บาท'"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="ราคาผ้า: ">
                  <b-form-input
                    :value="curtainPrice + ' บาท'"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="ราาคารวม: ">
                  <b-form-input
                    :value="price + ' บาท'"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    <div class="mt-5"></div>
  </div>
</template>

<script>
export default {
  name: "Service",

  data() {
    return {
      minWidth: 1,
      maxHeight: 1,
      maxWidth: 2.5,
      maxHeight: 1,
      curtainType: 0,
      curtainType_Options: [
        { value: 0, text: "ม่านพับ" },
        { value: 1, text: "ม่านจีบ" },
        { value: 2, text: "ม่านคอกระเช้า" },
        { value: 3, text: "ม่านปรับแสง" },
        { value: 4, text: "ม่านม้วน" },
        { value: 5, text: "มู่ลี่" },
        { value: 6, text: "ฉากกั้นห้อง" },
        { value: 7, text: "ม่านตาไก่" }
      ],
      railType: 0,
      railType_Options: [
        { value: 0, text: "รางโชว์" },
        { value: 1, text: "ราง M" }
      ],
      circleValue: 5,
      widthCheck: 0,
      heightCheck: 0,
      curtainValue: 450,
      railValue: 170,
      headValue: 35,
      hangerValue: 10,
      jointValue: 40,
      legValue: 40,
      width: 1,
      height: 1,
      quality: 2.3,
      // quality_options: [
      //   { value: 1.5, text: "ประหยัด (1.5)" },
      //   { value: 2, text: "มาตราฐาน (2.0)" },
      //   { value: 2.3, text: "หรูหรา (2.3)" },
      //   { value: 1, text: "ต่อผืน (1.0)" }
      // ],
      quality_options: [{ value: 2.3, text: "มาตรฐาน (2.3)" }],
      calWay: 0,
      calWay_options: [
        { value: 0, text: "คิดตามจริง" },
        { value: 1, text: "คิดตามเรท" }
      ],
      rail: 0
    };
  },

  watch: {
    // width: function(data) {
    //   data = parseFloat(data);
    //   if (data > this.maxWidth) return (this.widthCheck = 1);
    //   else if (data < this.minWidth) return (this.widthCheck = 2);
    //   else return (this.widthCheck = 0);
    // },
    // height: function(data) {
    //   data = parseFloat(data);
    //   if (data > this.maxHeight) return (this.heightCheck = 2);
    //   else if (data < this.minHeight) return (this.heightCheck = 1);
    //   else return (this.heightCheck = 0);
    // },
    railType: function(data) {
      return (this.railValue = this.railType == 1 ? 350 : 170);
    },
    curtainType: function(data) {
      switch (data) {
        case 0: // ม่านพับ
          this.minWidth = 1;
          this.minHeight = 1;
          this.maxWidth = 2.5;
          this.maxHeight = 2.4;
          this.quality = 2.3;
          this.quality_options = [{ value: 2.3, text: "มาตรฐาน (2.3)" }];
          this.calWay = 0;
          break;
        case 1: // ม่านจีบ
          this.minWidth = 1;
          this.minHeight = 1;
          this.maxWidth = 6;
          this.maxHeight = 2.5;
          this.quality = 2;
          this.railValue = this.railType == 1 ? 350 : 170;
          this.quality_options = [
            { value: 2, text: "มาตราฐาน (2.0)" },
            { value: 2.3, text: "หรูหรา (2.3)" }
          ];

          break;
        case 2: // ม่านคอกระเช้า
          this.minWidth = 1;
          this.minHeight = 1;
          this.maxWidth = 5;
          this.maxHeight = 2.5;
          this.quality = 1.5;
          this.quality_options = [
            { value: 1.5, text: "ประหยัด (1.5)" },
            { value: 2, text: "มาตราฐาน (2.0)" },
            { value: 2.3, text: "หรูหรา (2.3)" },
            { value: 1, text: "ต่อผืน (1.0)" }
          ];
          break;
        case 3: // ม่านปรับแสง
          this.curtainValue = 650;
          this.minWidth = 1;
          this.minHeight = 1.5;
          this.maxWidth = 6;
          this.maxHeight = 4;
          this.quality = 1.2;
          this.quality_options = [{ value: 1.2, text: "ประหยัด (1.2)" }];
          this.calWay = 0;
          break;
        case 4: // ม่านม้วน
          this.curtainValue = 1400;
          this.minWidth = 1;
          this.minHeight = 1;
          this.maxWidth = 2.6;
          this.maxHeight = 4;
          this.quality = 1.2;
          this.quality_options = [{ value: 1.2, text: "ประหยัด (1.2)" }];
          this.calWay = 0;
          break;
        case 5: // มู่ลี่
          this.curtainValue = 650;
          this.minWidth = 1;
          this.minHeight = 1;
          this.maxWidth = 2;
          this.maxHeight = 4;
          this.quality = 1.2;
          this.quality_options = [{ value: 1.2, text: "ประหยัด (1.2)" }];
          this.calWay = 0;
          break;
        case 6: // ฉากกั้นห้อง
          this.curtainValue = 870;
          this.minWidth = 1;
          this.minHeight = 2;
          this.maxWidth = 6;
          this.maxHeight = 3.6;
          this.quality = 1.2;
          this.quality_options = [{ value: 1.2, text: "ประหยัด (1.2)" }];
          this.calWay = 0;
          break;
        case 7: // ม่านตาไก่
          this.curtainValue = 450;
          this.minWidth = 1;
          this.minHeight = 1;
          this.maxWidth = 5;
          this.maxHeight = 2.5;
          this.quality = 1.5;
          this.quality_options = [
            { value: 1.5, text: "ประหยัด (1.5)" },
            { value: 2, text: "มาตราฐาน (2.0)" },
            { value: 2.3, text: "หรูหรา (2.3)" },
            { value: 1, text: "ต่อผืน (1.0)" }
          ];
          break;
      }
    }
  },

  computed: {
    railPrice: function() {
      switch (this.curtainType) {
        case 0: // ม่านพับ
          return this.width * this.railValue;
          break;
        case 1: // ม่านจีบ
          if (this.railType == 0) {
            return Math.ceil(
              (Math.ceil(this.width * 2) / 2) * this.railValue +
                this.headValue * 2 +
                this.hangerValue * 2 +
                this.legValue * (this.width <= 1.5 ? 2 : 3) +
                this.jointValue * (this.width >= 1.5 ? 1 : 0) +
                (Math.round(this.width / 0.1) % 2 == 0
                  ? Math.round(this.width / 0.1)
                  : Math.round(this.width / 0.1) + 1) *
                  this.circleValue
            );
          } else {
            return Math.ceil(Math.round(this.width * this.railValue));
          }
          break;
        case 2: // ม่านคอกระเช้า
          return Math.ceil(
            (Math.ceil(this.width * 2) / 2) * this.railValue +
              this.headValue * 2 +
              this.hangerValue * 2 +
              this.legValue * (this.width <= 1.5 ? 2 : 3) +
              this.jointValue * (this.width >= 1.5 ? 1 : 0)
          );
          break;
        case 3: // ม่านปรับแสง
          return 0;
          break;
        case 4: // ม่านม้วน
          return 0;
          break;
        case 5: // มู่ลี่
          return 0;
          break;
        case 6: // ฉากกั้นห้อง
          return 0;
          break;
        case 7: // ม่านตาไก่
          return Math.ceil(
            (Math.ceil(this.width * 2) / 2) * this.railValue +
              this.headValue * 2 +
              this.hangerValue * 2 +
              this.legValue * (this.width <= 1.5 ? 2 : 3) +
              this.jointValue * (this.width >= 1.5 ? 1 : 0)
          );
          break;
      }
    },
    curtainPrice: function() {
      switch (this.curtainType) {
        case 0: // ม่านพับ
          return Math.ceil(this.curtainValue * this.quality * this.width);
          break;
        case 1: // ม่านจีบ
          return Math.ceil(
            (this.calWay == 1 ? Math.ceil(this.width * 2) / 2 : this.width) *
              this.curtainValue *
              this.quality *
              (this.height <= 1.3 ? 0.5 : 1)
          );
          break;
        case 2: // ม่านคอกระเช้า
          return Math.ceil(
            (this.calWay == 1 ? Math.ceil(this.width * 2) / 2 : this.width) *
              this.curtainValue *
              this.quality *
              (this.height <= 1.3 ? 0.5 : 1)
          );
          break;
        case 3: // ม่านปรับแสง
          return Math.ceil(
            this.width * this.height * this.quality * this.curtainValue
          );
          break;
        case 4: // ม่านม้วน
          return Math.ceil(
            this.width * this.height * this.quality * this.curtainValue
          );
          break;
        case 5: // มู่ลี่
          return Math.ceil(
            this.width * this.height * this.quality * this.curtainValue
          );
          break;
        case 6: // ฉากกั้นห้อง
          return Math.ceil(
            this.width * this.height * this.quality * this.curtainValue
          );
          break;
        case 7: // ม่านตาไก่
          return Math.ceil(
            (this.calWay == 1 ? Math.ceil(this.width * 2) / 2 : this.width) *
              this.curtainValue *
              this.quality *
              (this.height <= 1.3 ? 0.5 : 1)
          );
          break;
      }
    },
    price: function() {
      return this.curtainPrice + this.railPrice;
    }
  }
};
</script>

<style>
.danger {
  font-size: 15px;
  color: red;
}

input.danger {
  border: 2px solid red !important;
}
input.danger:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
}
</style>
