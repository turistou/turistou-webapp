// @flow
import gql from 'graphql-tag'
import { DateTime } from 'luxon'

import { mutate, query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'excursionDetail/SET_STATE',
  SAVE_EXCURSION: 'excursionDetail/SAVE_EXCURSION',
  SAVE_EXCURSION_FAILURE: 'excursionDetail/SAVE_EXCURSION_FAILURE',
  SAVE_EXCURSION_SUCCESS: 'excursionDetail/SAVE_EXCURSION_SUCCESS',
  GET_EXCURSION_BY_ID: 'excursionDetail/GET_EXCURSION_BY_ID',
  GET_EXCURSION_BY_ID_FAILURE: 'excursionDetail/GET_EXCURSION_BY_ID_FAILURE',
  GET_EXCURSION_BY_ID_SUCCESS: 'excursionDetail/GET_EXCURSION_BY_ID_SUCCESS',
}

export const saveExcursion = (form) => {
  const {
    destination,
    departurePoint,
    departureDate,
    departureTime,
    arrivalPoint,
    regressDate,
    regressTime,
    ticketPriceDefault,
    stoppingPoints,
    priceKeys,
    ticketDescription,
    ticketPrice,
    isFrom,
    ageInitial,
    ageFinal,
    untilAge,
    transportsKeys,
    type,
    plate,
    capacity,
    driver,
  } = form

  const payload = {
    destination,
    departurePoint,
    departureDatetime:
      departureDate &&
      DateTime.fromObject({
        year: departureDate.year(),
        month: departureDate.month() + 1,
        day: departureDate.date(),
        hour: departureTime.hour(),
        minute: departureTime.minute(),
      }),
    arrivalPoint,
    regressDatetime:
      regressDate &&
      DateTime.fromObject({
        year: regressDate.year(),
        month: regressDate.month() + 1,
        day: regressDate.date(),
        hour: regressTime.hour(),
        minute: regressTime.minute(),
      }),
    stoppingPoints,
    ticketPriceDefault,
    prices: (priceKeys || []).map((k) => ({
      ticketDescription: ticketDescription[k],
      ticketPrice: ticketPrice[k],
      isFrom: !!isFrom[k],
      ageInitial: isFrom[k] ? ageInitial[k] : null,
      untilAge: !!untilAge[k],
      ageFinal: untilAge[k] ? ageFinal[k] : null,
    })),
    excursionTransports: transportsKeys.map((k) => ({
      type: type[k],
      plate: plate[k],
      capacity: capacity[k],
      driver: driver[k],
    })),
  }

  return mutate({
    mutation: gql`
      mutation saveExcursion($input: SaveExcursionInput!) {
        saveExcursion(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: payload,
    },
  })
}

export const saveExcursionSuccess = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const saveExcursionFailure = (payload: any) => ({
  type: actions.SAVE_EXCURSION_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export const getExcursionById = (id: string) => ({
  type: actions.GET_EXCURSION_BY_ID,
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        query Excursion($id: String!) {
          excursion(id: $id) {
            id
            destination
            departureDate
            departurePoint
            arrivalPoint
            regressDate
            ticketPriceDefault
            ticketPrices {
              id
              description
              price
              ageInitial
              ageFinal
            }
            transports {
              id
              type
              plate
              capacity
            }
            passengers {
              id
              spot {
                number
                transportId
              }
            }
            stopPoints {
              id
              stopPoint
            }
          }
        }
      `,
      variables: { id },
    }),
})

export const getExcursionByIdSuccess = (payload: any) => ({
  type: actions.GET_EXCURSION_BY_ID_SUCCESS,
  payload: payload.excursion,
  isLoading: false,
})

export const getExcursionByIdFailure = () => ({
  type: actions.SET_STATE,
  payload: {
    isLoading: false,
    error: true,
  },
  isLoading: false,
})

export default actions
