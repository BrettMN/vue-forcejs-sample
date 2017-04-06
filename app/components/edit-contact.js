
let editContactVM = Vue.component('edit-contact', {
  props: ['id'],
  template: `
  <div>
    <div class="row" v-if="loading">
      <h4 class="col-xs-12">
      Loading, please wait...
      </h4>
    </div>
    <div class="row" v-if="currentContact">
      <h4 class="col-xs-12">
        Name: <small>{{ currentContact.Name }}</small>
      </h4>
      <h4 class="col-xs-12">
        Languages: <input v-model="currentContact.Languages__c" placeholder="Languages" />
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
      currentContact: null,
      loading: false
    }
  },
  created: function () {
    this.loadContact()
  },
  watch: {
    '$route': 'loadContact'
  },
  methods: {
    loadContact: function () {
      this.loading = true
      this.currentContact = null

      sfService.query(`SELECT Id, Name, Languages__c FROM Contact WHERE Id = '${this.id}'`)
        .then(response => {
          this.currentContact = response.records[0]
          this.loading = false
        })
    },
    saveContact: function () {
      let toUpdate = {
        Id: this.currentContact.Id,
        Languages__c: this.currentContact.Languages__c
      }
      sfService.update('contact', toUpdate)
      .then(() => {
        
        eventHub.$emit('contacts:load')
        router.push('/')
      })
    }
  }
})
