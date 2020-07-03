<template>
  <div>
    <el-button type="primary" size="small" v-on:click="query">查询</el-button>
    <!--查询表单-->
    <el-form :model="params" >
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <!--此处添加的router是为了将按钮路由到一个页面,并将两个参数添加进路由中-->
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{
          page:this.params.page,
          siteId:this.params.siteId
      }}">
        <el-button type="primary" size="small" v-on:click="query">新增页面</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
      <template slot-scope="page">
        <el-button
        size="small"type="text"
        @click="edit(page.row.pageId)">编辑
        </el-button>
        <el-button
          size="small"type="text"
          @click="del(page.row.pageId)">删除
        </el-button>
        <el-button @click="preview(page.row.pageId)" type="text" size="small">页面预览</el-button>
        <el-button
        size="small" type="primary" plain @click="postPage(page.row.pageId)">发布
        </el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
  import * as CmsApi from "../api/cms"
  /*编写页面静态部分，即model及vm部分。*/
  export default {
    data() {
      return {
        siteList:[],
        tableData: [],
        total: 0,
        params: {
          page: 1,
          size: 10,
          siteId:"",
          pageAliase:""
        }
      }
    },
    methods: {
      query: function () {
        CmsApi.page_list(this.params.page, this.params.size,this.params).then((result) => {
          //回调函数中将数据填充至模型中
          this.tableData = result.queryResult.list;
          this.total = result.queryResult.total;
        })
      },
      changePage: function (page) {
        // alert(page)
        this.params.page = page;
        this.query();
      },
      edit: function(pageId){
        //打开修改页面
        this.$router.push({
          path: "/cms/page/edit/"+ pageId
        })
      },
      del:function(pageId){
        //删除数据
        this.$confirm("您确认删除数据么？","提示",{}).then(() => {
          CmsApi.page_del(pageId).then((res) => {
              if(res.success){
                this.$message.success("删除成功")
                //刷新页面,重新查询即可
                this.query();
              }else {
                this.$message.error("删除失败")
              }
          })
        })
      },
      preview:function(pageId){
        window.open("http://www.xuecheng.com/cms/preview/" + pageId);
      },
      postPage (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {
        }).then(() => {
          CmsApi.page_postPage(pageId).then((res) => {
            if(res.success){
              console.log('发布页面id='+pageId);
              this.$message.success('发布成功，请稍后查看结果');
            }else{
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
        });
      }
    },
    created(){
        //在页面渲染之前，将page参数传入，保证在页面渲染之后还是原来的页面
        this.params.page = Number.parseInt(this.$route.query.page || 1);
        this.params.siteId = this.$route.query.siteId || "";
    },
    mounted(){
      this.query();

      //初始化站点列表，在钩子方法中添加静态的站点选项
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
