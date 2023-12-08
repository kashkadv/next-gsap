import { delay } from '@/helpers/functions'
import {faker} from '@faker-js/faker'

export function createRandomCard() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bgColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
    avatar: faker.image.avatar(),
    description: faker.lorem.sentence({ min: 10, max: 20 })
  }
}

export const data = faker.helpers.multiple(createRandomCard, { count: 29 })

export async function getUsers(ms) {
  await delay(ms)
  return data
}