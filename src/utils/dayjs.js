import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});
