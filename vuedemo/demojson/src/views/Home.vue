<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-autocomplete 
    v-model="statu" 
    style="margin-right: 20%;"
    :fetch-suggestions="querySearchAsync" 
    placeholder="请输入内容" 
    @select="handleSelect">
    </el-autocomplete>
    <el-button @click="addClick()" type="text" size="small">添加</el-button>
    <el-table :data="usersdata" style="width: 60%;margin: 0 auto;">
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="imgurl" label="照片">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="scope.row.imgurl" alt="" style="width: 150px;height: 150px">
            <img slot="reference" :src="scope.row.imgurl" style="width: 30px;height: 30px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="changeClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" ref="uploadElement" prop="imgurl">
          <el-input v-model="form.imgurl" v-if="false"></el-input>
          <el-upload class="avatar-uploader" ref="upload" :show-file-list="false" action="/api/users"
            :before-upload="beforeUpload" :on-change="handleChange" :auto-upload="false" :data="form">
            <img v-if="form.imgurl" :src="form.imgurl" style="width: 80px; height: 80px;" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(form)">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="accuseitem">
        <el-form-item label="name">
          <el-input v-model="accuseitem.name" autocomplete="off">{{accuseitem.name}}</el-input>
        </el-form-item>
        <el-form-item label="age">
          <el-input v-model="accuseitem.age" autocomplete="off">{{accuseitem.age}}</el-input>
        </el-form-item>
        <el-form-item label="上传图片" ref="uploadElement" prop="imgurl">
          <el-input v-model="accuseitem.imgurl" v-if="false"></el-input>
          <el-upload class="avatar-uploader" ref="upload" :show-file-list="false" action="/api/users"
            :before-upload="beforeUpload" :on-change="editChange" :auto-upload="false" :data="accuseitem">
            <img v-if="accuseitem.imgurl" :src="accuseitem.imgurl" style="width: 80px; height: 80px;" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  // import index from '@/server/index.js'
  export default {
    name: 'Home',
    data() {
      return {
        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          name: "",
          age: "",
          imgurl: ""
        },
        accuseitem: [],
        usersdata: []
      }
    },
    components: {
      HelloWorld
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.axios.get('/api/users').then(res => {
          // console.log(res)
          this.usersdata = res.data;
        })
          .catch(err => {
            console.log(err)
          })
      },
      deleteClick(row) {
        console.log(row)
        this.axios.delete('/api/users/' + row.id).then(res => {
          this.getData()
          // console.log(res)
        })
          .catch(err => {
            console.log(err)
          })
      },
      changeClick(obj) {
        this.accuseitem = obj
        this.dialogFormVisible = true
      },
      edit() {
        let obj = this.accuseitem
        this.dialogFormVisible = false;
        this.axios.patch(`/api/users/${obj.id}`, obj)
          .then(res => {
            this.getData()
            // console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      addClick() {
        this.dialogVisible = true
      },
      save(obj) {
        this.dialogVisible = false
        this.axios.post('/api/users', obj).then(res => {
          this.getData()
          // console.log(res)
        })
          .catch(err => {
            console.log(err)
          })
      },
      //头像上传
      handleChange(file, fileList) {
        this.form.imgurl = URL.createObjectURL(file.raw);
      },
      editChange(file, fileList) {
        this.accuseitem.imgurl = URL.createObjectURL(file.raw);
      },
      beforeUpload(file) {
        return true;
      },
    }
  }
</script>