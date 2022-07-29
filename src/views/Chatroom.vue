<template>
  <div class="container">
    <Navbar />
    <ChatWindow :messages="messages" />
    <NewChatForm @connectCable="connectCable" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import NewChatForm from "../components/NewChatForm";
// チャットメッセージ作成用ライブラリ読み込み
import ActionCable from "actioncable";
import axios from "axios";

export default {
  components: { Navbar, ChatWindow, NewChatForm },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    async getMessages() {
      try {
        const res = await axios.get("http://localhost:3000/messages", {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        if (!res) {
          new Error("メッセージ一覧を取得できませんでした");
        }
        this.messages = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    connectCable(message) {
      this.messageChannel.perform("receive", {
        message: message,
        email: window.localStorage.getItem("uid"),
      });
    },
  },
  mounted() {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    // メッセージチャンネルと常時接続状態にする
    this.messageChannel = cable.subscriptions.create("RoomChannel", {
      // チャンネル接続時に実行
      connected: () => {
        this.getMessages();
      },
      // サーバーからデータが送られてきた時に実行
      received: () => {
        this.getMessages();
      },
    });
  },
  // ページ遷移などの場合にチャンネルとの接続を切断する
  beforeUnmount() {
    this.messageChannel.unsubscribe();
  },
};
</script>

<style scoped>
</style>