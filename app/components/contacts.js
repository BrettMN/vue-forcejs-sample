let contactsData = {
  contacts: []
}

let contactsVM = Vue.component('contacts', {
  template: `
    <div class="row">
      <div class="col-sm-4">
        <button v-on:click="load()" class="btn btn-primary btn-block">Load</button>
        <router-link to="/newcontact" class="btn btn-success btn-block">New Contact</router-link>
        <contact-detail></contact-detail>
      </div>
      <div class="col-sm-8 list-group">
          <a v-for="contact in contacts" class="list-group-item">
            <div class="row">
              <div class="col-sm-6">
                <h4>Name: <small>{{contact.Name}}</small></h4>
              </div>
              <div class="col-sm-6">
                <button v-on:click="select(contact.Id)" class="btn btn-info btn-block">Show Details<i class="glyphicon glyphicon-chevron-right"></i></button>
              </div>
            </div>
          </a>
      </div>
      <overlay></overlay>
    </div>
  `,
  components: {
    'contact-detail': contactDetail
  },
  created:function(){
    eventHub.$on('contacts:load', this.load)
    this.load()    
  },
  data: () => {
    return contactsData
  },
  methods: {
    load: function() {
      contactsData.contacts = []
      eventHub.$emit('overlay:show')

      sfService.query('select id, Name from contact LIMIT 50')
        .then(function(response) {
          contactsData.contacts = response.records
          eventHub.$emit('overlay:hide')
        })
    },
    select: function(id) {
      console.log(id)
      eventHub.$emit('selectedContact', id)
    }
  }
})
