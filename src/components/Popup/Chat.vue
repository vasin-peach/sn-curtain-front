<template>
  <div class="popup-container popup-chat">
    <div class="popup-form">
      <div
        class="bg-fade"
        @click="$emit('state', false)"
      ></div>

      <div class="popup-wrapper">
        <div
          class="close"
          @click="$emit('state', false)"
        >
          <font-awesome-icon
            icon="times"
            aria-hidden="true"
          />
        </div>

        <div class="popup-content">
          <div class="content-head">{{title}}</div>
          <div class="content-body">
            Hi
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";
import isEmpty from "lodash.isempty";
export default {
  name: "Chat",

  // ! Data
  data() {
    return {
      socket: io(`${process.env.BACKEND_URI}`)
    };
  },

  // ! PROPS
  props: {
    title: null
  },

  // ! MOUNTED
  mounted() {}
};
</script>

<style>
</style>
