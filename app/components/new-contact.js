
let newContactVM = Vue.component('new-contact', {
  template: `
  <div>
    <div class="row">
      <h4 class="col-xs-12">
        Name: <input v-model="firstName" placeholder="First Name" />
      </h4>
      <h4 class="col-xs-12">
        Name: <input v-model="lastName" placeholder="Last Name" />
      </h4>
      <h4 class="col-xs-12">
        Languages: <input v-model="languages" placeholder="Languages" />
      </h4>
      
      <div class="col-xs-6">
        <router-link to="/" class="btn btn-danger btn-block">Cancel</router-link>
      </div>
      <div class="col-xs-6">
        <button v-on:click="saveContact()" class="btn btn-success btn-block">Save</button>
      </div>
    </div>
    <overlay></overlay>
  </div>
  `,
  data: () => {
    return {
      firstName: null,
      lastName: null,
      languages: null
    }
  },
  methods: {
    saveContact: function () {
      let toUpdate = {
        FirstName: this.firstName,
        LastName: this.lastName,
        Languages__c: this.languages
      }
      sfService.create('contact', toUpdate)
        .then(() => {
          eventHub.$emit('contacts:load')
          router.push('/')
        })
    }
  }
})
