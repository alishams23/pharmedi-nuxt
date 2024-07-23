<template>
    <div class="h-full" style="min-height: 100%; max-height: 100%; height: 100%">
      <div class="d-flex flex-row h-full lg:bg-white border mt-[20px] sm:mt-[60px] md:mt-[60px] lg:mt-0 p-0"
        style="min-height: 100%; max-height: 100%; height: 100%">
        <!-- left message-->
  
        <div class="col-lg-3 col-md-12 col-12 bg-white border-r h-full pb-5 scrollBarStyleSmall"
          v-bind:class="phoneSize != true ? 'd-none d-lg-block' : ''"
          style="min-height: 100%; max-height: 100%; overflow-y: scroll">
          <div class="pt-5 d-block d-sm-none"></div>
  
          <!-- search-->
          <!-- <div class="border-b px-4 py-4 ">
            <div class="bg-gray-100 input-with-icon rounded-md ">
              <input id="autocomplete-input" type="text" placeholder="Search"
                class="bg-transparent max-h-10 shadow-none " />
              <i class="icon-material-outline-search"></i>
            </div>
          </div> -->
  
          <!-- user list-->
  
          <div>
            <ul class="px-2" v-if="loadingListUserMessage == false">
              <button v-on:click="checkClick1(person)" v-for="person in persons"
                v-bind:key="person['user']['username'] + 'persons-chat'" style="min-height: 0px !important"
                class="col-12 d-flex align-items-center p-4 mt-2 hover:bg-gray-100 rounded-10 btn-material" v-bind:class="user['username'] == person['user']['username']
            ? 'bg-gray-100    '
            : ''
            ">
                <div class="w-10 h-10 rounded-2xl">
                  <img v-if="person['user']['image'] != null" v-bind:src="person['user']['image']"
                    class="cover w-full h-full rounded-2xl shadow-lg" />
                  <img v-if="person['user']['image'] == null" src="@/assets/inside/avatar.jpg"
                    class="cover w-full h-full rounded-2xl shadow-lg" />
                </div>
                <div class="flex-1 min-w-0 relative text-gray-500 px-3">
                  <h4 class="text-black irsa truncate d-flex align-items-center justify-content-around">
                    {{ person["user"]["get_full_name"] }}
                    <div
                      class="rounded-pill d-flex align-items-center justify-content-around h-8 w-8 bg-treaget text-white"
                      v-if="person['number'] != 0">
                      {{ person["number"] }}
                    </div>
                  </h4>
                  <p class="irsa truncate">{{ person["user"]["bio"] }}</p>
                </div>
              </button>
            </ul>
            <div class="d-flex flex-column align-items-center mt-5" v-if="loadingListUserMessage == true">
              <span class="loader"></span>
            </div>
          </div>
          <div class="pt-5 d-block d-sm-none"></div>
        </div>
  
        <!--  message-->
        <div class="col-lg-9 col-md-12 col-12 bg-white h-full">
          <div class="pt-5 d-block d-sm-none"></div>
          <div v-if="user == ''" class="pt-5 mt-5 px-5">
            <div class="d-flex align-items-center justify-content-center">
              <div>گفت و گوی جدیدی را آغاز کنید</div>
            </div>
          </div>
          <div class="px-3 pb-3 pt-2 d-flex flex-row align-items-center border-b" v-if="phoneSize == false">
            <div class="d-block d-lg-none col-2" v-on:click="phoneSize = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
              </svg>
            </div>
            <nuxt-link :to="'/' + user.username" class="flex items-center space-x-3 col-10" v-if="user != ''">
              <div class="h-10 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg w-10">
                <img v-if="user['image'] != null" v-bind:src="user['image']" alt="" class="rounded-2xl" />
  
                <img v-if="user['image'] == null" src="@/assets/inside/avatar.jpg" alt="" class="rounded-2xl" />
              </div>
              <div class="flex-1 min-w-0 relative text-gray-500">
                <h4 class="irsa text-sm text-black">
                  {{ user.get_full_name }}
                </h4>
              </div>
            </nuxt-link>
          </div>
  
          <div class="border-top1 h-full" v-bind:class="phoneSize == true ? 'd-none d-lg-block' : ''">
            <div class="lg:p-8 p-0 h-full">
              <!-- my message-->
  
              <div style="height: 100%; overflow-y: scroll; padding-bottom: 130px" 
                class="d-flex scrollBarStyleSmall flex-column justify-content-between"  id="messages-list">
                <div >
                  <div v-show="message.length != 0" v-bind:class="data.author.username == userSelf ? 'flex-row-reverse' : ''
            " class="flex m-3 lg:items-center" v-for="data in message" v-bind:key="data.id + 'message-chat'">
                    <div class="w-8 h-8 d-none d-sm-block"></div>
                    <div class="py-2 px-3 rounded-2xl relative h-full" v-bind:class="data.author.username == userSelf
            ? 'text-white bg-treaget shadow-lg text-right '
            : 'text-gray-700  shadow-lg border-t text-right relative '
            ">
                      <div>{{ data.text }}</div>
                      <div>
                        <div v-if="data.read == true">
                          <svg v-if="data.author.username == userSelf" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                            <path
                              d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                          </svg>
                        </div>
                        <div v-else>
                          <svg v-if="data.author.username == userSelf" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                            <path
                              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref="inputSendMessage" class="inputSendMessage px-3 pb-[30px] md:pb-3" v-if="user != '' && loadingGetMessage == false"
                  style="position: sticky; bottom: 0px">
                  <div class="d-flex align-items-center flex-row justify-content-between" v-show="user != ''">
                    <input placeholder="Your Message.." type="text" v-model="inputData" 
                    v-on:keyup.enter="sendMessage()"
                    style="
                        word-break: break-all;
                        border-radius: 30px !important;
                      " class=" rtl bg-gray-200 placeholder:text-gray-500 shadow-none" />
                    <div class="d-flex align-items-center px-2">
                      <button id="text-submit" type="submit" @click="scrollMessage()"
                        class="bg-gradient-blue d-flex align-items-center justify-content-center rounded-full shadow-2 w-10 h-10 text-white">
                        <i class="fa fa-paper-plane text-white"></i>
                      </button>
                    </div>
                  </div>
                  <div class="pb-5 mb-1 d-block d-sm-none"></div>
                </div>
              </div>
  
              <div class="d-flex flex-column align-items-center pt-5" v-if="loadingGetMessage == true">
                <span class="loader"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Empty from "~/components/empty.vue";
  import axios from "axios";
  export default {
   
    data() {
      return {
        loadingListUserMessage: true,
        persons: [],
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
        message: [],
   
        inputData: "",
        windowHeight: 360,
        // window.innerHeight -
        user: "",
        userSelf: this.$store.state.username,
        phoneSize: true,
        scrollTag: { childElementCount: 1 },
        scrollStatus: true,
        counter: 0,
        userUrl: "",
  
        setInterval1: null,
        setInterval2: null,
        setInterval3: null,
        setInterval4: null,
        loadingGetMessage: false,
      };
    },
    methods: {
      async ListUserMessageApi() {
        var result;
        await axios
          .get("https://pharmedi.ir/api/chat/ListUserMessageApi/", {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization:
                this.$store.state.token != ""
                  ? `Token ${this.$store.state.token}`
                  : "",
            },
          })
  
          .then((response) => {
            this.persons = response.data;
            this.loadingListUserMessage = false;
          });
      },
      async sendMessage() {
        await fetch("https://pharmedi.ir/api/chat/MassageApi/", {
          method: "put",
          credentials: "same-origin",
          headers: this.headers,
          body: JSON.stringify({
            sender: this.userSelf,
            receiver: this.user["username"],
            text: this.inputData,
          }),
        });
        this.inputData = "";
        await this.getMessage();
        await this.$nextTick(() => {
          this.scrollStatus = true
          this.counter += 1
          this.scrollMessage();

          })
      },
      async getMessage() {
    
        this.message = [];
        this.loadingGetMessage = true;
        await fetch(
          `https://pharmedi.ir/api/chat/AllMassageApi/?user=${this.user["username"]}`,
          {
            headers: this.headers,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            this.message = data;
            this.loadingGetMessage = false;
         
          });
        
     
        
      },
      
      async getUserApi() {
      
       let data = await fetch(
        `https://pharmedi.ir/api/account/user_retrieve/${this.$route.query.usernameParams}/`,
        { headers: this.headers }
      )
        
        return data.json()
    },
      async getMessageRepeat() {
        await fetch(
          `https://pharmedi.ir/api/chat/AllMassageApi/?user=${this.user["username"]}`,
          {
            headers: this.headers,
          }
        )
          .then((response) => response.json())
          .then((data) => {

            let previous_id = this.message.length > 0 ? this.message.slice(-1)[0].id : 0
            this.message = data;
            if (this.message.slice(-1)[0].id!= previous_id) {
              this.$nextTick(() => {
            this.scrollMessage();
          })
            }
          });
        this.setInterval2 = setInterval(() => {
          if (this.$route.name != "t-Chat") {
            clearInterval(this.setInterval2);
          }
        
        }, 5000);
      },
      wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
          end = new Date().getTime();
        }
      },
      scrollMessage() {
       
            var myDiv = document.getElementById("messages-list");
            myDiv.scrollTop = myDiv.scrollHeight;
            this.scrollStatus = false;
         
      },
     
      async userClick(info) {
        this.counter = 0;
        this.user = info;
        await this.getMessageRepeat();
        this.$nextTick(() => {
            this.scrollMessage();
          })
        this.setInterval3 = setInterval(() => {
          if (this.$route.name != "t-Chat") {
            clearInterval(this.setInterval3);
          }
          this.getMessageRepeat();
        }, 7000);
        
      },
  
      checkClick1(person) {
        if (this.user["username"] != person["user"]["username"]) {
          this.userClick(person["user"]);
          this.phoneSize = false;
        }
      },
    },
    destroyed() {
      clearInterval(this.setInterval1);
      clearInterval(this.setInterval2);
      clearInterval(this.setInterval3);
      clearInterval(this.setInterval4);

},
    async mounted() {

      if (this.$route.query.usernameParams != null) {
        this.usernameParams = this.$route.query.usernameParams
        console.log(`${this.usernameParams["username"]}`)
    

        this.checkClick1({ user: await this.getUserApi() });
      }
      
      await this.ListUserMessageApi();

      this.setInterval4 = setInterval(() => {
        if (this.$route.name != "t-Chat") {
          clearInterval(this.setInterval4);
        }
        this.ListUserMessageApi();
      }, 4000);
    },
    components: { Empty },
  };
  </script>
  
  <style scoped></style>
  