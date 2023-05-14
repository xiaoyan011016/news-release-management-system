// 引入格式化时间的库
import dayjs from "dayjs"
const formatTime = {
  formatCditTime: (editTime) => {
    return dayjs(editTime).format('YYYY-MM-DD-HH-mm')
  }
}
export default formatTime