export default interface Guest {
  id: number
  firstName: string
  lastName: string
  reservation: {
    roomNumber: number
    startTimestamp: number
    endTimestamp: number
  }
}