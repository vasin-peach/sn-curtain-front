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
              <div>
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
              </div>
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
                    :class="{'active': chat.room == chats.room }"
                    :ref="chat.room"
                    v-show="isChatOpen && chats.list"
                    v-for="(chat, index) in chats.list"
                    :key="chat._id"
                    @click="triggerActiveChatList(chat)"
                    :style="{'background-image': 'url(' + (chat.author[0].image || '/static/images/lazy/lazyload.svg') + ')'}"
                  >
                    <span></span>
                    <!-- <div
                      class="chat-list-remove color-red1"
                      v-show="chats.list.length != 1"
                      @click="removeChat(index)"
                    >
                      <font-awesome-icon
                        icon="times"
                        aria-hidden="true"
                      />
                    </div> -->
                    <div
                      class="chat-list-alert color-red1"
                      v-show="chat.alert"
                    >
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
      socket: io(`${process.env.BACKEND_IP}`),
      chats: {
        room: null,
        data: null,
        list: []
      },
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
        room: this.chats.room,
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

    removeChat(index) {
      this.chats.list.splice(index, 1);
    },

    // * Change author id to 'me'
    async idToMe() {
      // check chat data
      if (_.isEmpty(this.chats.data)) return false;

      await this.chats.data.map((items, indexs) => {
        items.msg.map((item, index) => {
          if (this.uid == item.author)
            this.chats.data[indexs].msg[index].author = "me";
        });
      });

      return true;
    },

    // * Create chat list
    async chatList() {
      if (_.isEmpty(this.chats.data)) return false;

      this.chats.list = await this.chats.data.map((items, index) => {
        // [bug] index not working
        return {
          room: items._id,
          index: index,
          author: items.author,
          alert: false
        };
      });
    },
    // * [Trigger] Chat Group
    async triggerActiveChatList(list) {
      let prev = this.chats.data[0];
      let next = this.chats.data[list.index];

      this.messageList = await this.chats.data[list.index].msg;
      this.chats.list[list.index].alert = false;
      this.chats.room = list.room;
      this.scrollToBottom();
    },
    async triggerChatGet() {
      // get chat
      this.chats.data = await this.chatGet(this.uid);

      // init idToMe
      await this.idToMe();

      // init chat list
      await this.chatList();

      // init room to index [0]
      if (!_.isEmpty(this.chats.data)) this.chats.room = this.chats.data[0]._id;

      // init messageList from chats index [0]
      if (!_.isEmpty(this.chats.data)) {
        this.messageList = this.chats.data[0].msg;
        this.scrollToBottom();
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
    },
    scrollToBottom() {
      // validate

      this.$nextTick(() => {
        $(function() {
          let target = $(".sc-message-list");
          $(".sc-message-list").scrollTop(
            $(".sc-message-list")[0].scrollHeight
          );
        });
      });
    }
  },

  // ! WATCH
  watch: {},

  // ! MOUNTED
  async mounted() {
    // get localStorage
    if (localStorage.basket)
      this.basketUpdate(JSON.parse(localStorage.getItem("basket")));

    // init uid
    this.uid = this.userData
      ? this.userData._id
      : "_" +
        Math.random()
          .toString(36)
          .substr(2, 9) +
        "_" +
        Date.now().toString();

    // call GuestGet
    await this.triggerGuestGet();

    // call ChatGet
    await this.triggerChatGet();

    // on chat update
    this.socket.on("chat guest updated", async data => {
      // chat message id is match uid
      if (data.author.findIndex(author => author.id == this.uid) >= 0) {
        // update room
        if (!this.chats.room) this.chats.room = data._id;

        // update new data --> unshift chat object
        if (this.chats.data.findIndex(item => item._id == data._id) < 0) {
          this.chats.data.unshift(data);
        }

        // update chat list
        await this.chatList();

        // update old data --> message
        const updateIndex = this.chats.data.findIndex(
          list => list._id == data._id
        );
        this.chats.data[updateIndex].msg = data.msg;

        // update chat message room match data._id
        if (this.chats.room == data._id) {
          this.messageList = data.msg;
          this.scrollToBottom();
        } else {
          const alertIndex = this.chats.list.findIndex(
            list => list.room == data._id
          );
          this.chats.list[alertIndex].alert = true;
        }

        // init idToMe
        await this.idToMe();
      }
    });
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["basketData", "userData"])
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
