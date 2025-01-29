// @ts-check
import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';
import icon from 'astro-icon';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [Unocss({ 
        injectReset: true, 
        injectEntry: true 
    }), icon(), vue()],
    devToolbar: {
        enabled: false
    }
});