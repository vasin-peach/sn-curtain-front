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
              >
              </beautiful-chat>
              <transition
                name="fade"
                mode="out-in"
              >
                <div
                  class="chat-list-container"
                  v-show="isChatOpen"
                >
                  <div
                    class="chat-list"
                    :class="{'active': chat.room == room }"
                    v-show="isChatOpen"
                    v-for="chat in chatList"
                    :key="chat._id"
                    @click="triggerActiveChatList(chat)"
                    :style="{'background-image': 'url(' + (chat.author[0].image || '/static/images/lazy/lazyload.svg') + ')'}"
                  >
                    <div class="chat-list-remove">
                      <font-awesome-icon
                        icon="times"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </transition>
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
import _ from "lodash";
export default {
  name: "FloatBar",

  ///
  // Data
  ///
  data() {
    return {
      state: false,
      socket: io(`${process.env.BACKEND_URI}`),
      room: null,
      chatList: [],
      uid: null,
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
      messageListTemp: [],
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
    ...mapActions(["chatGet", "guestGet", "guestUpdate"]),
    ...mapMutations(["basketUpdate", "pushState"]),
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
    async triggerActiveChatList(data) {
      this.room = this.chatData[data.index]._id;
      this.messageList = this.chatData[data.index].msg;

      const indexMe = await this.messageList.map((x, y) => {
        if (
          x.author == this.userData
            ? this.userData._id
            : null || x.author == this.uid
        )
          this.messageList[y].author = "me";
      });
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
      this.socket.emit("chat message", {
        room: this.room,
        msg: this.messageList,
        client: this.uid
      });
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
        const chatData = await this.chatGet(this.uid);
        if (_.isEmpty(chatData)) return;
        this.chatList =
          (await chatData.map((x, y) => ({
            author: x.author,
            room: x._id,
            index: y
          }))) || [];

        if (!_.isEmpty(this.chatList)) {
          this.messageList = chatData[0].msg;
          this.messageListTemp = chatData[0].msg;
          this.room = chatData[0]._id;
        }

        const indexMe = await this.chatData[0].msg.map((x, y) => {
          if (
            x.author == this.userData
              ? this.userData._id
              : null || x.author == this.uid
          )
            return (this.messageList[y].author = "me");
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async triggerGuestGet() {
      if (this.userData) {
        await this.guestUpdate(this.userData._id);
      } else {
        let guestGet = await this.guestGet();
        const uid = guestGet ? guestGet : await this.guestUpdate(this.uid);
        this.uid = uid;
      }
    }
  },

  // ! WATCH
  watch: {
    messageList: {
      handler: function(data) {
        this.messageListTemp = _.cloneDeep(data, true);
      },
      deep: true
    }
    // chatData: {
    //   handler: function(data) {
    //     this.messageList = data.map(x => x.msg);
    //   },
    //   deep: true
    // }
  },

  // ! MOUNTED
  async mounted() {
    this.uid = this.userData
      ? this.userData._id
      : "_" +
        Math.random()
          .toString(36)
          .substr(2, 9) +
        "_" +
        Date.now().toString();

    await this.triggerGuestGet();
    await this.triggerChatGet();

    this.socket.on("chat guest updated", async data => {
      if (data.author.findIndex(x => x.id == this.uid) >= 0) {
        this.room = data._id;
        this.messageList = data.msg;
        if (this.chatData) this.chatData.msg = data.msg;

        // init user chat first time
        if (_.isEmpty(this.chatList)) {
          this.chatList.push({
            author: data.author,
            index: 0,
            room: data._id
          });
        } else {
          // init chatlist in secondtime
          for (let index in this.chatList) {
            let item = this.chatList[index];
            if (item.room != data._id)
              this.chatList.unshift({
                author: data.author,
                index: index,
                room: data._id
              });
          }
        }

        this.pushState({ data: data, target: "chat" });

        const indexMe = await data.msg.map((x, y) => {
          if (
            x.author == this.userData
              ? this.userData._id
              : null || x.author == this.uid
          )
            this.messageList[y].author = "me";
        });
      }
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
