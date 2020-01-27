export function calculateMarkers(data) {
  let result = data.apparatus.map(car => {
    return Object.keys(car.unit_status).map(key => {
      return {
        car_id: car.car_id,
        unit_id: car.unit_id,
        lat: car.unit_status[key].latitude,
        long: car.unit_status[key].longitude,
        timestamp: car.unit_status[key].timestamp,
        status: key
      }
    })
  })

  return result.flat();
}