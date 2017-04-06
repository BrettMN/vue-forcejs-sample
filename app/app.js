var routes = [
  {
    path: '/',
    component: contactsVM
  },
  {
    name: 'editcontact',
    path: '/editcontact/:id',
    component: editContactVM,
    props: true
  },
  {
    name: 'newcontact',
    path: '/newcontact/',
    component: newContactVM
  }
]

var router = new VueRouter({ routes })

let app = new Vue({
  el: '#main',
  router: router,
  data: {
    header: 'WIPDeveloper.com',
    subHeader: 'Contact List!'
  }
  // methods: {
  //   load: () => {
  //     app.contacts = []

  //     sfService.query('select id, Name from contact LIMIT 50')
  //       .then(response => {
  //         app.contacts = response.records
  //       })
  //   }
  // }
})
