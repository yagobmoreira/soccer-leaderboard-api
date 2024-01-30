const hashPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const validLoginBody = { email: validEmail, password: validPassword };

const existingUser = {
  id: 1,
  username: 'Admin',
  password: hashPassword,
  email: validEmail,
  role: 'admin'
}

export {
  existingUser,
  validLoginBody
}