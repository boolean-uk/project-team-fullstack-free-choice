const { faker } = require('@faker-js/faker');

const fakeUsers = () => {
    const fakeUsername = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const fakedPassword = faker.internet.password();

    const fakeUser = {
        username: fakeUsername,
        password: fakeEmail,
        email: fakedPassword
    }
    
    return fakeUser
}

module.exports = {
    fakeUsers
}