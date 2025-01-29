import { defineStore, acceptHMRUpdate } from 'pinia';
import * as sv$home from '../../services/home/best-stories';

/**
 * Device Store.
 */
export const st$home = defineStore('home', {
  state: () => ({
    listBestStories: {
      status: null,
      data: [
        {
          id: 1,
          img: "/public/assets/rishabh-dharmani-x0gw9YspcR4-unsplash.jpg",
          title: "The Many Faces of Love – A Guide to Heartfelt Connections",
          content:
            "If Paris Fashion Week in digital form has remained saturated with propositions and visions of the clothes we will be seeing-and perhaps",
          date: "Jan 20",
          read: "7",
          author: "Noah Calhoun",
          category: "Love",
        },
        {
          id: 2,
          img: "/public/assets/Snapinst.app_474035939_18088989637543359_3199483165713372870_n_1080.jpg",
          title: "The Many Faces of Love – A Guide to Heartfelt Connections",
          content:
            "If Paris Fashion Week in digital form has remained saturated with propositions and visions of the clothes we will be seeing-and perhaps",
          date: "Jan 20",
          read: "7",
          author: "Noah Calhoun",
          category: "Love",
        },
        {
          id: 3,
          img: "/public/assets/ahtziri-lagarde-LSMpNaq0lGY-unsplash.jpg",
          title: "The Many Faces of Love – A Guide to Heartfelt Connections",
          content:
            "If Paris Fashion Week in digital form has remained saturated with propositions and visions of the clothes we will be seeing-and perhaps",
          date: "Jan 20",
          read: "7",
          author: "Noah Calhoun",
          category: "Love",
        },
        {
          id: 4,
          img: "/public/assets/jon-tyson-XzUMBNmQro0-unsplash.jpg",
          title: "The Many Faces of Love – A Guide to Heartfelt Connections",
          content:
            "If Paris Fashion Week in digital form has remained saturated with propositions and visions of the clothes we will be seeing-and perhaps",
          date: "Jan 20",
          read: "7",
          author: "Noah Calhoun",
          category: "Love",
        },
        {
          id: 5,
          img: "/public/assets/jon-tyson-XzUMBNmQro0-unsplash.jpg",
          title: "The Many Faces of Love – A Guide to Heartfelt Connections",
          content:
            "If Paris Fashion Week in digital form has remained saturated with propositions and visions of the clothes we will be seeing-and perhaps",
          date: "Jan 20",
          read: "7",
          author: "Noah Calhoun",
          category: "Love",
        },
        {
          id: 6,
          img: "/public/assets/jon-tyson-XzUMBNmQro0-unsplash.jpg",
          title: "The Many Faces of Love – A Guide to Heartfelt Connections",
          content:
            "If Paris Fashion Week in digital form has remained saturated with propositions and visions of the clothes we will be seeing-and perhaps",
          date: "Jan 20",
          read: "7",
          author: "Noah Calhoun",
          category: "Love",
        },
      ],
    },
  }),

  // getters
  getters: {
    g$listBestStories: ({ listBestStories }) => listBestStories,

  },

  // actions
  actions: {
    // summary inventory storage
    async a$listBestStories(params) {
      try {
        this.listBestStories.status = null;
        const { data, status } = await sv$home.listBestStories(params);
        this.listBestStories = { data, status };
      } catch (e) {
        this.listBestStories = {
          status: false,
          data: [],
        };
        throw e?.message ?? e;
      }
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(st$home, import.meta.hot));

export default st$home;
