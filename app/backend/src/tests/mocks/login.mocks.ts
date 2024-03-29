const hashPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const invalidEmail = 'any-email@email.com'
const validLoginBody = { email: validEmail, password: validPassword };
const invalidLoginBody = { email: invalidEmail, password: validPassword };
const invalidPasswordLoginBody = { email: validEmail, password: 'any-password' };
const noEmailLoginBody = {email: '', password: validPassword};
const noPasswordLoginBody = {email: validEmail, password: ''};
const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzA3MjE5MTQ3LCJleHAiOjE3MDczMDU1NDd9.NvtM6fMXU7nL7RCdmFI0G_Y5CJ6dLTRjnA0Hqs2EISE"

const existingUser = {
  id: 1,
  username: 'Admin',
  password: hashPassword,
  email: validEmail,
  role: 'admin'
}

export {
  existingUser,
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  invalidLoginBody,
  invalidPasswordLoginBody, 
  validToken
}