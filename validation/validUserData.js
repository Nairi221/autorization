//... validation of user data
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordSchema = require('./validPassword');
    const validData = (body) => {
    const birthDate = body.bDay;
        if (!body.name || body.name.length < 3 || body.name.length > 25) {
            return {
                isValid: false,
                message: 'Write valid name data',
            }
        }
        if (!body.surname || body.surname.length < 3 || body.surname.length > 25) {
            return {
                isValid: false,
                message: 'Write valid surname data',
            }
        }
            if (!birthDate) {
                return {
                    isValid: false,
                    message: 'Birth day is required',
                }
            }
            const year = (new Date()).getFullYear();
            const month = (new Date()).getMonth() + 1;
            const days = (new Date()).getDate();
            const birthYear = (new Date(birthDate)).getFullYear();
            const birthMonth = (new Date(birthDate)).getMonth() + 1;
            const birthDays = (new Date(birthDate)).getDate();

        if (year - 16 < birthYear) {
            return {
                isValid: false,
                message: 'Birth day is required',
            }
        } else if ((year - 16) === birthYear) {
            if (birthMonth > month) {
                return {
                    isValid: false,
                    message: 'Birth day is required',
                }
            } else if (birthMonth === month) {
                if (birthDays > days) {
                    return {
                        isValid: false,
                        message: 'Birth day is required',
                    }
                }
            }
        }

        if (!re.test(String(body.email).toLowerCase())) {
            return {
                isValid: false,
                message: 'Wrong email input',
            }
        }

        if (!passwordSchema.validate(body.password)) {
            return {
                isValid: false,
                message: 'Wrong password input'
            }
        }
        return {
            isValid: true
        }

    }

module.exports = {
    validData
}