<template>
  <div class="login">
    <van-image :src="require('assets/img/login/login.jpg')"></van-image>

    <!-- 登录和注册 的包裹容器 -->
    <div class="container">
      <van-tabs
        v-model="switch_mark"
        color="#7EB6FF"
        animated
        border
        ellipsis
        title-inactive-color="#999"
        @change="onChangeTabs"
      >
        <!-- 登录功能-->
        <van-tab title="登录">
          <van-form ref="loginform_ref" :show-error="false">
            <van-field
              v-model="loginform.account"
              label="账号"
              placeholder="请输入用户名/手机号"
              maxlength="18"
              required
              clearable
              clear-trigger="always"
              name="account"
              :rules="[{ required: true, message: '用户名不能为空!' }]"
              @input="isChange"
            />
            <van-field
              v-model="loginform.password"
              label="密码"
              placeholder="请输入密码"
              type="password"
              maxlength="18"
              required
              clearable
              clear-trigger="always"
              name="password"
              :rules="[{ required: true, message: '密码不能为空!' }]"
              @keyup="enterSubmit"
            />

            <div class="login-log">
              <van-checkbox v-model="loginform.memory" shape="square"
                >记住密码</van-checkbox
              >
              <div class="forget" @click="onForget">忘记密码?</div>
            </div>

            <div class="login-btn">
              <van-button
                type="info"
                text="登录"
                size="large"
                @click="login"
              ></van-button>
            </div>
          </van-form>
        </van-tab>

        <!--    注册功能    -->
        <van-tab title="注册">
          <van-form
            ref="regform_ref"
            :show-error="false"
            validate-trigger="onBlur"
          >
            <van-field
              v-model="regform.username"
              label="用户名"
              placeholder="请输入用户名"
              type="text"
              maxlength="18"
              required
              clearable
              clear-trigger="always"
              name="username"
              :rules="[
                { required: true, message: '用户名不能为空!' },
                {
                  validator: checkUsername,
                  message: '字母开头, 2~15的数字和字母组成',
                },
              ]"
            />
            <van-field
              v-model="regform.tel"
              label="手机号码"
              placeholder="请输入手机号"
              type="number"
              maxlength="18"
              required
              clearable
              clear-trigger="always"
              name="tel"
              :rules="[
                { required: true, message: '手机号不能为空!' },
                { validator: checkMobile, message: '手机号格式不正确' },
              ]"
            />

            <van-field
              v-model="regform.telcode"
              label="验证码"
              placeholder="请输入验证码"
              type="number"
              maxlength="8"
              required
              clearable
              clear-trigger="always"
              name="telcode"
              :rules="[{ required: true, message: '验证码不能为空!' }]"
            >
              <template #button>
                <van-button
                  v-if="able"
                  size="small"
                  type="info"
                  @click="getVerify()"
                  >获取验证码</van-button
                >
                <div v-else class="mytime">
                  <van-count-down
                    :time="60 * 1000"
                    format="ss 秒"
                    @finish="onFinish"
                  />
                </div>
              </template>
            </van-field>

            <van-field
              v-model="regform.pwd"
              label="密码"
              placeholder="请输入密码"
              type="password"
              maxlength="24"
              required
              clearable
              clear-trigger="always"
              name="password"
              :rules="[
                { required: true, message: '密码不能为空!' },
                {
                  validator: checkPwd,
                  message: '字母开头, 8~18的数字和字母组成',
                },
              ]"
            />
            <van-field
              v-model="regform.re_pwd"
              label="确认密码"
              placeholder="请再次输入密码"
              type="password"
              maxlength="24"
              required
              clearable
              clear-trigger="always"
              name="repassword"
              :rules="[
                { required: true, message: '密码不能为空!' },
                {
                  validator: checkPwd,
                  message: '字母开头, 8~18的数字和字母组成',
                },
              ]"
            />

            <div class="reg-log">
              <van-checkbox
                v-model="regform.agree"
                shape="square"
                @change="isAgree"
                ><span class="read-agree">已阅读并且同意</span></van-checkbox
              >
              <div class="contract" @click="onContract">
                《慧业通云服务平台条款》
              </div>
            </div>

            <div class="reg-btn">
              <van-button
                type="info"
                text="下一步"
                size="large"
                @click="regSubmit()"
              ></van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>

      <!-- 扫码注册的弹窗 -->
      <van-dialog
        v-model="show_agent"
        title="扫码"
        width="300px"
        message="是否扫码,代理注册?"
        show-cancel-button
        confirm-button-color="#7EB6FF"
        get-container=".login"
        @confirm="onConfirm"
      >
      </van-dialog>

      <!-- 第二步登录: 选择以哪个角色进入的弹窗 -->
      <van-dialog
        v-model="show_sid"
        title="选择登录角色"
        width="315px"
        message="选中以哪个角色进入?"
        show-cancel-button
        confirm-button-color="#7EB6FF"
        get-container=".login"
        @confirm="onChoose"
      >
        <template #default>
          <van-radio-group
            v-model="sid"
            icon-size="25px"
            checked-color="#7EB6FF"
          >
            <van-radio
              v-for="(item, index) in user_list"
              :key="index"
              :name="item.sid"
              >{{ item.comname }}</van-radio
            >
          </van-radio-group>
        </template>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import {
  loginHyt,
  loginChoose,
  getVerifyReg,
  submitNextReg,
  getVersion,
} from "network/login";
import { SETUN, SETPWD, SETTEL, LOGIN, SETMEM } from "@/store/mutype";

