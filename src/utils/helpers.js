import d from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customFormat from 'dayjs/plugin/customParseFormat';

d.extend(duration);
d.extend(customFormat);

// function convert HH:mm:ss to second (int)
const toDuration = (time) => {
  if (!time) return null;
  const [h, m, s] = time.split(':');
  return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10) * 1;
};

// function convert ms to minutes (int)
const toMinutes = (ms) => {
  if (!ms) return null;
  return (ms / 60 / 1000).toFixed(0);
};

// function convert ms to HH:mm:ss (string)
const toHms = (ms) => {
  if (!ms) return null;
  return d.duration(ms * 1000).format('HH:mm:ss');
};

// min 0; max 1
// eslint-disable-next-line no-nested-ternary
const toMinMax = (float, max = 1) => (float > max ? max : float < 0 ? 0 : float);

// number to local currency
const numberToCurrency = (number) => {
  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
  return price;
};

const determineShift = (params) => {
  try {
    // params: '2023-12-17 03:24:00'
    const [HH] = d(params).format('HH:mm').split(':');
    const shift = +HH < 4
      ? {
        date: d(params).add(-1, 'day').format('YYYY-MM-DD'),
        number: 2,
      }
      : {
        date: d(params).format('YYYY-MM-DD'),
        number: +HH < 15 ? 1 : 2,
      };
    return shift;
  } catch (e) {
    return undefined;
  }
};

const structureDate = (params) => {
  try {
    return {
      year: d(params).get('year'),
      month: d(params).get('month') + 1,
    };
  } catch (e) {
    return e;
  }
};

const toLocaleTime = (date) => {
  try {
    if (!date) throw new Error('Date not Valid');
    return d(date).format('YYYY-MM-DD HH:mm:ss');
  } catch (e) {
    return undefined;
  }
};

const objectToFormData = (object = Object()) => {
  const form = new FormData();
  Object.keys(object).forEach((key) => form.append(key, object[key]));
  return form;
};

const objectToFormDataArray = (object = Object()) => {
  const form = new FormData();
  const appendFormData = (data, root = '') => {
    if (data instanceof Object && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach((key) => {
        appendFormData(data[key], root ? `${root}[${key}]` : key);
      });
    } else {
      form.append(root, data);
    }
  };
  appendFormData(object);
  return form;
};

const objectToArray = (object = Object()) => Object.keys(object).map((key) => ({ key: key.replaceAll('_', ' '), value: object?.[key] }));

const normalizeString = (string) => {
  const undash = string.replaceAll('-', '');
  return undash.trim();
};

const matchingPartNumber = ([labelYpti, labelCustomer]) => {
  try {
    const [number] = labelYpti.split('_');
    if (!number) throw new Error('Invalid Input');
    const pattern = number.replaceAll('-', '-?');
    return new RegExp(pattern).test(labelCustomer);
  } catch ({ message }) {
    throw message;
  }
};

/**
 * format date with dayjs plugin
 * @param {Date} date - input date
 * @param {string} format - dayjs string format
 * @returns {string}
 */
const formatDate = (date = new Date(), format = 'YYYY-MM-DD') => d(date).format(format);

const isValidDate = (date) => d(date).isValid();

const diffDate = (start, end, unit = 'ms') => d(end).diff(start, unit);

const stringToHexColor = (string) => {
  const k = 123;
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash < 5) - hash);
  }
  // eslint-disable-next-line no-bitwise
  const c = ((hash * k) & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - c.length)}${c}`;
};

const splitDateRange = (dateString) => {
  try {
    const [start, finish] = dateString.split(' to ');
    return finish ? { start, finish } : { start, finish: start };
  } catch (e) {
    return undefined;
  }
};
const combineDateRange = (obj) => {
  try {
    return Object.values(obj)
      .map((val) => d(val).format('YYYY-MM-DD'))
      .join(' to ');
  } catch (e) {
    return undefined;
  }
};

const generateWeekByDate = (dateString) => {
  try {
    return `${d(dateString).day(0).format('YYYY-MM-DD')} to ${d(dateString).day(6).format('YYYY-MM-DD')}`;
  } catch (e) {
    return undefined;
  }
};

const toIsoString = (dateString) => {
  try {
    if (!dateString) throw new Error('Date not Valid');
    return d(dateString).toISOString();
  } catch (e) {
    return undefined;
  }
};

const playSound = (message) => {
  let sound = '/audio/success.wav';
  if (message === 'Data tidak ditemukan!') sound = '/audio/error-not-found.mpeg';
  else if (message === "Scan can't over qty!") sound = '/audio/error-over.mpeg';
  else if (message === 'Label sudah discan!') sound = '/audio/error-scanned.mp3';
  else if (message) sound = '/audio/alert.mp3';
  const alert = new Audio(sound);
  alert.play();
};

const urlToPathName = (url) => {
  try {
    if (!url) throw new Error('Url not Valid');
    const filename = new URL(url).pathname.split('/').pop();
    return filename;
  } catch (e) {
    return undefined;
  }
};

/**
 *
 * @param {Blob} data: blob data from axios with response type of 'blob
 * @param {*} filename: file name
 * @param {*} type: type of file; application/pdf, etc
 */
const downloadFile = ({ data, filename, type = 'application/vnd.ms-excel' }) => {
  const file = URL.createObjectURL(new Blob([data]), { type });
  const dlbtn = document.createElement('a');
  dlbtn.href = file;
  dlbtn.setAttribute('download', `${filename}`);
  document.body.appendChild(dlbtn);
  dlbtn.click();
  setTimeout(() => URL.revokeObjectURL(file), 0);
};

const openMaps = (link) => {
  let url = link;
  // Check if the link includes a protocol
  if (!link.includes('http://') && !link.includes('https://')) {
    // If not, add the protocol (you can use 'https://' as a default)
    url = `https://${link}`;
  }
  window.open(url, '_blank');
};

