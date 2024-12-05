// 格式化日期
import {dayjs} from 'element-plus'

export const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
