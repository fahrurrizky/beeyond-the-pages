import { defineStore, acceptHMRUpdate } from 'pinia';
import { baseWsURL } from '@/plugins/axios';
import { st$notif } from './notif';

const websocketUrl = '/ws/master';
// eslint-disable-next-line import/prefer-default-export
export const st$wsNotif = defineStore({
  id: 'wsNotif',
  state: () => ({
    ws: {
      container: null,
      connected: null,
    },
  }),
  getters: {},
  actions: {
    // * overview
    async a$connect(user) {
      try {
        if (![].includes(user?.role)) return;
        this.ws.connected = null;
        this.ws.container = new WebSocket(`${baseWsURL}${websocketUrl}`);
        await this.a$event(user);
      } catch (e) {
        throw e?.message ?? e;
      }
    },

    /**
   * * Event Listener for WebSocket Message from Server
   */
    async a$event(user) {
      try {
        // * on event: ws open
        this.ws.container.onopen = async () => {
        // * set connected to true
          this.ws.connected = true;
          // * snet initial connection detail to ws server
          await this.a$sent({ module: 'notification', action: 'list-notification', expectReturn: true, body: { userId: parseInt(user?.userId, 10) } });
        };
        // * on event: ws messages
        this.ws.container.onmessage = async ({ data }) => {
          const { action, data: msg } = JSON.parse(data);

          switch (action) {
            case 'read-notification':
              await this.a$sent({ module: 'notification', action: 'list-notification', expectReturn: true, body: { userId: parseInt(user?.userId, 10) } });
              break;
            default:
            /** Call store based on module name & action name. */
              st$notif().a$list(msg);
              break;
          }
        };
        // on event: ws closed
        this.ws.container.onclose = async () => {
          await this.a$close();

          // add 1s timeout before create new connection
          setTimeout(async () => {
            await this.a$connect();
          }, 1000);
        };
      } catch (e) {
        throw e?.message ?? e;
      }
    },

    /**
   * * Sent WebSocket Message
   * @param {Object} msg message
   */
    async a$sent(msg) {
      try {
        this.ws.container.send(JSON.stringify(msg));
      } catch (e) {
        throw e?.message ?? e;
      }
    },
    /**
   * * Close WebSocket connection
   * * reset container
   */
    async a$close() {
      try {
        this.ws.container?.close();
        this.ws.connected = false;
        this.ws.container = null;
      } catch (e) {
        throw e?.message ?? e;
      }
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(st$wsNotif, import.meta.hot));
