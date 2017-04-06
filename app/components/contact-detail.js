
let contactDetail = {
  template: `
  <div class="row" v-show="showContact">
    <h4 class="col-xs-12">
      Name: <small>{{ currentContact.Name }}</small>
    </h4>
    <h4 class="col-xs-12">
      Title: <small>{{ currentContact.Title }}</small>
    </h4>
    <h4 class="col-xs-12">
      MobilePhone: <small><a v-bind:href="'tel:' + currentContact.MobilePhone">{{ currentContact.MobilePhone }}</a></small>
    </h4>
    <h4 class="col-xs-12">
      Email: <small><a v-bind:href="'mailto:' + currentContact.Email">{{ currentContact.Email }}</a></small>
    </h4>
    <h4 class="col-xs-12">
      Department: <small>{{ currentContact.Department }}</small>
    </h4>
    <h4 class="col-xs-12">
      Lead Source: <small>{{ currentContact.LeadSource }}</small>
    </h4>
    <h4 class="col-xs-12">
      Languages: <small>{{ currentContact.Languages__c }}</small>
    </h4>
    <div class="col-xs-12">
      <router-link v-bind:to="{ name: 'editcontact', params: { id: currentContact.Id } }" class="btn btn-warning btn-block">Edit</router-link>
      <button v-on:click="deleteContact(currentContact.Id)" class="btn btn-danger btn-block">Delete</button>
    </div>
  </div>
  `,
  data: () => {
    return {
      currentContact: {},
      showContact: false
    }
  },
  created: function () {
    eventHub.$on('selectedContact', this.loadContact)
  },
  methods: {
    loadContact: function (id) {
      this.showContact = false
      this.currentContact = {}

      sfService.query(`SELECT Id, Name, MobilePhone, Email, Title, Department, LeadSource, Level__c, Languages__c FROM Contact WHERE Id = '${id}'`)
        .then(response => {
          this.currentContact = response.records[0]
          this.showContact = true
        })
    },
    deleteContact: function (id) {

      sfService.del('Contact', id)
        .then(response => {
          console.log(response)

          this.showContact = false
          this.currentContact = {}
        })
    }
  }
}
