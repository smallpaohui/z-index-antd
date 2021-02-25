<template>
  <div>
    <div style="display: flex;justify-content: flex-start">
      <a-card style="height: 120px;width: 25%;margin-right: 10px">
        <h1>本机系统</h1>
        <p>Windows</p>
      </a-card>
      <a-card style="height: 120px;width: 25%;margin: 0 10px">
        <h1>当前时间</h1>
        <p> {{getDate(date,'year')}}</p>
      </a-card>
      <a-card style="height: 120px;width: 25%;margin: 0 10px">
        <h1>今日天气</h1>
        <p>晴天</p>
      </a-card>
      <a-card style="height: 120px;width: 25%;margin-left: 10px">
        <h1>Warma</h1>
        <p>我已经完全爱上Warma了</p>
      </a-card>
    </div>
    <div class="title" style="display: flex;justify-content: flex-start;margin-top: 50px">
      <a-card title="毒鸡汤①" style="width: 30%;margin-right: 10px;height: 100%">
        <p>一个人最好的生活状态，是该看书时看书，该玩时尽情玩，看见优秀的人欣赏，看到落魄的人也不轻视，有自己的小生活和小情趣，不用去想改变世界，努力去活出自己。没人爱时专注自己，有人爱时，有能力拥抱彼此。
          一个人最好的生活状态，是该看书时看书，该玩时尽情玩，看见优秀的人欣赏，看到落魄的人也不轻视，有自己的小生活和小情趣，不用去想改变世界，努力去活出自己。没人爱时专注自己，有人爱时，有能力拥抱彼此。
          一个人最好的生活状态，是该看书时看书，该玩时尽情玩，看见优秀的人欣赏，看到落魄的人也不轻视，有自己的小生活和小情趣，不用去想改变世界，努力去活出自己。没人爱时专注自己，有人爱时，有能力拥抱彼此。
          一个人最好的生活状态，是该看书时看书，该玩时尽情玩，看见优秀的人欣赏，看到落魄的人也不轻视，有自己的小生活和小情趣，不用去想改变世界，努力去活出自己。没人爱时专注自己，有人爱时，有能力拥抱彼此。
        </p>
      </a-card>
      <a-card title="毒鸡汤②" style="width: 40%;height: 100%;margin: 0 10px">
        <p>人不应该是插在花瓶里供人观赏的静物，而是蔓延在草原上随风起舞的韵律，生命不是安排，而是追求，人的意义也许永远没有答案，但也要尽情感受这种没有答案的人生--伍尔芙。
          人不应该是插在花瓶里供人观赏的静物，而是蔓延在草原上随风起舞的韵律，生命不是安排，而是追求，人的意义也许永远没有答案，但也要尽情感受这种没有答案的人生--伍尔芙。
          人不应该是插在花瓶里供人观赏的静物，而是蔓延在草原上随风起舞的韵律，生命不是安排，而是追求，人的意义也许永远没有答案，但也要尽情感受这种没有答案的人生--伍尔芙。
        </p>
      </a-card>
      <a-card title="毒鸡汤③" style="width: 30%;height: 100%;margin-left: 10px">
        <p>对自己狠一点，逼自己努力，再过五年你将会感谢今天发狠的自己，恨透今天懒惰自卑的自己。我始终相信一句话：只有自己足够强大，才不会被别人践踏。
          对自己狠一点，逼自己努力，再过五年你将会感谢今天发狠的自己，恨透今天懒惰自卑的自己。我始终相信一句话：只有自己足够强大，才不会被别人践踏。
          对自己狠一点，逼自己努力，再过五年你将会感谢今天发狠的自己，恨透今天懒惰自卑的自己。我始终相信一句话：只有自己足够强大，才不会被别人践踏。
          对自己狠一点，逼自己努力，再过五年你将会感谢今天发狠的自己，恨透今天懒惰自卑的自己。我始终相信一句话：只有自己足够强大，才不会被别人践踏。
          对自己狠一点，逼自己努力，再过五年你将会感谢今天发狠的自己，恨透今天懒惰自卑的自己。我始终相信一句话：只有自己足够强大，才不会被别人践踏。
        </p>
      </a-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        date: new Date(),
      }
    },
    methods: {
      getDate (datetime, startType) {
        var date = new Date(datetime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date.getFullYear(),
          month = ('0' + (date.getMonth() + 1)).slice(-2),
          sdate = ('0' + date.getDate()).slice(-2),
          hour = ('0' + date.getHours()).slice(-2),
          minute = ('0' + date.getMinutes()).slice(-2),
          second = ('0' + date.getSeconds()).slice(-2)
        let resStr = ''
        if (startType === 'year')
          resStr =
            year +
            '-' +
            month +
            '-' +
            sdate +
            ' ' +
            hour +
            ':' +
            minute +
            ':' +
            second
        if (startType === 'day') resStr = year + '-' + month + '-' + sdate
        if (startType === 'month') resStr = month + '-' + sdate
        if (startType === 'hour') resStr = hour + ':' + minute + ':' + second
        return resStr
      },
    },
    mounted () {
      let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date() // 修改数据date
      }, 1000)
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
  }
</script>

<style scoped>
  .title p:first-line {
    text-indent: 2em;
  }
</style>
