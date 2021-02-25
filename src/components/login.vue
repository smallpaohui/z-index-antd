<template>
  <div class="content">

    <div class="content_input">
      <div class="title">
        <p>管理员登录</p>
      </div>
      <a-form-model ref="form" :model="form" :label-col="{ span: 1 }" :wrapper-col="{ span: 23 }" :rules="rules">
        <a-form-model-item label="" prop="UserName">
          <a-input allowClear v-model="form.UserName" placeholder="用户名/admin"></a-input>
        </a-form-model-item>
        <a-form-model-item prop="PassWord">
          <a-input-password label="" allowClear v-model="form.PassWord" placeholder="密码/123123"></a-input-password>
        </a-form-model-item>
      </a-form-model>
      <div class="content_button">
        <a-button block type="primary" @click="signIn">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'login',
    data () {
      return {
        form: {
          UserName: undefined,
          PassWord: undefined,
        },
        rules: {
          UserName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          PassWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      signIn () {
        this.$refs.form.validate(valid => {
          if (valid && this.form.UserName === 'admin' && this.form.PassWord === '123123') {
            this.$notification.success({
              message: '登录成功',
            })
            this.$router.push('/')
          } else {
            this.$notification.error({
              message: '登录失败',
              description: `请确认账号密码后重试`,
            })
            this.form.PassWord = undefined
          }
        })
      },
    },
  }
</script>

<style scoped>
  .content {
    width: 500px;
    height: 350px;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: mymove 1s ease-in-out alternate;
    overflow: hidden;
    transition: 1.5s;
  }

  @keyframes mymove {
    0% {
      width: 0px;
      height: 5px;
    }

    10% {
      width: 50px;
      height: 5px;
    }

    15% {
      width: 100px;
      height: 5px;
    }

    20% {
      width: 150px;
      height: 5px;
    }

    25% {
      width: 200px;
      height: 5px;
    }

    30% {
      width: 250px;
      height: 5px;
    }

    35% {
      width: 300px;
      height: 5px;
    }

    40% {
      width: 350px;
      height: 5px;
    }

    45% {
      width: 450px;
      height: 5px;
    }

    50% {
      width: 500px;
      height: 5px;
    }

    55% {
      height: 30px;
    }

    60% {
      height: 60px;
    }

    65% {
      height: 90px;
    }

    70% {
      height: 120px;
    }

    75% {
      height: 150px;
    }

    80% {
      height: 180px;
    }

    85% {
      height: 210px;
    }

    90% {
      height: 240px;
    }

    95% {
      height: 240px;
    }

    100% {
      height: 300px;
    }
  }

  .content_input {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .content_button {
    text-align: center;
  }

  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: bold;
    color: #606266;
  }
</style>
