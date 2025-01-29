// base js & css
import '@/assets/js/nav-pills';
import '@/assets/scss/argon-dashboard.scss';

// vendor css
import '@/assets/vendor/toastifications.css';
import '@/assets/vendor/multi-select.css';

// icon
import '@/assets/css/nucleo-icons.css';
import '@/assets/css/nucleo-svg.css';

// HighCharts
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
// import useTheme from 'highcharts/themes/dark-blue';
import { theme } from '@comp/high-charts/theme';
import useXrange from 'highcharts/modules/xrange';

// Notify
import installNotify from '@/plugins/notify';
import toast from 'vue-toastification';

// vendor package
import VueTilt from 'vue-tilt.js';
import VueSweetalert2 from 'vue-sweetalert2';

// global plugins
import { globalComponents } from './global';
// set highcharts theme
Highcharts.setOptions(theme);
useXrange(Highcharts);

export default {
  install(app) {
    app.use(VueTilt);
    app.use(VueSweetalert2);
    app.use(globalComponents);
    app.use(installNotify);
    app.use(toast, { containerClassName: 'notification', timeout: 5000 });
    app.use(HighchartsVue);
  },
};
