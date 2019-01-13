<template>
  <div class="floatbar">
    <div class="floatbar-wrapper">
      <transition
        name="fade"
        mode="out-in"
      >
        <Chat
          :title="'ทดสอบ'"
          v-if="state"
          v-on:state="updateState"
        ></Chat>

      </transition>

      <transition name="basket">
        <div class="floatbar-basket">

          <div class="floatbar-basket-wrapper">
            <a class="chat-animate">
              <beautiful-chat
                :participants="participants"
                :titleImageUrl="titleImageUrl"
                :onMessageWasSent="onMessageWasSent"
                :messageList="messageList"
                :newMessagesCount="newMessagesCount"
                :isOpen="isChatOpen"
                :close="closeChat"
                :open="openChat"
                :showEmoji="true"
                :showFile="true"
                :showTypingIndicator="showTypingIndicator"
                :colors="colors"
                :alwaysScrollToBottom="alwaysScrollToBottom"
                :messageStyling="messageStyling"
              />
            </a>
            <router-link
              :to="{ name: 'Basket' }"
              v-show="basketData.length"
              class="animate basket-anime"
            >
              <div class="floatbar-basket-icon">
                <font-awesome-icon
                  icon="shopping-bag"
                  aria-hidden="true"
                />
                <span class="amount">
                  <div>{{basketData.length}}</div>
                </span>
              </div>
            </router-link>
          </div>

        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import io from "socket.io-client";
import Chat from "../Popup/Chat";
export default {
  name: "FloatBar",

  ///
  // Data
  ///
  data() {
    return {
      state: false,
      socket: io(`${process.env.BACKEND_URI}`),
      participants: [
        {
          id: "me",
          name: "ผู้เยี่ยมชม",
          imageUrl: "/static/images/lazy/lazyload.svg"
        },
        {
          id: "admin",
          name: "S&N การม่าน",
          imageUrl: "/static/favicon/apple-icon-114x114.png"
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: "/static/images/lazy/lazyload.svg",
      messageList: [
        {
          type: "text",
          author: `admin`,
          data: { text: `S&N การม่าน, ยินดีต้อนรับครับ` }
        }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        launcher: {
          bg: "#4e8cff"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },

  ///
  // Watch
  ///
  watch: {
    basketData: function(data) {
      this.basketAnimate();
    }
  },
  ///
  // Mounted
  ///
  mounted() {
    if (localStorage.basket)
      this.basketUpdate(JSON.parse(localStorage.getItem("basket")));
  },

  ///
  // Methods
  ///
  methods: {
    ...mapActions(["chatGet"]),
    ...mapMutations(["basketUpdate"]),
    basketAnimate() {
      var basket = $(".floatbar-basket");
      $(".floatbar-basket a.basket-animate").removeClass("animate");
      setTimeout(function() {
        $(".floatbar-basket a.basket-animate").addClass("animate");
      }, 100);
    },
    updateState(state) {
      this.state = state;
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          data: { text }
        });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
      this.socket.emit("chat message", message);
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    // * [Trigger] Get Chat
    async triggerChatGet() {
      try {
        // Auth
        const chatData = await this.chatGet();
      } catch (error) {
        // Not auth
      }
    }
  },

  // ! WATCH
  watch: {
    // messageList: {
    //   handler: function(data) {
    //     const msg = data[data.length - 1];
    //     this.socket.emit("chat message", msg);
    //   },
    //   deep: true
    // }
    // chatData: {
    //   handler: function(data) {
    //     this.messageList = data.map(x => x.msg);
    //   },
    //   deep: true
    // }
  },

  // ! MOUNTED
  mounted() {
    this.triggerChatGet();
    this.socket.on("chat message", msg => {
      console.log("msg: " + msg);
    });
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["chatData", "basketData", "userData"])
  },

  components: { Chat }
};
</script>

<style>
.basket-enter-active,
.basket-leave-active {
  transition: 0.3s ease;
}
.basket-enter,
.basket-leave-to {
  opacity: 0;
}
</style>
