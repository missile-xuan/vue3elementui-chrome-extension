const testComponent = {
  template:`
    <el-slider v-model="test"></el-slider>
    <div>{{text}}</div>
    <div>{{number}}</div>
    <el-button type="info" plain>{{text}}</el-button>
    <el-button type="info" @click="axiosRun" plain>接口请求</el-button>
  `,
  data(){
    return{
      test:1,
      text:'成了',
      number:commonUtils.formatNum(111.111,1)
    }
  },
  methods:{
    // 请求测试
    axiosRun(){
      axios.post('/langdetect', {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
    }
  }
}