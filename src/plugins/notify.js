/* eslint-disable import/prefer-default-export */
import { useToast } from 'vue-toastification';

import BaseAlert from '@/components/BaseAlert.vue';

const useNotify = (text, type = true, icon = 'fas fa-bell') => {
  const message = text?.code === 'EMPTY_RESULT' ? 'Data is Empty!' : (text?.message ?? text?.error ?? text);
  const content = {
    component: BaseAlert,
    props: {
      icon,
      text: message,
      // eslint-disable-next-line no-nested-ternary
      color: ['secondary', 'info', 'warning', 'primary', 'danger'].includes(type) ? type : type ? 'success' : 'danger',
      dismissible: true,
    },
  };
  const toast = useToast();
  toast(content, {
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    position: 'bottom-right',
  });
};

export default {
  install: (app) => {
    const ctx = app;
    ctx.config.globalProperties.$notify = useNotify;
    ctx.$notify = useNotify;
  },
};
