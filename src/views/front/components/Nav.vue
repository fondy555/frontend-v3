<template>
	<div class="nav">
		<div class="container">
			<div class="logo">
				<img v-if="logoImage" :src="logoImage" alt="logo" height="50px" width="50px" style="margin:15px 0 0 0">
				<!-- <div v-else style="font-size:26px;margin-right:50px" @click="$router.push('/home')">logo</div> -->
        <div class="nav-items">
          <div 
            v-for="(item, i) in navList" 
            :key="i" 
            @click="toDetail(item, i)" 
            :class="['nav-item', { 'active': $route.path === item.path }]"
          >
            {{ item.name }}
          </div>
        </div>
			</div>
			<div class="login">
				<div v-if="!isLogin" class="btn">
					<div @click="login">登錄</div>
					<!-- <div @click="login('add')">注冊</div> -->
				</div>
				<div v-else class="loginOut">
					<el-dropdown trigger="hover">
						<div class="avatar-wrapper">
							<el-avatar :src='require("@/assets/avatar.png")'></el-avatar>
							<span style="font-size: 12px;margin-left:10px">{{ name }}</span>
						</div>
            <template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="backend">
								<span>後臺管理</span>
							</el-dropdown-item>
							<el-dropdown-item divided @click="logout">
								<span>退出登錄</span>
              </el-dropdown-item>
						</el-dropdown-menu>
            </template>
					</el-dropdown>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions } from "vuex";
// import {getToken, register} from '@/api/user'
// import {sendMobileVerifyCode, compareVerifycode, resetpass} from "@/api/user";

export default {
    name: 'Nav',
    data() {
        return {
            navList: [
                // {
                //     name: '首页',
                //     path: '/home',
                // },
                {
                    name: '首頁',
                    path: '/ProductService',
                },
                {
                    name: '關於我們',
                    path: '/about',
                },
            ],
            register: {},
            isLogin: null,
            mobile: '18888888888',
            logoImage: null // 新增 logoImage 数据属性
        };
    },
    computed: {
        ...mapGetters(["avatar", "name", "roles", "isPay"]),
    },
    mounted() {
        const token = localStorage.getItem("token");
        // console.log("Token:", token); // 调试代码，检查 token 是否正确读取
        this.isLogin = token ? true : false;

        if (this.isLogin) {
          this.getInfo();

        }

        const cachedFooterData = localStorage.getItem('footerData');
        if (cachedFooterData) {
            const footerData = JSON.parse(cachedFooterData);
            this.$nextTick(() => {
                this.logoImage = footerData.beianImage; // 从缓存中读取 beianImage
            });
        }
    },

    methods: {
        ...mapActions('user', ['getInfo']),
        logout() {
            this.$message.success('退出成功')
            localStorage.removeItem('token')
            this.isLogin = false
            this.$router.replace({
                path: '/login'
            })
        },
        login(e) {
            if (e == 'add') {
                this.$router.push('/register')
            } else {
                this.$router.push('/login')
            }
        },
        backend() {
            this.$router.push({
                path: '/productList'
            })
        },
        toDetail(item) {
            this.$router.push({
                path: item.path
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  height: 75px;
  z-index: 100;
  background: #ffffff;
  width: 100vw;
  margin: 0 auto;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .container {
    width: 80%; // 增加容器宽度
    margin: 0 auto;
    display: flex;
    justify-content: space-between; // 使用 space-between 来分配空间
    align-items: center; // 垂直居中对齐

    .logo {
      display: flex;
      align-items: center;
      flex: 1; // 让 logo 部分占据剩余空间

      .nav-items {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        
        &::-webkit-scrollbar {
          display: none; /* WebKit */
        }
    }
  }

  .nav-item {
        flex: 0 0 auto;
        padding: 0 15px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
        transition: color 0.3s;

        &:hover, &.active {
          color: #4c88ff;
        }
      }

    .login {
      display: flex;
      align-items: center;


      .loginOut {
        line-height: 72px;

        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          margin: -5px 0 0 5px;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          height: 72px;
        }
      }

      .btn {
        display: flex;

        div {
          width: 50px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }

  .active {
    color: #0b2183;
    border-bottom: 3px solid #0b2183;
  }

  
  @media (max-width: 768px) {
  .container {
    width: 95%;
    flex-direction: column;
    align-items: flex-start;
  }

  .logo {
    width: 100%;
    margin-bottom: 10px;
  }

  .login {
    width: 100%;
    justify-content: flex-end;
  }
}
}
</style>