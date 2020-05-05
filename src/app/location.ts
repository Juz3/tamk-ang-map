import MyMath from './mymath';

export default class Location {
  private static counter = 0;
  private _id = 0;
  private _latitude: number;
  private _longitude: number;

  constructor() {
    this.generateId();
    this.latitude = MyMath.getRandom(-90, 90);
    this.longitude = MyMath.getRandom(-180, 180);
  }

  private generateId() {
    Location.counter++;
    this._id = Location.counter;
  }

  public get id(): number {
    return this._id;
  }

  public get latitude(): number {
    return this._latitude;
  }

  public get longitude(): number {
    return this._longitude;
  }

  public set latitude(latitude: number) {
    if (latitude >= -90 && latitude <= 90 && latitude) {
      this._latitude = latitude;
    } else {
      throw new TypeError(`Latitude must be between -90 and 90. it was: ${latitude}`);
    }
  }

  public set longitude(longitude: number) {
    if (longitude >= -180 && longitude <= 180 && longitude) {
      this._longitude = longitude;
    } else {
      throw new TypeError(`Longitude must be between -180 and 180. it was: ${longitude}`);
    }
  }
}