const clampText = (text, length = 20) => {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
};

const breakWords = (str, num = 3, splitter = ' ') => str
  .split(splitter)
  .map((word, i) => ((i + 1) % num === 0 ? `${word}<br />` : word))
  .join(splitter);

const hasEmptyValues = (obj) => Object.values(obj).some((value) => value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0));

const isWeekend = (date) => {
  const day = d(date).day();
  return day === 0 || day === 6;
};

const getDatesInRange = (startDate, endDate) => {
  const start = d(startDate);
  const end = d(endDate);
  const dates = [];

  let current = start;
  while (current <= end) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  return dates;
};

// * click outside directive
const clickOutside = {
  beforeMount(el, binding) {
    const clickOutsideEvent = (event) => {
      // Check if click was outside the el and its children
      if (!(el === event.target || el.contains(event.target))) {
        // Call the method provided in v-click-outside
        binding.value(event);
      }
    };
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    el.__vueClickOutside__ = clickOutsideEvent;
    document.body.addEventListener('click', clickOutsideEvent);
  },
  unmounted(el) {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    document.body.removeEventListener('click', el.__vueClickOutside__);
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    el.__vueClickOutside__ = null;
  },
};

const padStartString = (num, digits = 2, prefix = '0') => num?.toString()?.padStart(digits, prefix);
const formatDatePicker = (date, attrs, range = false) => {
  if (!date) return null;
  const attrArr = Object.keys(attrs);
  const pickers = ['month-picker', 'time-picker', 'year-picker', 'week-picker'];
  const isDate = !attrArr.some((item) => pickers.includes(item));
  const isMonthPicker = attrArr?.includes('month-picker');
  if (range) {
    const [start, end] = date;
    if (start && end) {
      if (isMonthPicker) {
        const check = Object.keys(start)?.length === 2;
        if (check) return () => `${start?.year}-${padStartString(start.month + 1)} to ${end?.year}-${padStartString(end.month + 1)}`;
        return () => `${d(start).format('YYYY-MM')} to ${d(end).format('YYYY-MM')}`;
      }
      if (isDate) {
        if (d(start).format('DD-MM-YYYY') === d(end).format('DD-MM-YYYY')) return () => d(start).format('DD-MM-YYYY');
        return () => `${d(start).format('DD-MM-YYYY')} to ${d(end).format('DD-MM-YYYY')}`;
      }
    }
  } else {
    if (isMonthPicker) {
      const check = Object.keys(date)?.length === 2;
      if (check) return `${date?.year}-${padStartString(date.month + 1)}`;
      return d(date).format('YYYY-MM');
    }
    if (isDate) return d(date).format('DD-MM-YYYY');
  }
  return null;
};
const dateParser = (date, parse = false, splitter = ' - ') => {
  if (!parse) {
    const [start, end] = date?.split(`${splitter}`) || [];
    return [`${d(start)}`, `${d(end)}`];
  }
  const [start, end] = date || [];
  return { start_date: d(start).format('YYYY-MM-DD'), end_date: d(end).format('YYYY-MM-DD') };
};

/**
 * @param {*} time
 * if parse = true => string, exp: '08:00'
 * if parse = false => object, exp: { hours: '08' | 8, minutes: '00' | 0 }
 *
 * @param {*} parse Boolean
 */
const timeParser = (time, parse = false) => {
  if (!parse) {
    return `${padStartString(time?.hours)}:${padStartString(time?.minutes)}`;
  }
  const [hours, minutes] = time?.split(':') || [];
  return { hours, minutes };
};

const sanitizeObject = (obj) => JSON.parse(JSON.stringify(obj));

export {
  toDuration,
  toMinutes,
  toHms,
  toMinMax,
  formatDate,
  isValidDate,
  toLocaleTime,
  determineShift,
  structureDate,
  objectToFormData,
  objectToFormDataArray,
  objectToArray,
  normalizeString,
  matchingPartNumber,
  stringToHexColor,
  diffDate,
  toIsoString,
  playSound,
  splitDateRange,
  combineDateRange,
  generateWeekByDate,
  urlToPathName,
  numberToCurrency,
  downloadFile,
  openMaps,
  clampText,
  hasEmptyValues,
  breakWords,
  isWeekend,
  getDatesInRange,
  clickOutside,
  padStartString,
  formatDatePicker,
  dateParser,
  timeParser,
  sanitizeObject,
};
