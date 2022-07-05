import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { dom, library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { createPinia } from 'pinia'
import { useAuth } from './stores/authentication'
library.add(fas)
library.add(fab)
dom.watch();

(async () => {
    const app = createApp(App)
    app.use(createPinia())

    const { bindUser } = useAuth();
    await bindUser();

    app.use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount("#app");

})();


