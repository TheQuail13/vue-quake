import Vue from 'vue'

import './styles/quasar.sass'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QAvatar,
  QInnerLoading,
  QSpinnerFacebook,
  QSelect,
  Ripple,
  Notify,
  QCard,
  QCardSection,
  QDialog,
  QSpace,
  QCardActions,
  QChip,
  QExpansionItem,
  QPageScroller,
  ClosePopup
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QAvatar,
    QInnerLoading,
    QSpinnerFacebook,
    QSelect,
    QCard,
    QCardSection,
    QDialog,
    QSpace,
    QCardActions,
    QChip,
    QExpansionItem,
    QPageScroller
  },
  directives: {
    Ripple,
    ClosePopup
  },
  plugins: {
    Notify
  }
 })