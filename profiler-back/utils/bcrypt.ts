import bcrypt from 'bcryptjs'

export default class Bcrypter {
    hashString(str: string) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(str, salt)
        return hash
    }

    compareString(str: string, hash: string) {
        return bcrypt.compareSync(str, hash)
    }
}
