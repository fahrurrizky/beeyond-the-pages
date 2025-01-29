import { defineStore, acceptHMRUpdate } from 'pinia';
import d from 'dayjs';

import * as s$auth from '@service/auth';
import { setCk, delCk, certDetail } from '@/utils/cookies';
import { set, get, clear } from '@/utils/idb';
import { st$wsNotif } from './notification/websocket';
import { st$mdCalendar } from './dashboard/master-data/calendar-shift';

const st$auth = defineStore({
  id: 'auth',
  state: () => ({
    employeeId: undefined,
    id: undefined,
    email: undefined,
    role: undefined,
    roleName: undefined,
    userId: undefined,
    suppId: undefined,
    // listActivity: undefined,
    // listRoles: undefined,
  }),
  getters: {
    userInfo: (state) => ({
      employeeId: state.employeeId,
      id: state.id,
      email: state.email,
      role: state.role,
      roleName: state.roleName,
      userId: state.userId,
      suppId: state.suppId,
      listActivity: state.listActivity,
      listRoles: state.listRoles,
    }),
  },
  actions: {
    async a$setUserInfo() {
      try {
        const { id, email, role, roleName, employeeId, suppId } = certDetail();
        const userId = await get('user_id');
        // const listActivity = await get('list_activity');
        // const listRoles = await get('list_roles');
        if (!id && !email) throw new Error('No User Info!');
        this.id = id;
        this.email = email;
        this.role = +role;
        this.roleName = roleName;
        this.employeeId = employeeId;
        this.userId = userId;
        this.suppId = suppId;
        // this.listActivity = listActivity;
        // this.listRoles = listRoles;
        if ((this.userInfo.roleName || '').toLowerCase() !== 'supplier') await st$mdCalendar().a$calendar({ year: d().format('YYYY'), is_holiday: 1 }); // ! temporary handling
        setTimeout(() => {
          st$wsNotif().a$connect(this.userInfo);
        }, 10);
        return 'User Authenticated';
      } catch ({ message }) {
        this.id = undefined;
        this.email = undefined;
        this.role = undefined;
        throw message;
      }
    },
    async a$register(payload) {
      try {
        await s$auth.register(payload);
        return 'Register success!';
      } catch (e) {
        throw e ?? 'Register failed!';
      }
    },
    async a$login(payload) {
      try {
        const { data } = await s$auth.login(payload);
        const userId = data?.detail?.id;
        setCk('CERT', data.token, { datetime: d(data.expiresAt) });
        await set('user_id', userId);
        // await this.a$setActivity();
        this.a$setUserInfo();
        return 'Login success!';
      } catch (e) {
        throw e ?? 'Login failed!';
      }
    },
    async a$logout() {
      try {
        const { id, email } = certDetail();
        if (id || email) {
          delCk('CERT');
          await clear();
          window.location.reload();
          this.a$setUserInfo();
          return 'Logout success!';
        }
        return 'Logout Failed';
      } catch (e) {
        throw e ?? 'Logout failed!';
      }
    },
    async a$setActivity() {
      try {
        const { data: activity } = await s$auth.listActivity();
        const { data: roles } = await s$auth.listRole();
        await set('list_activity', activity);
        await set('list_roles', roles);
      } catch (e) {
        throw e?.message ?? e;
      }
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(st$auth, import.meta.hot));

export default st$auth;
