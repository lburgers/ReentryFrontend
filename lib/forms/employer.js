export const employer = [
  [
      {
        name: 'employer_name',
        title: 'Company name',
        placeholder: '',
        req: true,
      },
      {
        name: 'phone_number',
        title: 'Phone number',
        placeholder: '1234567890',
        validator: (phone_number) => phone_number.match(/^\d{10}$/) !== null,
        req: true,
      },
      {
        name: 'ein',
        title: 'EIN #',
        placeholder: '',
        validator: (ein) => ein.match(/^\d{9}$/) !== null,
        req: true,
      },
  ],
  [
      {
        name: 'street_address',
        title: 'Street address',
        placeholder: '1 Elm Street',
        req: true,
      },
      {
        name: 'city',
        title: 'City',
        placeholder: 'e.g. New Haven',
        req: true,
      },
      {
        name: 'state',
        title: 'State',
        placeholder: 'CT',
        validator: (state) => state.match(/^[A-Z]{2}$/) !== null,
        req: true,
      },
      {
        name: 'zipcode',
        title: 'Zipcode',
        placeholder: '06590',
        validator: (zip) => zip.match(/^\d{5}$/) !== null,
        req: true,
      },
  ],
  [
      {
        name: 'email',
        title: 'Email',
        placeholder: '',
        validator: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)),
        req: true,
      },
      {
        name: 'password',
        title: 'Password',
        placeholder: '',
        validator: (password) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) !== null,
        req: true,
      },
      {
        name: 'confirm_password',
        title: 'Confirm password',
        placeholder: '',
        validator: (password) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) !== null,
        req: true,
      },
  ]
]