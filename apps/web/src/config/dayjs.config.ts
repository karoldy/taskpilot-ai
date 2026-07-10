import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import minMax from 'dayjs/plugin/minMax';
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';

dayjs.extend(utc);
dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);

dayjs.tz.setDefault('Asia/Hong_Kong');
