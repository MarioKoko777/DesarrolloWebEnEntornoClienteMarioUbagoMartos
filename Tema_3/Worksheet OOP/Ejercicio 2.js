class Car {
  constructor(model, milesPerGallon) {
    this.model = model;
    this.milesPerGallon = milesPerGallon;
    this.tank = 0;
    this.odometer = 0;
  }

  fill(gallons) {
    if (typeof gallons !== 'number' || !isFinite(gallons) || gallons <= 0) return;
    this.tank += gallons;
  }

  drive(distance) {
    if (typeof distance !== 'number' || !isFinite(distance) || distance <= 0) return;
    const possibleMiles = this.tank * this.milesPerGallon;
    if (distance <= possibleMiles) {
      this.odometer += distance;
      this.tank -= distance / this.milesPerGallon;
      return;
    } else {
      this.odometer += possibleMiles;
      this.tank = 0;
      return `¡Me quedé sin combustible a las ${this.odometer} millas!`;
    }
  }
}