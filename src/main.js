import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaseButton from './components/global/BaseButton.vue'

const app = createApp(App)
app.component('BaseButton', BaseButton)

app.config.errorHandler = (err, instance, info) => {
  console.error(err, info)
  document.body.innerHTML += `<div style="color:red; position:absolute; top:0; left:0; z-index:9999; background:white; padding:20px; border:2px solid red;">
    <h3>Vue Error:</h3>
    <pre>${err.message}</pre>
    <pre>${err.stack}</pre>
  </div>`
}

app.mount('#app')