export default {
  name: "Login",
  data() {
    return {
      switch_mark: null, // 标识符
      show_agent: false, // 是否显示扫码注册的弹窗
      show_sid: false, // 是否显示选择角色的弹窗
      user_list: "", // 当status==25,返回回来的用户集合
      sid: "", // 当status==25,返回回来的用户id

      able: true, // 获取验证码的按钮是否可用
      loginform: {
        // 登录的表单
        account: "",
        password: "",
        memory: false, // 是否记住密码
      },
      regform: {
        // 注册的表单
        username: "",
        tel: "",
        telcode: null, // 用户输入的验证码
        validateCode: null, // 系统发的验证码
        pwd: "",
        re_pwd: "",
        agree: false, // 是否同意条款
      },
      ver_online: "", // app线上版本
      ver_local: "", // app本地版本
    };
  },
  methods: {
    //下载之前检测是否已经存在旧的安装包
    checkisexistence(){
      this.loadingtoast = Toast.loading({
          message: '下载中...',
          forbidClick: true,
          duration:0
      });
      if(!window.plus){
          return
      }
      let filename = '防火单位工程端.apk',
      relativePath = "_downloads/" + filename,
      that = this;
      //检查文件是否已存在
      plus.io.resolveLocalFileSystemURL(relativePath, 
          function(entry) {
              //如果文件存在则删除该文件
              plus.io.resolveLocalFileSystemURL(relativePath, function(entry2) {
                  entry2.remove(function(entry2) {
                      console.log("文件删除成功==" + relativePath);
                      that.download()
                  }, function(e) {
                      console.log("文件删除失败=" + relativePath);
                  });
              });
          },
          function(e) {
              console.log("文件不存在,联网下载=" + relativePath);
              //如果文件不存在,则去下载
              that.download()
          }
      )

    },
    //下载并安装
    download() {
      let that = this;
      this.apk_name = '防火单位工程端.apk';
      var dtask = plus.downloader.createDownload(this.versionResult.appPath, 
          {
              filename:"_downloads/"+this.apk_name    //利用保存路径
          }  , function(d, status){
          // 下载完成
          if(status == 200){ 
              console.log("Download success: " + d.filename);
              //下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
              var fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
              console.log("fileSaveUrl",fileSaveUrl)
              localStorage.clear();
              that.loadingtoast.clear();
              plus.runtime.install(fileSaveUrl, {}, 
                  function onSuccess(widgetInfo){
                      console.log('安装成功',widgetInfo)
                  }, function onError(error){
                      console.log('安装error',error)
                  }
              );
          } else {
              console.log("Download failed: " + status); 
              plus.downloader.clear();
          }  
      });
      dtask.start(); 
    },
    
    // ===================登录页 相关函数=============================================================
    isChange() {
      // @input 账号输入框发生改变触发函数
      let pwd = window.localStorage.getItem(
        "password" + this.loginform.account
      );
      if (pwd) {
        this.loginform.password = pwd;
        this.loginform.memory = true;
      }
      // 如果用vuex做,, 如下:
      // let stat  = this.$store.memory.some((value,index) => {
      //   console.log(value)
      //   if(value.ant == this.loginform.account) { this.loginform.password = value.pwd}
      //   return value == this.loginform.account
      // })
    },
    onForget() {
      // 忘记密码
      console.log("跳转到忘记密码的页面");
      this.$router.push("/forget"); // 编程式导航
    },
    login() {
      // 点击登录按钮
      this.$refs.loginform_ref.validate().then(() => {
        // 发起网络请求
        loginHyt(this.loginform.account, this.loginform.password)
          .then((res) => {
            if (res.status == 100)
              return this.$toast({
                type: "fail",
                position: "middle",
                message: "密码不正确!",
                duration: 4000,
              });
            else if (res.status == -1)
              return this.$notify({ type: "warning", message: "用户不存在" });
            else if (res.status == 175) {
              // 重签三方协议
              console.log("重签三方协议");
            } else if (res.status == 25) {
              // 当前手机号 对应多个用户id
              this.user_list = res.rows;
              this.show_sid = true;
            } else {
              // 当该电话号只有 一个角色时执行
              if (this.loginform.memory) {
                // 记住密码
                // this.$store.commit(SETMEM,{ ant: this.loginform.account, pwd: this.loginform.password })
                window.localStorage.setItem(
                  "account" + this.loginform.account,
                  this.loginform.account
                );
                window.localStorage.setItem(
                  "password" + this.loginform.account,
                  this.loginform.password
                );
              } else {
                // 未选中时删除密码
                window.localStorage.setItem(
                  "password" + this.loginform.account,
                  ""
                );
              }
              this.$store.commit(LOGIN, res); // 将登陆者的token信息 用store存储

              if (res.userType == 1) {
                // 业者=======================
                if ([5, 3, 7, 77, 4, 44, 2, 33].includes(res.status)) {
                  this.$router.replace("/audit");
                } else if (res.status == 55 || res.status == 22) {
                  // 55单位退回   22个人信息不通过
                  this.$router.replace("/reg_personal");
                } else if (res.status == 0 || res.status == 8) {
                  if (res.ishave_dw == 0)
                    this.$router.replace("/main/freehome");
                  else if (res.ishave_dw == 1)
                    this.$router.replace("/main/freecomhome");
                }
              } else if (res.userType == 11 && hhrtype == 1) {
                // 伙伴个人=======================
                this.$toast.fail("【合伙个人】维护中，敬请期待");
                // if ([5,3,7,77,4,44,2,33].includes(res.status)) {
                //   this.$router.replace('/audit')
                // } else if (res.status==55 || res.status==22) {   // 22个人信息不通过
                //   this.$router.replace('/reg_personalcoop')
                // } else if (res.status == 0 || res.status == 8) {
                //   this.$router.replace('/main/coophome')
                // }
              } else if (res.userType == 11 && hhrtype == 2) {
                // 伙伴企业=======================
                this.$toast.fail("【合伙企业】维护中，敬请期待");
                // if ([1,2,3,6,22].includes(res.status)) {
                //   console.log("跳转到audit.html 页面")
                // }
                // else if (res.status==11) {   // 11主管退回
                //   this.$router.replace('/reg_cominfo')
                // }
                // else if (res.status == 8) {
                //   console.log("跳转到单位首页")
                // }
              } else if (res.userType == 11 && hhrtype == 3) {
                // 伙伴边民=======================
                this.$toast.fail("【合伙边民】维护中，敬请期待");
                // if ([1,2,3,6,22].includes(res.status)) {
                //   console.log("跳转到audit.html 页面")
                // }
                // else if (res.status==11) {   // 11主管退回
                //   this.$router.replace('/reg_cominfo')
                // }
                // else if (res.status == 8) {
                //   console.log("跳转到单位首页")
                // }
              } else if (res.userType == 2) {
                // 单位======================
                this.$toast.fail("【单位角色】维护中，敬请期待");
                // if ([1,2,3,6,22].includes(res.status)) {
                //   console.log("跳转到audit.html 页面")
                // }
                // else if (res.status==11) {   // 11主管退回
                //   this.$router.replace('/reg_cominfo')
                // }
                // else if (res.status == 8) {
                //   console.log("跳转到单位首页")
                // }
              } else if (res.userType == 4) {
                // 商秘公司=======================
                if (res.status == 222) {
                  // 222该角色已停用
                  this.$notify({ type: "warning", message: "该角色已停用!" });
                } else if (res.status == 888) {
                  // 888该角色正在使用中
                  if (res.poststatus == 1) {
                    // 风控主管
                    this.$router.replace("/main/checkhome");
                  }
                  // else if (res.poststatus == 2) {   // 业务员
                  //   console.log("跳转到 业务员页面")
                  //   window.localStorage.setItem('token_clerk',res.code_app)   // 将token存储在本地
                  // }
                  // else if (res.poststatus == 3) {   // 营销员
                  //   console.log("跳转到 营销员页面")
                  //   window.localStorage.setItem('token_sell',res.code_app)   // 将token存储在本地
                  // }
                  else if (res.poststatus == 4) {
                    this.$router.replace("/main/managerhome");
                  }
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          }); // 函数loginHyt()的结束
      }); // 函数validate().then的结束---括号
    }, // 函数login()的结束---括号

    onChoose() {
      // 当登陆者电话号有 多个用户角色时,选中以某个用户登录 ,将执行如下
      if (this.sid == "") this.$toast.fail("请选择用户,再登录!");
      else
        loginChoose({ sid: this.sid }).then((res) => {
          if (this.loginform.memory) {
            // 记住密码
            // this.$store.commit(SETMEM,{ ant: this.loginform.account, pwd: this.loginform.password })
            window.localStorage.setItem(
              "account" + this.loginform.account,
              this.loginform.account
            );
            window.localStorage.setItem(
              "password" + this.loginform.account,
              this.loginform.password
            );
          } else {
            // 未选中时删除密码
            window.localStorage.setItem(
              "password" + this.loginform.account,
              ""
            );
          }
          this.$store.commit(LOGIN, res); // 将登陆者的token信息 用store存储

          if (res.userType == 1) {
            // 业者=======================
            if ([5, 3, 7, 77, 4, 44, 2, 33].includes(res.status)) {
              this.$router.replace("/audit");
            } else if (res.status == 55 || res.status == 22) {
              // 55单位退回   22个人信息不通过
              this.$router.replace("/reg_personal");
            } else if (res.status == 0 || res.status == 8) {
              if (res.ishave_dw == 0) this.$router.replace("/main/freehome");
              else if (res.ishave_dw == 1)
                this.$router.replace("/main/freecomhome");
            }
          } else if (res.userType == 11 && hhrtype == 1) {
            // 伙伴个人=======================
            this.$toast.fail("【合伙个人】维护中，敬请期待");
            // if ([5,3,7,77,4,44,2,33].includes(res.status)) {
            //   this.$router.replace('/audit')
            // } else if (res.status==55 || res.status==22) {   // 22个人信息不通过
            //   this.$router.replace('/reg_personalcoop')
            // } else if (res.status == 0 || res.status == 8) {
            //   this.$router.replace('/main/coophome')
            // }
          } else if (res.userType == 11 && hhrtype == 2) {
            // 伙伴企业=======================
            this.$toast.fail("【合伙企业】维护中，敬请期待");
            // if ([1,2,3,6,22].includes(res.status)) {
            //   console.log("跳转到audit.html 页面")
            // }
            // else if (res.status==11) {   // 11主管退回
            //   this.$router.replace('/reg_cominfo')
            // }
            // else if (res.status == 8) {
            //   console.log("跳转到单位首页")
            // }
          } else if (res.userType == 11 && hhrtype == 3) {
            // 伙伴边民=======================
            this.$toast.fail("【合伙边民】维护中，敬请期待");
            // if ([1,2,3,6,22].includes(res.status)) {
            //   console.log("跳转到audit.html 页面")
            // }
            // else if (res.status==11) {   // 11主管退回
            //   this.$router.replace('/reg_cominfo')
            // }
            // else if (res.status == 8) {
            //   console.log("跳转到单位首页")
            // }
          } else if (res.userType == 2) {
            // 单位======================
            this.$toast.fail("【单位角色】维护中，敬请期待");
            // if ([1,2,3,6,22].includes(res.status)) {
            //   console.log("跳转到audit.html 页面")
            // }
            // else if (res.status==11) {   // 11主管退回
            //   this.$router.replace('/reg_cominfo')
            // }
            // else if (res.status == 8) {
            //   console.log("跳转到单位首页")
            // }
          } else if (res.userType == 4) {
            // 商秘公司=======================
            if (res.status == 222) {
              // 222该角色已停用
              this.$notify({ type: "warning", message: "该角色已停用!" });
            } else if (res.status == 888) {
              // 888该角色正在使用中
              if (res.poststatus == 1) {
                // 风控主管
                this.$router.replace("/main/checkhome");
              }
              // else if (res.poststatus == 2) {   // 业务员
              //   console.log("跳转到 业务员页面")
              //   window.localStorage.setItem('token_clerk',res.code_app)   // 将token存储在本地
              // }
              // else if (res.poststatus == 3) {   // 营销员
              //   console.log("跳转到 营销员页面")
              //   window.localStorage.setItem('token_sell',res.code_app)   // 将token存储在本地
              // }
              else if (res.poststatus == 4) {
                this.$router.replace("/main/managerhome");
              }
            }
          }
        });
    },
    enterSubmit(event) {
      // 密码框内点击 回车键
      if (event.key == "Enter") {
        console.log("点击了回车");
      }
    },

    // =====================注册页相关函数==================================================
    onChangeTabs() {
      if (this.switch_mark == 1) {
        this.show_agent = true;
      }
    },
    onConfirm() {
      this.$router.push("/agent");
    },

    getVerify() {
      // 获取验证码
      this.able = false;
      getVerifyReg({ tel: this.regform.tel }).then((res) => {
        if (res.result == 0) {
          this.able = true;
          this.$toast.fail(res.message);
        } else if (res.result == 1) {
          this.regform.validateCode = res.msm;
        }
      });
    },
    onFinish() {
      // 倒计时结束自动执行
      this.able = true;
    },
    isAgree() {
      // 勾选复选框---同意平台协议
      if (this.regform.agree) {
        this.$router.push("/platform");
      }
    },
    onContract() {
      // 点击同意平台协议
      this.regform.agree = !this.regform.agree;
    },
    regSubmit() {
      // 点击了 注册========
      if (this.regform.validateCode != this.regform.telcode) {
        this.$toast.fail("验证码不正确");
        // this.$notify({type: "warning", message: res.message})
      } else if (this.regform.pwd !== this.regform.re_pwd) {
        this.$toast.fail("两次密码输入不一致");
      } else if (!this.regform.agree) {
        this.$toast.fail("未同意平台条款");
      } else {
        this.$refs.regform_ref.validate().then(() => {
          // 校验表单的每一项
          this.$store.commit(SETTEL, this.regform.tel);
          this.$store.commit(SETUN, this.regform.username);
          this.$store.commit(SETPWD, this.regform.pwd);

          submitNextReg(this.regform).then((res) => {
            if ([0, -1, -2, -3].includes(res.status)) {
              this.$toast.fail(res.message);
            } else if (res.status == 1) {
              this.$router.push("/choose_ident");
            }
          });
        });
      }
    },
  },
  created() {
    getVersion().then((res) => {
      // 获取线上最新版本
      if (res.result == 1) {
        this.ver_online = res.app_version.replace(/\./g, "");
        console.log(this.ver_online);
      }
    });
    // console.log("获取本地版本号")
    console.log(plus.runtime.version);
    this.$axios.get("../../../package.json").then((res) => {
      console.log(res);
    });

    // console.log("比较本地版本和最新版本")
    // console.log("确认更新版本")
    // console.log("下载最新版本")
    // console.log("安装最新版本")
  },
  mounted() {
    var that = this;
    if (window.plus) {
      // 在这里调用h5+ API
      that.getVersion();
    } 
    else {
      // 兼容老版本的plusready事件
      document.addEventListener(
        "plusready",
        function () {
          // 在这里调用h5+ API
          that.getVersion();
        },
        false
      );
    }
  },

  getVersion() {
    var that = this; // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid, function (inf) {
      var wgtVer = inf.version; // 当前版本号
      var ua = navigator.userAgent.toLowerCase();
      var client;
      if (/iphone|ipad|ipod/.test(ua)) {
        client = 2;
      } else if (/android/.test(ua)) {
        client = 1;
      }
      that.$axios
        .get(
          that.apiUrl.api.appDownload +
            "?client_category=" +
            client +
            "&version_number=" +
            wgtVer
        ).then((res) => {
          if (res.data.code == 0) {
            console.log(JSON.stringify(res.data));

            if (res.data.L == null) {
              console.log("已经是最新版本");
            } else {
              if (res.data.L[0].update_status == 1) {
                // 弱更新
                plus.nativeUI.confirm(
                  res.data.L[0].update_description,
                  function (e) {
                    if (e.index == 0) {
                      var wgtUrl = res.data.L[0].apk_url;
                      if (client == 1) {
                        plus.nativeUI.showWaiting("正在下载更新...");
                        plus.downloader
                          .createDownload(wgtUrl, {}, function (d, status) {
                            if (status == 200) {
                              var path = d.filename; //下载apk
                              plus.runtime.install(
                                path,
                                {},
                                function () {
                                  plus.nativeUI.alert("更新完成", function () {
                                    plus.runtime.restart();
                                  });
                                },
                                function (e) {
                                  console.log(
                                    "安装wgt文件失败[" +
                                      e.code +
                                      "]：" +
                                      e.message
                                  );
                                  plus.nativeUI.alert(
                                    "版本更新失败:" +
                                      "[" +
                                      e.code +
                                      "]：" +
                                      e.message
                                  );
                                }
                              ); // 自动安装apk文件
                            } else {
                              plus.nativeUI.alert("检测到新版本" + status);
                              that.getVersion();
                            }

                            plus.nativeUI.closeWaiting();
                          })
                          .start();
                      } else {
                        window.location.href = wgtUrl;
                      }
                    } else {
                      // console.log('取消1');
                    }
                  },
                  "检测到新版本",
                  ["确定", "取消"]
                );
              } else if (res.data.L[0].update_status == 2) {
                // 强更新

                plus.nativeUI.confirm(
                  res.data.L[0].update_description,
                  function (e) {
                    if (e.index == 0) {
                      var wgtUrl = res.data.L[0].apk_url;

                      if (client == 1) {
                        plus.nativeUI.showWaiting("正在下载更新...");

                        plus.downloader
                          .createDownload(wgtUrl, {}, function (d, status) {
                            if (status == 200) {
                              var path = d.filename; //下载apk

                              plus.runtime.install(
                                path,
                                {},
                                function () {
                                  plus.nativeUI.alert("更新完成", function () {
                                    plus.runtime.restart();
                                  });
                                },
                                function (e) {
                                  console.log(
                                    "安装wgt文件失败[" +
                                      e.code +
                                      "]：" +
                                      e.message
                                  );
                                  plus.nativeUI.alert(
                                    "版本更新失败:" +
                                      "[" +
                                      e.code +
                                      "]：" +
                                      e.message
                                  );
                                }
                              ); // 自动安装apk文件
                            } else {
                              plus.nativeUI.alert("版本更新失败:" + status);

                              that.getVersion();
                            }

                            plus.nativeUI.closeWaiting();
                          })
                          .start();
                      } else {
                        window.location.href = wgtUrl;
                      }
                    } else {
                      // console.log('取消2');
                    }
                  },
                  "检测到新版本",
                  ["确定"]
                );
              }
            }
          } else {
            plus.nativeUI.toast(res.data.msg);
          }
        }).catch((error) => {
          plus.nativeUI.toast("更新失败，请重试！");
        });
    });
  },
};
</script>

<style scoped lang="scss">
.login {
  .van-image {
    height: 25vh;
    width: 100%;
  }
  .container {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50px);
    box-shadow: 0 0 10px 1px #ddd;
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    padding: 0 10px;
    .van-form {
      margin-top: 10px;
      .login-log {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .forget {
          color: var(--cl-text-t9);
        }
        .forget:active {
          color: var(--cl-high-text);
        }
      }
      .reg-log {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
        .read-agree {
          color: var(--cl-text-t9);
        }
        .contract {
          color: var(--cl-high-text);
        }
      }
      .login-btn,
      .reg-btn {
        width: 100%;
        margin: 20px 0 40px;
        display: flex;
        justify-content: center;
        .van-button {
          width: 90%;
        }
      }
    }
    .choose-user {
      background-color: crimson;
      padding: 10px;
    }
  }
}
</style>
