/// FAKE API

const apiData = {

  stakeholders: [
    {
      uid: 1,
      label: 'Product Owner'
    },
    {
      uid: 2,
      label: 'User'
    },
    {
      uid: 3,
      label: 'Customer'
    },
    {
      uid: 4,
      label: 'Sales Representative'
    },
    {
      uid: 5,
      label: 'Administrator'
    },
    {
      uid: 6,
      label: 'Developer'
    },
    {
      uid: 7,
      label: 'Designer'
    },
    {
      uid: 8,
      label: 'QA Tester'
    }
   
  ]
}

export const stakeholdersService = {

  getData (callback) {
    setTimeout(() => callback( apiData ), 1000)
  }

}
