<template>
  <t-popup expand-animation placement="bottom-right" trigger="click">
    <template #content>
      <div class="header-msg">
        <div class="header-msg-top">
          <p>好友申请通知</p>
          <t-button v-if="unreadMsg.length > 0"
                    class="clear-btn"
                    theme="primary"
                    variant="text"
                    @click="setRead('all')">
            清空
          </t-button
          >
        </div>
        <t-list v-if="unreadMsg.length > 0" :split="false" class="narrow-scrollbar">

          <t-list-item v-for="(item, index) in unreadMsg" :key="index">
            <t-list-item-meta :image="item.fromUserAvatar"
                               :title="item.fromUserNickName"
                               :description="item.applyContent" />
            <p class="msg-time">{{ item.createTime }}</p>
            <template #action v-if="item.applyStats==='0'">
              <t-button size="small" variant="outline" @click="handleApply(item.applyUuid,'2')"> 拒绝</t-button>

              <t-button size="small" variant="outline" @click="handleApply(item.applyUuid,'1')"> 同意</t-button>
            </template>
            <template #action v-if="item.applyStats==='1'">
              <span>已同意</span>
            </template>
            <template #action v-if="item.applyStats==='2'">
              <span>已拒绝</span>
            </template>

          </t-list-item>
        </t-list>

        <div v-else class="empty-list">
          <img alt="空" src="http://klns.oss-cn-beijing.aliyuncs.com/files/2023/05/24/51106135947608064.png"/>
          <p>暂无好友申请</p>
        </div>
        <div class="header-msg-bottom">
          <t-button
              v-if="unreadMsg.length > 0"
              block
              class="header-msg-bottom-link"
              theme="default"
              variant="text"
              @click=""
          >查看全部
          </t-button
          >
        </div>
      </div>
    </template>
    <t-badge style="margin-left: 0.5vw" :count="unreadMsg.length" :offset="[4, 4]">
      <t-button shape="square" theme="default" variant="text">
        <t-icon name="mail"/>
      </t-button>
    </t-badge>
  </t-popup>
</template>

<script setup>
import {getFriendApplyList} from "@/api/user/friend.js";

const unreadMsg = ref([])

onMounted(() => {
  if (localStorage.getItem("session_token")) {
    getApplyList()
  }
})

//获取所有的好友申请
function getApplyList() {
  getFriendApplyList().then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      unreadMsg.value = resp.data
      console.log(unreadMsg.value)
    }
  });
}
//处理好友申请
function handleApply(applyUuid, applyStats) {
  console.log(applyUuid, applyStats)
  let data={

  }

  //处理好友申请
  // handleFriendApply().then((res) => {
  //   let resp = res.data;
  //   console.log(resp)
  //   if (resp.code === 200) {
  //     unreadMsg.value = resp.data
  //     console.log(unreadMsg.value)
  //   }
  // });
}


</script>

<style lang="less" scoped>
.header-msg {
  width: 400px;
  // height: 440px;
  margin: calc(0px - var(--td-comp-paddingTB-xs)) calc(0px - var(--td-comp-paddingLR-s));

  .empty-list {
    height: calc(100% - 120px);
    text-align: center;
    padding-top: 135px;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);

    img {
      width: var(--td-comp-size-xxxxl);
    }

    p {
      margin-top: var(--td-comp-margin-xxl);
    }
  }

  &-top {
    position: relative;
    font: var(--td-font-title-medium);
    color: var(--td-text-color-primary);
    text-align: left;
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-xl) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .clear-btn {
      right: calc(var(--td-comp-paddingTB-l) - var(--td-comp-paddingLR-xl));
    }
  }

  &-bottom {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-s);
    border-top: 1px solid var(--td-component-stroke);

    &-link {
      text-decoration: none;
      cursor: pointer;
      color: var(--td-text-color-placeholder);
    }
  }

  .t-list {
    height: calc(100% - 104px);
    padding: var(--td-comp-margin-s) var(--td-comp-margin-s);
  }

  .t-list-item {
    overflow: hidden;
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
    border-radius: var(--td-radius-default);
    font: var(--td-font-body-medium);
    color: var(--td-text-color-primary);
    cursor: pointer;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: var(--td-bg-color-container-hover);

      .msg-content {
        color: var(--td-brand-color);
      }

      .t-list-item__action {
        button {
          bottom: var(--td-comp-margin-l);
          opacity: 1;
        }
      }

      .msg-time {
        bottom: -6px;
        opacity: 0;
      }
    }

    .msg-content {
      margin-bottom: var(--td-comp-margin-s);
    }

    .msg-type {
      color: var(--td-text-color-secondary);
    }

    .t-list-item__action {
      button {
        opacity: 0;
        right: var(--td-comp-margin-xxl);
        bottom: -6px;
      }
    }

    .msg-time {
      transition: all 0.2s ease;
      opacity: 1;
      position: absolute;
      right: var(--td-comp-margin-xxl);
      bottom: var(--td-comp-margin-l);
      color: var(--td-text-color-secondary);
    }
  }
}
</style>
