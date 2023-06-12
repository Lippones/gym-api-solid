import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title:'Near Gym',
      description:null,
      latitude:-18.895415,
      longitude:-41.951010,
      phone:null
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description:null,
      latitude:-19.456487,
      longitude:-42.522322,
      phone:null
    })
    const { gyms } = await sut.execute({
      userLatitude:-18.895415,
      userLongitude:-41.951010,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Near Gym'})
    ])
  })
})
