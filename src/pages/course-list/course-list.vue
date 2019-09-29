<template>
  <div class="course-list">
    <div v-show="$route.name==='course-list'" class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="课程名称" class="base-search" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="课程列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
        <router-link tag="div" :to="{path:'course-edit'}" append>
          <base-button type="primary" plain addIcon>新建课程</base-button>
        </router-link>
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list" :key="i" class="list-content list-box">
                <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">
                  <base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="upDownHandle(item,i)"></base-switch>
                  <div v-else-if="val.type === 'operate'">
                    <router-link tag="span" :to="{path:'course-edit', query:{id: item.id}}" append class="list-operation">编辑</router-link>
                    <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                  </div>
                  <template v-else>
                    <div class="item-text">{{item[key]}}</div>
                  </template>
                </div>
              </div>
            </template>
            <base-blank v-else></base-blank>
          </div>
          <div class="pagination-box">
            <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
          </div>
        </div>
      </div>
    </div>
    <router-view @update="updatePage"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  const PAGE_NAME = 'COURSE_LIST'
  const TITLE = '课程列表'

  const LIST_HEADER = {
    name: {
      name: '商品名称',
      before: {
        img: 'goods_cover_image'
      }
    },
    created_at: { name: '创建时间' },
    status: { name: '状态', type: "switch" },
    operate_text: { name: '操作', type: "operate", style: 'max-width: 99px; padding-right: 0' }
  }

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        list: [],
        statusList: [],
        total: 0,
        filter: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([API.Course.getCourseList({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
        },
        loading: true
      }), API.Course.getCourseStatus({
        data: {
          keyword: '',
        }
      })]).then(res => {
        next(vw => {
          vw.setData(res[0])
          vw.setStatus(res[1])
        })
      })
    },
    methods: {
      updatePage() {
        this._getList()
        this._getStatus()
      },
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      setStatus(res) {
        this.statusList = res.data
      },
      _getStatus() {
        API.Course.getCourseStatus({
          data: {
            keyword: this.filter.keyword
          }
        }).then(res => {
          this.statusList = res.data
        })
      },
      _getList() {
        API.Course.getCourseList({
          data: this.filter
        }).then(res => {
          this.setData(res)
        })
      },
      statusChange(val) {
        this.filter.page = 1
        this.updatePage()
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm({text: `确定要删除`}).then(() => {
          API.Course.courseDel({data: {id: item.id}, loading: false})
            .then(res => {
              this.$toast.show('课程删除成功')
              this.updatePage()
            })
        })
      },
      searchBtn(val) {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange(val) {
        this._getList()
      },
      upDownHandle(item, index) {
        let status = +item.status === 1 ? 0 : 1
        let text = +item.status === 1 ? '下架' : '上架'
        this.$confirm.confirm({text: `确定要${text}`}).then(() => {
          API.Course.courseUpDown({data: {status, id: item.id}})
            .then(res => {
              this.$toast.show(`课程${text}成功`)
              this.updatePage()
            })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-list
    position: relative
    width: 100%
    display: flex
    flex-direction: column

  .content-wrap
    flex: 1
    display: flex
    flex-direction: column
  .base-search
    margin-left: 0
  .list-item
    display: flex

    .item-text
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
</style>