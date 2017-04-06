

let overlayVM = Vue.component('overlay', {
  template: `
    <div v-bind:class="{ hidden : showCount < 1 }" class="overlay">
    </div>
  `,
  created:function(){
    eventHub.$on('overlay:show', this.show)
    eventHub.$on('overlay:hide', this.hide)    
  },
  data: () => {
    return {
      showCount:0
    }
  },
  methods: {
    show:function(){
      this.showCount++
    },
    hide:function(){
      this.showCount--
      this.showCount = this.showCount < 0 ? 0 : this.showCount
    }
  }
})
