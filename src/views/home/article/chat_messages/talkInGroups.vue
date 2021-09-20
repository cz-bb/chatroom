  <template>
  <div class="to_groups">
    <div class="talk_content">
      <div class="groups_items" v-for="item in groups_list" :key="item.ID" :name="item.chatroomname">
        <div :class="item.chatroomname+'_show'" ></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      groups_list: []
    };
  },
  props: {
    talkto: String
  },
  created() {
    axios({
      url: "http://localhost:8000/groups",
      params: {
        user_name: this.$route.query.user_name
      }
    })
      .then(res => {
        // console.log("messages",res.data);
        this.groups_list = res.data;
        // console.log(this.groups_list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
@import url("../../../../assets/css/home/article/article_item/talkInGroups.css");
</style>