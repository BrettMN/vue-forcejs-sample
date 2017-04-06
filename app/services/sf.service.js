let sfService = (() => {
  // private variables

  // public variables

  // private functions
  function login() {
    let oauth = force.OAuth.createInstance()
    return oauth.login()
      .then(oauthResult => {
        return force.DataService.createInstance(oauthResult)
      })
  }

  function getDataService() {
    return new Promise(
      (resolve) => {
        dataService = force.DataService.getInstance()
        if (!dataService) {
          login()
            .then(() => {
              dataService = force.DataService.getInstance()
              resolve(dataService)
            })
        } else {
          resolve(dataService)
        }
      },
      (reject) => {
        reject('Danger, Will Robinson!')
      })
  }

  // public functions
  function query(soql) {
    return getDataService()
      .then(dataService => {
        return dataService.query(soql)
      })
  }

  function update(objectName, value) {
    return getDataService()
      .then(dataService => {
        return dataService.update(objectName, value)
      })
  }

  function create(objectName, value) {
    return getDataService()
      .then(dataService => {
        return dataService.create(objectName, value)
      })
  }

  function del(objectName, id) {
    return getDataService()
      .then(dataService => {
        return dataService.del(objectName, id)
      })
  }

  // return object
  return {
    query: query,
    update: update,
    create: create,
    del: del
  }
})()
