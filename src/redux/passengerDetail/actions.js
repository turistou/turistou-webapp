// @flow
import gql from 'graphql-tag'
import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerDetail/SET_STATE',
  SAVE_PASSENGER: 'passengerDetail/SAVE_PASSENGER',
  SAVE_PASSENGER_FAILURE: 'passengerDetail/SAVE_PASSENGER_FAILURE',
  SAVE_PASSENGER_SUCCESS: 'passengerDetail/SAVE_PASSENGER_SUCCESS',
}

export const savePassenger = form => {
  const payload = {
    ...form,
    excursionId: '5dbde2686aac4e44e8b1c02e', // TODO:
    status: 'BOOKED', // TODO:
  }

  return mutate({
    mutation: gql`
      mutation savePassenger($input: SavePassengerInput!) {
        savePassenger(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: payload,
    },
  })
}

export const savePassengerSuccess = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const savePassengerFailure = (payload: any) => ({
  type: actions.SAVE_PASSENGER_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
