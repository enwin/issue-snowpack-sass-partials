class Geo {
  constructor() {
    this.data = {
      location: false
    };
    this.options = {
      reverse: {
        type: "housenumber"
      }
    };
  }
  getAddress() {
    return fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${this.location.lon}&lat=${this.location.lat}&type=${this.options.reverse.type}`).then((res) => res.json()).then(({features: [{properties}]}) => {
      const {id, distance, citycode, context, importance, score, type, x, y, ...address} = properties;
      return address;
    });
  }
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      const success = (pos) => {
        resolve(pos);
      };
      const error = (err) => {
        reject(err);
      };
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 50000
      });
    });
  }
  async locate() {
    const {coords: {latitude, longitude}} = await this.getCurrentPosition().catch((err) => {
      console.error(err);
      coords: {
      }
    });
    this.location = {
      lon: longitude,
      lat: latitude
    };
    return await this.getAddress().then((address) => {
      return {
        address,
        location: this.location
      };
    });
  }
  get location() {
    const {lon, lat} = this.data.location;
    return {
      lon,
      lat
    };
  }
  set location({lon, lat}) {
    this.data.location = {
      ...this.data.location,
      lon,
      lat
    };
  }
}
export default new Geo();
